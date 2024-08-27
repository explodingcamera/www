import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [sitemap()],
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
