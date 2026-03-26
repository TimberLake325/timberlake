import { ComplianceSectionProps } from "@/types/About";
import { LucideShield, LucideShieldCheck, LucideCheckCircle2 } from "lucide-react";

const ComplianceSection = ({
    title,
    badge,
    badgeIcon,
    quote,
    certifications,
    verificationCode,
    watermarkIcon
}: ComplianceSectionProps) => {
    const renderIcon = (iconName: string, size: number = 18) => {
        const icons: Record<string, React.ReactNode> = {
            LucideShield: <LucideShield size={size} />,
            LucideShieldCheck: <LucideShieldCheck size={size} />,
            LucideCheckCircle2: <LucideCheckCircle2 size={size} />,
        };
        return icons[iconName] || null;
    };

    return (
        <div className="bg-primary/5 rounded-[3.5rem] p-10 md:p-16 border border-primary/10 relative overflow-hidden"
            style={{
                backgroundImage: "url('/images/about-security-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className={`absolute top-0 right-0  h-full  pointer-events-none w-full bg-linear-to-l from-transparent  to-black/50    `} />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                <div className="lg:col-span-1 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-primary/20 rounded-full shadow-sm">
                        {renderIcon(badgeIcon)}
                        <span className="text-[10px] font-black uppercase tracking-wider text-primary">
                            {badge}
                        </span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tight leading-tight text-background">
                        {title}
                    </h3>
                    <div className="flex flex-col gap-3">
                        {certifications.map((cert) => (
                            <div key={cert} className="flex items-center gap-3 text-sm font-bold text-background/70 ">
                                <LucideCheckCircle2 className="text-primary" size={16} />
                                {cert}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2 bg-background/70 rounded-3xl p-8 md:p-12 shadow-xl shadow-primary/5 border border-background">
                    <div
                        className="text-lg md:text-xl foreground/70 leading-relaxed font-medium italic"
                        dangerouslySetInnerHTML={{ __html: `${quote}` }}
                    />
                    <div className="mt-8 pt-8 border-t border-muted flex items-center justify-between">

                        <div className="flex gap-1">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-1.5 h-1.5 bg-primary rounded-full opacity-30" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplianceSection;