"use server";

import { dbConnect } from "@/lib/db";
import { SecurityPolicy } from "@/lib/model";
import { unstable_cache } from "next/cache";

export const getSecurityData = unstable_cache(async () => {
    await dbConnect();
    try {
        const security = await SecurityPolicy.findOne();
        if (!security) {
            return {
                success: false,
                message: "Security data not yet initialized",
                data: null
            };
        }
        return {
            success: true,
            message: "Security data fetched successfully",
            data: JSON.parse(JSON.stringify(security))
        };
    } catch (error) {
        console.error("Error fetching Security data:", error);
        return {
            success: false,
            message: "Failed to connect and fetch Security records",
            data: null
        };
    }
}, ["security-page"], {
    revalidate: false,
    tags: ["security-page"],
});
