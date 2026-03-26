import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import FaqItem from './FaqItem';

interface FaqQuestion {
    id: string;
    question: string;
    answer: string;
}

interface FaqCategory {
    category: string;
    questions: FaqQuestion[];
}

interface FaqData {
    metadata?: any;
    faqs?: FaqCategory[];
}

const FaqContent = ({ data }: { data: FaqData | null }) => {
    const faqs = data?.faqs || [];

    return (
        <div className="min-h-screen bg-background pb-32">
            <Breadcrumb />
            <PageHeader
                image="/images/faq-bg.jpeg"
                title={data?.metadata?.title || "Frequently Asked Questions"}
                description={data?.metadata?.description || "Find detailed answers to common queries about our medical billing and revenue cycle management services."}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Simplified Sidebar - Static list for Server Component */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-4">

                            <div className="flex flex-col gap-2">
                                {faqs.map((cat) => (
                                    <a
                                        key={cat.category}
                                        href={`#${cat.category.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="text-foreground/60 hover:text-primary font-bold transition-colors py-2 px-4 hover:bg-muted/50 rounded-xl"
                                    >
                                        {cat.category}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* FAQ List */}
                    <div className="lg:col-span-3 space-y-16">
                        {faqs.length > 0 ? (
                            faqs.map((category) => (
                                <div
                                    key={category.category}
                                    id={category.category.toLowerCase().replace(/\s+/g, '-')}
                                    className="bg-card-bg/30 border border-border/30 rounded-[2.5rem] backdrop-blur-sm scroll-mt-32"
                                >
                                    <h2 className="text-2xl md:text-3xl font-black mb-8 pb-6 border-b border-border/10 flex items-center gap-4">
                                        <span className="w-2 h-8 bg-primary rounded-full" />
                                        {category.category}
                                    </h2>
                                    <div className="space-y-4">
                                        {category.questions.map((q) => (
                                            <FaqItem
                                                key={q.id || q.question}
                                                question={q.question}
                                                answer={q.answer}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-24 bg-muted/20 rounded-[3rem] border border-dashed border-border/50">
                                <h3 className="text-2xl font-black text-foreground/80 mb-2">No questions available</h3>
                                <p className="text-foreground/40 text-lg">Please check back later for updates.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqContent;