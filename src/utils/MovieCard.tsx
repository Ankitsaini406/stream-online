"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { createSlug } from "./UtilsConveter";

interface MovieProps {
    id: number;
    title: string;
    name: string;
    overview: string;
    poster_path: string;
    type: string;
}

export default function MovieCard({ id, title, name, overview, poster_path, type }: MovieProps) {

    const mediaType = type === "movie" ? "movies" : "tv-series";

    const mediaTitle = title || name;

    return (
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Card className="bg-gradient-to-b from-[#1f2937] to-[#111827] shadow-xl overflow-hidden rounded-2xl border border-gray-700">
                <CardHeader className="p-0">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        alt={title || id.toString()}
                        height={500}
                        width={350}
                        className="rounded-t-lg w-full h-72 object-cover transition-transform hover:scale-110 duration-300"
                    />
                </CardHeader>

                <CardContent className="p-5 flex flex-col gap-3">
                    <CardTitle className="text-2xl font-bold text-gray-200">{title || name}</CardTitle>
                    <p className="text-sm text-gray-400 line-clamp-3">{overview}</p>

                    <Link href={{
                        pathname: `/${mediaType}/${id}`,
                        query: {
                            id,
                            type: mediaType,
                            name: createSlug(mediaTitle),
                        }
                    }
                } className="mt-3">
                        <Button className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg transition-all">
                            🎬 Watch Now
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </motion.div>
    );
}
