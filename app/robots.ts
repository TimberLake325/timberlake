import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://timberlakercm.com';

    const disallowPaths = [
        '/api/',
        '/_next/',
        '/admin/',
    ];

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: disallowPaths,
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}