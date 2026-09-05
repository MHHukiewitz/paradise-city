import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.jimcdn.com",
      },
    ],
  },
};

export default nextConfig;
