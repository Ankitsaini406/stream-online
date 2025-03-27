"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export default function PaginationControls({ page, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="mt-10 flex justify-center">
            <Pagination>
                <PaginationContent className="flex gap-4">
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => page > 1 && onPageChange(page - 1)}
                            className={`px-4 py-2 rounded-lg transition-all ${
                                page === 1
                                    ? "bg-secondary text-secondary-foreground opacity-50 cursor-not-allowed"
                                    : "bg-primary text-primary-foreground hover:bg-accent cursor-pointer"
                            }`}
                        />
                    </PaginationItem>

                    <PaginationItem>
                        <span className="px-4 py-2 text-lg font-semibold text-foreground">
                            Page {page} of {totalPages}
                        </span>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => page < totalPages && onPageChange(page + 1)}
                            className={`px-4 py-2 rounded-lg transition-all ${
                                page === totalPages
                                    ? "bg-secondary text-secondary-foreground opacity-50 cursor-not-allowed"
                                    : "bg-primary text-primary-foreground hover:bg-accent cursor-pointer"
                            }`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
