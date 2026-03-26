import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Heading from '@/components/common/Heading';
import Subheading from '@/components/common/Subheading';
import Description from '@/components/common/Description';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    centered?: boolean;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

import RichText from './RichText';

export default function SectionHeader({
    title,
    subtitle,
    description,
    centered = true,
    className,
    size = 'md',
}: SectionHeaderProps) {

    const sizes = {
        sm: { title: 'lg', desc: 'sm', spacing: 'mb-8' },
        md: { title: '2xl', desc: 'md', spacing: 'mb-12' },
        lg: { title: '3xl', desc: 'lg', spacing: 'mb-16' },
    } as const;

    return (
        <div className={cn(
            "relative z-10",
            sizes[size].spacing,
            centered ? "mx-auto text-center" : "text-left",
            className
        )}>

            {subtitle && (
                <div className={cn('flex items-center gap-3 mb-4', centered ? 'justify-center' : 'justify-start')}>
                    <span className="h-px w-6 bg-primary/40 hidden sm:block" />
                    <RichText 
                        content={subtitle} 
                        className="p-0! m-0! text-xs font-black uppercase tracking-widest text-primary leading-none" 
                    />
                    <span className="h-px w-6 bg-primary/40 hidden sm:block" />
                </div>
            )}


            <Heading as="h2" size={sizes[size].title} align={centered ? 'center' : 'left'} className={cn('font-black tracking-tight text-foreground leading-[1.1] mb-6', centered ? 'max-w-3xl mx-auto' : 'max-w-2xl')}>
                {title}
                <span className="text-primary">.</span>
            </Heading>


            {description && (
                <RichText 
                    content={description} 
                    className={cn('text-foreground/90 font-medium leading-relaxed', centered ? 'max-w-2xl mx-auto' : 'max-w-xl')} 
                />
            )}


            {size === 'lg' && (
                <div className={cn(
                    "mt-8 h-1 w-12 bg-primary/20 rounded-full",
                    centered && "mx-auto"
                )} />
            )}
        </div>
    );
}