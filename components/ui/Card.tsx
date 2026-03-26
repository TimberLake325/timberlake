'use client';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps {
    children: React.ReactNode;
    className?: string;
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'interactive';
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    animate?: boolean;
    hoverable?: boolean;
    withAccent?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    style?: React.CSSProperties;
}

export default function Card({
    children,
    className,
    shadow = 'sm',
    rounded = '2xl',
    animate = false,
    hoverable = false,
    withAccent = false,
    padding = 'md',
    style,
}: CardProps) {

    const shadowClasses = {
        none: '',
        sm: 'shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
        md: 'shadow-[0_8px_30px_rgb(0,0,0,0.06)]',
        lg: 'shadow-[0_10px_40px_rgba(37,99,235,0.08)]',
        interactive: 'shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300',
    };

    const roundedClasses = {
        none: '',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
    };

    const paddingClasses = {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const cardContent = (
        <div
            className={cn(
                'relative bg-background border border-border overflow-hidden',
                shadowClasses[shadow],
                roundedClasses[rounded],
                paddingClasses[padding],
                hoverable && 'hover:border-primary/30 cursor-pointer transition-colors group',
                className
            )}
            style={style}
        >

            {withAccent && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-right from-primary to-accent" />
            )}


            {hoverable && (
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            )}

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );

    if (animate) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1]
                }}
            >
                {cardContent}
            </motion.div>
        );
    }

    return cardContent;
}