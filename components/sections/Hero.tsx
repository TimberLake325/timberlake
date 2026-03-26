'use client';

import {
    LucideActivity,
    LucideArrowRight,
    LucideCheckCircle,
    LucideShieldCheck,
    LucideTrendingUp
} from "lucide-react";
import { CTALink } from "../ui/CTALink";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const iconMap: Record<string, React.ComponentType<any>> = {
    LucideActivity,
    LucideArrowRight,
    LucideCheckCircle,
    LucideShieldCheck,
    LucideTrendingUp
};

export default function Hero({ data }: { data: any }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const isNewStructure = data && !data.content && (data.headline || data.subheading);

    const headline = isNewStructure ? data.headline : (data?.content?.title?.mainText || "Medical Billing & Credentialing");
    const highlightedText = isNewStructure ? "" : (data?.content?.title?.highlightedText || "Services");
    const highlightSymbol = isNewStructure ? "" : (data?.content?.title?.highlightSymbol || ".");

    const subheading = isNewStructure ? data.subheading : (data?.content?.description?.intro || "Elite RCM solutions for high-complexity practices.");

    const descriptionIntro = isNewStructure ? subheading : (data?.content?.description?.intro || "Elite RCM solutions for high-complexity practices. We bridge the gap between");
    const highlightedParts = isNewStructure ? [] : (data?.content?.description?.highlightedParts || ["clinical excellence", "financial performance"]);
    const descriptionEnding = isNewStructure ? "" : (data?.content?.description?.ending || "with certified HIPAA-compliant workflows.");

    const ctaButtons = isNewStructure ? [
        { id: 'primary', text: data.primaryCta?.label, href: data.primaryCta?.link, variant: 'primary', hasIcon: true },
        { id: 'secondary', text: data.secondaryCta?.label, href: data.secondaryCta?.link, variant: 'outline', hasIcon: false }
    ] : (data?.content?.ctaButtons || []);

    const socialProof = isNewStructure ? (data.socialProof || []) : (data?.content?.socialProof || []);

    const visualElements = data?.visualElements || {};
    const floatingCards = visualElements?.floatingCards || [
        { position: "top-right" },
        { position: "bottom-left" }
    ];

    const getIcon = (iconName?: string) => {
        if (!iconName) return LucideArrowRight;
        const IconComponent = iconMap[iconName];
        return IconComponent || LucideArrowRight;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 0.6
            }
        }
    } as const;

    const titleVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 100,
                duration: 0.8
            }
        }
    } as const;

    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 0.5
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 200
            }
        }
    } as const;

    const socialProofVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 0.5
            }
        }
    } as const;

    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-28 bg-cover bg-no-repeat bg-right md:bg-center h-[88vh]"
        >
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 -z-10 pointer-events-none"
            >
                <video
                    src={'/videos/banner.mp4'}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/30" />
            </motion.div>

            <motion.div
                variants={containerVariants}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 h-full flex items-center justify-center"
            >
                <div className="flex flex-col items-center text-center space-y-10 ">
                    <motion.h1
                        variants={titleVariants}
                        className="!z-20 text-4xl md:text-6xl font-black leading-[0.95] tracking-tighter bg-primary/10 p-4 rounded-2xl bg-linear-to-r from-foreground to-accent bg-clip-text text-transparent w-fit mx-auto max-w-4xl"
                        dangerouslySetInnerHTML={{ __html: isNewStructure ? headline : `${headline} <span class="text-primary">${highlightedText}</span><span class="text-accent">${highlightSymbol}</span>` }}
                    />

                    <motion.div
                        variants={itemVariants}
                        className="text-foreground text-lg md:text-xl font-medium leading-relaxed max-w-5xl z-20"
                    >
                        {isNewStructure ? (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className=" text-background z-20"
                            >
                                <div dangerouslySetInnerHTML={{ __html: subheading }} />
                            </motion.div>
                        ) : (
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="!z-20"
                            >
                                {descriptionIntro}
                                <span className="text-foreground font-bold"> {highlightedParts[0] || ""} </span>
                                and
                                <span className="text-foreground font-bold"> {highlightedParts[1] || ""} </span>
                                {descriptionEnding}
                            </motion.p>
                        )}
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row justify-center gap-4 pt-4 w-full"
                    >
                        {ctaButtons.map((button: any, idx: number) => {
                            const IconComponent = button?.hasIcon ? getIcon(button?.iconName) : undefined;
                            if (!button.text) return null;
                            return (
                                <motion.div
                                    key={button?.id || `cta-${button?.variant || "primary"}`}
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    custom={idx}
                                    className="z-20"
                                >
                                    <CTALink
                                        href={button?.href || "#"}
                                        size="lg"
                                        variant={button?.variant || "primary"}
                                        className={button?.variant === "primary" ? "px-10 shadow-xl shadow-primary/20 w-full" : "bg-background hover:text-background hover:bg-primary w-full border border-background z-20"}
                                        icon={IconComponent}
                                    >
                                        {button?.text}
                                    </CTALink>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center gap-x-10 gap-y-4 pt-8   z-20 w-full"
                    >
                        {socialProof.map((item: any, i: number) => {
                            const IconComponent = getIcon(item?.iconName);
                            return (
                                <motion.div
                                    key={item?.id || `proof-${i}`}
                                    variants={socialProofVariants}
                                    custom={i}
                                    whileHover={{ scale: 1.05, x: 2 }}
                                    className="flex items-center gap-2.5 z-20"
                                >
                                    <IconComponent size={18} className={item?.color || "text-primary/60"} />
                                    <span className="text-xs font-bold text-foreground/70 uppercase tracking-tight z-20">
                                        {item?.text || "Certified Professional"}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </motion.div>
        </motion.section>
    );
}