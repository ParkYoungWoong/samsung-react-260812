import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false,
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com'
      },
      {
        protocol: 'https',
        hostname: 'img.omdbapi.com'
      }
    ]
  },
  experimental: {
    optimizePackageImports: ['./utils/index.ts']
  }
}

export default nextConfig
