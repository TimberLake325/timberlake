import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const secret = searchParams.get('secret') || request.headers.get('x-revalidate-secret');

        if (!secret || secret !== process.env.REVALIDATE_SECRET) {
            console.error('Unauthorized: Invalid secret');
            return NextResponse.json({ success: false, message: 'Invalid secret' }, { status: 401 });
        }

        const path = searchParams.get('path');
        const tag = searchParams.get('tag');

        const allTags = [
            "terms-page", "service-categories", "services", "services-page",
            "category-by-slug", "service-by-slug", "security-page",
            "privacy-page", "hipaa-page", "contact-page", "about-page",
            "blog-page", "blog-categories", "blog-posts",
            "blog-post-by-slug", "blog-category-by-slug", "related-posts", "states-page", "sitemap-page-data", 'home-page', 'footer', 'theme', "theme-config", "faq"
        ];

        if (path) {

            revalidatePath(path);
            return NextResponse.json({ success: true, revalidated: true, path });
        }

        if (tag) {

            (revalidateTag as any)(tag, 'default');
            return NextResponse.json({ success: true, revalidated: true, tag });
        }

        revalidatePath('/', 'layout');

        for (const t of allTags) {
            try {
                (revalidateTag as any)(t, 'default');
            } catch (e) {

            }
        }

        return NextResponse.json({
            success: true,
            revalidated: true,
            message: 'All paths and tags revalidated',
            tagsCount: allTags.length
        });
    } catch (err: any) {
        console.error('Revalidation error:', err);
        return NextResponse.json({ success: false, message: 'Error revalidating', error: err.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: 'Use POST to revalidate' }, { status: 405 });
}
