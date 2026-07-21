import { getBlogCategories, getBlogPageData, getBlogPosts } from "@/actions/blogService";
import BlogContent from "./content";

export const dynamic = "force-static";

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }>; }) {
    const { page } = await searchParams;
    const currentPage = parseInt(page || "1", 10);
    const limit = 5;

    const [blogPageData, categories, { posts, total, totalPages }] = await Promise.all([
        getBlogPageData(),
        getBlogCategories(),
        getBlogPosts(currentPage, limit),
    ]);

    return (
        <BlogContent
            blogPageData={blogPageData}
            categories={categories}
            posts={posts}
            total={total}
            currentPage={currentPage}
            totalPages={totalPages}
        />
    );
}
