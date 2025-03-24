"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MovieCard from "@/utils/MovieCard";
import PaginationControls from "@/utils/PaginationControls";
import { Input } from "@/components/ui/input";
import CategoryButtons from "@/utils/CategoryButtons";

interface Anime {
    id: number;
    title: string;
    name: string;
    overview: string;
    poster_path: string;
    media_type: "movie" | "tv"; // Identifies if it's a movie or series
}

export default function AnimePage() {
    const [anime, setAnime] = useState<Anime[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("popular");

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                setLoading(true);
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                let endpoint = "";

                if (search) {
                    // Search anime movies and TV anime separately
                    const movieSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&page=${page}&with_genres=16&with_original_language=ja`;
                    const tvSearchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${search}&page=${page}&with_genres=16&with_original_language=ja`;

                    const [movieResponse, tvResponse] = await Promise.all([
                        axios.get(movieSearchUrl),
                        axios.get(tvSearchUrl),
                    ]);

                    setAnime([
                        ...movieResponse.data.results.map((item: { id: number; title: string; overview: string; poster_path: string; }) => ({ ...item, media_type: "movie" })),
                        ...tvResponse.data.results.map((item: { id: number; name: string; overview: string; poster_path: string; }) => ({ ...item, media_type: "tv" })),
                    ]);

                    setTotalPages(Math.max(movieResponse.data.total_pages, tvResponse.data.total_pages));
                } else {
                    // Discover anime movies and TV shows
                    const categoryEndpoints: { [key: string]: string } = {
                        // popular: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&with_genres=16&with_original_language=ja`,
                        popular: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&with_genres=16`,
                        top_rated: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&with_genres=16&sort_by=vote_average.desc`,
                        upcoming: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&with_genres=16&sort_by=release_date.desc`,
                        trending: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16&with_original_language=ja`,
                    };

                    endpoint = categoryEndpoints[category] || categoryEndpoints.popular;

                    const response = await axios.get(endpoint);
                    setAnime(response.data.results.map((item: { id: number; title: string; overview: string; poster_path: string; }) => ({ ...item, media_type: "movie" })));
                    setTotalPages(response.data.total_pages);
                }
            } catch (error) {
                console.error("Error fetching anime:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnime();
    }, [search, page, category]);

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

                <CategoryButtons selectedCategory={category} onSelectCategory={setCategory} type="movie" />

                {/* 🎥 Page Title with Animation */}
                <motion.h1
                    className="text-4xl font-bold text-center mb-8 text-yellow-400"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    🎥 {search ? `Search Results for "${search}"` : "Anime Movies & Series"}
                </motion.h1>

                {/* ⏳ Loading State */}
                {loading ? (
                    <p className="text-center text-lg">Loading...</p>
                ) : anime.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {anime.map((item) => (
                            <MovieCard key={item.id} {...item} type={item.media_type} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-lg">No anime found.</p>
                )}

                {/* 📌 Pagination */}
                <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
            </main>
        </div>
    );
}
