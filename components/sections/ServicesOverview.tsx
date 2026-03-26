'use client';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

import { CTALink } from "../ui/CTALink";
import Card from "../ui/Card";
import IconText from "../ui/IconText";
import SectionHeader from "../ui/SectionHeader";
import {
    LucideArrowRight,
    LucideCheckCircle2,
    LucideFileText,
    LucideShieldCheck,
    LucideBarChart3,
    LucideZap,
    LucideUsers,
    LucidePieChart
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
    LucideFileText,
    LucideBarChart3,
    LucideShieldCheck,
    LucideZap,
    LucideUsers,
    LucidePieChart,
    LucideCheckCircle2
};

interface ServiceItem {
    id?: string;
    title?: string;
    description?: string;
    slug?: string;
    icon?: string;
    badge?: string;
    benefits?: string[];
    ctaText?: string;
}

interface ServicesOverviewProps {
    data?: {
        header?: {
            subtitle?: string;
            title?: string;
            description?: string;
        };
        services?: ServiceItem[];
        footerCta?: {
            text?: string;
            href?: string;
            variant?: string;
            size?: string;
            className?: string;
        };

        title?: string;
        description?: string;
        logos?: any[];
        cta?: {
            label?: string;
            link?: string;
        };
    };
}

const DEFAULT_SERVICES: ServiceItem[] = [
    {
        id: "coding",
        title: "Medical Coding & Auditing",
        description: "Specialized coding solutions for complex specialties ensuring maximum reimbursements with accuracy.",
        slug: "medical-coding",
        icon: "LucideFileText",
        badge: "System Module",
        benefits: [
            "Specialty-specific coding expertise",
            "Regular compliance audits",
            "Coder education & training",
            "Real-time coding support"
        ],
        ctaText: "Explore Details"
    },
    {
        id: "rcm",
        title: "Revenue Cycle Management",
        description: "End-to-end RCM services from patient registration to final payment posting and reporting.",
        slug: "revenue-cycle",
        icon: "LucideBarChart3",
        badge: "System Module",
        benefits: [
            "End-to-end claim lifecycle",
            "Advanced analytics dashboard",
            "Performance benchmarking",
            "Custom workflow design"
        ],
        ctaText: "Explore Details"
    },
    {
        id: "compliance",
        title: "Compliance & Risk Management",
        description: "HIPAA-compliant workflows and regular audits to ensure adherence to regulatory standards.",
        slug: "compliance",
        icon: "LucideShieldCheck",
        badge: "System Module",
        benefits: [
            "HIPAA compliance monitoring",
            "Risk assessment reports",
            "Staff training programs",
            "Audit defense support"
        ],
        ctaText: "Explore Details"
    }
];

const getServiceIcon = (iconName?: string) => {
    if (!iconName) return LucideCheckCircle2;

    const IconComponent = iconMap[iconName];
    if (IconComponent) return IconComponent;

    const iconKey = Object.keys(iconMap).find(key =>
        key.toLowerCase().includes(iconName.toLowerCase()) ||
        iconName.toLowerCase().includes(key.toLowerCase())
    );

    return iconKey ? iconMap[iconKey] : LucideCheckCircle2;
};

