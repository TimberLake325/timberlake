"use client";

import { clsx, type ClassValue } from 'clsx';
import {
    LucideActivity,
    LucideArrowRight,
    LucideChevronDown,
    LucideLayoutGrid,
    LucideMenu,
    LucideShieldCheck,
    LucideX,
    LucideZap,
    LucidePieChart,
    LucideFileText,
    LucideBarChart3,
    LucideUsers
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { twMerge } from 'tailwind-merge';
import Logo from "./Logo";
import { CTALink } from "./ui/CTALink";
import RichText from "./ui/RichText";

const navContainerVariants = {
    hidden: {
        x: "100%",
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            stiffness: 300,
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
    exit: {
        x: "100%",
        opacity: 0,
        transition: {
            damping: 30,
            stiffness: 300,
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
} as const;

const navItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 25,
            stiffness: 200,
        },
    },
    exit: {
        opacity: 0,
        y: 10,
        transition: {
            duration: 0.2,
        },
    },
} as const;

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "States", href: "/states" },
    { name: "Contact Us", href: "/contact" },
    { name: "Resources", href: "/blog" },
];

const iconMap: Record<string, React.ComponentType<any>> = {
    LucideZap,
    LucidePieChart,
    LucideFileText,
    LucideBarChart3,
    LucideUsers,
    LucideShieldCheck,
    LucideActivity
};

const getIcon = (iconName?: string) => {
    if (!iconName) return LucideActivity;
    const Icon = iconMap[iconName];
    return Icon || LucideActivity;
};

