"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MovieCard from "@/utils/MovieCard";
import PaginationControls from "@/utils/PaginationControls";
import { Input } from "@/components/ui/input";

interface Anime {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
}

export default function AnimePage() {
    const [anime, setAnime] = useState<Anime[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                setLoading(true);
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const endpoint = search
                    ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&page=${page}&with_genres=16`
                    : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16&page=${page}`;

                const response = await axios.get(endpoint);
                setAnime(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error("Error fetching anime:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnime();
    }, [search, page]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <main className="max-w-7xl mx-auto">
                {/* 🔎 Search Bar */}
                <Input
                    type="text"
                    placeholder="Search for an anime..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="w-full max-w-md p-3 text-lg bg-gray-800 border border-gray-600 rounded-lg mb-6"
                />

                {/* 🎥 Page Title with Animation */}
                <motion.h1
                    className="text-4xl font-bold text-center mb-8 text-yellow-400"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    🎥 {search ? `Search Results for "${search}"` : "Anime Movies"}
                </motion.h1>

                {/* ⏳ Loading State */}
                {loading ? (
                    <p className="text-center text-lg">Loading...</p>
                ) : anime.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {anime.map((movie) => (
                            <MovieCard key={movie.id} {...movie} type="anime" />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-lg">No anime movies found.</p>
                )}

                {/* 📌 Pagination */}
                <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
            </main>
        </div>
    );
}