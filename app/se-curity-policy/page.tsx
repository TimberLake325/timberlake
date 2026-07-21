import SecurityContent from "./content";
import { generatePageMetadata } from "@/lib/seo";
import { getSecurityData } from "@/actions/securityPage";
import { SECURITY_DATA as fallbackData } from "@/utils/fake-data/security";
export const dynamic = "force-static";

export async function generateMetadata() {
    const { data } = await getSecurityData();
    const source = data?.metadata || fallbackData.metaData;

    return generatePageMetadata({
        title: source.title || source.seoTitle,
        description: source.description || source.seoDescription,
        keywords: source.keywords,
        path: '/security-policy',
        image: source.image,
        imageAlt: source.imageAlt,
        ogTitle: source.ogTitle || source.title,
        ogDescription: source.ogDescription || source.description,
        canonicalUrl: source.canonicalUrl || '/security-policy'
    });
}

export default async function SecurityPage() {
    const { data } = await getSecurityData();

    return <SecurityContent data={data?.pageData || {}} />;
}