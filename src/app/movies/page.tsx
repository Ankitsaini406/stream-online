"use client"; // ✅ Mark as a Client Component
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
}

export default function MoviesPage() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
                );
                setMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className="relative min-h-screen bg-gray-900 text-white p-6">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-[url('/movies-bg.jpg')] bg-cover bg-center opacity-20 blur-lg"></div>

            <main className="relative max-w-6xl mx-auto">
                {/* Title with Animation */}
                <motion.h1
                    className="text-5xl font-extrabold text-center mb-10 drop-shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    🍿 Popular Movies
                </motion.h1>

                {/* Movie Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    {movies.map((movie: Movie) => (
                        <motion.div
                            key={movie.id}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="bg-gray-800/90 backdrop-blur-md shadow-xl overflow-hidden rounded-xl border border-gray-700">
                                <CardHeader className="p-0">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        height={500}
                                        width={350}
                                        className="rounded-t-lg w-full h-64 object-cover transition-transform hover:scale-105"
                                    />
                                </CardHeader>

                                <CardContent className="p-4 flex flex-col gap-2">
                                    <CardTitle className="text-xl font-bold">{movie.title}</CardTitle>
                                    <p className="text-sm text-gray-300 line-clamp-3">{movie.overview}</p>

                                    <Link href={`/movies/${movie.id}`} className="mt-3">
                                        <Button className="w-full py-2 text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg transition-all">
                                            🎬 Watch Now
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </main>
        </div>
    );
}
