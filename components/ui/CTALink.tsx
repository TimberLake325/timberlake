import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const ctaLinkVariants = cva(
    [
        'group inline-flex items-center justify-center',
        'font-semibold tracking-tight',
        'transition-all duration-300 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'ring-offset-background',
    ].join(' '),
    {
        variants: {
            variant: {

                primary:
                    'bg-primary text-background shadow-md shadow-primary/20 ' +
                    'hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 ' +
                    'hover:-translate-y-[1px] active:translate-y-0',

                secondary:
                    'bg-muted text-foreground border border-border ' +
                    'hover:bg-border/50 hover:-translate-y-[1px]',

                outline:
                    'border-2 border-primary/20 text-primary ' +
                    'hover:bg-primary hover:text-background hover:border-primary ' +
                    'hover:-translate-y-[1px]',

                link:
                    'text-primary underline-offset-8 p-0 h-auto ' +
                    'hover:underline',

                ghost:
                    'foreground/70 hover:text-primary hover:bg-primary/5',
            },
            size: {
                default: 'h-11 px-6 rounded-xl text-sm',
                sm: 'h-9 px-4 rounded-lg text-xs uppercase tracking-widest',
                lg: 'h-14 px-10 rounded-2xl text-base',
                icon: 'h-10 w-10 rounded-xl',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default',
        },
    }
);

export interface CTALinkProps
    extends VariantProps<typeof ctaLinkVariants> {
    href: string;
    children?: React.ReactNode;
    icon?: any;
    iconPosition?: 'left' | 'right';
    className?: string;
    target?: '_blank' | '_self';
    rel?: string;
    onClick?: () => void;
}

const CTALink = ({
    href,
    variant,
    size,
    icon: Icon,
    iconPosition = 'right',
    className,
    children,
    target = '_self',
    rel,
    onClick,
    ...props
}: CTALinkProps) => {
    return (
        <Link
            href={href}
            className={cn(ctaLinkVariants({ variant, size }), className)}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : rel}
            onClick={onClick}
            {...props}
        >
            {Icon && iconPosition === 'left' && (
                <Icon
                    className="
            mr-2.5 h-4 w-4
            transition-transform duration-300 ease-out
            group-hover:-translate-x-1
          "
                    aria-hidden="true"
                />
            )}

            <span className="relative z-10">{children}</span>

            {Icon && iconPosition === 'right' && (
                <Icon
                    className="
            ml-2.5 h-4 w-4
            transition-transform duration-300 ease-out
            group-hover:translate-x-1
          "
                    aria-hidden="true"
                />
            )}
        </Link>
    );
};

export { CTALink, ctaLinkVariants };
