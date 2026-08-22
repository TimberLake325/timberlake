import RichText from "@/components/ui/RichText";
import PageHeader from "@/components/ui/PageHeader";

interface SecurityContentProps {
    data?: {
        pageTitle?: string;
        pageSubTitle?: string;
        content?: string;
    };
}

const SecurityContent = ({ data }: SecurityContentProps = {}) => {
    const pageTitle = data?.pageTitle || "Security Policy";
    const pageSubTitle = data?.pageSubTitle || "Comprehensive technical and organizational measures to safeguard our infrastructure.";
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

export default SecurityContent;