'use client';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
    AlertCircle,
    CheckCircle,
    Info,
    XCircle,
    ShieldAlert
} from 'lucide-react';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type BannerType = 'info' | 'success' | 'warning' | 'error' | 'security';

interface InfoBannerProps {
    type: BannerType;
    title?: string;
    message: string | React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    variant?: 'flat' | 'glass';
}

const bannerConfig: Record<BannerType, { icon: any, styles: string, accent: string }> = {
    info: {
        icon: Info,
        styles: 'bg-blue-50/50 border-blue-200 text-blue-900',
        accent: 'bg-blue-600'
    },
    success: {
        icon: CheckCircle,
        styles: 'bg-emerald-50/50 border-emerald-200 text-emerald-900',
        accent: 'bg-emerald-600'
    },
    warning: {
        icon: AlertCircle,
        styles: 'bg-amber-50/50 border-amber-200 text-amber-900',
        accent: 'bg-amber-600'
    },
    error: {
        icon: XCircle,
        styles: 'bg-red-50/50 border-red-200 text-red-900',
        accent: 'bg-red-600'
    },
    security: {
        icon: ShieldAlert,
        styles: 'bg-slate-900 border-slate-700 text-slate-100',
        accent: 'bg-primary'
    },
};

export default function InfoBanner({
    type,
    title,
    message,
    children,
    className,
    variant = 'flat'
}: InfoBannerProps) {
    const config = bannerConfig[type];
    const Icon = config.icon;

    return (
        <div className={cn(
            'relative overflow-hidden border rounded-xl p-5 transition-all duration-300',
            variant === 'glass' && 'backdrop-blur-md shadow-sm',
            config.styles,
            className
        )}>

            <div className={cn("absolute left-0 top-0 bottom-0 w-1", config.accent)} />

            <div className="flex items-start gap-4">
                <div className={cn(
                    "p-2 rounded-lg flex-shrink-0",
                    type !== 'security' ? "bg-background/60 shadow-sm" : "bg-background/10"
                )}>
                    <Icon size={18} strokeWidth={2.5} />
                </div>

                <div className="flex-1 space-y-2">
                    {title && (
                        <h4 className="text-xs font-black uppercase tracking-widest opacity-80 leading-none">
                            {title}
                        </h4>
                    )}
                    <div className="text-sm font-medium leading-relaxed">
                        {message}
                    </div>
                    {children && (
                        <div className="pt-2">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}