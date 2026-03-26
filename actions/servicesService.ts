import { dbConnect } from "@/lib/db";
import { Service, ServiceCategory, ServicesPage } from "@/lib/model";
import { unstable_cache } from "next/cache";

export const getActiveServiceCategories = unstable_cache(
    async () => {
        await dbConnect();
        return ServiceCategory.find({
            status: "Active",
            isDeleted: false,
        }).sort({ displayOrder: 1, name: 1 }).select("name slug description excerpt image");
    },
    ["service-categories"],
    {
        tags: ["service-categories"],
        revalidate: false,
    }
);

export const getActiveServices = unstable_cache(
    async () => {
        await dbConnect();
        return Service.find({
            status: "Active",
            isDeleted: false,
        }).sort({ displayOrder: 1, title: 1 });
    },
    ["services"],
    {
        tags: ["services"],
        revalidate: false,
    }
);

export const getActiveServicesPage = unstable_cache(
    async () => {
        await dbConnect();
        return ServicesPage.findOne().sort({ createdAt: -1 });
    },
    ["services-page"],
    {
        tags: ["services-page"],
        revalidate: false,
    }
);

export async function getServicePageData() {
    await dbConnect();

    const [categories, allServices, servicesPage] = await Promise.all([
        getActiveServiceCategories(),
        getActiveServices(),
        getActiveServicesPage(),
    ]);

    return {
        categories: JSON.parse(JSON.stringify(categories)),
        allServices: JSON.parse(JSON.stringify(allServices)),
        servicesPage: JSON.parse(JSON.stringify(servicesPage)),
    };
}

export const getCategoryBySlug = unstable_cache(
    async (slug: string) => {
        await dbConnect();
        return ServiceCategory.findOne({
            slug,
            status: "Active",
            isDeleted: false,
        })
            .select("name slug description excerpt image")
            .populate({
                path: 'categoryServices',
                match: { status: 'Active', isDeleted: false },
                select: 'title slug excerpt description keyFeatures statistics image',
                options: { sort: { displayOrder: 1, title: 1 } }
            });
    },
    ["category-by-slug"],
    {
        tags: ["category-by-slug"],
        revalidate: false,
    }
);

export const getServiceBySlug = unstable_cache(
    async (slug: string) => {
        await dbConnect();
        return Service.findOne({
            slug,
            status: "Active",
            isDeleted: false,
        });
    },
    ["service-by-slug"],
    {
        tags: ["service-by-slug"],
        revalidate: false,
    }
);

export const getNavbarServices = unstable_cache(
    async () => {
        await dbConnect();
        
        // Find categories and populate their related services
        const categories = await ServiceCategory.find({
            status: "Active",
            isDeleted: false,
        })
            .sort({ displayOrder: 1, name: 1 })
            .select("name slug icon icon_bg description excerpt image")
            .populate({
                path: 'categoryServices', // Virtual field from the model
                match: { status: 'Active', isDeleted: false },
                select: 'title slug icon icon_bg card_bg excerpt description',
                options: { sort: { displayOrder: 1, title: 1 } }
            });

        return JSON.parse(JSON.stringify(categories));
    },
    ["navbar-services"],
    {
        tags: ["service-categories", "services"],
        revalidate: false,
    }
);
