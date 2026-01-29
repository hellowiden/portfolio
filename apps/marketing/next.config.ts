import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  transpilePackages: ['@portfolio/ui', '@portfolio/lib', '@portfolio/database'],
  outputFileTracingRoot: path.join(__dirname, '../../'),
  async rewrites() {
    const dashboardUrl =
      process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:3001';
    return [
      {
        source: '/dashboard',
        destination: `${dashboardUrl}/dashboard`,
      },
      {
        source: '/dashboard/:path*',
        destination: `${dashboardUrl}/dashboard/:path*`,
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
