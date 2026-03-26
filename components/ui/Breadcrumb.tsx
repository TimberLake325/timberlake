'use client';

import { serviceCategories, services } from '@/utils/services';
import { clsx, type ClassValue } from 'clsx';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface BreadcrumbItem {
    label: string;
    href: string | null;
}

export default function Breadcrumb() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    const generateBreadcrumbs = (): BreadcrumbItem[] => {
        const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

        if (segments[0] === 'blog') {
            breadcrumbs.push({ label: 'Resources', href: '/blog' });
            if (segments[1]) {
                const categoryLabel = segments[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                breadcrumbs.push({ label: categoryLabel, href: `/blog/${segments[1]}` });
                if (segments[2]) {
                    const blogLabel = segments[2].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    breadcrumbs.push({ label: blogLabel, href: null });
                }
            }
        } else if (segments[0] === 'services') {
            breadcrumbs.push({ label: 'Services', href: '/services' });
            if (segments[1]) {
                const category = serviceCategories.find(c => c.slug === segments[1]);
                if (category) breadcrumbs.push({ label: category.title, href: `/services/${segments[1]}` });
                if (segments[2]) {
                    const service = services.find(s => s.slug === segments[2]);
                    if (service) breadcrumbs.push({ label: service.title, href: null });
                }
            }
        } else if (segments.length > 0) {

            const pageTitle = segments[0].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            breadcrumbs.push({ label: pageTitle, href: null });
        }

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.label,
            ...(crumb.href && { item: `https://timberlake.com${crumb.href}` }),
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav
                aria-label="Breadcrumb"
                className="bg-muted/50 border-b border-border/50 py-3"
            >
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <ol className="flex items-center flex-wrap gap-y-2">
                        {breadcrumbs.map((crumb, index) => {
                            const isLast = index === breadcrumbs.length - 1;

                            return (
                                <li key={index} className="flex items-center group">
                                    {index === 0 ? (
                                        <Link
                                            href="/"
                                            className="foreground/70 hover:text-primary transition-colors flex items-center gap-1.5"
                                            aria-label="Home"
                                        >
                                            <Home size={14} strokeWidth={2.5} />
                                            <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest">Home</span>
                                        </Link>
                                    ) : (
                                        <>
                                            <ChevronRight
                                                size={14}
                                                className="mx-3 foreground/70/40 flex-shrink-0"
                                                strokeWidth={3}
                                            />
                                            {crumb.href && !isLast ? (
                                                <Link
                                                    href={crumb.href}
                                                    className="text-xs font-bold uppercase tracking-widest foreground/70 hover:text-primary transition-colors underline-offset-4 hover:underline"
                                                >
                                                    {crumb.label}
                                                </Link>
                                            ) : (
                                                <span
                                                    className="text-xs font-bold uppercase tracking-widest text-foreground truncate max-w-[200px] md:max-w-md"
                                                    aria-current="page"
                                                >
                                                    {crumb.label}
                                                </span>
                                            )}
                                        </>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </nav>
        </>
    );
}