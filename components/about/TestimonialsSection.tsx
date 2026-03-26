import React from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
    name: string;
    role: string;
    clinic: string;
    content: string;
    avatar: string;
}

const TestimonialsSection = ({ testimonials }: { testimonials: Testimonial[] }) => {
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <div className="my-32">
            <div className="flex items-center gap-4 mb-12">
                <div className="h-px bg-black/10 grow" />
                <h2 className="text-xl font-black text-black uppercase tracking-widest whitespace-nowrap">What Providers Say</h2>
                <div className="h-px bg-black/10 grow" />
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-${testimonials.length < 3 ? testimonials.length : 3} gap-8`}>
                {testimonials.map((tm, idx) => (
                    <div key={idx} className=" p-10 rounded-4xl border border-pink-200 relative bg-pink-100">
                        <Quote className="absolute top-8 right-10 text-pink-200 w-12 h-12" />
                        <div
                            className="text-lg font-medium text-black/80 leading-relaxed mb-8 relative z-10 italic"
                            dangerouslySetInnerHTML={{ __html: `${tm.content}` }}
                        />
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-black text-primary">
                                {tm.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-black">{tm.name}</h4>
                                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">{tm.role} • {tm.clinic}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimonialsSection;
