import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from "path";

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
		 
			$lib: path.resolve("D:/GitHub/ai-research-agent/src"),
			$assets: path.resolve("./src/assets"),
		  $components: path.resolve("./src/components"),

		},
	  },
	
});
