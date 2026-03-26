import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type HeadingLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps {
  children: React.ReactNode;
  as?: HeadingLevels;
  size?: 'lg' | 'xl' | '2xl' | '3xl';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const sizeMap: Record<NonNullable<HeadingProps['size']>, string> = {
  lg: 'text-2xl md:text-3xl',
  xl: 'text-3xl md:text-4xl',
  '2xl': 'text-4xl md:text-5xl',
  '3xl': 'text-5xl md:text-6xl',
};

const Heading = React.forwardRef<HTMLElement, HeadingProps>(
  ({ children, as = 'h2', size = '2xl', align = 'left', className }, ref) => {
    const Tag = as as any;
    const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

    return (
      <Tag
        ref={ref}
        className={cn(
          'font-extrabold text-foreground leading-tight',
          sizeMap[size],
          alignClass,
          className
        )}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = 'Heading';

export default Heading;
