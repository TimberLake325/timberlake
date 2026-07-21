import RichText from "@/components/ui/RichText";
import PageHeader from "@/components/ui/PageHeader";

interface TermsContentProps {
    data?: {
        pageTitle?: string;
        pageSubTitle?: string;
        content?: string;
    };
}

const TermsContent = ({ data }: TermsContentProps = {}) => {
    const pageTitle = data?.pageTitle || "Terms & Conditions";
    const pageSubTitle = data?.pageSubTitle || "The master legal framework and rules of engagement for Timberlake's RCM services.";
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

export default TermsContent;