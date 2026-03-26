import HIPAAContent from "./content";
import { generatePageMetadata } from "@/lib/seo";
import { getHipaaData } from "@/actions/hipaaPage";
import { HIPAA_DATA as fallbackData } from "@/utils/fake-data/hippa";
export const dynamic = "force-static";

export async function generateMetadata() {
    const { data } = await getHipaaData();
    const source = data?.metadata || fallbackData.metaData;

    return generatePageMetadata({
        title: source.title || source.seoTitle,
        description: source.description || source.seoDescription,
        keywords: source.keywords,
        path: '/hipaa-compliance',
        image: source.image,
        imageAlt: source.imageAlt,
        ogTitle: source.ogTitle || source.title,
        ogDescription: source.ogDescription || source.description,
        canonicalUrl: source.canonicalUrl || '/hipaa-compliance'
    });
}

export default async function HIPAAPage() {
    const { data } = await getHipaaData();

    return <HIPAAContent data={data?.pageData || {}} />;
}