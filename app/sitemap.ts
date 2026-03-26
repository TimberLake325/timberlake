import { MetadataRoute } from 'next';
import { dbConnect } from '@/lib/db';
import { BlogCategory, BlogPost, HomePage, Service, State } from '@/lib/model';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://timberlake.in';

    try {
        await dbConnect();

        const blogPosts = await BlogPost.find(
            { isPublished: true, isDeleted: false },
            'slug updatedAt category'
        )
            .populate('category', 'slug')
            .lean();

        const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post: any) => ({
            url: `${baseUrl}/blog/${post.category?.slug || 'uncategorized'}/${post.slug}`,
            lastModified: post.updatedAt || new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));

        const categories = await BlogCategory.find(
            { isActive: true, isDeleted: false },
            'slug updatedAt'
        ).lean();

        const categoryUrls: MetadataRoute.Sitemap = categories.map((cat: any) => ({
            url: `${baseUrl}/blog/${cat.slug}`,
            lastModified: cat.updatedAt || new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        }));

        const homePages = await HomePage.find({}, 'slug updatedAt').lean();
        const homePageUrls: MetadataRoute.Sitemap = homePages.map((page: any) => ({
            url: page.slug === 'home' || page.slug === '/' ? baseUrl : `${baseUrl}/${page.slug}`,
            lastModified: page.updatedAt || new Date(),
            changeFrequency: page.slug === 'home' ? 'daily' : 'monthly',
            priority: page.slug === 'home' ? 1.0 : 0.8,
        }));

        const services = await Service.find(
            { isActive: true, isDeleted: false },
            'slug updatedAt'
        ).lean();

        const serviceUrls: MetadataRoute.Sitemap = services.map((service: any) => ({
            url: `${baseUrl}/services/${service.slug}`,
            lastModified: service.updatedAt || new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        }));

        const states = await State.find(
            { isActive: true, isDeleted: false },
            'slug updatedAt'
        ).lean();

        const stateUrls: MetadataRoute.Sitemap = states.map((state: any) => ({
            url: `${baseUrl}/states/${state.slug}`,
            lastModified: state.updatedAt || new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        }));

        const staticPages: MetadataRoute.Sitemap = [
            { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
            { url: `${baseUrl}/services`, priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
            { url: `${baseUrl}/contact`, priority: 0.5, changeFrequency: 'yearly', lastModified: new Date() },
            { url: `${baseUrl}/faqs`, priority: 0.6, changeFrequency: 'monthly', lastModified: new Date() },
            { url: `${baseUrl}/privacy-policy`, priority: 0.3, changeFrequency: 'yearly', lastModified: new Date() },
            { url: `${baseUrl}/terms-of-service`, priority: 0.3, changeFrequency: 'yearly', lastModified: new Date() },
            { url: `${baseUrl}/site-map`, priority: 0.4, changeFrequency: 'monthly', lastModified: new Date() },
        ];

        const allRoutes = [...homePageUrls, ...staticPages, ...categoryUrls, ...blogUrls, ...serviceUrls, ...stateUrls];
        const uniqueRoutes = Array.from(
            new Map(allRoutes.map(item => [item.url, item])).values()
        );

        return uniqueRoutes;

    } catch (error) {
        console.error('Sitemap generation failed due to DB error:', error);

        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1.0,
            }
        ];
    }
}
export const revalidate = 3600;
