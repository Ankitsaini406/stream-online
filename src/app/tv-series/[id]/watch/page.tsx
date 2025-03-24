"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

type Episode = {
    name: string;
    overview: string;
    still_path: string | null;
    vote_average: number;
    air_date: string;
};

export default function WatchEpisode() {
    const searchParams = useSearchParams();
    
    const id = searchParams.get("id");
    const season = searchParams.get("season");
    const episode_number = searchParams.get("episode_number");
    const [episode, setEpisode] = useState<Episode | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEpisode = async () => {
            try {
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const response = await axios.get(
                    `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode_number}?api_key=${apiKey}&language=en-US`
                );
                setEpisode(response.data);
            } catch (error) {
                console.error("Error fetching episode:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEpisode();
    }, [id, season, episode_number]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
            </div>
        );
    }

    if (!episode) {
        return <p className="text-center text-red-500">Episode not found</p>;
    }

    return (
        <div className="relative w-full min-h-screen bg-black overflow-hidden">
            {/* Blurred Background Image */}
            <div className="absolute inset-0 w-full h-full bg-black">
                {episode.still_path && (
                    <Image 
                        src={`https://image.tmdb.org/t/p/original${episode.still_path}`} 
                        alt={episode.name} 
                        layout="fill"
                        objectFit="cover"
                        className="opacity-30"
                    />
                )}
            </div>

            {/* Overlay Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
                <motion.h1 
                    className="text-4xl md:text-5xl font-bold text-center mb-6 drop-shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {episode.name}
                </motion.h1>

                <motion.div 
                    className="w-full max-w-6xl h-[70vh] md:h-[80vh] rounded-lg overflow-hidden shadow-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <iframe 
                        src={`https://vidsrc.icu/embed/tv/${id}/${season}/${episode_number}`} 
                        className="w-full h-full"
                        allowFullScreen
                    />
                </motion.div>

                {/* Episode Details */}
                <motion.div 
                    className="mt-8 max-w-4xl text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-lg text-gray-300 mb-4">{episode.overview || "No description available."}</p>
                    <p className="text-sm text-gray-400">
                        📅 Air Date: <span className="text-white">{episode.air_date || "Unknown"}</span> |
                        ⭐ Rating: <span className="text-yellow-500">{episode.vote_average || "N/A"}</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
