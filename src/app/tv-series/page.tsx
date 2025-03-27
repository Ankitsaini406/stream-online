"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "@/utils/MovieCard";
import PaginationControls from "@/utils/PaginationControls";
import { Input } from "@/components/ui/input";
import CategoryButtons from "@/utils/CategoryButtons";

interface Movie {
    id: number;
    title: string;
    name: string;
    overview: string;
    poster_path: string;
    original_language: string;
}

export default function Tvpage() {
    const [tv, setTv] = useState<Movie[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("popular");

    useEffect(() => {
        const fetchTvShows = async () => {
            try {
                setLoading(true);
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    
                let endpoint = "";
    
                if (search) {
                    // Search TV Shows (Manual filter for anime and language)
                    endpoint = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${search}&language=en-US&page=${page}`;
                } else {
                    // Fetch TV Shows Based on Category (Exclude Anime, Only English)
                    const categoryEndpoints: { [key: string]: string } = {
                        popular: `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${page}`,
                        top_rated: `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=${page}`,
                        airing_today: `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&page=${page}`,
                        on_the_air: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US&page=${page}`,
                    };
    
                    endpoint = categoryEndpoints[category] || categoryEndpoints.popular;
                }
    
                const response = await axios.get(endpoint);
                let tvShows = response.data.results;
    
                // Manually filter out non-English shows and anime (genre ID 16)
                tvShows = tvShows.filter((show: { original_language: string; genre_ids: number[]; }) => show.original_language === "en" && !show.genre_ids.includes(16));
    
                setTv(tvShows);

                console.log(tvShows);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error("Error fetching TV shows:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchTvShows();
    }, [search, page, category]);
    
    return (
        <div className="min-h-screen bg-background text-foreground p-6 pt-20">
            <main className="max-w-7xl mx-auto">
                <Input
                    type="text"
                    placeholder="Search for a tv..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="w-full max-w-md p-3 text-lg border border-border bg-card text-primary rounded-lg"
                />

                <CategoryButtons selectedCategory={category} onSelectCategory={setCategory} type="tv" />

                <h1 className="text-4xl font-bold text-center my-6 text-yellow-400">
                    🎥 {search ? `Search Results for "${search}"` : "Popular TV"}
                </h1>

                {loading ? (
                    <p className="text-center text-lg">Loading...</p>
                ) : tv.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {tv.map((tv) => (
                            <MovieCard key={tv.id} {...tv}/>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-lg">No tv found.</p>
                )}

                <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
            </main>
        </div>
    );
}