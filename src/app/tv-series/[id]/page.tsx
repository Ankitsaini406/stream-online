"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createSlug } from "@/utils/UtilsConveter";

interface Season {
    season_number: number;
    name: string;
    episode_count: number;
    poster_path: string | null;
}

interface Episode {
    episode_number: number;
    name: string;
    still_path: string | null;
    overview: string;
    vote_average: number;
    air_date: string;
}

interface TVShow {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    first_air_date: string;
    vote_average: number;
    genres: { id: number; name: string }[];
    seasons: Season[];
}

export default function TVDetailsPage() {

    const { id } = useParams();
    const [tvShow, setTvShow] = useState<TVShow | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [loadingEpisodes, setLoadingEpisodes] = useState(false);

    useEffect(() => {
        const fetchTVShow = async () => {
            try {
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`);
                setTvShow(response.data);
            } catch (error) {
                console.error("Error fetching TV show:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTVShow();
    }, [id]);

    const fetchEpisodes = async (seasonNumber: number) => {
        try {
            setLoadingEpisodes(true);
            const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${apiKey}&language=en-US`);
            setEpisodes(response.data.episodes);
            setSelectedSeason(seasonNumber);
        } catch (error) {
            console.error("Error fetching episodes:", error);
        } finally {
            setLoadingEpisodes(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
                <Skeleton className="w-[300px] h-[450px] rounded-lg" />
                <Skeleton className="w-[200px] h-6 mt-4" />
            </div>
        );
    }

    if (!tvShow) {
        return <p className="text-center text-red-500">TV Show not found</p>;
    }

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center p-6 bg-gray-900 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Title */}
            <h1 className="text-5xl font-extrabold text-center mb-6 text-blue-500 drop-shadow-lg">
                {tvShow.name}
            </h1>

            {/* Show Details */}
            <Card className="w-full max-w-4xl bg-gray-800 shadow-lg rounded-xl overflow-hidden">
                <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                            alt={tvShow.name}
                            width={350}
                            height={500}
                            className="rounded-lg shadow-2xl"
                        />
                    </motion.div>

                    <div className="flex flex-col justify-between text-gray-300">
                        <p className="text-lg">{tvShow.overview}</p>

                        <div className="mt-4">
                            <p className="text-md text-gray-400">
                                📅 First Air Date: <span className="font-semibold">{tvShow.first_air_date}</span>
                            </p>
                            <p className="text-md text-gray-400">
                                ⭐ Rating: <span className="font-semibold">{tvShow.vote_average}</span>
                            </p>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {tvShow.genres.map((genre) => (
                                <Badge key={genre.id} className="bg-purple-600 px-3 py-1 text-sm">
                                    {genre.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Seasons Section */}
            <div className="mt-10 w-full max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">📺 Seasons</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {tvShow.seasons.map((season) => (
                        <motion.div
                            key={season.season_number}
                            whileHover={{ scale: 1.05 }}
                            className="cursor-pointer"
                            onClick={() => fetchEpisodes(season.season_number)}
                        >
                            <Card className="bg-gray-800 p-2 rounded-lg transition-all hover:bg-gray-700">
                                <p className="text-center mt-2 text-white">{season.name} ({season.episode_count} episodes)</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Episodes Section */}
            {selectedSeason !== null && (
                <div className="mt-10 w-full max-w-4xl">
                    <h2 className="text-2xl font-semibold text-center text-blue-400">🎬 Episodes in Season {selectedSeason}</h2>
                    {loadingEpisodes ? (
                        <p className="text-center text-gray-400 mt-4">Loading episodes...</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                            {episodes.map((episode) => (
                                <motion.div key={episode.episode_number} whileHover={{ scale: 1.05 }}>
                                    <Card className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700">
                                        <div className="relative w-full h-36">
                                            <Image
                                                src={episode.still_path ? `https://image.tmdb.org/t/p/w300${episode.still_path}` : "/no-image.png"}
                                                alt={episode.name}
                                                // width={200} 
                                                // height={150} 
                                                fill
                                                className="rounded-lg"
                                            />
                                        </div>
                                        <p className="text-center mt-2 text-white font-bold">
                                            Ep {episode.episode_number}: {episode.name}
                                        </p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            {episode.overview ? (episode.overview.split(" ").slice(0, 20).join(" ") + (episode.overview.split(" ").length > 20 ? "..." : "")) : "No overview available."}
                                        </p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            📅 Air Date: <span className="font-semibold">{episode.air_date || "Unknown"}</span>
                                        </p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            ⭐ Rating: <span className="font-semibold">{episode.vote_average || "N/A"}</span>
                                        </p>
                                        <Link href={{
                                            pathname: `/tv-series/${id}/watch`,
                                            query: {
                                                id,
                                                name: createSlug(tvShow.name),
                                                season: selectedSeason,
                                                episode_number: episode.episode_number
                                            }
                                        }}>
                                            <Button
                                                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg w-full transition-all"
                                            >
                                                View Episode
                                            </Button>
                                        </Link>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
}
