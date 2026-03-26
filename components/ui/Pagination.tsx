import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
}

export const Pagination = ({ currentPage, totalPages, baseUrl }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-2 mt-16">
            <Link
                href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : "#"}
                className={`p-3 rounded-2xl border border-primary/10 transition-all ${currentPage > 1
                    ? "text-primary hover:bg-primary/5 active:scale-95"
                    : "foreground/70/20 cursor-not-allowed"
                    }`}
                aria-disabled={currentPage <= 1}
            >
                <LucideChevronLeft size={20} />
            </Link>

            {pages.map((page) => (
                <Link
                    key={page}
                    href={`${baseUrl}?page=${page}`}
                    className={`min-w-12 h-12 flex items-center justify-center rounded-2xl border font-black text-sm transition-all ${currentPage === page
                        ? "bg-primary text-background border-primary shadow-lg shadow-primary/20"
                        : "bg-background foreground/70 border-primary/10 hover:bg-primary/5 active:scale-95"
                        }`}
                >
                    {page}
                </Link>
            ))}

            <Link
                href={currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : "#"}
                className={`p-3 rounded-2xl border border-primary/10 transition-all ${currentPage < totalPages
                    ? "text-primary hover:bg-primary/5 active:scale-95"
                    : "foreground/70/20 cursor-not-allowed"
                    }`}
                aria-disabled={currentPage >= totalPages}
            >
                <LucideChevronRight size={20} />
            </Link>
        </div>
    );
};
