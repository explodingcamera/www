import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap()],
  site: "https://henrygressmann.de",
  compressHTML: true,
  prefetch: true,
  build: {
    inlineStylesheets: 'always'
  }
});