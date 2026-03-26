'use client';

import { motion } from "framer-motion";
import {
    LucideArrowRightCircle,
    LucideCalendar,
    LucideCheckCircle,
    LucideClock,
    LucideLock,
    LucideMessageSquare,
    LucideShieldCheck
} from "lucide-react";
import IconText from "../ui/IconText";
import SectionHeader from "../ui/SectionHeader";

const iconMap: Record<string, React.ComponentType<any>> = {
    LucideCalendar,
    LucideClock,
    LucideMessageSquare,
    LucideShieldCheck,
    LucideLock,
    LucideArrowRightCircle,
    LucideCheckCircle
};

interface ValueProposition {
    id?: string;
    title?: string;
    description?: string;
    icon?: string;
    variant?: string;
    valueProps?: string;
}

interface StepItem {
    number?: string;
    label?: string;
    title?: string;
    status?: string;
}

interface AppointmentBookingProps {
    data?: {
        header?: {
            subtitle?: string;
            title?: string;
            description?: string;
            centered?: boolean;
        };
        valuePropositions?: ValueProposition[];
        securityBlock?: {
            title?: string;
            description?: string;
            icon?: string;
            color?: string;
        };
        formHeader?: {
            steps?: StepItem[];
        };
        form?: {
            title?: string;
            securityIcon?: string;
            securityColor?: string;
            responseNote?: {
                text?: string;
                value?: string;
                valueColor?: string;
            };
        };

        title?: string;
        subtitle?: string;
        description?: string;
        points?: ValueProposition[];
        valueProps?: ValueProposition[];
    };
}

const DEFAULT_VALUE_PROPOSITIONS: ValueProposition[] = [
    {
        id: "value-1",
        title: "Free Performance Audit",
        description: "A deep dive into your current clean-claim rate and denial patterns.",
        icon: "LucideMessageSquare",
        variant: "primary"
    },
    {
        id: "value-2",
        title: "Clinician-Friendly Scheduling",
        description: "Book early morning or after-clinic briefings that respect your rounds.",
        icon: "LucideCalendar",
        variant: "primary"
    },
    {
        id: "value-3",
        title: "24-Hour Response Protocol",
        description: "Our implementation team reviews every inquiry within one business day.",
        icon: "LucideClock",
        variant: "primary"
    }
];

const getIcon = (iconName?: string) => {
    if (!iconName) return LucideMessageSquare;

    const IconComponent = iconMap[iconName];
    if (IconComponent) return IconComponent;

    const iconKey = Object.keys(iconMap).find(key =>
        key.toLowerCase().includes(iconName.toLowerCase()) ||
        iconName.toLowerCase().includes(key.toLowerCase())
    );

    return iconKey ? iconMap[iconKey] : LucideMessageSquare;
};

const getSecurityColorClass = (color?: string) => {
    switch (color) {
        case 'emerald':
            return 'text-emerald-500';
        case 'primary':
            return 'text-primary';
        case 'accent':
            return 'text-accent';
        default:
            return 'text-emerald-500';
    }
};

const getValueColorClass = (color?: string) => {
    switch (color) {
        case 'primary':
            return 'text-primary';
        case 'accent':
            return 'text-accent';
        case 'emerald':
            return 'text-emerald-600';
        default:
            return 'text-primary';
    }
};

export default function AppointmentBooking({ data }: AppointmentBookingProps = {}) {
    const isNewStructure = data && !data.header && (data.title || data.subtitle);

    const subtitle = isNewStructure ? (data.subtitle || "") : (data?.header?.subtitle || "Expert Consultation");
    const title = isNewStructure ? (data.title || "") : (data?.header?.title || "Transform Your Revenue Cycle");
    const description = isNewStructure ? (data.description || "") : (data?.header?.description ||
        "Schedule a specialized audit with our RCM experts. We'll identify leakage in your current billing workflow and provide a roadmap for recovery.");
    const centered = isNewStructure ? false : (data?.header?.centered || false);

    const valuePropositions = isNewStructure ? (data?.valueProps || []) : (data?.valuePropositions || DEFAULT_VALUE_PROPOSITIONS);
    const securityBlock = data?.securityBlock || {};
    const securityTitle = securityBlock?.title || "Secure PHI Protocol";
    const securityDescription = securityBlock?.description ||
        "Practice information is encrypted via 256-bit SSL and handled under strict HIPAA Title II privacy standards.";
    const SecurityIcon = getIcon(securityBlock?.icon);
    const securityColor = securityBlock?.color || "primary";

    const formHeader = data?.formHeader || {};
    const steps = formHeader?.steps || [
        {
            number: "1",
            label: "Step One",
            title: "Request Your Audit",
            status: "active"
        },
        {
            number: "2",
            label: "Step Two",
            title: "Workflow Review",
            status: "pending"
        }
    ];

    return (
        <section className="py-24 bg-muted/30 relative overflow-hidden" id="book-audit">

            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px]  h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">


                <div className="lg:col-span-5 space-y-12">
                    <SectionHeader
                        centered={centered}
                        subtitle={subtitle}
                        title={title}
                        description={description}
                        className="mb-4 lg:mb-6"
                    />


                    <div className="space-y-6 grid grid-cols-1 md:grid-cols-2   ">
                        {valuePropositions.map((item: ValueProposition, index: number) => {
                            const Icon: any = getIcon(item.icon);
                            const itemId = item.id || `value-${index}`;

                            return (
                                <motion.div
                                    key={itemId}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className=""
                                >
                                    <IconText
                                        icon={Icon}
                                        isPill
                                        variant={item.variant as any || "primary"}
                                        size="lg"
                                        text={
                                            <div className="flex flex-col">
                                                <span className="font-bold text-foreground text-lg tracking-tight">
                                                    {item.title || "Value Proposition"}
                                                </span>
                                                <div
                                                    className="foreground/70 text-sm leading-relaxed mt-0.5"
                                                    dangerouslySetInnerHTML={{ __html: item.description || "Detailed description" }}
                                                />
                                            </div>
                                        }
                                    />
                                </motion.div>
                            );
                        })}
                    </div>


                    <div className="pt-8 border-t border-border/60">
                        <div className="group flex items-start gap-4 p-5 bg-background/60 backdrop-blur-sm rounded-2xl border border-dashed border-primary/20 hover:border-primary/40 transition-colors">
                            <div className={`p-2 bg-${securityColor}/10 rounded-lg text-${securityColor} group-hover:bg-${securityColor} group-hover:text-background transition-all`}>
                                <SecurityIcon size={24} />
                            </div>
                            <div className="text-xs font-medium foreground/70 leading-relaxed">
                                <span className="font-black text-foreground block mb-1 uppercase tracking-[0.1em]">
                                    {securityTitle}
                                </span>
                                <div dangerouslySetInnerHTML={{ __html: securityDescription || "" }} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}