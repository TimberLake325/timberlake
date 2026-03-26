import { Leader, LeadershipSectionProps } from "@/types/About";

const LeadershipSection = ({ title, subtitle, members }: LeadershipSectionProps) => {
    const LeaderCard = ({ leader }: { leader: Leader }) => (
        <div className="bg-background border border-border rounded-4xl p-8 text-center hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group">
            <div className="relative w-28 h-28 mx-auto mb-6">
                <div className="absolute inset-0 bg-primary/10 rounded-full group-hover:scale-110 transition-transform duration-300" />
                <div className="relative w-full h-full bg-background rounded-full border-2 border-primary/20 flex items-center justify-center text-primary font-black text-2xl shadow-inner italic">
                    {leader.initials}
                </div>
            </div>
            <h3 className="text-xl font-black text-foreground mb-1">{leader.name}</h3>
            <div className="text-primary font-bold text-[11px] uppercase tracking-widest mb-4">
                {leader.role}
            </div>
            <div
                className="text-foreground/70 text-sm font-medium leading-relaxed italic"
                dangerouslySetInnerHTML={{ __html: `${leader.description}` }}
            />
        </div>
    );

    return (
        <div className="mb-32">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl font-black tracking-tight text-foreground uppercase">
                    {title}
                </h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
                <div
                    className="max-w-2xl mx-auto foreground/70 text-lg font-medium"
                    dangerouslySetInnerHTML={{ __html: subtitle }}
                />
            </div>

            <div className="grid grid-cols-1 gap-8">
                {members.map((leader) => (
                    <LeaderCard key={leader.id} leader={leader} />
                ))}
            </div>
        </div>
    );
};

export default LeadershipSection;