export default function ServicesOverview({ data }: ServicesOverviewProps = {}) {

    const isNewStructure = data && !data.header && (data.title || data.description);

    const title = isNewStructure ? (data.title || "") : (data?.header?.title || "Revenue Cycle Solutions");
    const subtitle = isNewStructure ? "Our Core Expertise" : (data?.header?.subtitle || "Our Core Expertise");
    const description = isNewStructure ? (data.description || "") : (data?.header?.description ||
        "We bridge the gap between clinical documentation and financial reimbursement with end-to-end management built for high-performance practices.");

    const rawServices = isNewStructure
        ? (data.services || data.logos || [])
        : (data?.services || []);

    const services: ServiceItem[] = rawServices.map((s: any) => ({
        id: s._id || s.id || Math.random().toString(),
        title: s.title || s.name,
        description: s.excerpt || s.description || "",
        icon: s.icon,
        badge: s.status || "Active",
        benefits: s.keyFeatures || [],
        slug: s.slug || (s.name || "").toLowerCase().replace(/\s+/g, '-'),
        ctaText: "Explore Details",
        card_bg: s.card_bg,
        icon_bg: s.icon_bg
    }));

    if (services.length === 0) {

        return null;
    }

    const ctaText = isNewStructure ? (data.cta?.label || "View Full Capability Statement") : (data?.footerCta?.text || "View Full Capability Statement");
    const ctaHref = isNewStructure ? (data.cta?.link || "/services") : (data?.footerCta?.href || "/services");
    const ctaVariant = isNewStructure ? "outline" : (data?.footerCta?.variant || "outline");
    const ctaSize = isNewStructure ? "lg" : (data?.footerCta?.size || "lg");
    const ctaClassName = isNewStructure ? "min-w-[240px]" : (data?.footerCta?.className || "min-w-[240px]");

    return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    subtitle={subtitle}
                    title={title}
                    description={description}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => {
                        const Icon = getServiceIcon(service.icon);
                        const serviceId = service.id || `service-${Math.random().toString(36).substr(2, 9)}`;
                        const serviceSlug = service.slug || serviceId;
                        const benefits = service.benefits || [];
                        const ctaText = service.ctaText || "Explore Details";

                        return (
                            <Card
                                key={serviceId}
                                animate
                                hoverable
                                shadow="interactive"
                                className={cn(
                                    "flex flex-col group h-full border-t-4 border-t-transparent hover:border-t-primary",
                                    (service as any).card_bg && (service as any).card_bg.startsWith('bg-') ? (service as any).card_bg : ""
                                )}
                                style={(service as any).card_bg && !(service as any).card_bg.startsWith('bg-') ? { backgroundColor: (service as any).card_bg } : {}}
                            >

                                <div className="mb-6 flex items-center justify-between">
                                    <div
                                        className={cn(
                                            "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                                            (service as any).icon_bg && (service as any).icon_bg.startsWith('bg-') ? (service as any).icon_bg : "bg-primary/5 text-primary group-hover:bg-primary group-hover:text-background"
                                        )}
                                        style={(service as any).icon_bg && !(service as any).icon_bg.startsWith('bg-') ? { backgroundColor: (service as any).icon_bg } : {}}
                                    >
                                        <Icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest foreground/70/40">
                                        {service.badge || "System Module"}
                                    </span>
                                </div>

                                <h3 className="text-xl font-black mb-3 tracking-tight text-foreground group-hover:text-primary transition-colors">
                                    {service.title || "Service"}
                                </h3>

                                <div
                                    className="text-foreground/90 text-sm font-medium leading-relaxed mb-8 flex-grow"
                                    dangerouslySetInnerHTML={{ __html: service.description || "Professional service description" }}
                                />


                                {benefits.length > 0 && (
                                    <div className="space-y-4 mb-10">
                                        {benefits.map((benefit, index) => (
                                            <IconText
                                                key={`${serviceId}-benefit-${index}`}
                                                icon={LucideCheckCircle2}
                                                size="sm"
                                                variant="success"
                                                textClassName="text-foreground/80 font-semibold"
                                                text={benefit}
                                            />
                                        ))}
                                    </div>
                                )}

                                <div className="mt-auto pt-6 border-t border-border/50">
                                    <CTALink
                                        href={`/services/${serviceSlug}`}
                                        variant="ghost"
                                        className="p-0 h-auto font-black uppercase text-[11px] tracking-widest text-primary hover:gap-3 p-2"
                                    >
                                        <div className="flex items-center gap-1 group">
                                            <span>{ctaText}</span>
                                            <LucideArrowRight
                                                size={14}
                                                className="ml-2 group-hover:translate-x-1 transition-all duration-300"
                                            />
                                        </div>
                                    </CTALink>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-8 lg:mt-12 text-center flex flex-col items-center gap-6">
                    <div className="h-px w-24 bg-border" />
                    <CTALink
                        href={ctaHref}
                        size={ctaSize as any}
                        variant={ctaVariant as any}
                        className={ctaClassName}
                    >
                        {ctaText}
                    </CTALink>
                </div>
            </div>
        </section>
    );
}