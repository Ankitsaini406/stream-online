"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "@/utils/MovieCard";
import PaginationControls from "@/utils/PaginationControls";
import { Input } from "@/components/ui/input";
import CategoryButtons from "@/utils/CategoryButtons";

interface Anime {
    id: number;
    title?: string;
    name?: string;
    overview: string;
    poster_path: string;
    media_type: "movie" | "tv";
    first_air_date?: string;
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
                    const movieSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&page=${page}&with_genres=16&with_original_language=ja`;
                    const tvSearchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${search}&page=${page}&with_genres=16&with_original_language=ja`;

                    const [movieResponse, tvResponse] = await Promise.all([
                        axios.get(movieSearchUrl),
                        axios.get(tvSearchUrl),
                    ]);

                    setAnime([
                        ...movieResponse.data.results.map((item: Anime) => ({ ...item, media_type: "movie" })),
                        ...tvResponse.data.results.map((item: Anime) => ({ ...item, media_type: "tv", first_air_date: item.first_air_date })),
                    ]);

                    setTotalPages(Math.max(movieResponse.data.total_pages, tvResponse.data.total_pages));
                } else {
                    const categoryEndpoints: { [key: string]: string } = {
                        popular: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&with_genres=16`,
                        top_rated: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&with_genres=16&sort_by=vote_average.desc`,
                        upcoming: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&with_genres=16&sort_by=release_date.desc`,
                        trending: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16&with_original_language=ja`,
                    };

                    endpoint = categoryEndpoints[category] || categoryEndpoints.popular;
                    const response = await axios.get(endpoint);

                    setAnime(response.data.results.map((item: Anime) => ({
                        ...item,
                        media_type: item.first_air_date ? "tv" : "movie",
                        first_air_date: item.first_air_date,
                    })));
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
        <div className="min-h-screen bg-background text-foreground p-6 pt-20">
            <main className="max-w-7xl mx-auto">
                <Input
                    type="text"
                    placeholder="Search for an anime..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="w-full max-w-md p-3 text-lg border border-border bg-card text-primary rounded-lg"
                />

                <CategoryButtons selectedCategory={category} onSelectCategory={setCategory} type="movie" />

                <h1
                    className="text-4xl font-bold text-center mb-8 text-yellow-400"
                >
                    🎥 {search ? `Search Results for "${search}"` : "Anime Movies & Series"}
                </h1>

                {loading ? (
                    <p className="text-center text-lg">Loading...</p>
                ) : anime.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {anime.map((item) => (
                            <MovieCard key={item.id} {...item} title={item.title || item.name || "Untitled"} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-lg">No anime found.</p>
                )}

                <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
            </main>
        </div>
    );
}