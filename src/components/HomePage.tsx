"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden text-white">
            {/* Dynamic Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-purple-900 opacity-50 animate-pulse"></div>

            {/* Video Background Overlay */}
            <div className="absolute inset-0">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute w-full h-full object-cover opacity-30"
                >
                    <source src="/galaxy.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Content Section */}
            <motion.div 
                className="relative z-10 text-center flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Floating 3D Title */}
                <motion.h1
                    className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-10 tracking-widest"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                >
                    <span className="text-blue-400 neon-text">Stream Online</span>
                </motion.h1>

                {/* Glassmorphic Button Container */}
                <motion.div 
                    className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 grid grid-cols-2 md:grid-cols-4 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    {/* Anime Button */}
                    <Link href="/animes">
                        <motion.div 
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Button className="w-full py-4 px-6 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg neon-button">
                                🎥 Anime
                            </Button>
                        </motion.div>
                    </Link>

                    {/* Movie Button */}
                    <Link href="/movies">
                        <motion.div 
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Button className="w-full py-4 px-6 text-lg bg-green-600 hover:bg-green-700 shadow-lg neon-button">
                                🎬 Movies
                            </Button>
                        </motion.div>
                    </Link>

                    {/* TV Series Button */}
                    <Link href="/tv-series">
                        <motion.div 
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Button className="w-full py-4 px-6 text-lg bg-purple-600 hover:bg-purple-700 shadow-lg neon-button">
                                📺 TV Series
                            </Button>
                        </motion.div>
                    </Link>

                    {/* Others Button */}
                    <Link href="/others">
                        <motion.div 
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Button className="w-full py-4 px-6 text-lg bg-red-600 hover:bg-red-700 shadow-lg neon-button">
                                🎭 Others
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Floating Animated Elements */}
            <motion.div 
                className="absolute top-10 left-10 w-16 h-16 bg-blue-500 rounded-full opacity-40 animate-ping"
            ></motion.div>
            <motion.div 
                className="absolute bottom-20 right-20 w-20 h-20 bg-purple-500 rounded-full opacity-40 animate-pulse"
            ></motion.div>
        </div>
    );
}
