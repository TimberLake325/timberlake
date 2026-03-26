"use server";
import { dbConnect } from "@/lib/db";
import { FAQ } from "@/lib/model";

import { unstable_cache } from "next/cache";

export const getFaqData = unstable_cache(
    async () => {
        try {
            await dbConnect();
            const faqData = await FAQ.findOne().lean();
            if (!faqData) return null;

            return JSON.parse(JSON.stringify(faqData));
        } catch (error) {
            console.error("Error fetching FAQ data:", error);
            return null;
        }
    },
    ["faq-data"],
    {
        revalidate: false,
        tags: ["faq"]
    }
);
