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
  //  paths: {
  //   base: process.env.NODE_ENV === 'production' ? '/' : '',
  //   relative: true // Required for proper path resolution [5]
  // },
  kit: {
    files: {
      appTemplate: 'src/loading.html',
      errorTemplate: 'src/error.html',
    },
		adapter: adapter({
      config: 'wrangler.toml',
      platformProxy: {
        persist: './static'
      }
		}),
    alias: {
      $lib: "./src/lib",
      $components: "./src/lib/components",
      $utils: "./src/lib/utils"
    }
  }
};

export default config;
