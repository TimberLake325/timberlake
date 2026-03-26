"use client"
import {
    LucideLock,
    LucideMail,
    LucideMapPin,
    LucidePhone,
    LucideShieldCheck
} from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ComponentType<any>> = {
    LucideMail,
    LucidePhone,
    LucideMapPin,
    LucideShieldCheck,
    LucideLock
};

interface FooterLink {
    id?: string;
    label?: string;
    href?: string;
    isPrimary?: boolean;
}

interface ContactDetail {
    id?: string;
    label?: string;
    value?: string;
    icon?: string;
    type?: string;
}

interface ComplianceBadge {
    id?: string;
    label?: string;
    icon?: string;
    color?: string;
}

interface FooterProps {
    data?: any;
}

const DEFAULT_FOOTER_DATA = {
    brand: {
        mission: "Providing enterprise-grade revenue cycle management and specialized medical billing. Certified for accuracy, built for compliance, and dedicated to provider success.",
        complianceBadges: [
            { id: "badge-1", label: "HIPAA Compliant", icon: "LucideShieldCheck", color: "primary" },
            { id: "badge-2", label: "SOC2 Type II", icon: "LucideLock", color: "primary" }
        ],
        complianceText: "HIPAA & SOC2 Compliant"
    },
    navigation: {
        solutions: {
            title: "Solutions",
            links: [
                { id: "sol-1", label: "Medical Coding & Auditing", href: "/services/coding" },
                { id: "sol-2", label: "Revenue Cycle Management", href: "/services/rcm" },
                { id: "sol-3", label: "Compliance & Risk Management", href: "/services/compliance" },
                { id: "sol-4", label: "Denials Management", href: "/services/denials" },
                { id: "sol-5", label: "Provider Credentialing", href: "/services/credentialing" }
            ]
        },
        resources: {
            title: "Resources",
            links: [
                { id: "res-1", label: "Our Expertise", href: "/about" },
                { id: "res-2", label: "Industry Insights", href: "/blog" },
                { id: "res-3", label: "State Coverage", href: "/states" },
                { id: "res-4", label: "Sitemap", href: "/site-map", isPrimary: true }
            ]
        }
    },
    contact: {
        title: "Contact Operations",
        details: [
            { id: "contact-1", label: "Support Line", value: "+1 (555) 123-4567", icon: "LucidePhone", type: "phone" },
            { id: "contact-2", label: "Secure Email", value: "info@timberlake.com", icon: "LucideMail", type: "email" },
            { id: "contact-3", label: "HQ Location", value: "123 Medical Drive, Suite 500, New York, NY 10001", icon: "LucideMapPin", type: "address" }
        ]
    },
    legal: {
        links: [
            { id: "legal-1", label: "HIPAA Statement", href: "/hipaa-compliance" },
            { id: "legal-2", label: "Privacy Policy", href: "/privacy-policy" },
            { id: "legal-3", label: "Terms of Service", href: "/terms-conditions" },
            { id: "legal-4", label: "Security Policy", href: "/security-policy" },
            { id: "legal-5", label: "FAQ", href: "/faqs" }
        ],
        copyright: {
            year: new Date().getFullYear(),
            companyName: "Timberlake Medical Billing",
            tagline: "Specialized RCM Solutions for Healthcare."
        }
    }
};

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

