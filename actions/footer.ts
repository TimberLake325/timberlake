"use server";

import { dbConnect } from "@/lib/db";
import { Footer, Service, BlogPost } from "@/lib/model";
import { unstable_cache } from "next/cache";

export const getFooterData = unstable_cache(
    async () => {
        await dbConnect();
        try {
            const footer = await Footer.findOne({ companyName: "Timberlake" }).lean()
                .populate({
                    path: 'serviceIds',
                    select: 'title slug category',
                    populate: {
                        path: 'category',
                        select: 'slug'
                    }
                })
                .populate({
                    path: 'blogPostIds',
                    select: 'title slug category',
                    populate: {
                        path: 'category',
                        select: 'slug'
                    }
                })
                .lean();

            return footer;
        } catch (error) {
            console.error("Error fetching footer data:", error);
            return null;
        }
    },
    ["footer-data"],
    {
        revalidate: 3600,
        tags: ["footer"]
    }
);
