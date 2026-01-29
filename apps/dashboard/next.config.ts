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
  async rewrites() {
    const marketingUrl = process.env.NEXT_PUBLIC_MARKETING_URL || 'http://localhost:3000';
    return [
      {
        source: '/api/experiences',
        destination: `${marketingUrl}/api/experiences`,
      },
      {
        source: '/api/messages',
        destination: `${marketingUrl}/api/messages`,
      },
      {
        source: '/api/projects',
        destination: `${marketingUrl}/api/projects`,
      },
      {
        source: '/api/stats',
        destination: `${marketingUrl}/api/stats`,
      },
      {
        source: '/api/users',
        destination: `${marketingUrl}/api/users`,
      },
    ];
  },
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
