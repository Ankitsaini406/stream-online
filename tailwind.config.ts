/** @type {import('tailwindcss').Config} */
import animatePlugin from "tailwindcss-animate";

module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [animatePlugin], // Add the animation plugin
};
