// <reference types="vitest" />
import { defineConfig } from 'vite';
import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// @ts-ignore
export default defineConfig({
  plugins: [
    tailwindcss(),

    // @ts-ignore
    sveltekit()
  ],
  build: {
    rollupOptions: {
      // external: ['$app/paths']
    }
  },
  resolve: {
    alias: {
      "./$types":  path.resolve("./web-app/src/global.d.ts"),
      $lib: path.resolve("./src/lib"),
      $assets: path.resolve("./src/assets"),
      $components: path.resolve("./src/lib/components"),
      "$ai-research-agent": path.resolve("../"),
    },
  },
  server: {
    port: 5173
  }

});
