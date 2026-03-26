import { getServicePageData } from "@/actions/servicesService";
import { generatePageMetadata } from "@/lib/seo";
import ServicesContent from "./content";
export const dynamic = "force-static";

export async function generateMetadata() {
    const { servicesPage } = await getServicePageData();

    return generatePageMetadata({
        title: servicesPage.metadata.title || servicesPage.metadata.seoTitle || "Services | Timberlake",
        description: servicesPage.metadata.description || servicesPage.metadata.seoDescription || "Services | Timberlake",
        keywords: servicesPage.metadata.keywords,
        path: '/services',
        image: servicesPage.metadata.image,
        imageAlt: servicesPage.metadata.imageAlt,
        ogTitle: servicesPage.metadata.ogTitle || servicesPage.metadata.title || "Services | Timberlake",
        ogDescription: servicesPage.metadata.ogDescription || servicesPage.metadata.description || "Services | Timberlake",
        canonicalUrl: servicesPage.metadata.canonicalUrl || '/services'
    });
}

export default async function ServicesPage() {
    const { categories, allServices, servicesPage } = await getServicePageData();
 
    return (
        <ServicesContent
            categories={categories}
            allServices={allServices}
            servicesPage={servicesPage.hero} />
    );
}