export default function Navbar({ serviceCategories = [] }: { serviceCategories?: any[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<any>(serviceCategories[0] || null);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Reset active category when data changes
    useEffect(() => {
        if (!activeCategory && serviceCategories.length > 0) {
            setActiveCategory(serviceCategories[0]);
        }
    }, [serviceCategories, activeCategory]);

    return (
        <nav
            onMouseLeave={() => setHoveredLink(null)}
            className={cn(
                "fixed top-0 w-full z-100 transition-all duration-500 bg-background",
                scrolled || hoveredLink
                    ? "bg-background border-b border-border py-4"
                    : "bg-background py-6"
            )}
        >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">
                    <div className="shrink-0 flex items-center gap-2">
                        <Logo logoType="full" logoHeight={130} logoWidth={130} />
                    </div>
                    <div className="hidden xl:flex items-center bg-muted/70 border border-transparent rounded-full px-2 py-1 transition-all duration-300 hover:border-border hover:bg-muted">
                        <div className="flex items-center gap-1">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                const isServices = link.name === "Services";

                                return (
                                    <div
                                        key={link.name}
                                        className="relative"
                                        onMouseEnter={() => isServices ? setHoveredLink("Services") : setHoveredLink(null)}
                                    >
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                "px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-1",
                                                isActive || (isServices && hoveredLink === "Services")
                                                    ? "bg-background text-primary shadow-sm"
                                                    : "text-foreground/80 hover:text-foreground hover:bg-muted"
                                            )}
                                        >
                                            {link.name}
                                            {isServices && (
                                                <LucideChevronDown size={14} className={cn("transition-transform duration-300", hoveredLink === "Services" ? "rotate-180" : "")} />
                                            )}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <CTALink href="/contact" size="sm" className="shadow-md shadow-primary/10">
                            Schedule Demo
                        </CTALink>
                    </div>
                    <div className="xl:hidden flex items-center gap-3">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Menu"
                            className="p-2 rounded-xl bg-muted border border-border text-foreground transition-colors hover:bg-primary/5"
                        >
                            {isOpen ? <LucideX size={20} /> : <LucideMenu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
                {hoveredLink === "Services" && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 w-full bg-background border-b border-border shadow-2xl overflow-hidden"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                            <div className="grid grid-cols-12 gap-10">
                                {/* Left Side: Categories */}
                                <div className="col-span-4 border-r border-border/50 pr-8">
                                    {/* <div className="flex items-center gap-2 mb-6 text-primary">
                                        <LucideLayoutGrid size={18} />
                                        <span className="text-xs font-black uppercase tracking-widest">Service Categories</span>
                                    </div> */}
                                    <div className="space-y-1">
                                        {serviceCategories.map((cat) => (
                                            <button
                                                key={cat.slug}
                                                onMouseEnter={() => setActiveCategory(cat)}
                                                onClick={() => {
                                                    setHoveredLink(null);
                                                    window.location.href = `/services/${cat.slug}`;
                                                }}
                                                className={cn(
                                                    "w-full text-left p-4 rounded-2xl transition-all duration-300 group flex items-center justify-between",
                                                    activeCategory?.slug === cat.slug
                                                        ? "bg-primary text-background shadow-lg shadow-primary/20 scale-[1.02]"
                                                        : "hover:bg-muted text-foreground/80 hover:text-foreground"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "p-2 rounded-lg transition-colors",
                                                        activeCategory?.slug === cat.slug ? "bg-background/20" : "bg-primary/5 text-primary group-hover:bg-primary/10"
                                                    )}>
                                                        {React.createElement(getIcon(cat.icon), { size: 18 })}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm leading-none">{cat.name}</p>
                                                    </div>
                                                </div>
                                                <LucideArrowRight size={14} className={cn("transition-all duration-300", activeCategory?.slug === cat.slug ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100")} />
                                            </button>
                                        ))}
                                    </div>
                                    <Link
                                        href="/services"
                                        className="mt-8 flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest hover:gap-3 transition-all p-4"
                                    >
                                        View All Solutions <LucideArrowRight size={14} />
                                    </Link>
                                </div>

                                {/* Right Side: Services Grid */}
                                <div className="col-span-8">
                                    {activeCategory ? (
                                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                            <div className="mb-6">
                                                <h4 className="text-xl font-black text-foreground">{activeCategory.name}</h4>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                {activeCategory.categoryServices?.map((service: any) => (
                                                    <Link
                                                        key={service.slug}
                                                        href={`/services/${activeCategory.slug}/${service.slug}`}
                                                        onClick={() => setHoveredLink(null)}
                                                        className="group p-5 bg-muted/30 border border-border/50 rounded-2xl hover:border-primary/30 hover:bg-background hover:shadow-xl transition-all duration-300"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="p-2.5 rounded-xl bg-background border border-border group-hover:bg-primary group-hover:text-background transition-colors shadow-sm">
                                                                {React.createElement(getIcon(service.icon), { size: 20 })}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-sm text-foreground mb-0.5 group-hover:text-primary transition-colors">
                                                                    {service.title}
                                                                </p>
                                                                <RichText
                                                                    content={service.excerpt || service.description}
                                                                    className="text-[11px] text-foreground/70 line-clamp-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                                {(!activeCategory.categoryServices || activeCategory.categoryServices.length === 0) && (
                                                    <div className="col-span-2 py-10 text-center border-2 border-dashed border-border rounded-2xl">
                                                        <p className="text-sm text-foreground/40 font-medium">No specialized services listed in this category.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-muted/20 rounded-3xl border border-dashed border-border">
                                            <div className="p-4 rounded-full bg-background mb-4 shadow-inner">
                                                <LucideLayoutGrid size={32} className="text-primary/30" />
                                            </div>
                                            <p className="font-bold text-foreground/60">Select a category to explore specialized solutions.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={navContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 z-50 flex flex-col bg-background backdrop-blur-xl xl:hidden h-screen"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
                            <Logo logoType="full" logoHeight={130} logoWidth={130} />
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label="Toggle Menu"
                                className="p-2 rounded-xl bg-muted border border-border text-foreground transition-colors hover:bg-primary/5"
                            >
                                {isOpen ? <LucideX size={20} /> : <LucideMenu size={20} />}
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
                            <nav className="space-y-4">
                                {navLinks.map((link) => {
                                    const isServices = link.name === "Services";

                                    return (
                                        <motion.div
                                            key={link.name}
                                            variants={navItemVariants}
                                        >
                                            {isServices ? (
                                                <div className="space-y-2">
                                                    <button
                                                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                                                        className={cn(
                                                            "group flex items-center justify-between p-4 w-full rounded-2xl text-2xl font-semibold transition-all duration-200",
                                                            isMobileServicesOpen ? "bg-primary/5 text-primary" : "text-muted-foreground"
                                                        )}
                                                    >
                                                        <span>{link.name}</span>
                                                        <LucideChevronDown size={24} className={cn("transition-transform duration-300", isMobileServicesOpen ? "rotate-180" : "")} />
                                                    </button>
                                                    <AnimatePresence>
                                                        {isMobileServicesOpen && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-hidden pl-4 space-y-2"
                                                            >
                                                                {serviceCategories.map((cat) => (
                                                                    <Link
                                                                        key={cat.slug}
                                                                        href={`/services/${cat.slug}`}
                                                                        onClick={() => setIsOpen(false)}
                                                                        className="block p-3 text-lg font-bold text-foreground/60 border-l-2 border-border hover:border-primary hover:text-primary transition-all"
                                                                    >
                                                                        {cat.name}
                                                                    </Link>
                                                                ))}
                                                                <Link
                                                                    href="/services"
                                                                    onClick={() => setIsOpen(false)}
                                                                    className="block p-3 text-lg font-black text-primary"
                                                                >
                                                                    View All Services
                                                                </Link>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className={cn(
                                                        "group flex items-center justify-between p-4 rounded-2xl text-2xl font-semibold transition-all duration-200",
                                                        pathname === link.href
                                                            ? "border border-primary/50 bg-primary/2"
                                                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                                    )}
                                                >
                                                    <span>{link.name}</span>
                                                    <LucideArrowRight
                                                        size={20}
                                                        className={cn(
                                                            "transition-transform duration-300",
                                                            pathname === link.href ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                                        )}
                                                    />
                                                </Link>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </nav>

                            <motion.div
                                variants={navItemVariants}
                                className="space-y-6 pb-8"
                            >
                                <div className="h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />

                                <CTALink
                                    href="/contact"
                                    className="w-full py-5 text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-transform"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Schedule Demo
                                </CTALink>

                                <div className="flex flex-col items-center gap-2">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                                        <LucideShieldCheck size={14} />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                                            HIPAA Secure Environment
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}