'use client';

import { LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface IconTextProps {
    icon: LucideIcon;
    text: string | React.ReactNode;
    className?: string;
    iconClassName?: string;
    textClassName?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary' | 'error' | 'success';
    isPill?: boolean;
}

export default function IconText({
    icon: Icon,
    text,
    className,
    iconClassName,
    textClassName,
    size = 'md',
    variant = 'primary',
    isPill = false,
}: IconTextProps) {

    const sizes = {
        sm: { container: 'gap-2', icon: 'w-3.5 h-3.5', text: 'text-xs' },
        md: { container: 'gap-3', icon: 'w-5 h-5', text: 'text-sm font-medium' },
        lg: { container: 'gap-4', icon: 'w-6 h-6', text: 'text-base font-semibold' },
    };

    const variants = {
        primary: 'text-primary',
        secondary: 'foreground/70',
        error: 'text-red-600',
        success: 'text-emerald-600',
    };

    const pillVariants = {
        primary: 'bg-primary/10',
        secondary: 'bg-muted',
        error: 'bg-red-50',
        success: 'bg-emerald-50',
    };

    return (
        <div className={cn(
            'flex items-start',
            sizes[size].container,
            className
        )}>
            <div className={cn(
                'flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110',
                isPill && 'rounded-lg p-1.5',
                isPill && pillVariants[variant],

                size === 'sm' ? 'mt-0' : 'mt-0.5'
            )}>
                <Icon className={cn(
                    sizes[size].icon,
                    variants[variant],
                    iconClassName
                )} />
            </div>

            <span className={cn(
                'leading-snug',
                size === 'md' ? 'text-foreground/90' : 'text-foreground',
                sizes[size].text,
                textClassName
            )}>
                {text}
            </span>
        </div>
    );
}