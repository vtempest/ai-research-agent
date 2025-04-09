import adapter from "@sveltejs/adapter-cloudflare-workers";
/** @typedef {import('@sveltejs/kit').Config} Config */
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

 /** @type {Config} */ 
const config = {
  onwarn: (warning, handler) => {
    if (warning.code) {
      return;
    }
    handler(warning); // Handle other warnings normally
  },
   preprocess: vitePreprocess(),
  kit: {
		adapter: adapter({
      config: 'wrangler.toml',
      platformProxy: {
        persist: './static'
      }
		}),
    alias: {
      $lib: "./src/lib",
      $components: "./src/lib/components",
      $utils: "./src/lib/utils",
      "$ai-research-agent": "../"
    }
  }
};

export default config;
