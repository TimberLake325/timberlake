import Hero from "@/components/sections/Hero";
import Certifications from "@/components/sections/Certifications";
import CompanyStats from "@/components/sections/CompanyStats";
import ServicesOverview from "@/components/sections/ServicesOverview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CTABanner from "@/components/sections/CTABanner";
import InsurancePayers from "@/components/sections/InsurancePayers";
import AppointmentBooking from "@/components/sections/AppointmentBooking";
import { HOME_DATA } from "@/utils/fake-data/home";
import { generatePageMetadata } from "@/lib/seo";
import { getHomePage } from "@/actions/homePage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const result = await getHomePage();
  const homePageData = result?.data;
  const seo = homePageData?.metadata;

  return generatePageMetadata({
    title: seo?.title || HOME_DATA?.metaData?.title || 'Medical Credentialing & Billing Services | TimberLake Services LLC',
    description: seo?.description || HOME_DATA?.metaData?.description || 'TimberLake Services LLC provides expert provider credentialing, CAQH management, and medical billing solutions in South Carolina. Get your practice enrolled today.',
    keywords: seo?.keywords || HOME_DATA?.metaData?.keywords || ['medical billing', 'RCM', 'HIPAA compliant'],
    path: '/',
    image: seo?.image || HOME_DATA?.metaData?.image || '/og-image.jpg',
  });
}

export default async function Home() {
  const result = await getHomePage();
  const homePageData = result?.data;

  const getSection = (type: string) => {
    return homePageData?.sections?.find((s: any) => s.type === type)?.content;
  };

  const heroData = getSection('HERO');
  const servicesData = getSection('WHAT_WE_DO');
  const whyChooseUsData = getSection('WHY_CHOOSE_US');
  const certificationsData = getSection('CERTIFICATIONS');
  const statsData = getSection('COMPANY_STATS');
  const payersData = getSection('INSURANCE_PAYERS');
  const bookingData = getSection('APPOINTMENT_BOOKING');
  const ctaBannerData = getSection('CTA_BANNER');

  return (
    <div className="flex flex-col">
      {/* <Hero data={heroData || HOME_DATA.heroSection} />
      <Certifications data={certificationsData || HOME_DATA.certifications} />
      <CompanyStats data={statsData || HOME_DATA.companyStats} />
      <ServicesOverview data={servicesData || HOME_DATA.servicesOverview} />
      <WhyChooseUs data={whyChooseUsData || HOME_DATA.whyChooseUs} />
      <InsurancePayers data={payersData || HOME_DATA.insurancePayers} />
      <AppointmentBooking data={bookingData || HOME_DATA.appointmentBooking} />
      <CTABanner data={ctaBannerData || HOME_DATA.ctaBanner} /> */}
    </div>
  );
}
