

import StateCard from "@/components/cards/stateCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageHeader from "@/components/ui/PageHeader";
import RichText from "@/components/ui/RichText";

const StatesContent = ({ data }: { data: any }) => {
    const { title, subtitle, description, states } = data;

    return (
        <div className="pb-24 bg-background min-h-screen">
            <Breadcrumb />

            <PageHeader
                title={title}
                description={subtitle}
                image="/images/state-bg.jpeg"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">

                {description && (
                    <RichText content={description} />
                )}

                {states && states.length > 0 && (
                    <StateCard states={states} />
                )}
            </div>
        </div>
    );
};

export default StatesContent;
