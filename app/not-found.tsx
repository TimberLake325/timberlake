import Link from "next/link";
import { LucideHome, LucideSearch, LucidePhone, LucideShieldCheck, LucideChevronRight, LucideCompass } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-background relative overflow-hidden px-4">

            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
                <span className="text-[20rem] md:text-[35rem] font-black text-primary">404</span>
            </div>

            <div className="max-w-3xl w-full relative z-10 text-center space-y-12">

                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full text-primary">
                        <LucideCompass size={14} className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Network Navigation Hub</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter uppercase italic leading-[0.9]">
                        Let’s Get You <span className="text-primary">Back On Track</span>
                    </h1>

                    <p className="foreground/70 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
                        The page you are looking for has been moved or updated. Use our central directory below to find the correct resource.
                    </p>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    {[
                        { title: "Main Dashboard", desc: "Return to Home", href: "/", icon: LucideHome },
                        { title: "Service Modules", desc: "Explore RCM Solutions", href: "/services", icon: LucideShieldCheck },
                        { title: "National Coverage", desc: "View State Hubs", href: "/states", icon: LucideSearch },
                        { title: "Provider Support", desc: "Speak with our Team", href: "/contact", icon: LucidePhone },
                    ].map((link, i) => (
                        <Link
                            key={i}
                            href={link.href}
                            className="group p-8 bg-background border-2 border-primary/5 rounded-[2.5rem] hover:border-primary hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex items-center gap-6"
                        >
                            <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-500">
                                <link.icon size={22} />
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-[10px] font-black uppercase tracking-widest foreground/70/40 group-hover:text-primary transition-colors mb-1">{link.title}</h3>
                                <p className="text-xl font-black text-foreground italic flex items-center justify-between tracking-tight">
                                    {link.desc}
                                    <LucideChevronRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-300" />
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}