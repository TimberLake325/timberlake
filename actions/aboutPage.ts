"use server";

import { dbConnect } from "@/lib/db";
import { AboutPage } from "@/lib/model";
import { unstable_cache } from "next/cache";

export const getAboutPageData = unstable_cache(async () => {

    await dbConnect();
    try {
        const aboutPage = await AboutPage.findOne({ page: "About Us" });
        if (!aboutPage) {
            return {
                success: false,
                message: "About page data not yet initialized",
                data: null
            };
        }
        return {
            success: true,
            message: "About page fetched successfully",
            data: JSON.parse(JSON.stringify(aboutPage))
        };
    } catch (error) {
        console.error("Error fetching about page:", error);
        return {
            success: false,
            message: "Failed to connect and fetch about page records",
            data: null
        };
    }
}, ["about-page"], {
    revalidate: false,
    tags: ["about-page"],
});
