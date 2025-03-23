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
}

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
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
            </div>
        );
    }

    if (!movie) {
        return <p className="text-center text-red-500">Movie not found</p>;
    }

    return (
        <div className="relative w-full min-h-screen bg-black overflow-hidden">
            {/* Blurred Background Image */}
            <div className="absolute inset-0 w-full h-full bg-black">
                <Image 
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
                    alt={movie.title} 
                    layout="fill"
                    objectFit="cover"
                    className="opacity-30"
                />
            </div>

            {/* Overlay Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
                <motion.h1 
                    className="text-4xl md:text-5xl font-bold text-center mb-6 drop-shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {movie.title}
                </motion.h1>

                {/* Video Player */}
                <motion.div 
                    className="w-full max-w-6xl h-[70vh] md:h-[80vh] rounded-lg overflow-hidden shadow-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <iframe 
                        src={`https://vidsrc.icu/embed/movie/${id}`} 
                        className="w-full h-full"
                        allowFullScreen
                    />
                </motion.div>

                {/* Movie Details */}
                <motion.div 
                    className="mt-8 max-w-4xl text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-lg text-gray-300 mb-4">{movie.overview}</p>
                    <p className="text-sm text-gray-400">
                        Release Date: <span className="text-white">{movie.release_date}</span> | 
                        Runtime: <span className="text-white">{movie.runtime} mins</span> | 
                        Rating: <span className="text-yellow-500">{movie.vote_average}⭐</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
