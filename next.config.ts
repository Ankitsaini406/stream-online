import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();

const nextConfig: NextConfig = {
  images: {
    domains: [
      "image.tmdb.org",
    ],
  },
  env: {
    TMBD_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
};

export default nextConfig;
