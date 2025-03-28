"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export default function Card() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    });

    const scale1 = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, -5]);

    const scale2 = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [-5, 0]);

    const backgroundColor = useTransform(scrollYProgress, [0, 1], ["#EAEAEA", "#E50914"])

    return (
        <>
            <motion.main
            style={{backgroundColor}}
            ref={container} className="relative h-[200vh] bg-foreground">
                {/* Movies Section */}
                <motion.section
                    style={{ scale: scale1, rotate: rotate1 }}
                    className="sticky top-0 h-screen bg-primary text-[4vh] md:text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vw]"
                >
                    <p className="font-bold tracking-wide">🎬 Movies</p>
                    <motion.div
                        initial={{ width: 50 }}
                        whileHover={{ width: 200 }}
                    >
                        <Link href="/movies" className="flex gap-4 items-center hover:underline underline-offset-8 transition">
                            <span>Watch</span>
                            <ArrowRightIcon size={50} />
                        </Link>
                    </motion.div>
                </motion.section>

                {/* Anime Section */}
                <motion.section
                    style={{ scale: scale2, rotate: rotate2 }}
                    className="sticky top-0 h-screen bg-primary-foreground text-[4vh] md:text-[3.5vw] flex flex-col items-center justify-center text-white"
                >
                    <p className="font-bold tracking-wide">🎥 Anime</p>
                    <motion.div
                        initial={{ width: 50 }}
                        whileHover={{ width: 200 }}
                    >
                        <Link href="/animes" className="flex gap-4 items-center hover:underline underline-offset-8 transition">
                            <span>Watch</span>
                            <ArrowRightIcon size={50} />
                        </Link>
                    </motion.div>
                </motion.section>
            </motion.main>

            {/* TV Series Section (Moved Inside Main) */}
            <motion.section
                initial={{ scale: 0, translateY: -150 }}
                whileInView={{ scale: 1, translateY: 0 }}
                transition={{ duration: 1 }}
                className="sticky top-0 h-screen bg-accent text-[4vh] md:text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vw]"
            >
                <p className="font-bold tracking-wide">📺 TV Series</p>
                <motion.div
                        initial={{ width: 50 }}
                        whileHover={{ width: 200 }}
                >
                    <Link href="/tv-series" className="flex gap-4 items-center hover:underline underline-offset-8 transition">
                        <span>Watch</span>
                        <ArrowRightIcon size={50} />
                    </Link>
                </motion.div>
            </motion.section>
        </>
    );
}
