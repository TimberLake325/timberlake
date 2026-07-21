import PrivacyContent from "./content";
import { generatePageMetadata } from "@/lib/seo";
import { getPrivacyData } from "@/actions/privacyPage";
import { PRIVACY_DATA as fallbackData } from "@/utils/fake-data/privacy";
export const dynamic = "force-static";

export async function generateMetadata() {
    const { data } = await getPrivacyData();
    const source = data?.metadata || fallbackData.metaData;

    return generatePageMetadata({
        title: source.title || source.seoTitle || "Privacy Policy | Timberlake",
        description: source.description || source.seoDescription || "Privacy Policy | Timberlake",
        keywords: source.keywords,
        path: '/privacy-policy',
        image: source.image,
        imageAlt: source.imageAlt,
        ogTitle: source.ogTitle || source.title || "Privacy Policy | Timberlake",
        ogDescription: source.ogDescription || source.description || "Privacy Policy | Timberlake",
        canonicalUrl: source.canonicalUrl || '/privacy-policy'
    });
}

export default async function PrivacyPage() {
    const { data } = await getPrivacyData();
    return <PrivacyContent data={data?.pageData || {}} />;
}
