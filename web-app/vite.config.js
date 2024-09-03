import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import topLevelAwait from "vite-plugin-top-level-await";
import path from "path";

export default defineConfig({
	plugins: [
		// topLevelAwait(),
		sveltekit()],
	resolve: {
		alias: {
		 
			$lib: path.resolve("./src"),
			$assets: path.resolve("./src/assets"),
		  $components: path.resolve("./src/components"),

		},
	  },
	
});
