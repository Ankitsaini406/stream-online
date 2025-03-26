"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function HomePage() {
    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden text-white">
            {/* Hero Section */}
            <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-purple-900 opacity-50 animate-pulse"></div>
                <div className="absolute inset-0">
                    <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover opacity-30">
                        <source src="/galaxy.mp4" type="video/mp4" />
                    </video>
                </div>
                <motion.div
                    className="relative z-10 text-center flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <motion.h1
                        className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-10 tracking-widest"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <span className="text-blue-400 neon-text">Stream Online</span>
                    </motion.h1>
                    <motion.div
                        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 grid grid-cols-2 md:grid-cols-4 gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <NavItem href="/animes" label="🎥 Anime" color="bg-blue-600" />
                        <NavItem href="/movies" label="🎬 Movies" color="bg-green-600" />
                        <NavItem href="/tv-series" label="📺 TV Series" color="bg-purple-600" />
                        <NavItem href="/others" label="🎭 Others" color="bg-red-600" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Card Section */}
            <div className="relative w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-20 px-6">
                <div className="absolute inset-0 opacity-20 blur-lg"></div>
                <FeatureCard title="HD Streaming" description="Enjoy high-quality 1080p and 4K content with smooth playback." />
                <FeatureCard title="No Ads" description="Stream your favorite shows and movies without interruptions." />
                <FeatureCard title="Multi-Device Support" description="Watch on mobile, tablet, and desktop seamlessly." />
                <FeatureCard title="Regular Updates" description="New content added every week for endless entertainment." />
            </div>
        </div>
    );
}

function NavItem({ href, label, color }: { href: string; label: string; color: string }) {
    return (
        <Link href={href}>
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                <Button className={`w-full py-4 px-6 text-lg ${color} hover:opacity-80 shadow-lg neon-button`}>
                    {label}
                </Button>
            </motion.div>
        </Link>
    );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
    return (
        <div className="relative rounded-3xl p-[3px] overflow-hidden before:content-[''] before:absolute before:inset-0 before:-m-[5px] before:rounded-[24px] before:bg-gradient-to-r before:from-cyan-400 before:to-pink-500 before:animation-spinborder">
            {/* Inner solid border */}
            <div className="absolute inset-0 m-[3px] bg-[#111] rounded-3xl z-10"></div>

            {/* Card Content */}
            <Card className="relative rounded-2xl h-full bg-[#111] z-20 p-6 text-center text-white">
                <CardTitle className="text-xl font-bold mb-2">{title}</CardTitle>
                <CardContent className="text-sm opacity-80">{description}</CardContent>
            </Card>
        </div>
    );
}
