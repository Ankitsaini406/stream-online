"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MovieDetailsPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
                const data = await response.json();
                setMovie(data);
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
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Skeleton className="w-[300px] h-[450px] rounded-lg" />
                <Skeleton className="w-[200px] h-6 mt-4" />
            </div>
        );
    }

    if (!movie) {
        return <p className="text-center text-red-500">Movie not found</p>;
    }

    return (
        <motion.div 
            className="min-h-screen flex flex-col items-center p-6 bg-gray-900 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-4xl font-bold text-center mb-6">{movie.title}</h1>
            
            <Card className="w-full max-w-4xl bg-gray-800 shadow-lg overflow-hidden">
                <CardContent className="p-4 flex flex-col md:flex-row gap-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Image 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title} 
                            width={300} 
                            height={450} 
                            className="rounded-lg shadow-lg"
                        />
                    </motion.div>

                    <div className="flex flex-col justify-between">
                        <p className="text-lg text-gray-300">{movie.overview}</p>

                        <div className="mt-4">
                            <p className="text-sm text-gray-400">
                                Release Date: <span className="font-semibold">{movie.release_date}</span>
                            </p>
                            <p className="text-sm text-gray-400">
                                Runtime: <span className="font-semibold">{movie.runtime} mins</span>
                            </p>
                            <p className="text-sm text-gray-400">
                                Rating: <span className="font-semibold">{movie.vote_average} ⭐</span>
                            </p>
                        </div>
                        
                        <Link href={`/watch/${id}`}>
                        <Button>Watch</Button>
                        </Link>

                        <div className="mt-4 flex gap-2">
                            {movie.genres.map((genre) => (
                                <Badge key={genre.id} className="bg-blue-600">{genre.name}</Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
