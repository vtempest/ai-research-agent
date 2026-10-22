/**
 * @file next.config.ts
 * @description Next.js configuration for the Vercel deployment: the docs
 * (`/docs`) and the live demo (`/demo` plus its `/api/*` routes) in one app.
 *
 * `createMDX()` runs fumadocs-mdx at build time: it compiles
 * `content/docs/**` with `source.config.ts` and writes the typed index to
 * `.source/`, which `lib/fumadocs/source.tsx` imports as
 * `fumadocs-mdx:collections/server` (mapped in tsconfig.json).
 */
import { createRequire } from 'node:module';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const root = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

/** A file inside an installed package, as the `./`-relative path Turbopack's aliases take. */
function packageFile(name: string, file: string): string {
  // `require.resolve` lands in the package's `dist/`, one level below its root.
  const dir = dirname(dirname(require.resolve(name)));
  return `./${relative(root, join(dir, file))}`;
}

const config: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/docs/llms.mdx/docs/:path*',
      },
    ];
  },
  // tsconfig.json maps these three imports to the `types/*.d.ts` shims so
  // `tsc` can check worker/api.ts, and Turbopack follows tsconfig paths too:
  // left alone, it bundles the shims and every call is `undefined`. Point the
  // bundler back at the real packages.
  turbopack: {
    resolveAlias: {
      'extract-pdf': packageFile('extract-pdf', 'dist/pdf-to-html.es.js'),
      'extract-cite': packageFile('extract-cite', 'dist/extract-cite.es.js'),
      'extract-webpage/url-to-content/url-to-content': packageFile(
        'extract-webpage',
        'src/url-to-content/url-to-content.ts',
      ),
    },
  },
  // extract-webpage publishes its subpath exports as TypeScript source.
  transpilePackages: ['extract-webpage'],
  // extract-pdf's optional engines (LiteParse's native addon, Granite Docling
  // through transformers.js, @napi-rs/canvas) sit behind dynamic `import()`s
  // the demo never takes. Native addons cannot be bundled, so Node loads them
  // from node_modules only if one is ever selected.
  serverExternalPackages: [
    '@llamaindex/liteparse',
    '@llamaindex/liteparse-wasm',
    '@huggingface/transformers',
    '@napi-rs/canvas',
    'onnxruntime-node',
  ],
  // build-vercel.sh sets this so the type check skips the Cloudflare-only
  // files (Vite config, Worker entry).
  typescript: process.env.EXTRACT_PDF_VERCEL_BUILD
    ? { tsconfigPath: 'tsconfig.vercel.json' }
    : undefined,
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX();

export default withMDX(config);
