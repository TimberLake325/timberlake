import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SubheadingProps {
  children: React.ReactNode;
  tone?: 'primary' | 'muted';
  className?: string;
}

export default function Subheading({ children, tone = 'primary', className }: SubheadingProps) {
  const toneClass = tone === 'primary' ? 'text-primary font-bold tracking-wider uppercase text-sm' : 'foreground/70 text-sm';

  return <div className={cn(toneClass, 'block mb-3', className)}>{children}</div>;
}
