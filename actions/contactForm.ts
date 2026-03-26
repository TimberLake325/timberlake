"use server";

import { dbConnect } from "@/lib/db";
import { User, ContactSubmission, ContactPage } from "@/lib/model";
import { headers } from "next/headers";

export interface ContactFormResponse {
    success: boolean;
    message: string;
    submissionId?: string;
    errors?: Record<string, string>;
}

export const submitContactForm = async (formData: any): Promise<ContactFormResponse> => {
    try {
        await dbConnect();

        const contactPage = await ContactPage.findOne({ page: 'Contact Us' });
        const formFields = contactPage?.pageData?.form?.fields || [];
        const activeFields = formFields.filter((f: any) => f.isActive !== false);

        const validationErrors: Record<string, string> = {};

        activeFields.forEach((field: any) => {
            const value = formData[field.name];
            const stringValue = typeof value === 'string' ? value.trim() : "";
            const numValue = field.type === 'number' ? parseFloat(value) : NaN;

            if (field.required) {
                if (field.type === 'checkbox') {
                    if (!value || (Array.isArray(value) && value.length === 0)) {
                        validationErrors[field.name] = field.validationMessage || `${field.label} is required`;
                    }
                } else if (!stringValue && field.type !== 'number') {
                    validationErrors[field.name] = field.validationMessage || `${field.label} is required`;
                } else if (field.type === 'number' && isNaN(numValue)) {
                    validationErrors[field.name] = field.validationMessage || `${field.label} is required`;
                }
            }

            if (stringValue) {
                
                if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)) {
                    validationErrors[field.name] = "Please enter a valid email address";
                }
                
                else if (field.type === 'tel' && !/^\+?[\d\s\-\(\)]{10,}$/.test(stringValue.replace(/\s/g, ""))) {
                    validationErrors[field.name] = "Please enter a valid phone number";
                }

                if (field.minLength && stringValue.length < field.minLength) {
                    validationErrors[field.name] = field.validationMessage || `${field.label} must be at least ${field.minLength} characters`;
                }
                if (field.maxLength && stringValue.length > field.maxLength) {
                    validationErrors[field.name] = field.validationMessage || `${field.label} cannot exceed ${field.maxLength} characters`;
                }

                const pattern = field.validationPattern || field.validationRules;
                if (pattern) {
                    try {
                        const regex = new RegExp(pattern);
                        if (!regex.test(stringValue)) {
                            validationErrors[field.name] = field.validationMessage || "Invalid format";
                        }
                    } catch (e) {
                        console.error("Invalid regex in form validation:", pattern);
                    }
                }
            }

            if (field.type === 'number' && !isNaN(numValue)) {
                if (field.minValue !== undefined && numValue < field.minValue) {
                    validationErrors[field.name] = field.validationMessage || `${field.label} must be at least ${field.minValue}`;
                }
                if (field.maxValue !== undefined && numValue > field.maxValue) {
                    validationErrors[field.name] = field.validationMessage || `${field.label} cannot exceed ${field.maxValue}`;
                }
            }
        });

        if (Object.keys(validationErrors).length > 0) {
            return {
                success: false,
                message: "Please correct the errors in the form.",
                errors: validationErrors
            };
        }

        const headersList = await headers();
        const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
        const userAgent = headersList.get("user-agent") || "unknown";
        const referer = headersList.get("referer") || "unknown";

        const clientMetadata = formData._metadata || {};
        const cleanedData = { ...formData };
        delete cleanedData._metadata;

        const submission = await ContactSubmission.create({
            formId: 'main_contact',
            formData: cleanedData,
            metadata: {
                ip: ip,
                userAgent: userAgent || clientMetadata.userAgent,
                referer: referer
            },
            status: 'new'
        });

        const legacyMapping = {
            fullName: cleanedData.fullName || cleanedData.name || cleanedData.FullName || "Anonymous",
            email: cleanedData.email || cleanedData.Email || "",
            phone: cleanedData.phone || cleanedData.Phone || cleanedData.tel || "",
            companyName: cleanedData.companyName || cleanedData.organization || cleanedData.practice || "",
            service: cleanedData.service || cleanedData.interest || "General Inquiry",
            message: cleanedData.message || cleanedData.comments || "",
            source: 'contact_form_v2',
            formData: cleanedData,
            status: 'new'
        };

        if (legacyMapping.email) {
            await User.create(legacyMapping);
        }

        return {
            success: true,
            message: "Application transmitted successfully",
            submissionId: submission._id.toString()
        };
    } catch (error) {
        console.error("Error submitting contact form:", error);
        return {
            success: false,
            message: "A transmission error occurred. Please try again.",
        };
    }
};
