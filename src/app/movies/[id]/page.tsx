"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { createSlug } from "@/utils/UtilsConveter";

type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    genres: { id: number; name: string }[];
};

export default function MovieDetailsPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
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
            <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--background)]">
                <Skeleton className="w-[300px] h-[450px] rounded-lg bg-[var(--muted)]" />
                <Skeleton className="w-[200px] h-6 mt-4 bg-[var(--muted)]" />
            </div>
        );
    }

    if (!movie) {
        return <p className="text-center text-[var(--primary)]">Movie not found</p>;
    }

    return (
        <div 
            className="min-h-screen flex flex-col items-center p-6 bg-[var(--background)] text-[var(--foreground)] pt-20"
        >
            <h1 className="text-4xl font-bold text-center mb-6 text-[var(--primary)]">{movie.title}</h1>
            
            <Card className="w-full max-w-4xl bg-[var(--card)] shadow-lg overflow-hidden">
                <CardContent className="p-4 flex flex-col md:flex-row gap-6">
                    <div
                    >
                        <Image 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title} 
                            width={300} 
                            height={450} 
                            className="rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="flex flex-col justify-between">
                        <p className="text-lg text-[var(--muted-foreground)]">{movie.overview}</p>

                        <div className="mt-4">
                            <p className="text-sm text-[var(--muted-foreground)]">
                                Release Date: <span className="font-semibold">{movie.release_date}</span>
                            </p>
                            <p className="text-sm text-[var(--muted-foreground)]">
                                Runtime: <span className="font-semibold">{movie.runtime} mins</span>
                            </p>
                            <p className="text-sm text-[var(--muted-foreground)]">
                                Rating: <span className="font-semibold">{movie.vote_average} ⭐</span>
                            </p>
                        </div>
                        
                        <Link href={{
                            pathname: `/watch/${id}`,
                            query: { id, type: "movies", name: createSlug(movie.title) }
                            }}>
                        <Button className="cursor-pointer bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--accent)]">
                            Watch
                        </Button>
                        </Link>

                        <div className="mt-4 flex gap-2">
                            {movie.genres.map((genre) => (
                                <Badge key={genre.id} className="bg-[var(--secondary)] text-[var(--secondary-foreground)]">{genre.name}</Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}