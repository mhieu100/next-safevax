import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
 
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vnvc.vn', 
        port: '',
        pathname: '/wp-content/uploads/**', 
      },
    ]
  },
};

export default nextConfig;
