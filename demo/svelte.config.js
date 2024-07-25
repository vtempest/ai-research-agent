import adapter from "@sveltejs/adapter-cloudflare-workers";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

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
      $components: "src/lib/components",
      $configs: "src/lib/configs",
      $constants: "src/lib/constants",
      $stores: "src/lib/stores",
      $utils: "src/lib/utils",
      $validations: "src/lib/validations",
    }
  }
};

export default config;
