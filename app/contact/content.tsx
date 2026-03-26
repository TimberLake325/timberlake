import ContactForm from "@/components/forms/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import {
    LucideClock,
    Facebook as LucideFacebook,
    Instagram as LucideInstagram,
    Linkedin as LucideLinkedin,
    LucideMail,
    LucideMapPin,
    LucideMessageSquare,
    LucidePhone,
    LucideShieldCheck,
    Twitter as LucideTwitter,
    Youtube as LucideYoutube
} from "lucide-react";

import RichText from "@/components/ui/RichText";

interface ContactDetail {
    id?: string;
    label?: string;
    value?: string;
    subtext?: string;
    icon?: string;
    color?: string;
}

interface SocialLink {
    id?: string;
    icon?: string;
    link?: string;
    isRedirect?: boolean;
    iconBg?: string;
}

interface ContactContentProps {
    data?: {
        pageData?: {
            pageTitle?: string;
            pageSubTitle?: string;
            content?: string;
            heroKicker?: string;
            heroTitleMain?: string;
            heroTitleHighlight?: string;
            heroTitleStyle?: string;
            contactDetails?: ContactDetail[];
            socialLinks?: SocialLink[];
            form?: {
                title?: string;
                security?: {
                    text?: string;
                    icon?: string;
                    color?: string;
                };
                responseTime?: {
                    text?: string;
                    value?: string;
                };
                trustBar?: {
                    text?: string;
                };
            };
        };
    };
}

const DEFAULT_CONTACT_DETAILS: ContactDetail[] = [
    {
        id: "contact-1",
        label: "Call Us",
        value: "+1 (555) 123-4567",
        subtext: "Direct Support",
        icon: "LucidePhone",
        color: "primary"
    },
    {
        id: "contact-2",
        label: "Email Us",
        value: "info@timberlake.com",
        subtext: "General Inquiries",
        icon: "LucideMail",
        color: "primary"
    },
    {
        id: "contact-3",
        label: "Visit Our Office",
        value: "123 Medical Drive, Suite 500, New York, NY 10001",
        subtext: "Headquarters",
        icon: "LucideMapPin",
        color: "primary"
    },
    {
        id: "contact-4",
        label: "Business Hours",
        value: "Mon - Fri: 9am - 6pm EST",
        subtext: "Response time: < 2hrs",
        icon: "LucideClock",
        color: "primary"
    }
];

const iconMap: Record<string, React.ComponentType<any>> = {
    LucideClock,
    LucideMail,
    LucideMapPin,
    LucideMessageSquare,
    LucidePhone,
    LucideShieldCheck,
    LucideLinkedin,
    LucideTwitter,
    LucideFacebook,
    LucideInstagram,
    LucideYoutube
};

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

const getColorClasses = (color?: string) => {
    switch (color) {
        case 'emerald':
            return {
                bg: 'bg-emerald-500/5',
                border: 'border-emerald-500/20',
                text: 'text-emerald-600',
                icon: 'text-emerald-500'
            };
        case 'primary':
            return {
                bg: 'bg-primary/5',
                border: 'border-primary/10',
                text: 'text-primary',
                icon: 'text-primary'
            };
        case 'accent':
            return {
                bg: 'bg-accent/5',
                border: 'border-accent/10',
                text: 'text-accent',
                icon: 'text-accent'
            };
        default:
            return {
                bg: 'bg-primary/5',
                border: 'border-primary/10',
                text: 'text-primary',
                icon: 'text-primary'
            };
    }
};

