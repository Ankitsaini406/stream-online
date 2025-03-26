import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
    content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
    theme: {
        extend: {
            animation: {
                spinborder: 'rotimg 3s linear infinite',
            },
            keyframes: {
                'rotimg': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
        },
    },
    plugins: [animate],
};

export default config;