import TermsContent from "./content";
import { generatePageMetadata } from "@/lib/seo";
import { getTermsData } from "@/actions/termsPage";
import { TERMS_DATA as fallbackData } from "@/utils/fake-data/terms";

export const dynamic = 'force-static';

export async function generateMetadata() {
    const { data } = await getTermsData();
    const source = data?.metadata || fallbackData.metaData;

    return generatePageMetadata({
        title: source.title || source.seoTitle,
        description: source.description || source.seoDescription,
        keywords: source.keywords,
        path: '/terms-conditions',
        image: source.image,
        imageAlt: source.imageAlt,
        ogTitle: source.ogTitle || source.title,
        ogDescription: source.ogDescription || source.description,
        canonicalUrl: source.canonicalUrl || '/terms-conditions'
    });
}

export default async function TermsPage() {
    const { data } = await getTermsData();

    return <TermsContent data={data?.pageData || {}} />;
}