const ContactContent = ({ data }: ContactContentProps = {}) => {

    const pageData = data?.pageData || {};
    const contactDetails = pageData.contactDetails || DEFAULT_CONTACT_DETAILS;
    const form = pageData.form || {};

    const headerTitle = pageData.pageTitle || "Contact Our Experts";
    const headerDescription = pageData.pageSubTitle ||
        "Ready to transform your practice? Connect with Timberlake's certified billing specialists for a strategy session.";

    const heroKickerText = pageData.heroKicker || "Direct Line";
    const HeroKickerIcon = LucideMessageSquare;
    const heroTitleMain = pageData.heroTitleMain || "Let's Discuss Your";
    const heroTitleHighlight = pageData.heroTitleHighlight || "Revenue Strategy";
    const heroTitleStyle = pageData.heroTitleStyle || "italic";
    const heroContent = pageData.content ||
        "<p>Whether you have a specific question about compliance or want to schedule a comprehensive revenue cycle audit, our executive team is ready to assist.</p>";

    const formTitle = form?.title || "Secure Message";
    const securityText = form?.security?.text || "HIPAA Compliant Gateway";
    const SecurityIcon = getIcon(form?.security?.icon);
    const securityColor = form?.security?.color || "emerald";
    const responseText = form?.responseTime?.text || "Average response time:";
    const responseValue = form?.responseTime?.value || "90 minutes or less";
    const trustBarText = form?.trustBar?.text ||
        "Timberlake Global Revenue Cycle Management • Trusted by 500+ Practices Nationwide";

    const securityColors = getColorClasses(securityColor);

    return (
        <div className="pb-24 bg-background">
            <PageHeader
                title={headerTitle}
                description={headerDescription}
                image="/images/contact-us-bg.jpeg"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

                    <div className="lg:col-span-5 space-y-16">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full">
                                <HeroKickerIcon size={14} className="text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                                    {heroKickerText}
                                </span>
                            </div>
                            <h2 className="text-4xl font-black tracking-tight text-foreground leading-[1.1]">
                                {heroTitleMain} <span className={heroTitleStyle}>{heroTitleHighlight}</span>
                            </h2>
                            <div className="foreground/70 text-lg font-medium leading-relaxed">
                                <RichText content={heroContent} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                            {contactDetails.map((item) => {
                                const Icon = getIcon(item.icon);
                                const itemId = item.id || `contact-${item.label}`;
                                const itemColors = getColorClasses(item.color);

                                return (
                                    <div
                                        key={itemId}
                                        className="flex items-center gap-6 group p-4 rounded-3xl hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10"
                                    >
                                        <div className="flex-shrink-0 w-14 h-14 bg-background border border-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                                            <Icon size={24} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-1">
                                                {item.subtext || "Contact Detail"}
                                            </div>
                                            <h4 className="font-black text-foreground text-lg tracking-tight leading-none mb-1">
                                                {item.label || "Label"}
                                            </h4>
                                            <p className="foreground/70 font-bold text-sm">
                                                {item.value || "Value"}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {pageData.socialLinks && pageData.socialLinks.length > 0 && (
                            <div className="space-y-6 pt-10 border-t border-border/50">
                                <div className="text-[10px] font-black uppercase tracking-widest text-primary/40">
                                    Connect Digitally
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {pageData.socialLinks.map((social: SocialLink) => {
                                        const SocialIcon = getIcon(social.icon);
                                        const isHex = social.iconBg?.startsWith('#');
                                        const bgClass = !isHex
                                            ? (social.iconBg === 'primary'
                                                ? 'bg-primary/5 hover:bg-primary/10 text-primary border-primary/10'
                                                : 'bg-muted/50 hover:bg-muted text-foreground border-border')
                                            : 'border-transparent text-background hover:brightness-110';

                                        return (
                                            <a
                                                key={social.id}
                                                href={social.link}
                                                target={social.isRedirect ? "_blank" : "_self"}
                                                rel={social.isRedirect ? "noopener noreferrer" : ""}
                                                className={`w-12 h-12 flex items-center justify-center rounded-2xl border transition-all hover:scale-110 shadow-sm ${bgClass}`}
                                                style={isHex ? { backgroundColor: social.iconBg } : {}}
                                                title={social.icon?.replace('Lucide', '')}
                                            >
                                                <SocialIcon size={20} />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-7 relative">
                        <div className="relative bg-background p-6 md:p-10 rounded-4xl border-2 border-primary/20 shadow-lg shadow-primary/10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                                <h3 className="text-3xl font-black tracking-tight text-foreground">
                                    {formTitle}
                                </h3>
                                <div className={`flex items-center gap-2 px-4 py-2 ${securityColors.bg} border ${securityColors.border} rounded-xl`}>
                                    <SecurityIcon size={16} className={securityColors.icon} />
                                    <span className={`text-[10px] font-black ${securityColors.text} uppercase tracking-widest leading-none`}>
                                        {securityText}
                                    </span>
                                </div>
                            </div>

                            <ContactForm config={form} />

                            <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-[11px] font-bold foreground/70 italic">
                                    {responseText} {responseValue}
                                </p>
                                <div className="flex gap-1.5">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-1.5 h-1.5 bg-primary/20 rounded-full" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 text-center">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-12" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] foreground/70/40">
                    {trustBarText}
                </p>
            </div>
        </div>
    );
};

export default ContactContent;