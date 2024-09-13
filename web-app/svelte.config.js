import adapter from "@sveltejs/adapter-cloudflare-workers";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import path from "path";

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      config: "wrangler.toml",
      platformProxy: {
        persist: "./static",
      },
    }),
    alias: {
      $components: path.resolve("src/components"),
      $lib: path.resolve("src"),
      $airesearchagent: path.resolve("../index.js"),
    },
  },
};
