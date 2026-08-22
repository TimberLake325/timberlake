import BlogCard from "@/components/cards/blogCard";
import BlogCategory from "@/components/common/blogCategory";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageHeader from "@/components/ui/PageHeader";
import { Pagination } from "@/components/ui/Pagination";

interface BlogCategoryContentProps {
    categoryData: any;
    categoryBlogs: any[];
    categories: any[];
    currentPage: number;
    totalPages: number;
}

const BlogCategoryContent = ({
    categoryData,
    categoryBlogs,
    categories,
    currentPage,
    totalPages
}: BlogCategoryContentProps) => {
    return (
        <div className="pb-24 bg-background min-h-screen">
            <Breadcrumb />

            <div className="relative overflow-hidden">
                <PageHeader
                    title={`${categoryData.name}`}
                    description={categoryData.description || `Advanced insights, regulatory updates, and strategic analysis focused on ${categoryData.name.toLowerCase()}.`}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {categories && categories.length > 0 &&
                        <div className="lg:w-64 shrink-0 space-y-12">
                            <BlogCategory blogCategories={categories} />
                        </div>
                    }

                    <div className="lg:grow space-y-16">
                        {categoryBlogs.length > 0 ? (
                            <>
                                <div className="space-y-16 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10">
                                    {categoryBlogs.map((blog, key) => (
                                        <BlogCard key={key} post={blog} />
                                    ))}
                                </div>

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    baseUrl={`/blog/${categoryData.slug}`}
                                />
                            </>
                        ) : (
                            <div className="py-20 text-center bg-muted/20 rounded-[3rem] border-2 border-dashed border-border">
                                <p className="foreground/70 font-bold">No articles found in this category yet. Check back soon.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BlogCategoryContent;
