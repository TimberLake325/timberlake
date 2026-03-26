import { LucideArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";
import RichText from "../ui/RichText";
import Image from "next/image";

export default function ServiceCategoryCard({ category, subServices = [] }: { category: any, subServices?: any[] }) {

    return (
        <Link href={`/services/${category.slug}`} className="group relative rounded-3xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full overflow-hidden bg-[#fac265] p-0 ">

            <img src={category.image ? category.image : 'https://jrm3wrhwseeb6vic.public.blob.vercel-storage.com/uploads/blog/blog-1772119315104-106839338-Firefly_GeminiFlash_A%20modern%20medical%20billing%20office%20environment%2C%20clean%20and%20professional%20atmosphere%2C%20healt%20637578.png'} alt={category.name} className="w-full h-48 object-cover mb-4" />
            <div className="pb-4 lg:pb-6">

                <h3 className="px-4 lg:px-6 text-2xl font-black text-foreground mb-4 uppercase italic tracking-tight z-1">
                    {category.name}
                </h3>
                <div className="mb-4 lg:mb-6 grow z-1">
                    <RichText
                        content={category.excerpt}
                        className="text-foreground/70 text-sm font-medium leading-relaxed [&_p]:text-sm [&_p]:font-medium [&_p]:foreground/70 [&_p]:leading-relaxed"
                    />
                </div>

                <div className="pr-4 lg:pr-6">
                    <div className="relative overflow-hidden group w-full h-14 border border-foreground/10 border-l-0 rounded-r-full cursor-pointer bg-background">

                        {/* Sliding background */}
                        <div className="absolute inset-0 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-r-full"></div>

                        {/* Content */}
                        <div className="relative z-10 flex items-center justify-center gap-3 w-full h-full text-foreground group-hover:text-background font-black uppercase tracking-widest text-xs">
                            Explore Category <LucideArrowRight size={16} />
                        </div>

                    </div>
                </div>
            </div>
        </Link>
    );
}