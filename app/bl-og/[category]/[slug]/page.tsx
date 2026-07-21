import { getBlogCategories, getBlogPostBySlug, getRelatedPosts } from "@/actions/blogService";
import { notFound } from "next/navigation";
import BlogDetailContent from "./content";
export const dynamic = "force-static";

export default async function BlogDetailPage({
    params
}: {
    params: Promise<{ category: string; slug: string }>
}) {
    const { category, slug } = await params;

    const blog = await getBlogPostBySlug(slug);

    if (!blog || !blog.category || blog.category.slug !== category) {
        notFound();
    }

    const [relatedPosts, categories] = await Promise.all([
        getRelatedPosts(blog.category._id.toString(), blog._id.toString()),
        getBlogCategories()
    ]);

    return (
        <BlogDetailContent
            categoryData={blog.category}
            blog={blog}
            relatedPosts={relatedPosts}
            categories={categories}
        />
    );
}
