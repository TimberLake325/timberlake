import ServiceCategoryCard from "@/components/cards/ServiceCategoryCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageHeader from "@/components/ui/PageHeader";
import RichText from "@/components/ui/RichText";

const ServicesContent = ({ categories, allServices, servicesPage }: { categories: any[], allServices: any[], servicesPage: any }) => {

    return (
        <div className="pb-24 bg-background">
            <Breadcrumb />
            <PageHeader
                title={servicesPage.title}
                description={servicesPage.subtitle}
                image="/images/services-bg.jpeg"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 space-y-32">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => {
                        const subServices = allServices.filter((s) =>
                            s.category &&
                            (typeof s.category === "string"
                                ? s.category === category._id.toString()
                                : s.category.toString() === category._id.toString())
                        );
                        return (
                            <ServiceCategoryCard
                                key={category._id.toString()}
                                category={category}
                                subServices={subServices}
                            />
                        );
                    })}
                </div>
                <RichText content={servicesPage.description} />

            </div>
        </div>
    )
}

export default ServicesContent 