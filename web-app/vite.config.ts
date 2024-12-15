import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  plugins: [
    sveltekit()
  ],
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
      $assets: path.resolve("./src/assets"),
      $components: path.resolve("./src/lib/components"),
      "$ai-research-agent": path.resolve("../")
    },
  },
  test: {
    environment: 'jsdom'
  }
});
