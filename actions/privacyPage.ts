"use server";

import { dbConnect } from "@/lib/db";
import { Privacy } from "@/lib/model";
import { unstable_cache } from "next/cache";

export const getPrivacyData = unstable_cache(async () => {
    await dbConnect();
    try {
        const privacy = await Privacy.findOne({ page: "Privacy Policy" });
        if (!privacy) {
            return {
                success: false,
                message: "Privacy data not yet initialized",
                data: null
            };
        }
        return {
            success: true,
            message: "Privacy data fetched successfully",
            data: JSON.parse(JSON.stringify(privacy))
        };
    } catch (error) {
        console.error("Error fetching privacy data:", error);
        return {
            success: false,
            message: "Failed to connect and fetch privacy records",
            data: null
        };
    }
}, ["privacy-page"], {
    revalidate: false,
    tags: ["privacy-page"],
});
