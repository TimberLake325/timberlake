import { generatePageMetadata } from "@/lib/seo";
import { getBlogByCategorySlug, getBlogCategories, getBlogPosts } from "@/actions/blogService";
import { notFound } from "next/navigation";
import BlogCategoryContent from "./content";
export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const categoryData = await getBlogByCategorySlug(category);

    if (!categoryData) return {};

    return generatePageMetadata({
        title: `${categoryData.name} | Insights & Analysis | Timberlake`,
        description: categoryData.description || `Specialized medical billing and RCM analysis for ${categoryData.name}. Stay updated with industry shifts.`,
        path: `/blog/${category}`,
        image: categoryData.metadata?.image || '/og-blog.jpg',
    });
}

export default async function BlogCategoryPage({
    params,
    searchParams
}: {
    params: Promise<{ category: string }>;
    searchParams: Promise<{ page?: string }>;
}) {
    const [{ category }, { page }] = await Promise.all([params, searchParams]);
    const currentPage = parseInt(page || "1", 10);
    const limit = 5;

    const categoryData = await getBlogByCategorySlug(category);

    if (!categoryData) {
        notFound();
    }

    const [blogsData, categories] = await Promise.all([
        getBlogPosts(currentPage, limit, categoryData._id.toString()),
        getBlogCategories()
    ]);

    return (
        <BlogCategoryContent
            categoryData={categoryData}
            categoryBlogs={blogsData.posts}
            categories={categories}
            currentPage={currentPage}
            totalPages={blogsData.totalPages}
        />
    );
}
