"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";

export default function HomePage() {

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden text-white">
            {/* Background Animation */}
            <div className="absolute inset-0">
                <div className="absolute w-full h-full bg-gradient-to-b from-black/50 via-black/20 to-black"></div>
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute w-full h-full object-cover"
                >
                    <source src="/galaxy.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
                {/* Title Animation */}
                <motion.h1
                    className="text-5xl font-extrabold drop-shadow-lg mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Welcome to <span className="text-blue-500">Stream Online</span>
                </motion.h1>

                {/* Buttons */}
                <motion.div 
                    className="grid grid-cols-2 gap-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Anime Button */}
                    <Link href={"/animes"}>
                    <Button 
                        className="px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-lg transition-all"
                        >
                        🎥 Watch Anime
                    </Button>
                        </Link>

                    {/* Movie Button */}
                    <Link href={"/movies"}>
                    <Button 
                        className="px-6 py-3 text-lg bg-green-600 hover:bg-green-700 cursor-pointer shadow-lg transition-all"
                        >
                        🎬 Watch Movies
                    </Button>
                        </Link>
                </motion.div>
            </div>
        </div>
    );
}
