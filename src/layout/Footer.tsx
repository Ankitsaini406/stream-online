"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full bg-black text-white py-10">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
                {/* Brand & Description */}
                <div className="flex flex-col items-center sm:items-start">
                    <div className="relative w-16 h-16 rounded-full bg-white/10 mb-4">
                    <Image src='/favicon-192.png' alt="Stream Online" fill />
                    </div>
                    <motion.h1 
                        className="text-3xl font-extrabold neon-text cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                    >
                        Stream<span className="text-blue-500">Online</span>
                    </motion.h1>
                    <p className="text-gray-400 mt-2">
                        Your ultimate streaming destination for movies, anime, TV shows, and more!
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-blue-400">Quick Links</h3>
                    <ul className="mt-2 space-y-2">
                        <li><Link href="/movies" className="hover:text-blue-400 transition-all">Movies</Link></li>
                        <li><Link href="/animes" className="hover:text-green-400 transition-all">Anime</Link></li>
                        <li><Link href="/tv-series" className="hover:text-purple-400 transition-all">TV Series</Link></li>
                        <li><Link href="/others" className="hover:text-red-400 transition-all">Others</Link></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold text-blue-400">Follow Us</h3>
                    <div className="mt-2 flex gap-4">
                        <motion.a 
                            href="https://facebook.com" target="_blank" 
                            whileHover={{ scale: 1.2 }} 
                            className="text-blue-500 hover:text-blue-600 transition-all"
                        >
                            <Facebook size={24} />
                        </motion.a>

                        <motion.a 
                            href="https://twitter.com" target="_blank" 
                            whileHover={{ scale: 1.2 }} 
                            className="text-blue-400 hover:text-blue-500 transition-all"
                        >
                            <Twitter size={24} />
                        </motion.a>

                        <motion.a 
                            href="https://instagram.com" target="_blank" 
                            whileHover={{ scale: 1.2 }} 
                            className="text-pink-500 hover:text-pink-600 transition-all"
                        >
                            <Instagram size={24} />
                        </motion.a>

                        <motion.a 
                            href="https://youtube.com" target="_blank" 
                            whileHover={{ scale: 1.2 }} 
                            className="text-red-500 hover:text-red-600 transition-all"
                        >
                            <Youtube size={24} />
                        </motion.a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-500 mt-8 text-sm">
                © {new Date().getFullYear()} StreamOnline. All rights reserved.
            </div>
        </footer>
    );
}
