import Breadcrumb from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import RichText from "@/components/ui/RichText";
import { generatePageMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/actions/servicesService";
import {
    LucideActivity,
    LucideAward,
    LucideBarChart3,
    LucideCheckCircle2,
    LucideChevronRight,
    LucideClock,
    LucideDollarSign,
    LucideSettings,
    LucideShieldCheck,
    LucideTarget,
    LucideTrendingUp,
    LucideUsers,
    LucideZap
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
export const dynamic = "force-static";

interface ServicePageProps {
    params: Promise<{
        category: string;
        service: string;
    }>;
}

const IconMap: { [key: string]: any } = {
    TrendingUp: LucideTrendingUp,
    Activity: LucideActivity,
    BarChart: LucideBarChart3,
    Zap: LucideZap,
    Shield: LucideShieldCheck,
    Target: LucideTarget,
    Network: LucideActivity,
    Check: LucideCheckCircle2,
    DollarSign: LucideDollarSign,
    Users: LucideUsers,
    Clock: LucideClock,
    Award: LucideAward
};

const STATIC_FALLBACKS = {
    statistics: [
        { label: 'Denial Reduction', value: '35%', icon: 'TrendingUp' },
        { label: 'ROI Improvement', value: '15-22%', icon: 'DollarSign' },
        { label: 'Processing Time', value: '24-48h', icon: 'Clock' }
    ],
    keyFeatures: [
        'Root cause analysis',
        'Appeal tracking',
        'Payer behavior monitoring',
        'Automated workflows'
    ],
    clientTypes: ['Physicians & Mid-Level Providers', 'Health Systems', 'Private Practices'],
    specialties: ['Cardiology', 'Radiology', 'Neurology', 'Family Medicine'],
    ctaText: 'Request Technical Protocol',
    content: '<p>Our comprehensive approach ensures maximum reimbursement with minimal administrative burden.</p>'
};

export async function generateMetadata({ params }: ServicePageProps) {
    const { service: serviceSlug } = await params;
    const service = await getServiceBySlug(serviceSlug);

    if (!service) return {};

    return generatePageMetadata({
        title: service.metadata?.title || service.metadata?.seoTitle || `${service.title} | Timberlake`,
        description: service.metadata?.description || service.metadata?.seoDescription || service.excerpt || `Timberlake ${service.title} solutions.`,
        keywords: service.metadata?.keywords || [],
        path: `/services/${serviceSlug}`,
        image: service.metadata?.image || service.image,
        imageAlt: service.metadata?.imageAlt || service.title,
        ogTitle: service.metadata?.ogTitle || service.metadata?.title || service.title,
        ogDescription: service.metadata?.ogDescription || service.metadata?.description || service.excerpt,
        canonicalUrl: service.metadata?.canonicalUrl || `/services/${serviceSlug}`
    });
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { category: categorySlug, service: serviceSlug } = await params;
    const serviceData = await getServiceBySlug(serviceSlug);

    if (!serviceData) {
        notFound();
    }

    const statistics = serviceData.statistics?.length > 0
        ? serviceData.statistics
        : STATIC_FALLBACKS.statistics;

    const keyFeatures = serviceData.keyFeatures?.length > 0
        ? serviceData.keyFeatures
        : STATIC_FALLBACKS.keyFeatures;

    const clientTypes = serviceData.clientTypes?.length > 0
        ? serviceData.clientTypes
        : STATIC_FALLBACKS.clientTypes;

    const specialties = serviceData.specialties?.length > 0
        ? serviceData.specialties
        : STATIC_FALLBACKS.specialties;

    const ctaText = serviceData.ctaText || STATIC_FALLBACKS.ctaText;
    const content = serviceData.content || STATIC_FALLBACKS.content;
    const ctaLink = serviceData.ctaLink || "/contact";

    const firstStat = statistics[0];

    return (
        <div className="pb-24 bg-background">
            <Breadcrumb />

            <PageHeader
                title={serviceData.title}
                description=""
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    <div className="lg:col-span-8 space-y-16">
                        <section className="space-y-8">

                            <div className=" overflow-hidden ">
                                <img src={serviceData.image || 'https://jrm3wrhwseeb6vic.public.blob.vercel-storage.com/uploads/blog/blog-1772119315104-106839338-Firefly_GeminiFlash_A%20modern%20medical%20billing%20office%20environment%2C%20clean%20and%20professional%20atmosphere%2C%20healt%20637578.png'} alt={serviceData.title} className="w-full object-cover mb-4 rounded-xl" />
                            </div>
                            <h2 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">
                                Precision {serviceData.title}
                            </h2>
                            <div className="foreground/70 text-xl font-medium leading-[1.8]">
                                <RichText content={serviceData.description} />
                            </div>
                        </section>


                        {/* {
                            content &&
                            <section className="bg-primary/5 rounded-[3rem] p-10 md:p-16 border border-primary/10 relative overflow-hidden">
                                <LucideTarget className="absolute -right-10 -bottom-10 text-primary/5 w-64 h-64 rotate-12" />
                                <h3 className="text-2xl font-black mb-12 italic uppercase tracking-tight relative z-10">Implementation Logic</h3>
                                <div className="relative z-10 prose prose-slate max-w-none">
                                    <RichText content={content} />
                                </div>
                            </section>
                        } */}


                        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 border-2 border-primary/5 rounded-[2.5rem] bg-background space-y-4 shadow-sm hover:border-primary/20 transition-all">
                                <LucideShieldCheck className="text-primary" size={32} />
                                <h4 className="font-black uppercase italic tracking-tight">Audit Protection</h4>
                                <p className="text-sm foreground/70 font-medium leading-relaxed">
                                    Every claim processed via {serviceData.title.toLowerCase()} is internally audited to meet the highest OIG and HIPAA standards.
                                </p>
                            </div>
                            <div className="p-8 border-2 border-primary/5 rounded-[2.5rem] bg-background space-y-4 shadow-sm hover:border-primary/20 transition-all">
                                <LucideZap className="text-primary" size={32} />
                                <h4 className="font-black uppercase italic tracking-tight">Rapid Response</h4>
                                <p className="text-sm foreground/70 font-medium leading-relaxed">
                                    Our infrastructure guarantees a 24-48 hour turnaround on most claim submissions and follow-ups.
                                </p>
                            </div>
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/50">Client Focus</h4>
                                <div className="flex flex-wrap gap-2">
                                    {clientTypes.map((type: string, i: number) => (
                                        <span key={i} className="px-4 py-2 bg-muted/50 rounded-xl text-xs font-bold text-foreground/70 uppercase tracking-tight italic">
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/50">Clinical Scope</h4>
                                <div className="flex flex-wrap gap-2">
                                    {specialties.map((spec: string, i: number) => (
                                        <span key={i} className="px-4 py-2 bg-primary/5 text-primary rounded-xl text-xs font-bold uppercase tracking-tight italic">
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 h-fit">
                        <div className="bg-foreground text-background p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] group-hover:bg-primary/40 transition-all duration-500" />
                            <div className="relative z-10 space-y-8">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Performance Benchmarks</p>

                                <div className="space-y-12">
                                    {statistics.map((stat: any, index: number) => {
                                        const Icon = IconMap[stat.icon] || LucideTrendingUp;
                                        return (
                                            <div key={index} className="space-y-2">
                                                <h3 className="text-xl font-black italic uppercase leading-none opacity-60 text-background/80">{stat.label}</h3>
                                                <div className="text-5xl font-black text-primary tabular-nums flex items-baseline gap-2">
                                                    {stat.value}
                                                    <Icon size={20} className="text-primary/50" />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <p className="text-background/40 text-[10px] font-bold leading-relaxed pt-4 border-t border-white/10 uppercase tracking-widest">
                                    Validated via Timberlake performance metrics audits.
                                </p>

                                <div className="pt-4">
                                    <Link href={ctaLink} className="w-full">
                                        <Button className="w-full h-16 bg-primary hover:bg-background hover:text-primary text-background font-black uppercase tracking-widest text-xs rounded-2xl transition-all border-none">
                                            {ctaText}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="bg-background border-2 border-primary/5 p-10 rounded-[2.5rem] space-y-8 shadow-sm">
                            <h4 className="font-black uppercase italic tracking-tight foreground/70/40 text-[10px] tracking-[0.2em]">Distinctive Advantages</h4>
                            <ul className="space-y-5">
                                {keyFeatures.map((benefit: string, i: number) => (
                                    <li key={i} className="flex items-start gap-4 text-sm font-bold text-foreground italic group">
                                        <div className="mt-1 flex items-center justify-center w-5 h-5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                                            <LucideCheckCircle2 size={12} strokeWidth={3} />
                                        </div>
                                        <span className="leading-snug">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link href={`/services`} className="group flex items-center justify-between p-8 bg-muted/30 rounded-4xl hover:bg-primary/5 transition-all border border-transparent hover:border-primary/10">
                            <span className="text-[10px] font-black uppercase tracking-widest foreground/70/60 group-hover:text-primary transition-colors">
                                Return to All Services
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center foreground/70/20 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                                <LucideChevronRight size={16} />
                            </div>
                        </Link>
                    </aside>
                </div>
            </div>
        </div>
    );
}