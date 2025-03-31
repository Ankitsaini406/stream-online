import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();

const nextConfig: NextConfig = {
  images: {
    domains: [
      "image.tmdb.org",
      "images.unsplash.com",
    ],
  },
  env: {
    API_URL: process.env.LOCAL_HOST_URL,
    HOST_URL: process.env.HOST_URL,
    GTM_A_KEY: process.env.NEXT_PUBLIC_GTM_A_KEY,
    GTM_KEY: process.env.NEXT_PUBLIC_GTM_KEY,
    TMBD_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
};

export default nextConfig;
