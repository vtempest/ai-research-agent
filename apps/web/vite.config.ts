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
      "reason-editor":  path.resolve("../../packages/reason-editor"),
      "ai-research-agent":  path.resolve("../../packages/ai-research-agent/src/index.ts"),
      "grab-api.js": path.resolve("../../../grab-api.js/src/grab-api.ts")
    },
  },
  build: {
    rollupOptions: {
      // @ts-ignore
      plugins: [rollupNodePolyFill()],
      external: [ 'fs'] // Prevent double-bundling

    }
  },
  optimizeDeps: {

    exclude: ['node:stream',  'child_process'],
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
