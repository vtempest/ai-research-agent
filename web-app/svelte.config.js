import adapter from "@sveltejs/adapter-cloudflare-workers";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import path from "path";


/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  kit: {
		adapter: adapter({
	  config: 'wrangler.toml',
	  platformProxy: {
		persist: './static'
	  }
		}),
    alias: {
      $components: "src/components",
      $lib: path.resolve("src")

    }
  }
};

export default config;
