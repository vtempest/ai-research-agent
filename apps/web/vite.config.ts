import { defineConfig } from 'vite';
import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

// @ts-ignore
export default defineConfig({
  plugins: [
    tailwindcss(),

    // @ts-ignore
    sveltekit()
  ],

  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
      $assets: path.resolve("./src/assets"),
      $components: path.resolve("./src/lib/components"),
      "grab-url": path.resolve("../../../grab-url"),
      "reason-editor": path.resolve("../../packages/reason-editor"),
      "qwksearch-api-client": path.resolve("../../packages/qwksearch-api-client"),
      "ai-research-agent": path.resolve("../../packages/ai-research-agent/src/index.ts"),
    },
  },
  ssr: {
    noExternal: ['@hey-api/openapi-ts'], // keep it externalized in server build only
  },
  build: {
    rollupOptions: {
      // @ts-ignore
      plugins: [rollupNodePolyFill()],
      external: ['fs'] // Prevent double-bundling

    }
  },
  optimizeDeps: {

    exclude: ['node:stream', 'child_process'],
    esbuildOptions: {
      define: {
        global: 'globalThis' // Fix global scope
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({ buffer: true, process: true })
      ]
    }
  },
  server: {
    port: 5173
  }
});
