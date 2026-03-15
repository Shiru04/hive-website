import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { writeFileSync } from "fs";
import { resolve } from "path";

function sitemapPlugin() {
  return {
    name: "generate-sitemap-index",
    closeBundle() {
      const env = loadEnv("production", process.cwd(), "VITE_");
      const apiUrl = env.VITE_API_URL;

      if (!apiUrl) {
        console.warn("[sitemap] VITE_API_URL not set — blog sitemap reference skipped");
      }

      const blogSitemapEntry = apiUrl
        ? `\n  <sitemap>\n    <loc>${apiUrl}/api/public/blog/sitemap.xml</loc>\n  </sitemap>`
        : "";

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://hivemediastop.com/sitemap-pages.xml</loc>
  </sitemap>${blogSitemapEntry}
</sitemapindex>
`;

      writeFileSync(resolve("dist", "sitemap.xml"), xml);
      console.log("[sitemap] Generated sitemap.xml index" + (apiUrl ? ` with blog sitemap from ${apiUrl}` : ""));
    },
  };
}

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  server: {
    port: 5173,
  },
  build: {
    sourcemap: false,
  },
});
