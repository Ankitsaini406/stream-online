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
}

export default function MoviesPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("popular");

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                let endpoint = "";

                if (search) {
                    endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&page=${page}&without_genres=16`;
                } else {
                    const categoryEndpoints: { [key: string]: string } = {
                        popular: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}&without_genres=16`,
                        top_rated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${page}&without_genres=16`,
                        upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${page}&without_genres=16`,
                        trending: `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&without_genres=16`
                    };
                    endpoint = categoryEndpoints[category] || categoryEndpoints.popular;
                }

                const response = await axios.get(endpoint);
                setMovies(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [search, page, category]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <main className="max-w-7xl mx-auto">
                <Input
                    type="text"
                    placeholder="Search for a movie..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="w-full max-w-md p-3 text-lg bg-gray-800 border border-gray-600 rounded-lg"
                />

                <CategoryButtons selectedCategory={category} onSelectCategory={setCategory} type="movie" />

                <h1 className="text-4xl font-bold text-center my-6 text-yellow-400">
                    🎥 {search ? `Search Results for "${search}"` : `${category.replace("_", " ").toUpperCase()} Movies`}
                </h1>

                {loading ? (
                    <p className="text-center text-lg">Loading...</p>
                ) : movies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} {...movie} type="movies" />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-lg">No movies found.</p>
                )}

                <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
            </main>
        </div>
    );
}
