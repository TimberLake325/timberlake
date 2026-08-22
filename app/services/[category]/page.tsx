import ServiceCard from "@/components/cards/ServiceCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageHeader from "@/components/ui/PageHeader";
import RichText from "@/components/ui/RichText";
import { generatePageMetadata } from "@/lib/seo";
import { getCategoryBySlug } from "@/actions/servicesService";
import Link from "next/link";
import { notFound } from "next/navigation";
export const dynamic = "force-static";

type CategoryPageProps = {
    params: Promise<{
        category: string;
    }>;
};

export async function generateMetadata({ params }: CategoryPageProps) {
    const { category: categorySlug } = await params;
    const category = await getCategoryBySlug(categorySlug);

    if (!category) return {};

    return generatePageMetadata({
        title: category.metadata?.title || category.metadata?.seoTitle || `${category.name} | Timberlake`,
        description: category.metadata?.description || category.metadata?.seoDescription || category.excerpt || `Timberlake ${category.name} solutions.`,
        keywords: category.metadata?.keywords || [],
        path: `/services/${categorySlug}`,
        image: category.metadata?.image || category.image,
        imageAlt: category.metadata?.imageAlt || category.name,
        ogTitle: category.metadata?.ogTitle || category.metadata?.title || category.name,
        ogDescription: category.metadata?.ogDescription || category.metadata?.description || category.excerpt,
        canonicalUrl: category.metadata?.canonicalUrl || `/services/${categorySlug}`
    });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category: categorySlug } = await params;
    const categoryData = await getCategoryBySlug(categorySlug);

    if (!categoryData) {
        notFound();
    }

    return (
        <div className="pb-24 bg-background">
            <Breadcrumb />
            <PageHeader
                title={categoryData.name}
                description={categoryData.excerpt}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 lg:pt-6">
                <img src={categoryData.image || 'https://jrm3wrhwseeb6vic.public.blob.vercel-storage.com/uploads/blog/blog-1772119315104-106839338-Firefly_GeminiFlash_A%20modern%20medical%20billing%20office%20environment%2C%20clean%20and%20professional%20atmosphere%2C%20healt%20637578.png'} alt={categoryData.name} className="w-full object-cover mb-4 rounded-xl" />
                <div className="py-4 lg:py-6">
                    <RichText
                        content={categoryData.description}
                        className="foreground/70 text-xl font-medium leading-relaxed [&_p]:text-xl [&_p]:font-medium [&_p]:foreground/70 [&_p]:leading-relaxed"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {categoryData.categoryServices && categoryData.categoryServices.map((service: any) => (
                        <ServiceCard key={service._id} service={service} categorySlug={categoryData.slug} />
                    ))}
                </div>

                <div className="mt-32 p-12 md:p-16 bg-muted/30 rounded-[4rem] border-2 border-dashed border-primary/10 text-center space-y-8">
                    <h2 className="text-3xl font-black text-foreground uppercase italic tracking-tighter">Integrated {categoryData.name}</h2>
                    <p className="max-w-2xl mx-auto foreground/70 font-medium leading-relaxed">
                        These services do not operate in silos. At Timberlake, your dedicated billing pod integrates each of these modules to ensure no revenue is left on the table.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/contact" className="px-8 py-4 bg-primary text-background font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                            Request Module Demo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
