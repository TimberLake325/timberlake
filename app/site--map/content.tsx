import Link from 'next/link';
import { FiArrowUpRight, FiLink } from 'react-icons/fi';
import { LucideLayout, LucideFileText, LucideBriefcase, LucideMapPin, LucideShield, LucideLink } from 'lucide-react';
import SectionTitle from '@/components/common/SectionTitle';
import PageHeader from '@/components/ui/PageHeader';

interface SitemapContentProps {
    data: {
        title?: string;
        subtitle?: string;
        sections: any[];
        metadata?: any;
    }
}

const getSectionIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('page')) return <LucideLayout className="text-primary" size={24} />;
    if (t.includes('blog')) return <LucideFileText className="text-amber-500" size={24} />;
    if (t.includes('service')) return <LucideBriefcase className="text-emerald-500" size={24} />;
    if (t.includes('state')) return <LucideMapPin className="text-rose-500" size={24} />;
    if (t.includes('legal') || t.includes('privacy')) return <LucideShield className="text-slate-500" size={24} />;
    return <LucideLink className="text-primary" size={24} />;
};

const SitemapContent = ({ data }: SitemapContentProps) => {
    const sections = data?.sections || [];
    const metadata = data?.metadata || {};

    return (
        <section className=" bg-muted/30 relative overflow-hidden min-h-screen">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-16 text-center max-w-3xl mx-auto">

                </div>

                <div className="space-y-12">
                    {sections.map((section: any, idx: number) => (
                        <div key={idx} className="w-full">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-muted rounded-2xl">
                                    {getSectionIcon(section.title)}
                                </div>
                                <h2 className="text-2xl font-black text-foreground tracking-tight">
                                    {section.title}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {section.links?.map((link: any, lIdx: number) => (
                                    <Link
                                        key={lIdx}
                                        href={link.href}
                                        className="group"
                                    >
                                        <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-2xl p-5 hover:border-primary/30 transition-all hover:shadow-lg hover:bg-background/80 h-full flex flex-col">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="p-2 bg-muted/70 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                                    <FiLink className="text-primary" size={16} />
                                                </div>
                                                <FiArrowUpRight className="text-border group-hover:text-primary transition-colors" size={18} />
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                                                    {link.name}
                                                </h3>
                                                {link.description && (
                                                    <p className="text-xs foreground/70 font-medium leading-relaxed line-clamp-2">
                                                        {link.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 pt-10 border-t border-border/50 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-background/50 backdrop-blur-sm rounded-full border border-border/40">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold foreground/70 uppercase tracking-widest">
                            Data Synchronized: {new Date().toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SitemapContent;