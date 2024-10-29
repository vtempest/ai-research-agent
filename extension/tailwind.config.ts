import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: ["../web-app/src/**/*.{html,js,svelte,ts}"],
	safelist: ["dark"],
	theme: {
		
		extend: {
			
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	},
	corePlugins: {
		preflight: true,
	  }
};

export default config;
