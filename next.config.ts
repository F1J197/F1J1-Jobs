import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization for low bandwidth
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      },
    ],
  },
  // Compression
  compress: true,
  // React strict mode
  reactStrictMode: true,
  // Turbopack configuration (Next.js 16)
  turbopack: {},
};

export default nextConfig;
