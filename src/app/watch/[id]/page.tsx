"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

type WatchMovie = {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    release_date: string;
    runtime: number;
    vote_average: number;
};

export default function WatchMovie() {
    const { id } = useParams();
    const [movie, setMovie] = useState<WatchMovie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[var(--primary)]"></div>
            </div>
        );
    }

    if (!movie) {
        return <p className="text-center text-[var(--primary)]">Movie not found</p>;
    }

    return (
        <div className="relative w-full min-h-screen bg-[var(--background)] overflow-hidden">
            {/* 🎥 Blurred Background */}
            <div className="absolute inset-0 w-full h-full bg-[var(--background)]">
                <Image 
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
                    alt={movie.title} 
                    fill
                    className="object-cover brightness-50 blur-md"
                />
            </div>

            {/* 🎬 Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-[var(--foreground)] px-4 pt-20">
                <h1 
                    className="text-4xl md:text-5xl font-extrabold text-center mb-6 drop-shadow-lg text-[var(--primary)]"
                >
                    {movie.title}
                </h1>

                {/* 🎥 Video Player */}
                <div 
                    className="w-full max-w-6xl h-[70vh] md:h-[80vh] rounded-lg overflow-hidden shadow-lg border-2 border-[var(--border)]"
                >
                    <iframe 
                        src={`https://vidsrc.icu/embed/movie/${id}`} 
                        className="w-full h-full"
                        allowFullScreen
                    />
                </div>

                {/* 📜 Movie Details */}
                <div 
                    className="mt-8 max-w-4xl text-center"
                >
                    <p className="text-lg text-[var(--muted-foreground)] mb-4">{movie.overview}</p>
                    <p className="text-sm text-[var(--muted-foreground)]">
                        Release Date: <span className="text-[var(--foreground)]">{movie.release_date}</span> | 
                        Runtime: <span className="text-[var(--foreground)]">{movie.runtime} mins</span> | 
                        Rating: <span className="text-[var(--accent)] font-bold">{movie.vote_average}⭐</span>
                    </p>
                </div>

                {/* 🔥 Watch Now Button */}
                <motion.a 
                    href={`https://vidsrc.icu/embed/movie/${id}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 px-6 py-3 text-lg font-semibold rounded-md bg-[var(--primary)] hover:bg-[var(--accent)] transition-all shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Watch in Fullscreen
                </motion.a>
            </div>
        </div>
    );
}
