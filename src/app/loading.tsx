"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <motion.div
            className="min-w-screen min-h-screen flex flex-col items-center justify-center bg-black text-white z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <motion.div
                className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <p className="mt-4 text-lg font-semibold">Loading...</p>
        </motion.div>
    );
}
