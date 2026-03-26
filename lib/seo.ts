import { Metadata } from 'next';

const SITE_CONFIG = {
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://timberlakemedicalbilling.com',
    siteName: 'Timberlake Medical Billing',
    publisher: 'Timberlake Medical Billing',
    creator: 'Timberlake',
    twitterHandle: '@timberlakebilling',
    defaultImage: '/og-image.jpg',
    defaultImageAlt: 'Timberlake Medical Billing - Professional Medical Billing Services',
    locale: 'en_US',
};

export interface SEOData {
    title?: string;
    description?: string;
    keywords?: string[];
    path?: string;
    url?: string;
    canonicalUrl?: string;
    image?: string;
    imageAlt?: string;
    imageWidth?: number;
    imageHeight?: number;
    type?: 'website' | 'article' | 'profile' | 'book';
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[] | { name: string }[];
    section?: string;
    tags?: string[];
    robots?: any;
    twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
    twitterSite?: string;
    twitterCreator?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    twitterImageAlt?: string;
    facebookAppId?: string;
    author?: string;
    copyright?: string;
    generator?: string;
    applicationName?: string;
    themeColor?: string;
    colorScheme?: string;
    viewport?: string;
    formatDetection?: any;
    appleWebAppCapable?: boolean;
    appleStatusBarStyle?: string;
    appleTitle?: string;
    msapplicationTileColor?: string;
    msapplicationTileImage?: string;
    msapplicationConfig?: string;
    structuredData?: any;
    seoTitle?: string;
    seoDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogSiteName?: string;
    ogLocale?: string;
    category?: string;
    classification?: string;
    locale?: string;
    alternateLocales?: string[];
    manifest?: string;
    referrer?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin';
    creator?: string;
    publisher?: string;
}

const DEFAULT_KEYWORDS = [
    'medical billing',
    'revenue cycle management',
    'HIPAA compliance',
    'AAPC certified',
    'healthcare billing services',
    'medical coding',
    'practice management',
    'healthcare revenue optimization',
    'medical claims processing',
    'patient billing',
    'insurance claim submission',
    'denial management',
    'AR recovery',
    'credentialing services',
];

export function generatePageMetadata(seoData: SEOData): Metadata {
    const {
        title,
        description,
        keywords = DEFAULT_KEYWORDS,
        path,
        url,
        canonicalUrl,
        image = SITE_CONFIG.defaultImage,
        imageAlt = SITE_CONFIG.defaultImageAlt,
        imageWidth = 1200,
        imageHeight = 630,
        type = 'website',
        publishedTime,
        modifiedTime,
        authors,
        section,
        tags,
        robots,
        twitterCard = 'summary_large_image',
        twitterSite = SITE_CONFIG.twitterHandle,
        twitterCreator = SITE_CONFIG.twitterHandle,
        twitterTitle,
        twitterDescription,
        twitterImage,
        twitterImageAlt,
        facebookAppId,
        author,
        copyright,
        generator = 'Next.js',
        applicationName = SITE_CONFIG.siteName,
        themeColor = '#7c3aed',
        colorScheme = 'light',
        viewport = 'width=device-width, initial-scale=1.0, maximum-scale=5.0',
        formatDetection,
        appleWebAppCapable = true,
        appleStatusBarStyle = 'default',
        appleTitle,
        msapplicationTileColor = '#7c3aed',
        msapplicationTileImage = '/mstile-144x144.png',
        msapplicationConfig = '/browserconfig.xml',
        structuredData,
        seoTitle,
        seoDescription,
        ogTitle,
        ogDescription,
        ogSiteName,
        ogLocale,
        category = 'healthcare services',
        classification,
        locale = SITE_CONFIG.locale,
        alternateLocales,
        manifest,
        referrer = 'origin-when-cross-origin',
        creator = SITE_CONFIG.creator,
        publisher = SITE_CONFIG.publisher,
    } = seoData;

    const pageUrl = url || path || '';
    const absoluteUrl = pageUrl.startsWith('http')
        ? pageUrl
        : `${SITE_CONFIG.baseUrl}${pageUrl.startsWith('/') ? pageUrl : `/${pageUrl}`}`;

    const imageUrl = image?.startsWith('http')
        ? image
        : `${SITE_CONFIG.baseUrl}${image?.startsWith('/') ? image : `/${image}`}`;

    const finalTitle = seoTitle || (title ? `${title} | ${SITE_CONFIG.siteName}` : SITE_CONFIG.siteName);
    const finalDescription = seoDescription || description || '';

    const processedAuthors = Array.isArray(authors)
        ? authors.map(a => typeof a === 'string' ? { name: a } : a)
        : author ? [{ name: author }] : [{ name: SITE_CONFIG.publisher }];

    const metadata: Metadata = {
        title: finalTitle,
        description: finalDescription,
        keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
        authors: processedAuthors,
        creator: creator,
        publisher: publisher,
        metadataBase: new URL(SITE_CONFIG.baseUrl),
        formatDetection: formatDetection || {
            telephone: true,
            date: false,
            address: false,
            email: false,
            url: false,
        },
        openGraph: {
            type,
            title: ogTitle || title || finalTitle,
            description: ogDescription || description || finalDescription,
            url: absoluteUrl,
            siteName: ogSiteName || SITE_CONFIG.siteName,
            locale: ogLocale || locale,
            images: [
                {
                    url: imageUrl,
                    width: imageWidth,
                    height: imageHeight,
                    alt: imageAlt,
                },
            ],
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
            ...(section && { section }),
            ...(tags && { tags }),
            ...(alternateLocales && { alternateLocale: alternateLocales }),
        },
        twitter: {
            card: twitterCard,
            title: twitterTitle || title || finalTitle,
            description: twitterDescription || description || finalDescription,
            images: [twitterImage || imageUrl],
            creator: twitterCreator,
            site: twitterSite,
        },
        robots: robots || {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': 320,
            },
        },
        alternates: {
            canonical: canonicalUrl || absoluteUrl,
            ...(alternateLocales && {
                languages: Object.fromEntries(alternateLocales.map(loc => [loc, loc]))
            }),
        },
        referrer: referrer as any,
        category: category,
        classification: classification,
        manifest: manifest,
        viewport: viewport,
        themeColor: themeColor,
        icons: {
            icon: '/favicon.ico',
            shortcut: '/favicon-16x16.png',
            apple: '/apple-touch-icon.png',
        },
        appleWebApp: {
            title: appleTitle || title || SITE_CONFIG.siteName,
            statusBarStyle: appleStatusBarStyle as any,
            capable: appleWebAppCapable,
        },
        other: {
            'msapplication-TileColor': msapplicationTileColor,
            'msapplication-TileImage': msapplicationTileImage,
            'msapplication-config': msapplicationConfig,
            ...(structuredData && { 'structured-data': JSON.stringify(structuredData) }),
        },
        ...(facebookAppId && {
            facebook: {
                appId: facebookAppId,
            },
        }),
    };

    return metadata;
}
