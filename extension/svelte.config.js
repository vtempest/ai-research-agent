import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from '@sveltejs/adapter-auto';

export default {
  preprocess: [vitePreprocess({})],
  kit: {
    adapter: adapter(),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/' : '',
      relative: true // Required for proper path resolution [5]
    },
    alias: {
      $utils: "../web-app/src/lib/utils",
      $lib: '../web-app/src/lib',
      $components: '../web-app/src/lib/components',
      "$ai-research-agent": "../",
    }
  }
};

