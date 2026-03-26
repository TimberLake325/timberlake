'use client';

import Card from './Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface StatCardProps {
    value: string;
    label: string;
    description?: string;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    className?: string;
}

export default function StatCard({
    value,
    label,
    description,
    trend,
    className
}: StatCardProps) {
    return (
        <Card
            className={cn("group relative overflow-hidden", className)}
            shadow="sm"
            hoverable
        >

            <div className="absolute -right-4 -top-4 text-primary/5 group-hover:text-primary/10 transition-colors">
                <TrendingUp size={120} strokeWidth={1} />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">

                {trend && (
                    <div className={cn(
                        "mb-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                        trend.isPositive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                    )}>
                        {trend.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {trend.value}
                    </div>
                )}


                <div className="text-4xl md:text-5xl font-mono font-black text-foreground tracking-tighter mb-2">
                    {value}
                </div>


                <div className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                    {label}
                </div>


                {description && (
                    <p className="text-xs font-medium foreground/70/70 leading-relaxed max-w-[200px]">
                        {description}
                    </p>
                )}
            </div>


            <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full group-hover:bg-primary transition-colors duration-500" />
        </Card>
    );
}