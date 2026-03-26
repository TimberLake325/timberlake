import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Heading from '@/components/common/Heading';
import Subheading from '@/components/common/Subheading';
import Description from '@/components/common/Description';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SectionTitleProps {
    title: string;
    level?: 2 | 3;
    subtitle?: string;
    description?: string;
    align?: 'left' | 'center';
    divider?: boolean;
    className?: string;
}

export default function SectionTitle({
    title,
    level = 2,
    subtitle,
    description,
    align = 'center',
    divider = false,
    className,
}: SectionTitleProps) {
    const as = level === 2 ? 'h2' : 'h3';
    const size = level === 2 ? '2xl' : 'xl';

    return (
        <div className={cn('mb-8', align === 'center' && 'mx-auto max-w-3xl', className)}>
            {subtitle && (
                <Subheading className="mb-4">{subtitle}</Subheading>
            )}

            <Heading as={as} size={size} align={align} className="mb-2">
                {title}
            </Heading>

            {description && (
                <Description className={cn('mt-4', align === 'center' ? 'text-center' : 'text-left')} size="md">
                    {description}
                </Description>
            )}

            {divider && (
                <div className="mt-4 h-1 w-20 bg-primary mx-auto rounded-full" />
            )}
        </div>
    );
}