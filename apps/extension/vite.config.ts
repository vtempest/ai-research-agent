import { crx } from "@crxjs/vite-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import manifest from "./src/manifest.config.ts";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// @ts-ignore
export default defineConfig({
  plugins: [  svelte(), crx({ manifest }), tailwindcss()],
  server: {
    port: 5173,
    strictPort: false,
    hmr: {
      clientPort: 5173,
    },
  },
  legacy: {
    skipWebSocketTokenCheck: true,
  },
  build: {
    rollupOptions: {
      input: {
        sidepanel: "src/pages/sidepanel/index.html",
        // options: 'index.html'
      },
      external: ['$app/paths']
    },
  },
  resolve: {
    alias: {
      $lib: path.resolve("../web/src/lib"),
      $utils: path.resolve("../web/src/lib/utils"),
      $components: path.resolve("../web/src/lib/components"),
    },
  },
});
