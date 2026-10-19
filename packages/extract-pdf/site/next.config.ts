/**
 * @file next.config.ts
 * @description Next.js configuration for Vercel deployment (demo only).
 * Only builds the demo page and API routes.
 */
import type { NextConfig } from 'next';

const config: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/docs/llms.mdx/docs/:path*',
      },
    ];
  },
  // build-vercel.sh sets this so the type check skips the Cloudflare-only
  // files (Vite config, Worker entry) and the docs it moves out of the build.
  typescript: process.env.EXTRACT_PDF_VERCEL_BUILD
    ? { tsconfigPath: 'tsconfig.vercel.json' }
    : undefined,
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
};

export default config;