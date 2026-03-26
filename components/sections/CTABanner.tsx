'use client';

import { CTALink } from "../ui/CTALink";
import { LucideArrowRight, LucideCheckCircle2, LucideShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ComponentType<any>> = {
    LucideArrowRight,
    LucideCheckCircle2,
    LucideShieldCheck
};

interface TrustPoint {
    id?: string;
    text?: string;
    icon?: string;
    color?: string;
}

interface CTABannerProps {
    data?: {
        kicker?: {
            text?: string;
            icon?: string;
            variant?: string;
        };
        headline?: {
            mainText?: string;
            highlightedText?: string;
            highlightStyle?: string;
            highlightColor?: string;
        };
        description?: string;
        primaryCta?: {
            text?: string;
            href?: string;
            size?: string;
            className?: string;
            icon?: string;
        };
        trustPoints?: TrustPoint[];
        background?: {
            overlayColor?: string;
            blobColor?: string;
        };

        title?: string;
        subtitle?: string;
        points?: any[];
    };
}

const DEFAULT_TRUST_POINTS: TrustPoint[] = [
    {
        id: "trust-1",
        text: "15-Minute Briefing",
        icon: "LucideCheckCircle2",
        color: "accent"
    },
    {
        id: "trust-2",
        text: "HIPAA Secure Process",
        icon: "LucideCheckCircle2",
        color: "accent"
    },
    {
        id: "trust-3",
        text: "No-Obligation Analysis",
        icon: "LucideCheckCircle2",
        color: "accent"
    }
];

const getIcon = (iconName?: string) => {
    if (!iconName) return LucideArrowRight;

    const IconComponent = iconMap[iconName];
    if (IconComponent) return IconComponent;

    const iconKey = Object.keys(iconMap).find(key =>
        key.toLowerCase().includes(iconName.toLowerCase()) ||
        iconName.toLowerCase().includes(key.toLowerCase())
    );

    return iconKey ? iconMap[iconKey] : LucideArrowRight;
};

const getIconColorClass = (color?: string) => {
    switch (color) {
        case 'primary':
            return 'text-primary';
        case 'accent':
            return 'text-accent';
        case 'white':
            return 'text-background';
        default:
            return 'text-accent';
    }
};

export default function CTABanner({ data }: CTABannerProps = {}) {

    const isNewStructure = data && !data.headline && (data.title || data.subtitle);

    const kickerText = isNewStructure ? data.subtitle : (data?.kicker?.text || "Secure Practice Evaluation");
    const KickerIcon = getIcon((data as any)?.kicker?.icon);
    const kickerVariant = (data as any)?.kicker?.variant || "accent";
    const kickerIconColorClass = getIconColorClass(kickerVariant);

    const mainText = isNewStructure ? data.title : (data?.headline?.mainText || "Ready to reclaim your");
    const highlightedText = isNewStructure ? "" : (data?.headline?.highlightedText || "revenue potential?");
    const highlightStyle = isNewStructure ? "" : (data?.headline?.highlightStyle || "italic");
    const highlightColor = isNewStructure ? "accent" : (data?.headline?.highlightColor || "accent");

    const descriptionText = isNewStructure ? data.description : (data?.description ||
        "Join 500+ specialized providers who have eliminated billing backlogs and increased their first-pass claim acceptance.");

    const ctaText = isNewStructure ? (data as any).cta?.label : (data?.primaryCta?.text || "Schedule Free Audit");
    const ctaHref = isNewStructure ? (data as any).cta?.link : (data?.primaryCta?.href || "/contact");
    const ctaSize = (data as any)?.primaryCta?.size || "lg";

    const CtaIcon = getIcon((data as any)?.primaryCta?.icon);

    const trustPoints = isNewStructure ? ((data as any).points || []).map((p: any) => ({ text: p.label, icon: "LucideCheckCircle2", color: "accent" })) : (data?.trustPoints || DEFAULT_TRUST_POINTS);

    const overlayColor = (data as any)?.background?.overlayColor || "bg-gradient-to-l from-black to-transparent";
    const blobColor = (data as any)?.background?.blobColor || "bg-accent/20";

    return (
        <section className="pt-12 lg:pt-24 relative overflow-hidden">
            <div className="w-full mx-auto  ">
                <div className="relative bg-primary p-8 md:p-20 text-center text-background shadow-2xl shadow-primary/40 overflow-hidden"
                    style={{
                        backgroundImage: "url('/images/cta-banner-bg.jpeg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}
                >


                    <div className={`absolute top-0 right-0  h-full  pointer-events-none w-full bg-linear-to-r from-transparent via-white/30 to-white/50    `} />
                    <div className={`absolute -bottom-24 -left-24 w-64 h-64 ${blobColor} rounded-full blur-3xl opacity-50`} />

                    <div className="relative z-10 space-y-10">

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/10 border border-white/20 backdrop-blur-sm"
                        >
                            <KickerIcon size={14} className={kickerIconColorClass} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
                                {kickerText}
                            </span>
                        </motion.div>

                        <div className="space-y-6">

                            {/* text-4xl md:text-5xl font-black   leading-[0.95] tracking-tighter bg-primary/10 p-2 rounded-lg bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent */}
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] max-w-4xl mx-auto bg-linear-to-r from-foreground to-primary bg-clip-text text-transparent">
                                {mainText}{" "}
                                {highlightedText}
                                <span className={`text-${highlightColor} ${highlightStyle}`}>
                                </span>
                            </h2>
                            <div
                                className="text-lg md:text-xl text-foreground/80 font-medium max-w-2xl mx-auto leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: descriptionText || "" }}
                            />
                        </div>


                        <div className="flex flex-col items-center gap-6">
                            <div className=" ">
                                <CTALink
                                    href={ctaHref}
                                    size={ctaSize as any}
                                    className={`bg-background text-primary hover:bg-primary hover:text-background transition-all duration-300 gap-3 px-12 text-xl font-black`}
                                    icon={CtaIcon}
                                >
                                    {ctaText}
                                </CTALink>
                            </div>


                            {trustPoints.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                                    {trustPoints.map((point: any) => {
                                        const PointIcon = getIcon(point.icon);
                                        const iconColorClass = getIconColorClass(point.color);
                                        const pointId = point.id || `trust-${point.text}`;

                                        return (
                                            <div key={pointId} className="flex items-center gap-2 text-foreground/90 bg-background px-2 py-1 rounded-xl">
                                                <PointIcon size={14} className={iconColorClass} />
                                                <span className="text-[11px] font-bold uppercase tracking-widest">
                                                    {point.text || "Trust Point"}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}