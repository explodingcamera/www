import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [sitemap()],
	site: "https://henrygressmann.de",
	prefetch: true,
	build: {
		inlineStylesheets: "always",
	},
	vite: {
		css: { transformer: "lightningcss" },
	},
});
