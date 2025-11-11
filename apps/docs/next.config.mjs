import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX({
 
});

/** @type {import('next').NextConfig} */
export const config = {
 
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/:path*',
      },
    ];
  },
  output: 'export',
  distDir: './dist',
  

  reactStrictMode: false,
  images: {
    domains: ['i.imgur.com'],
    unoptimized: true,
  },
};
export default withMDX(config);
