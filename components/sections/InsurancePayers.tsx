'use client';

import { LucideActivity, LucideZap } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";

interface PayerItem {
    id?: string;
    name?: string;
    status?: string;
    type?: string;
}

interface InsurancePayersProps {
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
            color?: string;
        };
        payers?: PayerItem[];
        footerNote?: {
            text?: string;
            icon?: string;
            color?: string;
        };

        title?: string;
        subtitle?: string;
        description?: string;
        items?: PayerItem[];
        footer?: { text: string };
    };
}

const DEFAULT_PAYERS: PayerItem[] = [
    { id: "payer-1", name: "Aetna", status: "active", type: "commercial" },
    { id: "payer-2", name: "United Healthcare", status: "active", type: "commercial" },
    { id: "payer-3", name: "Cigna", status: "active", type: "commercial" },
    { id: "payer-4", name: "Anthem Blue Cross", status: "active", type: "commercial" },
    { id: "payer-5", name: "Humana", status: "active", type: "medicare" },
    { id: "payer-6", name: "Centers for Medicare & Medicaid Services", status: "active", type: "government" }
];

const getStatsBgColor = (color?: string) => {
    switch (color) {
        case 'emerald':
            return 'bg-emerald-50 border-emerald-100 text-emerald-700';
        case 'blue':
            return 'bg-blue-50 border-blue-100 text-blue-700';
        case 'accent':
            return 'bg-accent/10 border-accent/20 text-accent';
        case 'primary':
            return 'bg-primary/10 border-primary/20 text-primary';
        default:
            return 'bg-emerald-50 border-emerald-100 text-emerald-700';
    }
};

const getStatusDotColor = (status?: string) => {
    switch (status?.toLowerCase()) {
        case 'active':
            return 'bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.6)]';
        case 'pending':
            return 'bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.6)]';
        case 'inactive':
            return 'bg-gray-400 shadow-[0_0_4px_rgba(156,163,175,0.6)]';
        default:
            return 'bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.6)]';
    }
};

export default function InsurancePayers({ data }: InsurancePayersProps = {}) {

    const isNewStructure = data && !data.header && (data.title || data.subtitle);

    const subtitle = isNewStructure ? (data.subtitle || "") : (data?.header?.subtitle || "Interoperability");
    const title = isNewStructure ? (data.title || "") : (data?.header?.title || "Direct Payer Connectivity");
    const description = isNewStructure ? (data.description || "") : (data?.header?.description ||
        "Our RCM engine is integrated with over 800 national and regional insurance carriers, facilitating real-time eligibility checks and accelerated electronic remittance.");
    const centered = isNewStructure ? false : (data?.header?.centered || false);

    const statsValue = (data as any)?.stats?.value || "800+";
    const statsLabel = (data as any)?.stats?.label || "EDI Connections Active";
    const statsColor = (data as any)?.stats?.color || "emerald";
    const statsClasses = getStatsBgColor(statsColor);

    const payers = isNewStructure ? (data.items || []) : (data?.payers || DEFAULT_PAYERS);

    const footerText = isNewStructure ? (data.footer?.text || "Powered by Enterprise Clearinghouse EDI") : (data?.footerNote?.text || "Powered by Enterprise Clearinghouse EDI");
    const footerIcon = isNewStructure ? "LucideZap" : (data?.footerNote?.icon || "LucideZap");
    const footerColor = isNewStructure ? "primary" : (data?.footerNote?.color || "primary");

    const displayPayers = payers.slice(0, 12);

    return (
        <section className="py-24 border-t border-border/50 relative overflow-hidden bg-linear-to-bl from-accent/10 to-primary/30">

            <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <SectionHeader
                            centered={centered}
                            subtitle={subtitle}
                            title={title}
                            description={description}
                            className="mb-0"

                        />
                    </div>
                    <div className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg ${statsClasses}`}>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest">
                            {statsValue} {statsLabel}
                        </span>
                    </div>
                </div>
            </div>

            <div className="relative overflow-hidden py-6 lg:py-10">
                {/* Primary Marquee */}
                <div className="flex w-max">
                    <motion.div
                        className="flex gap-4 md:gap-6 px-2 md:px-3"
                        animate={{ x: ["0%", "-33.333%"] }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30, // Adjusted for smoother flow
                            ease: "linear"
                        }}
                        style={{ width: "fit-content" }}
                    >
                        {[...payers, ...payers, ...payers].map((payer, index) => {
                            const payerId = `${payer.id || 'payer'}-${index}`;
                            return (
                                <div
                                    key={payerId}
                                    className="w-[180px] md:w-[240px] lg:w-[280px] shrink-0 group relative flex flex-col items-center justify-center p-3 md:p-4 bg-background backdrop-blur-sm rounded-2xl md:rounded-3xl hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-default"
                                >
                                    <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl md:rounded-3xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 mb-3 md:mb-4 overflow-hidden" >
                                        {(payer as any).logo ? (
                                            <img src={(payer as any).logo} alt={payer.name} className="w-full h-full object-contain p-2 md:p-3" />
                                        ) : (
                                            <>
                                                <LucideActivity size={24} strokeWidth={1} className="text-foreground/20 group-hover:text-primary transition-colors duration-500 md:hidden" />
                                                <LucideActivity size={32} strokeWidth={1} className="text-foreground/20 group-hover:text-primary transition-colors duration-500 hidden md:block" />
                                            </>
                                        )}
                                    </div>

                                    <div className="text-center px-1">
                                        <span className="block font-black text-foreground uppercase tracking-wider text-[10px] md:text-xs lg:text-sm mb-1 line-clamp-1">
                                            {payer.name || "Insurance Payer"}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>


        </section>
    );
}