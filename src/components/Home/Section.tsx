"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Card() {

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start center", "end end"],
    });

    // Move the image from left (0%) to right (-100%)
    const imageX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    if (process.env.NODE_ENV === 'production') {
        return null;
    }

    return (
        <motion.main ref={container} className="relative h-screen bg-background overflow-hidden">
            {/* Card Box */}
            <motion.div className="relative h-[600px] w-[400px] overflow-hidden rounded-lg border">
                {/* Image Moving from Left to Right */}
                <motion.div style={{ x: imageX }} className="relative h-full w-[200%]">
                    <Image 
                        src="https://images.unsplash.com/photo-1480497490787-505ec076689f?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="mountain" 
                        fill 
                        className="object-cover"
                    />
                </motion.div>
            </motion.div>
        </motion.main>
    );
}
