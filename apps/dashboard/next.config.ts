import path from 'path';
import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  transpilePackages: ['@portfolio/ui', '@portfolio/lib', '@portfolio/database'],
  outputFileTracingRoot: path.join(__dirname, '../../'),
  assetPrefix: isProd ? '/dashboard' : undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
