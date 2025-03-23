import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
}

export default async function Page() {
    const apiKey = process.env.TMBD_API_KEY;
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    const movies = response.data.results;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <main className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">Popular Movies</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies.map((movie: Movie) => (
                        <Card key={movie.id} className="bg-gray-800 hover:shadow-lg transition duration-300">
                            <CardHeader className="p-0">
                                <Image 
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                    alt={movie.title} 
                                    height={500} 
                                    width={350} 
                                    className="rounded-t-lg w-full h-60 object-cover"
                                />
                            </CardHeader>
                            <CardContent className="p-4">
                                <CardTitle className="text-lg font-semibold">{movie.title}</CardTitle>
                                <p className="text-sm text-gray-300 line-clamp-3">{movie.overview}</p>
                                <Link href={`/movies/${movie.id}`}>
                                <Button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 transition">
                                    Watch Now
                                </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}