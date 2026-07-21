import PageHeader from "@/components/ui/PageHeader";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import LeadershipSection from "@/components/about/LeadershipSection";
import ComplianceSection from "@/components/about/ComplianceSection";
import StatsSection from "@/components/about/StatsSection";
import ProcessSection from "@/components/about/ProcessSection";
import TestimonialsSection from "@/components/about/TestimonialsSection";
import CTABanner from "@/components/sections/CTABanner";

const AboutContent = ({ aboutData }: { aboutData: any }) => {
    return (
        <div className="pb-24">
            <PageHeader
                title={aboutData.pageHeader.title}
                description={aboutData.pageHeader.description}
                image="/images/about-bg.jpeg"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <StatsSection stats={aboutData.stats} />

                <LeadershipSection
                    title={aboutData.leadership.title}
                    subtitle={aboutData.leadership.subtitle}
                    members={aboutData.leadership.members}
                />

                <ComplianceSection
                    title={aboutData.compliance.title}
                    badge={aboutData.compliance.badge}
                    badgeIcon={aboutData.compliance.badgeIcon}
                    quote={aboutData.compliance.quote}
                    certifications={aboutData.compliance.certifications}
                    verificationCode={aboutData.compliance.verificationCode}
                    watermarkIcon={aboutData.compliance.watermarkIcon}
                />

                <ProcessSection steps={aboutData.process} />

                <TestimonialsSection testimonials={aboutData.testimonials} />

                <MissionVisionSection
                    mission={aboutData.missionVision.mission}
                    vision={aboutData.missionVision.vision}
                />

            </div>

            <CTABanner />
        </div>
    );
};

export default AboutContent;