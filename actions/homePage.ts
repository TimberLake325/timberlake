"use server";

import { dbConnect } from "@/lib/db";
import { HomePage, Service } from "@/lib/model";
import { unstable_cache } from "next/cache";

const DEFAULT_SLUG = "home";

export const getHomePage = unstable_cache(
    async () => {
        await dbConnect();
        try {
            const homePageDoc = await HomePage.findOne({ slug: DEFAULT_SLUG }).lean();
            if (!homePageDoc) {
                return {
                    success: false,
                    message: "Home page data not found",
                    data: null
                };
            }

            const homePage = homePageDoc;

            if (homePage.sections) {
                for (const section of homePage.sections) {
                    if (section.type === 'WHAT_WE_DO' && section.content?.serviceIds?.length) {
                        const services = await Service.find({
                            _id: { $in: section.content.serviceIds },
                            isActive: true,
                            isDeleted: false
                        }).sort({ displayOrder: 1 }).lean();

                        section.content.services = services;
                    }
                }
            }

            return {
                success: true,
                message: "Home page data fetched successfully",
                data: JSON.parse(JSON.stringify(homePage))
            };
        } catch (error: any) {
            console.error("Error fetching home page:", error);
            return {
                success: false,
                message: error.message || "Critical error fetching home page data",
                data: null
            };
        }
    }, ["home-page"], {
    revalidate: false,
    tags: ["home-page"],
});
