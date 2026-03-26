'use client';

import {
    LucideShieldCheck,
    LucideAward,
    LucideLock,
    LucideCheckCircle2,
    LucideShield
} from "lucide-react";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import SectionHeader from "../ui/SectionHeader";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const iconMap: Record<string, React.ComponentType<any>> = {
    LucideShieldCheck,
    LucideAward,
    LucideLock,
    LucideCheckCircle2,
    LucideShield
};

interface CertificationItem {
    id?: string;
    name?: string;
    description?: string;
    iconName?: string;
    tag?: string;
    tagVariant?: string;
    image?: string;
}

interface CertificationsData {
    heading?: {
        subheading?: string;
        title?: string;
        description?: string;
    };
    certifications?: CertificationItem[];

    title?: string;
    subtitle?: string;
    description?: string;
    bgImage?: string;
    items?: CertificationItem[];
}

interface CertificationsProps {
    data?: CertificationsData;
}

export default function Certifications({ data }: CertificationsProps = {}) {
    const sectionRef = useRef(null);

    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const isNewStructure = data && !data.heading && (data.title || data.subtitle || data.description || data.bgImage);

    const title = isNewStructure ? data.title : (data?.heading?.title || "Enterprise Standards");
    const subheading = isNewStructure ? data.subtitle : (data?.heading?.subheading || "Compliance Framework");
    const description = isNewStructure ? (data.description || "") : (data?.heading?.description || "");
    const bgImage = data?.bgImage;
    const displayCerts = isNewStructure ? (data.items || []) : (data?.certifications || []);

    const getIcon = (iconName?: string) => {
        if (!iconName) return LucideShieldCheck;

        const IconComponent = iconMap[iconName];
        if (IconComponent) return IconComponent;

        const iconKey = Object.keys(iconMap).find(key =>
            key.toLowerCase().includes(iconName.toLowerCase()) ||
            iconName.toLowerCase().includes(key.toLowerCase())
        );

        return iconKey ? iconMap[iconKey] : LucideShieldCheck;
    };

    const getTagClasses = (variant?: string) => {
        switch (variant) {
            case 'success':
                return 'bg-emerald-500/5 text-emerald-600 border-emerald-500/10';
            case 'info':
                return 'bg-blue-500/5 text-blue-600 border-blue-500/10';
            case 'warning':
                return 'bg-amber-500/5 text-amber-600 border-amber-500/10';
            case 'secondary':
                return 'bg-secondary/5 foreground/70 border-secondary/10';
            default:
                return 'bg-primary/5 text-primary border-primary/10';
        }
    };

    return (
        <section className="py-10 bg-muted/40 border-y border-border/50 mb-12 md:mb-16 mt-10 lg:mt-16"
            style={bgImage ? {
                backgroundImage: `url('${bgImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            } : {
                backgroundImage: "url('/images/certifications-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-between gap-8 md:gap-4">


                    <div className="shrink-0  md:text-left">

                        <SectionHeader
                            title={title as string}
                            subtitle={subheading}
                            description={description}
                            centered={false}
                        />

                    </div>

                    <div className="flex flex-wrap justify-start lg:justify-start gap-6 md:gap-12 flex-1">


                        {displayCerts.map((cert, index) => {
                            const IconComponent = getIcon(cert.iconName);
                            const tagClasses = getTagClasses(cert.tagVariant);
                            const certId = cert.id || `cert-${index}`;

                            return (
                                <>
                                    {cert.image ? (
                                        <Image src={cert.image} alt={cert.name as string} className="w-[160px] lg:w-[200px] rounded-full object-contain hover:-translate-y-2 transition-all duration-300 cursor pointer" height={160} width={160} />
                                        // <img src={cert.image} alt={cert.name as string} className="w-[160px] lg:w-[200px] rounded-full object-contain hover:-translate-y-2 transition-all duration-300 cursor pointer" />
                                    ) : (
                                        <IconComponent
                                            className="foreground/70 group-hover:text-primary transition-colors"
                                            size={24}
                                        />
                                    )}

                                    {/* <div
                                        key={certId}
                                        className="group flex items-center gap-4 transition-all duration-300"
                                    >

                                        <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-background border border-border shadow-sm group-hover:border-primary/30 group-hover:shadow-md transition-all overflow-hidden">
                                            {cert.image ? (
                                                <img src={cert.image} alt={cert.name} className="w-full h-full object-contain p-1" />
                                            ) : (
                                                <IconComponent
                                                    className="foreground/70 group-hover:text-primary transition-colors"
                                                    size={24}
                                                />
                                            )}

                                            <div className="absolute -top-1 -right-1 bg-emerald-500 rounded-full border-2 border-white p-0.5">
                                                <LucideCheckCircle2 className="text-background" size={10} strokeWidth={3} />
                                            </div>
                                        </div>

                                        <div className="text-left">
                                            <div className="flex items-center gap-2">
                                                <span className="font-black text-xs md:text-sm text-foreground tracking-tight leading-none">
                                                    {cert.name || "Certification"}
                                                </span>
                                                {cert.tag && (
                                                    <span className={cn(
                                                        "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase border",
                                                        tagClasses
                                                    )}>
                                                        {cert.tag}
                                                    </span>
                                                )}
                                            </div>
                                            <div
                                                className="text-[11px] text-foreground/70 font-medium mt-1 leading-tight max-w-[140px]"
                                                dangerouslySetInnerHTML={{ __html: cert.description || "Professional certification" }}
                                            />
                                        </div>
                                    </div> */}
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}