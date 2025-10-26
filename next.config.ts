import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    qualities: [75, 80, 85, 90, 95, 100],
  },
  serverExternalPackages: ['socket.io', 'socket.io-client'],
};

export default nextConfig;
