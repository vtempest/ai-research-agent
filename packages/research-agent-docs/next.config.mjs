import { createMDX } from 'fumadocs-mdx/next';


const withMDX = createMDX({
  mdxOptions: {
    remarkImageOptions: {
      onError: "ignore", // or "hide"
    },
  },
});



export const config = {
  output: 'export',
  distDir: './dist',

  reactStrictMode: false,
  images: {
    domains: ['i.imgur.com'],
    unoptimized: true,
  },
};
export default withMDX(config);
