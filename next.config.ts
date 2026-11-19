import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Poster images come from Wikimedia Commons (public domain / CC BY).
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/wikipedia/commons/**" },
      { protocol: "https", hostname: "thumb.wikimedia.org", pathname: "/wikipedia/commons/**" },
    ],
  },
};

export default nextConfig;
