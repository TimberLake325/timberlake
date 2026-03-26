import { dbConnect } from "@/lib/db";
import { StatesPage } from "@/lib/model";

import { unstable_cache } from "next/cache";

export const getStatesPageData = unstable_cache(
    async () => {
        await dbConnect();
        try {
            const statesPage = await StatesPage.findOne({ page: "States" });
            if (!statesPage) {
                return {
                    success: false,
                    message: "States page not found",
                    data: null
                };
            }
            if (statesPage && statesPage.pageData?.states) {
                statesPage.pageData.states.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
            }

            return {
                success: true,
                data: JSON.parse(JSON.stringify(statesPage))
            };
        } catch (error) {
            console.error("Error fetching states page data:", error);
            return {
                success: false,
                message: "Failed to fetch states page data",
                data: null
            };
        }
    },
    ['states-page'],
    {
        tags: ['states-page'],
        revalidate: false,
    }
);
