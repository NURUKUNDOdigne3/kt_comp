import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    qualities: [75, 80, 85, 90, 95, 100],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    minimumCacheTTL: 60,
    formats: ['image/webp', 'image/avif'],
  },
  serverExternalPackages: ['socket.io', 'socket.io-client'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(gltf|glb|bin)$/,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
