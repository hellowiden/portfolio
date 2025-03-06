import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Keeps debugging easier
  swcMinify: true, // Enables SWC compiler optimizations
};

export default nextConfig;
