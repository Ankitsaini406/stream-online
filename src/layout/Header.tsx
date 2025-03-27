"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full fixed top-0 left-0 z-50">
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex items-center justify-between py-4 px-6"
            >
                {/* Logo */}
                <Link href="/">
                    <motion.h1 
                        className="text-3xl font-extrabold text-primary tracking-wide cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                    >
                        Stream<span className="text-secondary">Online</span>
                    </motion.h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8 text-foreground font-medium">
                    {["Movies", "Animes", "TV Series", "Others"].map((item, index) => (
                        <motion.div 
                            key={index}
                            whileHover={{ scale: 1.1, color: "#F97316" }} // Accent orange on hover
                        >
                            <Link href={`/${item.toLowerCase().replace(" ", "-")}`} className="hover:text-secondary transition-all">
                                {item === "Movies" ? "🎬" : item === "Animes" ? "🎥" : item === "TV Series" ? "📺" : "🎭"} {item}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* Search Bar & Login */}
                <div className="flex items-center gap-4">
                    <Button className="bg-primary hover:bg-accent text-background px-6 py-2 transition-all hidden md:block shadow-md">
                        Login
                    </Button>

                    {/* Mobile Menu Toggle Button */}
                    <button 
                        className="md:hidden text-foreground p-2 focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={28} className="text-secondary" /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.div>

            {/* Mobile Navigation Menu */}
            {menuOpen && (
                <motion.nav 
                    className="md:hidden bg-[#111]/90 backdrop-blur-xl text-foreground text-center flex flex-col gap-4 py-6 shadow-lg rounded-lg border border-border"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {["Movies", "Animes", "TV Series", "Others"].map((item, index) => (
                        <Link 
                            key={index}
                            href={`/${item.toLowerCase().replace(" ", "-")}`} 
                            className="hover:text-primary transition-all text-lg"
                        >
                            {item}
                        </Link>
                    ))}
                    <Button className="bg-primary hover:bg-accent text-background px-6 py-2 transition-all w-fit mx-auto shadow-md">
                        Login
                    </Button>
                </motion.nav>
            )}
        </header>
    );
}
