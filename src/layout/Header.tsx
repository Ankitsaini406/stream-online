"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full bg-black bg-opacity-80 backdrop-blur-lg shadow-md sticky top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
                
                {/* Logo */}
                <Link href="/">
                    <motion.h1 
                        className="text-3xl font-extrabold text-white tracking-wide neon-text cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                    >
                        Stream<span className="text-blue-500">Online</span>
                    </motion.h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8 text-white font-medium">
                    <Link href="/movies" className="hover:text-blue-400 transition-all">🎬 Movies</Link>
                    <Link href="/animes" className="hover:text-green-400 transition-all">🎥 Anime</Link>
                    <Link href="/tv-series" className="hover:text-purple-400 transition-all">📺 TV Series</Link>
                    <Link href="/others" className="hover:text-red-400 transition-all">🎭 Others</Link>
                </nav>

                {/* Search Bar & Login */}
                <div className="flex items-center gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 shadow-lg transition-all hidden md:block">
                        Login
                    </Button>

                    {/* Mobile Menu Toggle Button */}
                    <button 
                        className="md:hidden text-white p-2 focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {menuOpen && (
                <motion.nav 
                    className="md:hidden bg-black bg-opacity-90 text-white text-center flex flex-col gap-4 py-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Link href="/movies" className="hover:text-blue-400 transition-all">🎬 Movies</Link>
                    <Link href="/animes" className="hover:text-green-400 transition-all">🎥 Anime</Link>
                    <Link href="/tv-series" className="hover:text-purple-400 transition-all">📺 TV Series</Link>
                    <Link href="/others" className="hover:text-red-400 transition-all">🎭 Others</Link>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 shadow-lg transition-all w-fit mx-auto">
                        Login
                    </Button>
                </motion.nav>
            )}
        </header>
    );
}
