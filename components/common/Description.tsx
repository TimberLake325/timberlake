import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface DescriptionProps {
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function Description({ children, size = 'md', className }: DescriptionProps) {
    const sizeClasses = {
        sm: 'text-sm leading-relaxed',
        md: 'text-base leading-relaxed',
        lg: 'text-lg leading-relaxed',
    };

    return (
        <div
            className={cn('foreground/70', sizeClasses[size], className)}
            dangerouslySetInnerHTML={typeof children === 'string' ? { __html: children } : undefined}
        >
            {typeof children !== 'string' ? children : null}
        </div>
    );
}