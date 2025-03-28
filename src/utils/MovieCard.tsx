"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { createSlug } from "./UtilsConveter";
import { useRef } from "react";

interface MovieProps {
    id: number;
    title: string;
    name?: string;
    overview: string;
    poster_path: string;
    first_air_date?: string;
}

export default function MovieCard({ id, title, name, overview, poster_path, first_air_date }: MovieProps) {

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start center"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

    const mediaType = first_air_date ? "tv-series" : "movies";
    const mediaTitle = title || name;

    return (
        <motion.div ref={container} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Card className="bg-card shadow-md border border-border rounded-2xl overflow-hidden pt-0 h-full justify-between">
                <CardHeader className="p-0">
                    <motion.div
                    style={{scale}}
                    >
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        alt={title || id.toString()}
                        height={500}
                        width={350}
                        className="rounded-t-lg w-full h-72 object-cover transition-transform hover:scale-110 duration-300"
                        />
                        </motion.div>
                </CardHeader>

                <CardContent className="p-5 flex flex-col gap-3">
                    <CardTitle className="text-xl font-bold text-card-foreground">{mediaTitle}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-3">{overview}</p>

                    <Link href={{
                        pathname: `/${mediaType}/${id}`,
                        query: {
                            id,
                            type: mediaType,
                            name: createSlug(mediaTitle || ""),
                        }
                    }} className="mt-3">
                        <Button className="w-full py-3 text-lg font-semibold bg-primary text-primary-foreground hover:bg-accent transition-all">
                            {first_air_date ? "📺 Watch Series" : "🎬 Watch Movie"}
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </motion.div>
    );
}
