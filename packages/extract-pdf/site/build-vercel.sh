#!/usr/bin/env bash
# Build script for Vercel deployment (demo only)
# Temporarily moves docs directories out of the way during build
# Swaps DemoMount for Vercel-only version

set -e

SITE_DIR="$(dirname "$0")"
APP_DOCS_DIR="$SITE_DIR/app/docs"
BACKUP_DIR="$SITE_DIR/.vercel-backup"
APP_DOCS_BACKUP="$BACKUP_DIR/app-docs"
CONTENT_DOCS_DIR="$SITE_DIR/content/docs"
CONTENT_DOCS_BACKUP="$BACKUP_DIR/content-docs"
DEMO_MOUNT="$SITE_DIR/components/demo/DemoMount.tsx"
DEMO_MOUNT_BACKUP="$SITE_DIR/components/demo/DemoMount.tsx.backup"
DEMO_MOUNT_VERCEL="$SITE_DIR/components/demo/DemoMount.vercel.tsx"

# Put everything back even if the build fails, so a local run never leaves
# the docs or the Vercel DemoMount in place to be committed by accident.
restore() {
  if [ -d "$APP_DOCS_BACKUP" ]; then
    echo "Restoring app/docs directory..."
    mv "$APP_DOCS_BACKUP" "$APP_DOCS_DIR"
  fi
  if [ -d "$CONTENT_DOCS_BACKUP" ]; then
    echo "Restoring content/docs directory..."
    mv "$CONTENT_DOCS_BACKUP" "$CONTENT_DOCS_DIR"
  fi
  if [ -f "$DEMO_MOUNT_BACKUP" ]; then
    echo "Restoring DemoMount..."
    mv "$DEMO_MOUNT_BACKUP" "$DEMO_MOUNT"
  fi
  rmdir "$BACKUP_DIR" 2>/dev/null || true
}
trap restore EXIT

# Move docs directories out of the way. They go outside app/ because Next
# would still route (and type-check) anything left under it.
mkdir -p "$BACKUP_DIR"
if [ -d "$APP_DOCS_DIR" ]; then
  echo "Moving app/docs directory to backup..."
  mv "$APP_DOCS_DIR" "$APP_DOCS_BACKUP"
fi

if [ -d "$CONTENT_DOCS_DIR" ]; then
  echo "Moving content/docs directory to backup..."
  mv "$CONTENT_DOCS_DIR" "$CONTENT_DOCS_BACKUP"
fi

# Swap DemoMount for Vercel version
if [ -f "$DEMO_MOUNT" ]; then
  echo "Swapping DemoMount for Vercel version..."
  cp "$DEMO_MOUNT" "$DEMO_MOUNT_BACKUP"
  cp "$DEMO_MOUNT_VERCEL" "$DEMO_MOUNT"
fi

# Run Next.js build
echo "Running Next.js build..."
EXTRACT_PDF_VERCEL_BUILD=1 npx next build

echo "Build complete!"
