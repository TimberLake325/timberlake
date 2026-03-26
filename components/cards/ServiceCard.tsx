import { LucideArrowRight, LucideShieldCheck, LucideTrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";
import RichText from "../ui/RichText";

interface ServiceCardProps {
    service: any;
    categorySlug: string;
}

export default function ServiceCard({ service, categorySlug }: ServiceCardProps) {
    return (
        <Link href={`/services/${categorySlug}/${service.slug}`} className="group flex flex-col bg-background border-2 border-primary/5 rounded-3xl p-4 lg:p-6 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 h-full">

            <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight uppercase italic">{service.title}</h3>

            <div className="mb-8 grow line-clamp-4">
                <RichText
                    content={service.description}
                    className="text-foreground/70 text-sm font-medium leading-relaxed [&_p]:text-sm [&_p]:font-medium [&_p]:foreground/70 [&_p]:leading-relaxed"
                />
            </div>

            {service.keyFeatures && service.keyFeatures.length > 0 && (
                <div className="space-y-4 mb-10">
                    <p className="text-[10px] font-black uppercase tracking-widest foreground/70/40">Core Benefits</p>
                    <ul className="space-y-3">
                        {service.keyFeatures.slice(0, 3).map((benefit: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm font-bold text-foreground/70">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                <span className="line-clamp-1">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <Button variant="outline" className="w-full h-14 rounded-2xl border-2 border-primary/10 text-primary font-black uppercase tracking-widest text-[10px] group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all duration-300 gap-3 cursor-pointer hover:text-background">
                Technical Specs <LucideArrowRight size={14} />
            </Button>
        </Link>
    );
}
