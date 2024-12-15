import { crx } from "@crxjs/vite-plugin";
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from "vite";
import manifest from "./src/manifest.config";
import path from "path";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
    plugins: [
    topLevelAwait(),
    svelte(), crx({ manifest })],
    server: {
        port: 5173,
        strictPort: false,
        hmr: {
            clientPort: 5173,
        },
    },
    build: {
      rollupOptions: {
        external: ['$app/environment'],
        input: {
          sidepanel: 'src/pages/sidepanel/index.html',
          // options: 'index.html'
        },
        
        
      }
      
    },
    resolve: {
      alias: {
        $lib: path.resolve("../web-app/src/lib"),
        $utils: path.resolve("../web-app/src/lib/utils/classname"),
        $assets: path.resolve("../web-app/src/assets"),
        $components: path.resolve("../web-app/src/lib/components"),
        "$ai-research-agent": path.resolve("../"),
      },
    },
});
