import { dbConnect } from "@/lib/db";
import { BlogCategory, BlogPost, Service, Sitemap, State } from "@/lib/model";
import { unstable_cache } from 'next/cache';

export const getCachedSitemapData = unstable_cache(
    async () => {
        await dbConnect();
        try {
            const sitemapPage = await Sitemap.findOne().lean();
            if (!sitemapPage) {
                return null;
            }

            const dynamicSitemap = JSON.parse(JSON.stringify(sitemapPage));
            const sections = dynamicSitemap.sections || [];

            const [blogPosts, categories] = await Promise.all([
                BlogPost.find({ isPublished: true, isDeleted: false }).populate('category', 'name slug').sort({ createdAt: -1 }).lean(),
                BlogCategory.find({ isActive: true, isDeleted: false }).sort({ name: 1 }).lean()
            ]);

            let blogSection = sections.find((s: any) => s.title.toLowerCase().includes('blog'));
            if (!blogSection) {
                blogSection = { title: 'Insights & Blogs', links: [] };
                sections.push(blogSection);
            }

            const categoryLinks = categories.map((cat: any) => ({
                name: `${cat.name} (Category)`,
                href: `/blog/${cat.slug}`,
                description: `Articles in ${cat.name}`
            }));

            const postLinks = blogPosts.map((post: any) => ({
                name: post.title,
                href: `/blog/${post.category?.slug || 'uncategorized'}/${post.slug}`,
                description: post.excerpt || `Read our latest about ${post.category?.name || 'Medical Insurance'}`
            }));

            blogSection.links = [...categoryLinks, ...postLinks];

            const services = await Service.find({ isActive: true, isDeleted: false })
                .sort({ displayOrder: 1 })
                .lean();

            let serviceSection = sections.find((s: any) => s.title.toLowerCase().includes('service'));
            if (!serviceSection) {
                serviceSection = { title: 'Our Services', links: [] };
                sections.push(serviceSection);
            }
            serviceSection.links = services.map((service: any) => ({
                name: service.title,
                href: `/services/${service.slug}`,
                description: service.excerpt || service.description || "Expert medical billing solutions"
            }));

            const states = await State.find({ isActive: true, isDeleted: false })
                .sort({ name: 1 })
                .lean();

            if (states.length > 0) {
                let statesSection = sections.find((s: any) => s.title.toLowerCase().includes('state'));
                if (!statesSection) {
                    statesSection = { title: 'Coverage Areas', links: [] };
                    sections.push(statesSection);
                }
                statesSection.links = states.map((state: any) => ({
                    name: state.name,
                    href: `/states/${state.slug}`,
                    description: `Healthcare RCM and billing services in ${state.name}`
                }));
            }

            dynamicSitemap.sections = sections;
            return dynamicSitemap;
        } catch (error) {
            console.error("Error fetching sitemap page:", error);
            return null;
        }
    },
    ['sitemap-page-data'],
    {
        revalidate: false,
        tags: ['sitemap-page-data']
    }
);

export async function getSitemapPage() {
    const data = await getCachedSitemapData();
    if (!data) {
        return {
            success: false,
            message: "Sitemap page data not found",
            data: null
        };
    }
    return {
        success: true,
        message: "Sitemap page data fetched successfully",
        data
    };
}