import { getFaqData } from "@/actions/faq";
import FaqContent from "./content";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const faqData = await getFaqData();
    if (!faqData?.metadata) {
        return {
            title: "Frequently Asked Questions | Timberlake",
            description: "Find answers to common questions about Timberlake's medical billing and RCM services."
        };
    }

    const { metadata } = faqData;
    return {
        title: metadata.title || "FAQ | Timberlake",
        description: metadata.description,
        keywords: metadata.keywords,
        openGraph: {
            title: metadata.ogTitle || metadata.title,
            description: metadata.ogDescription || metadata.description,
            images: metadata.ogImage ? [{ url: metadata.ogImage }] : [],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: metadata.twitterTitle || metadata.title,
            description: metadata.twitterDescription || metadata.description,
            images: metadata.twitterImage ? [metadata.twitterImage] : [],
        }
    };
}

const FAQPage = async () => {
    const faqData = await getFaqData();

    return (
        <FaqContent data={faqData} />
    );
};

export default FAQPage;