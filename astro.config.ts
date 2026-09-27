import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
	integrations: [sitemap()],
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "Google Sans",
			cssVariable: "--font-google-sans",
			weights: [400, 500],
			styles: ["normal"],
			fallbacks: ["sans-serif"],
		},
	],
	site: "https://henrygressmann.de",
	prefetch: true,
	trailingSlash: "never",
	build: {
		inlineStylesheets: "always",
		format: "file",
	},
	vite: {
		css: { transformer: "lightningcss" },
	},
});
