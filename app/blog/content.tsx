import BlogCard from "@/components/cards/blogCard";
import BlogCategory from "@/components/common/blogCategory";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageHeader from "@/components/ui/PageHeader";
import { Pagination } from "@/components/ui/Pagination";

interface BlogContentProps {
    blogPageData: any;
    categories: any[];
    posts: any[];
    total: number;
    currentPage: number;
    totalPages: number;
}

const BlogContent = ({
    blogPageData,
    categories,
    posts,
    total,
    currentPage,
    totalPages
}: BlogContentProps) => { 
    const pageTitle = blogPageData?.title || "Knowledge Hub";
    const pageDescription = blogPageData?.description || "Expert analysis on credentialing, enrollment, medical billing, regulatory changes, and RCM optimization.";

    return (
        <div className="pb-24 bg-background">
            <Breadcrumb />
            <PageHeader
                title={pageTitle}
                description={pageDescription}
                image="/images/blog-bg.jpeg"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {categories && categories.length > 0 && (
                        <div className="lg:w-64 shrink-0 space-y-12">
                            <BlogCategory blogCategories={categories} />
                        </div>
                    )}

                    <div className="lg:grow space-y-16 mt-4">
                        {posts.length > 0 ? (
                            <>
                                <div className="space-y-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                    {posts.map((post, key) => (
                                        <BlogCard key={key} post={post} />
                                    ))}
                                </div>

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    baseUrl="/blog"
                                />
                            </>
                        ) : (
                            <div className="py-20 text-center bg-muted/20 rounded-[3rem] border-2 border-dashed border-border">
                                <p className="foreground/70 font-bold">No articles found. Check back soon for expert insights.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BlogContent;
