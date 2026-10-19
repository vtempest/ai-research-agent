#!/usr/bin/env bash
# Build script for the Vercel deployment: the docs (/docs, MDX compiled by
# fumadocs-mdx through next.config.ts) and the full live demo (/demo, with
# its /api/* routes from worker/api.ts) in one Next.js build.

set -e

cd "$(dirname "$0")"

# build-vercel.sh used to park app/docs, content/docs and DemoMount.tsx in
# these paths during a build. Fail loudly if a stale copy is still around
# instead of building a site with half its pages missing.
for stale in .vercel-backup components/demo/DemoMount.tsx.backup; do
  if [ -e "$stale" ]; then
    echo "Found $stale from an old demo-only build; restore it into place and delete it first." >&2
    exit 1
  fi
done

echo "Running Next.js build..."
EXTRACT_PDF_VERCEL_BUILD=1 npx next build

echo "Build complete!"
