import { LucideArrowRight, LucideNewspaper, LucideUser, LucideCalendar } from 'lucide-react';
import Link from 'next/link';

const BlogCard = ({ post }: { post: any }) => {
    const postHref = `/blog/${post.category?.slug}/${post.slug}`;

    return (
        <Link href={postHref} className='m-0 p-0'>
            <article className="group flex flex-col h-full bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                <div className="relative aspect-[12/9] w-full overflow-hidden bg-muted">
                    {post.image ? (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-muted/50 flex items-center justify-center text-primary/20">
                            <LucideNewspaper size={64} strokeWidth={1} />
                        </div>
                    )}
                </div>

                <div className="flex flex-col grow p-4 space-y-5">
                    <div className="space-y-3  mb-2">
                        <h2 className="text-xl font-black text-foreground transition-colors leading-[1.1] tracking-tight">
                            {post.title}
                        </h2>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 font-medium">
                            {post.excerpt}
                        </p>
                    </div>

                    <div className="pt-2 inline-flex items-center gap-2 group/btn text-primary font-black uppercase tracking-[0.15em] text-[11px] transition-all" >

                        <span className="relative">
                            Read
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                        </span>
                        <div className="p-2 rounded-full bg-primary/5 group-hover/btn:bg-primary group-hover/btn:text-background transition-all">
                            <LucideArrowRight size={14} />
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default BlogCard;