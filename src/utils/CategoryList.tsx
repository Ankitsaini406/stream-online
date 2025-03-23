"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import MovieCard from "@/utils/MovieCard";
import PaginationControls from "@/utils/PaginationControls";

interface Item {
    id: number;
    title?: string;
    name?: string; // For TV shows or Anime
    overview: string;
    poster_path: string;
}

interface CategoryListProps {
    categoryType: string;
    defaultCategory: string;
    categories: { value: string; label: string }[];
}

export default function CategoryList({ categoryType, defaultCategory, categories }: CategoryListProps) {
    const [items, setItems] = useState<Item[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const endpoint = search
                    ? `https://api.themoviedb.org/3/search/${categoryType}?api_key=${apiKey}&query=${search}&page=${page}`
                    : `https://api.themoviedb.org/3/${categoryType}/${selectedCategory}?api_key=${apiKey}&page=${page}`;

                const response = await axios.get(endpoint);
                setItems(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [search, page, selectedCategory, categoryType]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <main className="max-w-7xl mx-auto">
                {/* Search & Filter Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="w-full max-w-md p-3 text-lg bg-gray-800 border border-gray-600 rounded-lg"
                    />

                    <Select onValueChange={setSelectedCategory} defaultValue={selectedCategory}>
                        <SelectTrigger className="w-[200px] bg-gray-800 text-white border-gray-600">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 text-white border-gray-600">
                            {categories.map((cat) => (
                                <SelectItem key={cat.value} value={cat.value}>
                                    {cat.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <h1 className="text-4xl font-bold text-center my-6 text-yellow-400">
                    🎥 {search ? `Search Results for "${search}"` : `${categories.find((c) => c.value === selectedCategory)?.label}`}
                </h1>

                {/* Items Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <Skeleton key={i} className="h-64 w-full bg-gray-700 rounded-lg" />
                        ))}
                    </div>
                ) : items.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {items.map((item) => (
                            <MovieCard key={item.id} {...item} title={item.title || item.name || "Untitled"} type={categoryType} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-lg">No items found.</p>
                )}

                {/* Pagination Controls */}
                <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
            </main>
        </div>
    );
}