export default function Footer({ data }: FooterProps = {}) {

    const mission = data?.mission || DEFAULT_FOOTER_DATA.brand.mission;
    const complianceBadges = data?.complianceBadges?.length > 0 ? data.complianceBadges : DEFAULT_FOOTER_DATA.brand.complianceBadges;
    const complianceText = data?.complianceText || DEFAULT_FOOTER_DATA.brand.complianceText;

    const solutionsTitle = data?.solutionsTitle || DEFAULT_FOOTER_DATA.navigation.solutions.title;
    const solutionLinks = data?.serviceIds?.length > 0
        ? data.serviceIds.map((service: any) => ({
            id: service._id,
            label: service.title,
            href: `/services/${service.category?.slug}/${service.slug}`
        }))
        : DEFAULT_FOOTER_DATA.navigation.solutions.links;

    const resourcesTitle = data?.resourcesTitle || DEFAULT_FOOTER_DATA.navigation.resources.title;
    const resourceLinks = data?.blogPostIds?.length > 0
        ? data.blogPostIds.map((post: any) => ({
            id: post._id,
            label: post.title,
            href: `/blog/${post.category?.slug}/${post.slug}`
        }))
        : DEFAULT_FOOTER_DATA.navigation.resources.links;

    const customSections = data?.customSections || [];

    const contactTitle = data?.contactTitle || DEFAULT_FOOTER_DATA.contact.title;
    const contactDetails = data?.contactDetails?.length > 0 ? data.contactDetails : DEFAULT_FOOTER_DATA.contact.details;

    const legalLinks = data?.legalLinks?.length > 0 ? data.legalLinks : DEFAULT_FOOTER_DATA.legal.links;
    const currentYear = data?.copyrightYear || new Date().getFullYear();
    const companyName = data?.copyrightCompany || DEFAULT_FOOTER_DATA.legal.copyright.companyName;
    const tagline = data?.copyrightTagline || DEFAULT_FOOTER_DATA.legal.copyright.tagline;

    return (
        <footer className="bg-muted border-t border-border overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                    <div className="md:col-span-2 lg:col-span-4 space-y-6">
                        <Logo logoHeight={160} logoWidth={160} hideText={true} logoType="full" />
                        <p className="text-foreground/60 text-sm leading-relaxed max-w-sm">
                            {mission}
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            {complianceBadges?.map((badge: any, idx: number) => {
                                const BadgeIcon = getIcon(badge.icon);
                                const badgeId = badge.id || `badge-${idx}`;

                                return (
                                    <div key={badgeId} className="p-2 bg-background rounded-lg border border-border shadow-sm">
                                        <BadgeIcon className="text-primary w-5 h-5" />
                                    </div>
                                );
                            })}
                            <span className="text-[10px] font-bold uppercase tracking-widest foreground/70">
                                {complianceText}
                            </span>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-6">
                            {solutionsTitle}
                        </h3>
                        <ul className="space-y-4">
                            {solutionLinks?.map((link: any, idx: number) => {
                                const linkId = link.id || `sol-${idx}`;
                                return (
                                    <li key={linkId}>
                                        <Link
                                            href={link.href || "#"}
                                            className="text-sm text-foreground/60 hover:text-primary transition-colors font-medium"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-6">
                            {resourcesTitle}
                        </h3>
                        <ul className="space-y-4">
                            {resourceLinks?.map((link: any, idx: number) => {
                                const linkId = link.id || `res-${idx}`;
                                const linkClass = link.isPrimary
                                    ? "text-sm text-primary font-bold hover:underline"
                                    : "text-sm foreground/70 hover:text-primary transition-colors font-medium";

                                return (
                                    <li key={linkId}>
                                        <Link
                                            href={link.href || "#"}
                                            className={linkClass}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {customSections.map((section: any, sIdx: number) => (
                        <div key={sIdx} className="lg:col-span-2">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-6">
                                {section.title}
                            </h3>
                            <ul className="space-y-4">
                                {section.links?.map((link: any, lIdx: number) => (
                                    <li key={lIdx}>
                                        <Link
                                            href={link.href || "#"}
                                            className="text-sm text-foreground/60 hover:text-primary transition-colors font-medium"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="md:col-span-2 lg:col-span-4 space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-6">
                            {contactTitle}
                        </h3>
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 120,
                                duration: 0.6
                            }}
                            className="relative"
                        >
                            <div className="relative">
                                <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl bg-gray-900/50" />
                                <div className="absolute -bottom-2 -right-2 w-full h-full rounded-2xl bg-gray-800/60" />
                                <div className="absolute -bottom-1 -right-1 w-full h-full rounded-2xl bg-gray-700/70" />

                                <div className="relative space-y-4 p-5 rounded-2xl border border-gray-500/30
                        bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200
                        shadow-lg z-10
                        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br 
                        before:from-white/40 before:to-transparent before:pointer-events-none"
                                >
                                    <div className="absolute top-0 left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full" />
                                    <div className="absolute top-1 left-1 right-1 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />

                                    <div className="absolute top-2 bottom-2 left-0 w-[2px] bg-gradient-to-b from-transparent via-white/60 to-transparent rounded-full" />
                                    <div className="absolute top-1 bottom-1 left-1 w-[1px] bg-gradient-to-b from-transparent via-white/40 to-transparent rounded-full" />

                                    <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-black/30 to-transparent rounded-full" />

                                    <div className="absolute top-2 bottom-2 right-0 w-[2px] bg-gradient-to-b from-transparent via-black/30 to-transparent rounded-full" />

                                    <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-black/5 to-transparent pointer-events-none" />

                                    <div className="relative z-10">
                                        {contactDetails?.map((detail: any, idx: number) => {
                                            const Icon = getIcon(detail.icon);
                                            const detailId = detail.id || `contact-${idx}`;

                                            return (
                                                <motion.div
                                                    key={detailId}
                                                    className="flex items-start gap-3 mb-3 last:mb-0 hover:scale-105 transition-all duration-300 ease-in-out"
                                                    initial={{ x: 20, opacity: 0 }}
                                                    whileInView={{ x: 0, opacity: 1 }}
                                                    viewport={{ once: true, amount: 0.3 }}
                                                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                                                >
                                                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/30 to-primary/10 shadow-inner border border-primary/20">
                                                        <Icon size={16} className="text-primary" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-semibold text-gray-800">
                                                            {detail.value}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="bg-background border-t border-border py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-bold foreground/70 uppercase tracking-tighter">
                            {legalLinks?.map((link: any, idx: number) => {
                                const linkId = link.id || `legal-${idx}`;
                                return (
                                    <Link
                                        key={linkId}
                                        href={link.href || "#"}
                                        className="hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>

                        <p className="text-xs font-medium foreground/70/60">
                            © {currentYear} {companyName}. {tagline}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
