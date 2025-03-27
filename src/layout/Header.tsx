"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full sticky top-0 left-0 z-50">
            <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", stiffness: 260, damping: 20 }}
                className="flex items-center justify-between py-4 px-6 
                bg-gradient-to-r from-background/80 to-secondary/50 
                backdrop-blur-2xl shadow-lg "
            >
                {/* Logo */}
                <Link href="/">
                    <motion.h1 
                        className="text-3xl font-extrabold text-foreground tracking-wide cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                    >
                        Stream<span className="text-accent">Online</span>
                    </motion.h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8 text-foreground font-medium">
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Link href="/movies" className="hover:text-secondary transition-all">🎬 Movies</Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Link href="/animes" className="hover:text-secondary transition-all">🎥 Anime</Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Link href="/tv-series" className="hover:text-secondary transition-all">📺 TV Series</Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Link href="/others" className="hover:text-secondary transition-all">🎭 Others</Link>
                    </motion.div>
                </nav>

                {/* Search Bar & Login */}
                <div className="flex items-center gap-4">
                    <Button className="bg-primary hover:bg-primary-foreground hover:text-foreground text-background px-6 py-2 transition-all hidden md:block">
                        Login
                    </Button>

                    {/* Mobile Menu Toggle Button */}
                    <button 
                        className="md:hidden text-foreground p-2 focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.div>

            {/* Mobile Navigation Menu */}
            {menuOpen && (
                <motion.nav 
                    className="md:hidden bg-background/80 backdrop-blur-xl text-foreground text-center flex flex-col gap-4 py-6 shadow-lg rounded-lg border border-border"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Link href="/movies" className="hover:text-primary transition-all">🎬 Movies</Link>
                    <Link href="/animes" className="hover:text-secondary transition-all">🎥 Anime</Link>
                    <Link href="/tv-series" className="hover:text-muted transition-all">📺 TV Series</Link>
                    <Link href="/others" className="hover:text-accent transition-all">🎭 Others</Link>
                    <Button className="bg-primary hover:bg-primary-foreground hover:text-foreground text-background px-6 py-2 transition-all w-fit mx-auto">
                        Login
                    </Button>
                </motion.nav>
            )}
        </header>
    );
}
