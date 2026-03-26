import { Metadata } from 'next';
import SitemapContent from './content';
import { generatePageMetadata } from '@/lib/seo';
import { getSitemapPage } from '@/actions/sitemap';

export async function generateMetadata(): Promise<Metadata> {
    const { data } = await getSitemapPage();

    const metadata = data?.metadata || {};
    const {
        title,
        description,
        keywords,
        image,
        ogTitle,
        ogDescription,
        canonicalUrl,
        robots,
        jsonLd,
        publishedDate,
        lastUpdatedDate,
        subHeading,
        heading,
        ogImage,
        ogType,
        slug,
    } = metadata;

    return generatePageMetadata({
        title: title || heading || "Sitemap",
        description:
            description || subHeading || "Timberlake Sitemap",
        path: slug || "/site-map",
        keywords: keywords
            ? (typeof keywords === 'string' ? keywords.split(',') : keywords)
                ?.map((k: string) => k.trim())
                .filter(Boolean)
            : ["sitemap"],
        type: ogType || "website",
        image: image || ogImage || null,
        ogTitle: ogTitle || heading || "Sitemap",
        ogDescription:
            ogDescription ||
            description ||
            subHeading ||
            "Sitemap",
        canonicalUrl: canonicalUrl || "/site-map",
        robots: robots || "index, follow",
    });
}

export default async function Sitemap() {
    const { data } = await getSitemapPage();

    return (
        <SitemapContent data={data || { sections: [], metadata: {} }} />
    )
}
