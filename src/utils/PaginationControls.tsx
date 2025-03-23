"use client";

import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export default function PaginationControls({ page, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="mt-10 flex justify-center">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => onPageChange(page - 1)}
                            className={page === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <span className="px-4 py-2 text-lg font-semibold">Page {page} of {totalPages}</span>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => onPageChange(page + 1)}
                            className={page === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
