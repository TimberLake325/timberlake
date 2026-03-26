"use server";

import { dbConnect } from "@/lib/db";
import { HipaaCompliance } from "@/lib/model";
import { unstable_cache } from "next/cache";

export const getHipaaData = unstable_cache(async () => {
    await dbConnect();
    try {
        const hipaa = await HipaaCompliance.findOne();
        if (!hipaa) {
            return {
                success: false,
                message: "HIPAA data not yet initialized",
                data: null
            };
        }
        return {
            success: true,
            message: "HIPAA data fetched successfully",
            data: JSON.parse(JSON.stringify(hipaa))
        };
    } catch (error) {
        console.error("Error fetching HIPAA data:", error);
        return {
            success: false,
            message: "Failed to connect and fetch HIPAA records",
            data: null
        };
    }
}, ["hipaa-page"], {
    revalidate: false,
    tags: ["hipaa-page"],
});
