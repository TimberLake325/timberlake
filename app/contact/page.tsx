import { getContactData } from "@/actions/contactPage";
import ContactContent from "./content";
import { CONTACT_DATA } from "@/utils/fake-data/contact";
import { generatePageMetadata } from "@/lib/seo";
export const dynamic = "force-static";

const currentYear = new Date().getFullYear();

export async function generateMetadata() {
  const data = await getContactData();
  const meta = data?.metadata || CONTACT_DATA.metaData;

  return generatePageMetadata({
    title: meta?.title || 'Contact Timberlake - Medical Billing Experts',
    description: meta?.description || 'Ready to transform your practice? Connect with Timberlake\'s certified billing specialists for a strategy session.',
    keywords: meta?.keywords || ['Contact Timberlake', 'medical billing expert', 'revenue cycle management help'],
    path: '/contact',
    image: meta?.image || '/og-contact.jpg',
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: meta?.imageAlt || 'Contact Timberlake Support',
    ogTitle: meta?.ogTitle || meta?.title || 'Contact Timberlake - Medical Billing Experts',
    ogDescription: meta?.ogDescription || meta?.description || 'Schedule a strategy session with our billing specialists.',
    type: 'website',
    canonicalUrl: data?.metadata?.canonicalUrl || '/contact',
    twitterCard: 'summary_large_image',
    twitterTitle: meta?.twitterTitle || meta?.title || 'Contact Timberlake',
    twitterDescription: meta?.twitterDescription || meta?.description || 'Get in touch with our expert team.',
    twitterImage: meta?.twitterImage || meta?.image || '/twitter-contact.jpg',
    author: 'Timberlake Medical Billing',
    copyright: `© ${currentYear} Timberlake Medical Billing. All rights reserved.`,
  });
}

export default async function ContactPage() {
  const data = await getContactData();

  return <ContactContent data={data || {}} />;
}
