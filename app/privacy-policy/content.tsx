import RichText from "@/components/ui/RichText";
import PageHeader from "@/components/ui/PageHeader";

interface PrivacyContentProps {
    data?: {
        pageTitle?: string;
        pageSubTitle?: string;
        content?: string;
    };
}

const PrivacyContent = ({ data }: PrivacyContentProps = {}) => {
    const pageTitle = data?.pageTitle || "Privacy Policy";
    const pageSubTitle = data?.pageSubTitle || "Our protocols for safeguarding your practice's information";
    const content = data?.content || "";

    return (
        <div className="pb-24 bg-background">
            <PageHeader
                title={pageTitle}
                description={pageSubTitle}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <RichText content={content} />
            </div>
        </div>
    );
};

export default PrivacyContent;