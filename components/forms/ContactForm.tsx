"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { services } from "@/utils/services";
import { LucideAlertTriangle, LucideLoader2, LucideSend, LucideInfo, LucideCalendar, LucideChevronDown } from "lucide-react";
import { submitContactForm, type ContactFormResponse } from "@/actions/contactForm";
import {
    TextField,
    Input,
    TextArea,
    Select,
    SelectTrigger,
    SelectValue,
    SelectIndicator,
    SelectPopover,
    ListBox,
    ListBoxItem,
    Label,
    Description,
    FieldError,
    RadioGroup,
    Radio,
    CheckboxGroup,
    Checkbox
} from "@heroui/react";

interface FormOption {
    label: string;
    value: string;
}

interface FormField {
    id: string;
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    defaultValue?: string;
    helpText?: string;
    required?: boolean;
    isActive?: boolean;
    validationMessage?: string;
    validationRules?: string;
    validationPattern?: string;
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
    fileTypes?: string;
    maxFileSize?: number;
    options?: FormOption[];
}

interface ContactFormProps {
    config?: {
        title?: string;
        fields?: FormField[];
    };
}

export default function ContactForm({ config }: ContactFormProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const defaultFields: FormField[] = [
        { id: '1', name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Dr. Julian Smith', required: true, isActive: true, minLength: 3 },
        { id: '2', name: 'companyName', label: 'Practice/Company Name', type: 'text', placeholder: 'Central Health Systems', required: true, isActive: true, minLength: 2 },
        { id: '3', name: 'email', label: 'Professional Email', type: 'email', placeholder: 'admin@practice.com', required: true, isActive: true },
        { id: '4', name: 'phone', label: 'Direct Phone', type: 'tel', placeholder: '1234567890', required: true, isActive: true, minLength: 10, maxLength: 15 },
        { id: '5', name: 'service', label: 'Service Area of Interest', type: 'select', required: true, isActive: true, options: services.map(s => ({ label: s.title, value: s.title })) },
        { id: '6', name: 'message', label: 'Audit Requirements / Notes', type: 'textarea', placeholder: 'Provide details about your current billing challenges...', required: true, isActive: true, minLength: 10 }
    ];

    const allFields = (config?.fields && config.fields.length > 0) ? config.fields : defaultFields;
    const fields = allFields.filter(f => f.isActive !== false);

    const [formData, setFormData] = useState<Record<string, any>>(() => {
        const initial: Record<string, any> = {};
        allFields.forEach(f => {
            initial[f.name] = f.defaultValue || (f.type === 'checkbox' ? [] : "");
        });
        return initial;
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [globalError, setGlobalError] = useState<string | null>(null);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        fields.forEach(field => {
            const value = formData[field.name];
            const stringValue = typeof value === 'string' ? value.trim() : "";
            const numValue = field.type === 'number' ? parseFloat(value) : NaN;

            if (field.required) {
                if (field.type === 'checkbox') {
                    if (!value || (Array.isArray(value) && value.length === 0)) {
                        newErrors[field.name] = field.validationMessage || `${field.label} is required`;
                    }
                } else if (!stringValue && field.type !== 'number') {
                    newErrors[field.name] = field.validationMessage || `${field.label} is required`;
                } else if (field.type === 'number' && isNaN(numValue)) {
                    newErrors[field.name] = field.validationMessage || `${field.label} is required`;
                }
            }

            if (stringValue) {

                if (field.type === 'email' && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(stringValue)) {
                    newErrors[field.name] = "Please enter a valid business email address";
                }

                else if (field.type === 'tel' && !/^\d{10,15}$/.test(stringValue.replace(/[\s\-\(\)\+]/g, ""))) {
                    newErrors[field.name] = "Phone number must be between 10-15 digits";
                }

                else if (field.name === 'fullName' && !stringValue.includes(' ')) {
                    newErrors[field.name] = "Please enter your full first and last name";
                }

                if (field.minLength && stringValue.length < field.minLength) {
                    newErrors[field.name] = field.validationMessage || `${field.label} must be at least ${field.minLength} characters`;
                }
                if (field.maxLength && stringValue.length > field.maxLength) {
                    newErrors[field.name] = field.validationMessage || `${field.label} cannot exceed ${field.maxLength} characters`;
                }

                const pattern = field.validationPattern || field.validationRules;
                if (pattern) {
                    try {
                        const regex = new RegExp(pattern);
                        if (!regex.test(stringValue)) {
                            newErrors[field.name] = field.validationMessage || "Invalid format";
                        }
                    } catch (e) {
                        console.error("Invalid regex in form validation:", pattern);
                    }
                }
            }

            if (field.type === 'number' && !isNaN(numValue)) {
                if (field.minValue !== undefined && numValue < field.minValue) {
                    newErrors[field.name] = field.validationMessage || `${field.label} must be at least ${field.minValue}`;
                }
                if (field.maxValue !== undefined && numValue > field.maxValue) {
                    newErrors[field.name] = field.validationMessage || `${field.label} cannot exceed ${field.maxValue}`;
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            const currentVals = Array.isArray(formData[name]) ? [...formData[name]] : [];
            if (checked) {
                setFormData(prev => ({ ...prev, [name]: [...currentVals, value] }));
            } else {
                setFormData(prev => ({ ...prev, [name]: currentVals.filter(v => v !== value) }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
        if (globalError) setGlobalError(null);
    };

    const handleValueChange = (name: string, value: any) => {
        let finalValue = value;

        // Enforce only numbers for phone field as requested
        if (name === 'phone' && typeof value === 'string') {
            finalValue = value.replace(/\D/g, '');
        }

        setFormData(prev => ({ ...prev, [name]: finalValue }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
        if (globalError) setGlobalError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setGlobalError(null);

        if (!validateForm()) {
            return;
        }

        setStatus("loading");

        try {
            const result = await submitContactForm({
                ...formData,
                _metadata: {
                    ip: 'client-side',
                    userAgent: navigator.userAgent
                }
            });

            if (result.success) {
                setStatus("success");
            } else {
                if (result.errors) {
                    setErrors(result.errors as any);
                    setStatus("idle");
                } else {
                    setGlobalError(result.message || "Failed to submit. Please try again.");
                    setStatus("error");
                }
            }
        } catch (error) {
            console.error("Submission error:", error);
            setGlobalError("A critical system error occurred. Please try again later.");
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-primary/5 border border-primary/20 p-12 rounded-[2.5rem] text-center space-y-6 animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LucideSend className="text-primary w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-primary uppercase tracking-tighter">Transmission Secured</h3>
                <p className="foreground/70/70 font-medium max-w-md mx-auto">Your consultation request has been encrypted and sent to our executive team. Expect a response within 24 business hours.</p>
                <Button onClick={() => {
                    setStatus("idle");
                    const initial: Record<string, any> = {};
                    fields.forEach(f => {
                        initial[f.name] = f.defaultValue || (f.type === 'checkbox' ? [] : "");
                    });
                    setFormData(initial);
                    setErrors({});
                    setGlobalError(null);
                }} variant="outline" className="rounded-2xl px-12">New Submission</Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-10">
            {globalError && (
                <div className="bg-red-50 border border-red-200 p-6 rounded-3xl flex items-center gap-4 text-red-600 animate-in fade-in slide-in-from-top-4">
                    <LucideAlertTriangle size={24} />
                    <p className="text-sm font-black uppercase tracking-widest">{globalError}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                {fields.map((field) => {
                    if (field.type === 'textarea' || field.type === 'hidden') return null;
                    if (['select', 'radio', 'checkbox', 'date'].includes(field.type)) return null;

                    return (
                        <TextField
                            key={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.required}
                            isInvalid={!!errors[field.name]}
                            value={formData[field.name]}
                            onChange={(val) => handleValueChange(field.name, val)}
                            className="group space-y-2"
                        >
                            <Label className="text-[16px] foreground/70/40 ml-1">
                                {field.label}
                            </Label>
                            <Input
                                placeholder={field.placeholder}
                                className="w-full px-4 py-3 bg-muted/20  border border-primary/20 rounded-2xl focus:border-primary focus:bg-background outline-none transition-all font-bold text-foreground placeholder:text-black/10"
                            />
                            {field.helpText && <Description className="text-[9px] foreground/70/40 font-medium italic ml-1">{field.helpText}</Description>}
                            <FieldError className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1.5 ml-1">{errors[field.name]}</FieldError>
                        </TextField>
                    );
                })}
            </div>

            <div className="space-y-10">
                {fields.map((field) => {
                    if (field.type === 'hidden') return <input key={field.id} type="hidden" name={field.name} value={formData[field.name]} />;

                    if (!['select', 'radio', 'checkbox', 'date', 'textarea', 'file'].includes(field.type)) return null;

                    return (
                        <div key={field.id} className="space-y-3">
                            {field.type === 'select' ? (
                                <Select
                                    name={field.name}
                                    isRequired={field.required}
                                    isInvalid={!!errors[field.name]}
                                    selectedKey={formData[field.name]}
                                    onSelectionChange={(key) => handleValueChange(field.name, key)}
                                    className="space-y-3"
                                >
                                    <Label className="text-[16px] foreground/70/40 ml-1">
                                        {field.label}
                                    </Label>
                                    <div className="relative">
                                        <SelectTrigger className="w-full px-4 py-3 bg-background border-2 border-muted rounded-2xl focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all font-black uppercase text-[12px] tracking-widest text-primary appearance-none cursor-pointer flex justify-between items-center">
                                            <SelectValue className="text-primary/70">{formData[field.name] || field.placeholder || "Select an option..."}</SelectValue>
                                            <SelectIndicator className="text-primary">
                                                <LucideChevronDown size={20} />
                                            </SelectIndicator>
                                        </SelectTrigger>
                                        <SelectPopover className="bg-background border-2 border-muted rounded-2xl shadow-xl p-2 min-w-(--trigger-width)">
                                            <ListBox className="outline-none">
                                                {field.options?.map(opt => (
                                                    <ListBoxItem
                                                        key={opt.value}
                                                        id={opt.value}
                                                        textValue={opt.label}
                                                        className="px-4 py-2 rounded-xl hover:bg-primary/5 hover:text-primary cursor-pointer transition-colors font-bold uppercase text-[11px] tracking-widest outline-none selected:bg-primary selected:text-foreground"
                                                    >
                                                        {opt.label}
                                                    </ListBoxItem>
                                                ))}
                                            </ListBox>
                                        </SelectPopover>
                                    </div>
                                    {field.helpText && <Description className="text-[10px] foreground/70/30 font-bold flex items-center gap-2 ml-1"><LucideInfo size={12} /> {field.helpText}</Description>}
                                    <FieldError className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors[field.name]}</FieldError>
                                </Select>
                            ) : field.type === 'radio' ? (
                                <RadioGroup
                                    name={field.name}
                                    isRequired={field.required}
                                    isInvalid={!!errors[field.name]}
                                    value={formData[field.name]}
                                    onChange={(val) => handleValueChange(field.name, val)}
                                    className="space-y-3"
                                >
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] foreground/70/40 ml-1">
                                        {field.label}
                                    </Label>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        {field.options?.map(opt => (
                                            <Radio
                                                key={opt.value}
                                                value={opt.value}
                                                className="flex items-center gap-3 bg-muted/10 border-2 border-transparent p-4 rounded-2xl cursor-pointer hover:bg-background hover:border-primary/20 transition-all data-[selected=true]:border-primary data-[selected=true]:bg-primary/5"
                                            >
                                                <span className="text-[11px] font-black uppercase tracking-widest foreground/70">{opt.label}</span>
                                            </Radio>
                                        ))}
                                    </div>
                                    {field.helpText && <Description className="text-[10px] foreground/70/30 font-bold flex items-center gap-2 ml-1"><LucideInfo size={12} /> {field.helpText}</Description>}
                                    <FieldError className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors[field.name]}</FieldError>
                                </RadioGroup>
                            ) : field.type === 'checkbox' ? (
                                <CheckboxGroup
                                    name={field.name}
                                    isRequired={field.required}
                                    isInvalid={!!errors[field.name]}
                                    value={formData[field.name]}
                                    onChange={(val) => handleValueChange(field.name, val)}
                                    className="space-y-3"
                                >
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] foreground/70/40 ml-1">
                                        {field.label}
                                    </Label>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        {field.options?.map(opt => (
                                            <Checkbox
                                                key={opt.value}
                                                value={opt.value}
                                                className="flex items-center gap-3 bg-muted/10 border-2 border-transparent p-4 rounded-2xl cursor-pointer hover:bg-background hover:border-primary/20 transition-all data-[selected=true]:border-primary data-[selected=true]:bg-primary/5"
                                            >
                                                <span className="text-[11px] font-black uppercase tracking-widest foreground/70">{opt.label}</span>
                                            </Checkbox>
                                        ))}
                                    </div>
                                    {field.helpText && <Description className="text-[10px] foreground/70/30 font-bold flex items-center gap-2 ml-1"><LucideInfo size={12} /> {field.helpText}</Description>}
                                    <FieldError className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors[field.name]}</FieldError>
                                </CheckboxGroup>
                            ) : field.type === 'date' ? (
                                <TextField
                                    name={field.name}
                                    type="date"
                                    isRequired={field.required}
                                    isInvalid={!!errors[field.name]}
                                    value={formData[field.name]}
                                    onChange={(val) => handleValueChange(field.name, val)}
                                    className="space-y-3"
                                >
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] foreground/70/40 ml-1">
                                        {field.label}
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            className=""
                                        />
                                        <LucideCalendar size={20} className="absolute right-6 top-1/2 -translate-y-1/2 foreground/70/30 pointer-events-none" />
                                    </div>
                                    {field.helpText && <Description className="text-[10px] foreground/70/30 font-bold flex items-center gap-2 ml-1"><LucideInfo size={12} /> {field.helpText}</Description>}
                                    <FieldError className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors[field.name]}</FieldError>
                                </TextField>
                            ) : field.type === 'file' ? (
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] foreground/70/40 ml-1">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    <div className="relative">
                                        <input
                                            name={field.name}
                                            type="file"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) setFormData(prev => ({ ...prev, [field.name]: file.name }));
                                            }}
                                            className={`w-full px-6 py-4 bg-muted/10 border-2 border-dashed border-muted rounded-2xl focus:border-primary outline-none transition-all font-bold text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-black file:text-background file:cursor-pointer hover:file:bg-primary ${errors[field.name] ? 'border-red-500' : ''}`}
                                        />
                                    </div>
                                    {field.helpText && <p className="text-[10px] foreground/70/30 font-bold flex items-center gap-2 ml-1"><LucideInfo size={12} /> {field.helpText}</p>}
                                    {errors[field.name] && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors[field.name]}</p>}
                                </div>
                            ) : (
                                <TextField
                                    name={field.name}
                                    isRequired={field.required}
                                    isInvalid={!!errors[field.name]}
                                    value={formData[field.name]}
                                    onChange={(val) => handleValueChange(field.name, val)}
                                    className="space-y-3"
                                >
                                    <Label className="text-[16px]  foreground/70/40 ml-1">
                                        {field.label}
                                    </Label>
                                    <TextArea
                                        rows={5}
                                        placeholder={field.placeholder}
                                        className="w-full px-8 py-6 bg-background border-2 border-muted rounded-4xl focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all resize-none font-medium text-foreground text-lg placeholder:text-black/30"
                                    />
                                    {field.helpText && <Description className="text-[10px] foreground/70/30 font-bold flex items-center gap-2 ml-1"><LucideInfo size={12} /> {field.helpText}</Description>}
                                    <FieldError className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-1">{errors[field.name]}</FieldError>
                                </TextField>
                            )}
                        </div>
                    );
                })}
            </div>

            <Button
                type="submit"
                size="lg"
                disabled={status === "loading"}
                className="group relative w-full h-20 overflow-hidden rounded-3xl border-2 border-primary/20 bg-background p-0 text-xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 transition-all active:scale-[0.98]"
            >
                {/* 1. The Sliding Background Layer */}
                <div
                    className="absolute inset-0 bg-primary scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"
                    aria-hidden="true"
                />

                {/* 2. The Content Layer (z-10 ensures it stays above the sliding bg) */}
                <div className="relative z-10 flex h-full w-full items-center justify-center gap-4 text-foreground transition-colors duration-500 group-hover:text-background">
                    {status === "loading" ? (
                        <span className="flex items-center gap-4">
                            <LucideLoader2 className="h-6 w-6 animate-spin" />
                            Secured Transmission...
                        </span>
                    ) : (
                        <span className="flex items-center gap-4">
                            Send Request
                            <LucideSend
                                size={22}
                                className="transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
                            />
                        </span>
                    )}
                </div>
            </Button>
        </form>
    );
}
