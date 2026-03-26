
import { getAboutPageData } from "@/actions/aboutPage";
import { generatePageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import AboutContent from "./content";

const currentYear = new Date().getFullYear();
export const dynamic = "force-static";

export async function generateMetadata() {
    const response = await getAboutPageData();
    const data = response.success ? response.data : null;
    const metaData = data?.metadata || data?.metaData;

    return generatePageMetadata({
        title: metaData?.title || 'About Timberlake',
        description: metaData?.description || 'Partners in your practice\'s growth. We combine medical billing expertise with personal dedication.',
        keywords: metaData?.keywords || ['About Timberlake', 'medical billing company', 'revenue cycle management', 'healthcare billing services', 'medical billing specialists'],
        path: '/about',

        image: metaData?.image || '/og-about-image.jpg',
        imageWidth: metaData?.imageWidth || 1200,
        imageHeight: metaData?.imageHeight || 630,
        imageAlt: metaData?.imageAlt || 'Timberlake Medical Billing - About Us',
        ogTitle: metaData?.ogTitle || metaData?.title || 'About Timberlake',
        ogDescription: metaData?.ogDescription || metaData?.description || 'Partners in your practice\'s growth. We combine medical billing expertise with personal dedication.',
        ogSiteName: 'Timberlake Medical Billing',
        ogLocale: metaData?.ogLocale || 'en_US',
        type: metaData?.ogType || 'website',

        canonicalUrl: metaData?.canonicalUrl || '/about',

        robots: {
            index: metaData?.robotsIndex !== undefined ? metaData.robotsIndex : true,
            follow: metaData?.robotsFollow !== undefined ? metaData.robotsFollow : true,
            maxImagePreview: 'large' as const,
            maxSnippet: -1,
            maxVideoPreview: -1,
        },

        twitterCard: (metaData?.twitterCard as any) || 'summary_large_image',
        twitterSite: metaData?.twitterSite || '@timberlake_med',
        twitterCreator: metaData?.twitterCreator || '@timberlake_med',
        twitterTitle: metaData?.twitterTitle || metaData?.title || 'About Timberlake',
        twitterDescription: metaData?.twitterDescription || metaData?.description || 'Partners in your practice\'s growth. We combine medical billing expertise with personal dedication.',
        twitterImage: metaData?.twitterImage || metaData?.image || '/og-about-image.jpg',
        twitterImageAlt: metaData?.imageAlt || 'Timberlake Medical Billing - About Us',

        author: 'Timberlake Medical Billing',
        copyright: `© ${currentYear} Timberlake Medical Billing. All rights reserved.`,
        generator: 'Next.js',
        applicationName: 'Timberlake Medical Billing',
        themeColor: metaData?.themeColor || '#7c3aed',
        colorScheme: 'light',
        viewport: 'width=device-width, initial-scale=1.0, maximum-scale=5.0',

        formatDetection: {
            telephone: false,
            date: false,
            address: false,
            email: false,
        },
        appleWebAppCapable: true,
        appleStatusBarStyle: 'default',
        appleTitle: metaData?.appleTitle || 'About Timberlake',

        msapplicationTileColor: metaData?.msapplicationTileColor || '#7c3aed',
        msapplicationTileImage: '/mstile-144x144.png',
        msapplicationConfig: '/browserconfig.xml',

        structuredData: {
            '@context': 'https://schema.org',
            '@type': 'MedicalBusiness',
            'name': metaData?.title || 'About Timberlake',
            'description': metaData?.description || 'Partners in your practice\'s growth. We combine medical billing expertise with personal dedication.',
            'url': '/about',
            'medicalSpecialty': 'Medical Billing and Revenue Cycle Management',
            'knowsAbout': ['Medical Billing', 'Revenue Cycle Management', 'HIPAA Compliance', 'Credentialing'],
            'areaServed': 'US',
            'publisher': {
                '@type': 'Organization',
                'name': 'Timberlake Medical Billing',
                'logo': {
                    '@type': 'ImageObject',
                    'url': 'https://timberlake.com/logo.png'
                }
            }
        }
    });
}

export default async function AboutPage() {
    const response = await getAboutPageData();
    const data = response.success ? response.data : null;

    if (!data) {
        notFound()
    }
    return (
        <AboutContent aboutData={data.pageData} />
    );
}
