"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
    const [isAnimation, setIsAnimation] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEpisodeAndGenre = async () => {
            try {
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

                // Fetch episode details
                const episodeResponse = await axios.get(
                    `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode_number}?api_key=${apiKey}&language=en-US`
                );
                setEpisode(episodeResponse.data);

                // Fetch TV show details to check if it's Animation
                const tvResponse = await axios.get(
                    `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`
                );
                const genres = tvResponse.data.genres || [];

                // Check if it's an animation series
                const isAnime = genres.some((genre: { id: number }) => genre.id === 16);
                setIsAnimation(isAnime);
            } catch (error) {
                console.error("Error fetching episode:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEpisodeAndGenre();
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

    // Determine the embed URL based on genre
    const embedUrl = isAnimation
        ? `https://vidsrc.icu/embed/anime/${id}/${episode_number}/0/1`
        : `https://vidsrc.icu/embed/tv/${id}/${season}/${episode_number}`;

        console.log(embedUrl);

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
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 pt-20">
                <h1 
                    className="text-4xl md:text-5xl font-bold text-center mb-6 drop-shadow-lg"
                >
                    {episode.name}
                </h1>

                <div 
                    className="w-full max-w-6xl h-[70vh] md:h-[80vh] rounded-lg overflow-hidden shadow-lg"
                >
                    <iframe 
                        src={embedUrl} 
                        className="w-full h-full"
                        allowFullScreen
                    />
                </div>

                {/* Episode Details */}
                <div 
                    className="mt-8 max-w-4xl text-center"
                >
                    <p className="text-lg text-gray-300 mb-4">{episode.overview || "No description available."}</p>
                    <p className="text-sm text-gray-400">
                        📅 Air Date: <span className="text-white">{episode.air_date || "Unknown"}</span> |
                        ⭐ Rating: <span className="text-yellow-500">{episode.vote_average || "N/A"}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
