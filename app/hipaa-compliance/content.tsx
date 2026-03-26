import RichText from "@/components/ui/RichText";
import PageHeader from "@/components/ui/PageHeader";

interface HIPAAContentProps {
    data?: {
        pageTitle?: string;
        pageSubTitle?: string;
        content?: string;
    };
}

const HIPAAContent = ({ data }: HIPAAContentProps = {}) => {
    const pageTitle = data?.pageTitle || "HIPAA Compliance";
    const pageSubTitle = data?.pageSubTitle || "Our rigorous commitment to protecting patient privacy and ensuring multi-layer data security.";
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

export default HIPAAContent;