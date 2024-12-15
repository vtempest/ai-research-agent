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
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  server: {
    proxy: {
  
    },
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
      $utils: "./src/lib/utils/classname",
    }
  }
};

export default config;
