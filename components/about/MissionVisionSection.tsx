import { MissionVisionProps } from "@/types/About";
import { LucideEye, LucideTarget } from "lucide-react";

const MissionVisionSection = ({ mission, vision }: MissionVisionProps) => {
    const renderIcon = (iconName: string, size: number = 28) => {
        const icons: Record<string, React.ReactNode> = {
            LucideTarget: <LucideTarget size={size} strokeWidth={2.5} />,
            LucideEye: <LucideEye size={size} />,
        };
        return icons[iconName] || null;
    };

    const MissionCard = () => (
        <div className="lg:col-span-7 group relative h-full">
            <div className="absolute inset-0 bg-primary-dark translate-y-2 rounded-[2.5rem] brightness-75 transition-transform duration-300 group-hover:translate-y-4 h-full" />

            <div className="
      relative bg-primary rounded-[2.5rem] p-12 text-background
      border-t border-white/20  h-full
      transition-all duration-300 ease-out
      -translate-y-1 group-hover:-translate-y-3
            shadow-[0_10px_0_0_rgba(0,0,0,0.2),0_15px_30px_rgba(0,0,0,0.1)]
      active:translate-y-0 active:shadow-none
    ">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[2.5rem] pointer-events-none" />

                <div className="relative z-10 space-y-8">
                    <div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center text-primary shadow-[4px_4px_10px_rgba(0,0,0,0.2)]">
                        {renderIcon(mission.icon)}
                    </div>

                    <div className="space-y-4">
                        <h3
                            className="text-4xl font-black tracking-tight [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]"
                            dangerouslySetInnerHTML={{ __html: mission.title }}
                        />
                        <p
                            className="text-background/90 text-xl leading-relaxed font-medium max-w-xl"
                            dangerouslySetInnerHTML={{
                                __html: mission.description.replace(
                                    mission.highlightedText,
                                    `<span class="bg-black/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] px-2 py-1 rounded-lg border border-white/5">${mission.highlightedText}</span>`
                                )
                            }}
                        />
                    </div>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <LucideTarget size={200} />
                </div>
            </div>
        </div>
    );

    const VisionCard = () => (
        <div
            className="lg:col-span-5 group relative h-full"
            style={{ perspective: "1200px" }}
        >
            {/* Back shadow layer */}
            <div className="
      absolute inset-0 
      bg-slate-200 border-2 border-primary/10 
      rounded-[2.5rem] translate-y-3 
      transition-transform duration-300 
      group-hover:translate-y-6
    " />

            {/* Main card */}
            <div
                className="
      relative h-full bg-background border-2 border-primary/20 rounded-[2.5rem] p-12 
      flex flex-col justify-between 
      transition-all duration-500 ease-out 
      -translate-y-1 group-hover:-translate-y-6
      shadow-[0_10px_20px_rgba(0,0,0,0.1)]
      group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)]
      
      transform-gpu
      [transform-style:preserve-3d] 
    "
            >
                {/* Light reflection */}
                <div className="absolute inset-x-8 top-0 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full" />

                <div className="space-y-6">
                    {/* Icon (front layer) */}
                    <div
                        className="
          w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary 
          border border-primary/10 
          shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]
          transition-all duration-500
          group-hover:-translate-y-4 
          group-hover:shadow-[8px_12px_20px_rgba(0,0,0,0.15)]

          [transform:translateZ(50px)]
        "
                    >
                        {renderIcon(vision.icon)}
                    </div>

                    {/* Text layer */}
                    <div
                        className="space-y-3 [transform:translateZ(35px)]"
                    >
                        <h3
                            className="text-3xl font-black tracking-tight text-foreground"
                            dangerouslySetInnerHTML={{ __html: vision.title }}
                        />
                        <div
                            className="text-foreground/70 text-lg leading-relaxed font-medium"
                            dangerouslySetInnerHTML={{ __html: vision.description }}
                        />
                    </div>
                </div>

                {/* Bottom layer */}
                <div
                    className="mt-8 flex items-center gap-3 [transform:translateZ(25px)]"
                >
                    <div className="w-12 h-1.5 bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-1/3 group-hover:w-full transition-all duration-700" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">
                        Timberlake Standards
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32">
            <MissionCard />
            <VisionCard />
        </div>
    );
};

export default MissionVisionSection;