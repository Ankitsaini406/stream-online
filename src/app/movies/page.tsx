"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "@/utils/MovieCard";
import PaginationControls from "@/utils/PaginationControls";
import { Input } from "@/components/ui/input";

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
}

export default function MoviesPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const endpoint = search
                    ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&page=${page}`
                    : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;

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
    }, [search, page]);

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

                <h1 className="text-4xl font-bold text-center my-6 text-yellow-400">
                    🎥 {search ? `Search Results for "${search}"` : "Popular Movies"}
                </h1>

                {loading ? (
                    <p className="text-center text-lg">Loading...</p>
                ) : movies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} {...movie} type="movie" />
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
