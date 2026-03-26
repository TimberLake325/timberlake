import { getStatesPageData } from "@/actions/statesPage";
import { generatePageMetadata } from "@/lib/seo";
import StatesContent from "./content";
export const dynamic = "force-static";

export async function generateMetadata() {
    const response = await getStatesPageData();
    const data = response.success ? response.data : null;
    const metaData = data?.metadata;

    return generatePageMetadata({
        title: metaData?.title || 'National Coverage | Timberlake',
        description: metaData?.description || 'Explore Timberlake\'s RCM and medical billing services available in all 50 states.',
        keywords: metaData?.keywords || ['medical billing', 'RCM', 'HIPAA compliant', 'state billing'],
        path: '/states',
        image: metaData?.image || '/og-states.jpg',
        ogTitle: metaData?.ogTitle || metaData?.title || 'National Coverage',
        ogDescription: metaData?.ogDescription || metaData?.description || 'Explore our state-specific regulatory hubs.',
        canonicalUrl: metaData?.canonicalUrl || '/states',
        robots: {
            index: metaData?.robotsIndex ?? true,
            follow: metaData?.robotsFollow ?? true,
        }
    });
}

export default async function StatesPage() {
    const response = await getStatesPageData();

    if (!response.success && !response.data) {
        return (
            <StatesContent
                data={{
                    title: "National Coverage",
                    subtitle: "Timberlake provides specialized RCM and HIPAA-compliant billing infrastructure in all 50 states.",
                    description: "",
                    states: []
                }}
            />
        );
    }

    const data = response.data;

    return (
        <StatesContent data={data.pageData} />
    );
}