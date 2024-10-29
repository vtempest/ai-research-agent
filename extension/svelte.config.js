import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from '@sveltejs/adapter-auto';

export default {
  preprocess: [vitePreprocess({})],
  kit: {
    adapter: adapter(),
    alias: {
      $lib: '../web-app/src/lib',
      $assets: "../web-app/src/assets",
      $components: '../web-app/src/lib/components'
    }
  }
};
