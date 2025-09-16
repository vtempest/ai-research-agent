import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from '@sveltejs/adapter-auto';

export default {
  preprocess: [vitePreprocess({})],
  kit: {
    adapter: adapter(),
    paths: {
      relative: true // Required for proper path resolution [5]
    },
    alias: {
      $utils: "../web/src/lib/utils",
      $lib: '../web/src/lib',
      $components: '../web/src/lib/components',
    }
  }
};

