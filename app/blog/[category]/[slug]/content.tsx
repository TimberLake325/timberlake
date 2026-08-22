import CTABanner from "@/components/sections/CTABanner";
import Share from "@/components/share";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageHeader from "@/components/ui/PageHeader";
import RichText from "@/components/ui/RichText";
import { LucideCalendar } from "lucide-react";
import Link from "next/link";

interface BlogDetailContentProps {
    categoryData: any;
    blog: any;
    relatedPosts: any[];
    categories: any[];
}

const BlogDetailContent = ({
    categoryData,
    blog,
    relatedPosts,
    categories
}: BlogDetailContentProps) => {

    const formattedDate = new Date(blog.publishDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const currentLink = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog.category.slug}/${blog.slug}`

    return (
        <div className="pb-24 bg-background">
            <Breadcrumb />

            <PageHeader
                title={blog.title}
                description={blog.excerpt}
                image={blog.bannerBg}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <img src={blog.image} alt={blog.title} className="w-full" />
                <div className="flex flex-col sm:flex-row items-center justify-between mb-16 py-6 border-y border-primary/5 gap-6">
                    <div className="flex flex-wrap items-center justify-center gap-8">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center">
                                <LucideCalendar size={14} className="text-primary" />
                            </div>
                            <span className="text-xs font-bold foreground/70">{formattedDate}</span>
                        </div>

                    </div>
                    <Share link={currentLink} />
                </div>

                <div className="flex flex-col lg:flex-row gap-16">

                    <RichText content={blog.content} />
                    <div className="lg:w-80 shrink-0 space-y-12">
                        {relatedPosts.length > 0 && (
                            <div className="space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    Related Analysis
                                </h3>
                                <div className="space-y-6">
                                    {relatedPosts.map((post) => (
                                        <Link key={post._id} href={`/blog/${categoryData.slug}/${post.slug}`} className="block group">
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-black text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                                    {post.title}
                                                </h4>
                                                <p className="text-[10px] font-bold foreground/70/40 uppercase tracking-widest">
                                                    {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-32">
                <CTABanner />
            </div>
        </div>
    );
};

export default BlogDetailContent;