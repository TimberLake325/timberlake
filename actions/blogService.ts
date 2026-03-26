import { dbConnect } from "@/lib/db";
import { BlogCategory, BlogPost, BlogPage } from "@/lib/model";
import { unstable_cache } from "next/cache";

export const getBlogPageData = unstable_cache(
    async () => {
        await dbConnect();
        const data = await BlogPage.findOne().lean();
        return data ? JSON.parse(JSON.stringify(data)) : null;
    },
    ["blog-page-data"],
    {
        revalidate: false,
        tags: ["blog-page"],
    }
);

export const getBlogCategories = unstable_cache(
    async () => {
        await dbConnect();
        const categories = await BlogCategory.find({ isActive: true }).sort({ name: 1 }).lean();
        return JSON.parse(JSON.stringify(categories));
    },
    ["blog-categories"],
    {
        revalidate: false,
        tags: ["blog-categories"],
    }
);

export const getBlogByCategorySlug = unstable_cache(
    async (categorySlug: string) => {
        await dbConnect();
        const category = await BlogCategory.findOne({ slug: categorySlug, isActive: true }).lean();
        return category ? JSON.parse(JSON.stringify(category)) : null;
    },
    ["blog-category-by-slug"],
    {
        revalidate: false,
        tags: ["blog-category-by-slug"],
    }
);

export const getBlogPosts = unstable_cache(
    async (page: number = 1, limit: number = 5, categoryId?: string) => {
        await dbConnect();
        const skip = (page - 1) * limit;

        const query: any = {
            isPublished: true,
            isDeleted: false,
        };

        if (categoryId) {
            query.category = categoryId;
        }

        const posts = await BlogPost.find(query)
            .populate('category', 'name slug')
            .select('title slug excerpt image category')
            .sort({ publishDate: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
        const total = await BlogPost.countDocuments(query);

        return {
            posts: JSON.parse(JSON.stringify(posts)),
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    },
    ["blog-posts"],
    {
        revalidate: false,
        tags: ["blog-posts"],
    }
);

export const getBlogPostBySlug = unstable_cache(
    async (slug: string) => {
        await dbConnect();
        const post = await BlogPost.findOne({
            slug,
            isPublished: { $ne: false },
            isDeleted: { $ne: true }
        })
            .populate('category', 'name slug')
            .lean();

        return post ? JSON.parse(JSON.stringify(post)) : null;
    },
    ["blog-post-by-slug"],
    {
        revalidate: false,
        tags: ["blog-post-by-slug"],
    }
);

export const getRelatedPosts = unstable_cache(
    async (categoryId: string, currentPostId: string, limit: number = 3) => {
        await dbConnect();
        const posts = await BlogPost.find({
            category: categoryId,
            _id: { $ne: currentPostId },
            isPublished: { $ne: false },
            isDeleted: { $ne: true }
        })
            .sort({ publishDate: -1 })
            .limit(limit)
            .lean();

        return JSON.parse(JSON.stringify(posts));
    },
    ["related-posts"],
    {
        revalidate: false,
        tags: ["related-posts"],
    }
);
