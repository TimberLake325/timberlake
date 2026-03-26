import { LucideTag, LucideArrowRight } from "lucide-react";
import Link from "next/link";

const BlogCategory = ({ blogCategories }: { blogCategories: any[] }) => {
    return (
        <div className="">
            <div className="space-y-2">
                <h3 className="text-xl font-black uppercase tracking-widest text-foreground italic flex items-center gap-2">
                    <LucideTag size={18} className="text-primary" /> All Categories
                </h3>
            </div>

            <ul className="space-y-4 pt-4">
                {blogCategories && blogCategories.length > 0 ? (
                    blogCategories.map((cat: any) => (
                        <li key={cat._id || cat.slug} className="border border-primary/30 rounded-2xl  px-2 py-1.5">
                            <Link href={`/blog/${cat.slug}`} className="flex justify-between items-center group">
                                <span className="text-sm font-bold foreground/70 group-hover:text-primary transition-colors tracking-tight">
                                    {cat.name}
                                </span>
                                <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all shadow-sm">
                                    <LucideArrowRight size={14} className="" />
                                </div>
                            </Link>
                        </li>
                    ))
                ) : (
                    <p className="text-xs font-bold foreground/70/40 uppercase tracking-widest">No categories available</p>
                )}
            </ul>
        </div>
    );
};

export default BlogCategory;