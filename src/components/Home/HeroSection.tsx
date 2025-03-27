"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden text-foreground">
            {/* Hero Section */}

            <div className="relative h-screen w-full bg-gradient-to-b from-black via-[#1C1C1C] to-[#0D0D0D]">
                {/* Content */}
                <div className="relative z-10 flex flex-col items-start justify-center h-full px-10 md:px-20">
                    <motion.h1
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-primary text-4xl md:text-6xl font-bold"
                    >
                        Welcome to <span className="text-secondary">Stemonline</span>
                    </motion.h1>

                    <motion.p
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 1 }}
                        className="text-muted-foreground text-lg md:text-xl mt-4"
                    >
                        Watch your favorite <span className="text-accent">movies</span>, 
                        <span className="text-secondary"> TV shows</span>, and 
                        <span className="text-primary"> anime</span> in one place.
                    </motion.p>
                </div>
            </div>
        </div>
    );
}
