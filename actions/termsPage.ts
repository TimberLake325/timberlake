"use server";

import { dbConnect } from "@/lib/db";
import { Terms } from "@/lib/model";
import { unstable_cache } from "next/cache";

export const getTermsData = unstable_cache(async () => {
    await dbConnect();
    try {
        const terms = await Terms.findOne({ page: "Terms of Conditions" });
        if (!terms) {
            return {
                success: false,
                message: "Terms data not yet initialized",
                data: null
            };
        }
        return {
            success: true,
            message: "Terms data fetched successfully",
            data: JSON.parse(JSON.stringify(terms))
        };
    } catch (error) {
        console.error("Error fetching terms data:", error);
        return {
            success: false,
            message: "Failed to connect and fetch terms records",
            data: null
        };
    }
}, ["terms-page"], {
    revalidate: false,
    tags: ["terms-page"],
});
