"use server"

import { dbConnect } from "@/lib/db";
import { ContactPage } from "@/lib/model";
import { unstable_cache } from "next/cache";

export const getContactData = unstable_cache(
    async () => {
        try {
            await dbConnect();
            const data = await ContactPage.findOne({ page: 'Contact Us' }).lean();
            return data ? JSON.parse(JSON.stringify(data)) : null;
        } catch (error) {
            console.error("Error fetching contact data:", error);
            return null;
        }
    },
    ["contact-page-data"],
    {
        revalidate: false,
        tags: ["contact-page"],
    }
);
