'use client';

import Card from "../ui/Card";
import {
    LucideShieldCheck,
    LucideAward,
    LucideTrendingUp,
    LucideUserCheck,
    LucideBarChart,
    LucideFileCheck
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import Image from "next/image";
import { useRef } from "react";

const iconMap: Record<string, React.ComponentType<any>> = {
    LucideAward,
    LucideShieldCheck,
    LucideTrendingUp,
    LucideUserCheck,
    LucideBarChart,
    LucideFileCheck
};

const defaultIcons = [LucideAward, LucideShieldCheck, LucideTrendingUp, LucideUserCheck];

interface ReasonItem {
    id?: string;
    title?: string;
    description?: string;
    icon?: string;
    image?: string;
    order?: string;
}

interface WhyChooseUsProps {
    data?: {
        header?: {
            subtitle?: string;
            title?: string;
            description?: string;
            centered?: boolean;
        };
        stats?: {
            value?: string;
            label?: string;
            variant?: string;
        };
        reasons?: ReasonItem[];

        title?: string;
        subtitle?: string;
        description?: string;
        image?: string;
        points?: ReasonItem[];
        cta?: { label: string; link: string };
    };
}

const DEFAULT_REASONS: ReasonItem[] = [
    {
        id: "reason-1",
        title: "Specialty-Specific Expertise",
        description: "Deep knowledge of niche specialties ensures accurate coding and maximum reimbursement.",
        icon: "LucideAward",
        order: "01"
    },
    {
        id: "reason-2",
        title: "Advanced Security Framework",
        description: "Enterprise-grade HIPAA compliance with SOC 2 Type II certification for data protection.",
        icon: "LucideShieldCheck",
        order: "02"
    },
    {
        id: "reason-3",
        title: "Proactive Revenue Optimization",
        description: "Predictive analytics identify revenue leakage before it impacts your bottom line.",
        icon: "LucideTrendingUp",
        order: "03"
    },
    {
        id: "reason-4",
        title: "Dedicated Practice Liaison",
        description: "Single point of contact who understands your practice's unique workflow and goals.",
        icon: "LucideUserCheck",
        order: "04"
    }
];

const getIcon = (iconName?: string, index?: number) => {
    if (!iconName && index !== undefined) {

        return defaultIcons[index % defaultIcons.length];
    }

    if (!iconName) return LucideAward;

    const IconComponent = iconMap[iconName];
    if (IconComponent) return IconComponent;

    const iconKey = Object.keys(iconMap).find(key =>
        key.toLowerCase().includes(iconName.toLowerCase()) ||
        iconName.toLowerCase().includes(key.toLowerCase())
    );

    return iconKey ? iconMap[iconKey] : LucideAward;
};

const getStatsBgColor = (variant?: string) => {
    switch (variant) {
        case 'secondary':
            return 'bg-secondary text-background';
        case 'accent':
            return 'bg-accent text-background';
        default:
            return 'bg-primary text-background';
    }
};

export default function WhyChooseUs({ data }: WhyChooseUsProps = {}) {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const isNewStructure = data && !data.header && (data.title || data.subtitle);

    const subtitle = isNewStructure ? (data.subtitle || "") : (data?.header?.subtitle || "The Timberlake Advantage");
    const title = isNewStructure ? (data.title || "") : (data?.header?.title || "Engineered for Revenue Excellence");
    const description = isNewStructure ? (data.description || "") : (data?.header?.description ||
        "While generic billing companies focus on data entry, we focus on Revenue Optimization. Our framework is designed to eliminate clinical leakage and maximize practice valuation.");
    const centered = isNewStructure ? false : (data?.header?.centered || false);

    const statsValue = (data as any)?.stats?.value || "98.5%";
    const statsLabel = (data as any)?.stats?.label || "First-Pass Clean Claim Rate";
    const statsVariant = (data as any)?.stats?.variant || "primary";
    const statsBgColor = getStatsBgColor(statsVariant);

    const reasons = isNewStructure ? (data.points || []) : (data?.reasons || DEFAULT_REASONS);
    const sectionImage = isNewStructure ? (data.image || "") : "";

    const displayReasons = reasons.length <= 4 ? reasons : reasons.slice(0, 4);

    // Animation variants
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

    const headerVariants = {
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

    const imageVariants = {
        hidden: { opacity: 0, x: 100, scale: 0.9 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 0.8,
                delay: 0.2
            }
        }
    } as const;

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 0.6
            }
        }
    } as const;

    const statsVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 120,
                duration: 0.5,
                delay: 0.4
            }
        }
    };

    const ctaVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: 0.6
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 200
            }
        },
        tap: {
            scale: 0.95
        }
    } as const;

    return (
        <motion.section
            ref={sectionRef}
            className="pb-24 pt-16 xl:pt-0 bg-muted/30 relative overflow-hidden"
        >
            {/* Animated background gradient */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.03 } : { opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale"
            >
                <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,...")' }} />
            </motion.div>

            {/* Animated right image */}
            <motion.div
                variants={imageVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="h-[440px] hidden lg:block lg:w-1/2 bg-linear-to-r from-primary/0 to-primary/10 absolute right-0 top-0 overflow-hidden lg:rounded-bl-full"
            >
                {/* <motion.img
                    src={data?.image || ''}
                    alt="Why Choose Us"
                    className="object-cover h-full w-full blur-xs lg:blur-none transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                /> */}
                <Image src={data?.image || ''} alt="Why Choose Us" className="object-cover h-full w-full blur-xs lg:blur-none transition-all duration-300" width={1000} height={450} quality={100} />
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16"
                >
                    <motion.div
                        variants={headerVariants}
                        className="text-white"
                    >
                        <SectionHeader
                            centered={centered}
                            subtitle={subtitle}
                            title={title}
                            description={description}
                            className="mb-8 lg:mb-0"
                        />

                        {(data as any)?.cta?.label && (
                            <motion.div
                                variants={ctaVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="mt-8"
                            >
                                <a
                                    href={(data as any).cta.link || "#"}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-primary text-background rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                                >
                                    {(data as any).cta.label}
                                </a>
                            </motion.div>
                        )}
                    </motion.div>

                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {displayReasons.map((item, index) => {
                        const Icon = getIcon(item.icon, index);
                        const order = item.order || `0${index + 1}`;
                        const itemId = item.id || `reason-${index}`;

                        return (
                            <motion.div
                                key={itemId}
                                variants={cardVariants}
                                custom={index}
                                whileHover={{ y: -8 }}
                                transition={{ type: "spring", damping: 15, stiffness: 200 }}
                            >
                                <Card
                                    animate
                                    withAccent
                                    hoverable
                                    shadow="interactive"
                                    className="group pt-10 relative overflow-hidden"
                                >
                                    {/* Animated background gradient on hover */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        initial={false}
                                    />

                                    <motion.span
                                        initial={{ opacity: 0, x: 20, scale: 0.5 }}
                                        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: "spring" }}
                                        className="absolute top-6 right-6 text-4xl font-black text-primary/5 group-hover:text-primary/10 transition-colors"
                                    >
                                        {order}
                                    </motion.span>

                                    <div className="space-y-6 relative z-10">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0, rotate: -90 }}
                                            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                                            transition={{ delay: index * 0.1 + 0.4, duration: 0.5, type: "spring" }}
                                            whileHover={{ scale: 1.05, rotate: 3 }}
                                            className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-500 overflow-hidden shadow-sm"
                                        >
                                            {item.image ? (
                                                <motion.img
                                                    src={item.image}
                                                    className="w-full h-full object-cover"
                                                    alt={item.title || "Advantage Image"}
                                                    whileHover={{ scale: 1.1 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            ) : (
                                                <Icon size={32} strokeWidth={1.5} />
                                            )}
                                        </motion.div>

                                        <div>
                                            <motion.h3
                                                initial={{ opacity: 0, x: -15 }}
                                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                                                className="text-lg font-black text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors"
                                            >
                                                {item.title || "Key Advantage"}
                                            </motion.h3>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                                transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                                                className="text-foreground/70 text-sm font-medium leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: item.description || "Detailed description of this advantage" }}
                                            />
                                        </div>
                                    </div>

                                    <motion.div
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={isInView ? { width: "100%", opacity: 1 } : {}}
                                        transition={{ delay: index * 0.1 + 0.7, duration: 0.6 }}
                                        whileHover={{ width: "100%", backgroundColor: "var(--primary)" }}
                                        className="pt-6 w-full"
                                    >
                                        <div className="h-0.5 w-8 bg-border group-hover:w-full group-hover:bg-primary transition-all duration-500" />
                                    </motion.div>

                                    {/* Animated corner accent on hover */}
                                    <motion.div
                                        className="absolute bottom-0 right-0 w-12 h-12 bg-primary/5 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        initial={{ scale: 0 }}
                                        whileHover={{ scale: 1 }}
                                        style={{
                                            clipPath: "polygon(100% 0, 0 100%, 100% 100%)"
                                        }}
                                    />
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </motion.section>
    );
}