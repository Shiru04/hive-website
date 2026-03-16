import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, join, extname } from "path";
import puppeteer from "puppeteer";

const DIST = resolve("dist");
const PORT = 4173;

const ROUTES = [
  "/",
  "/services",
  "/services/google-ads",
  "/services/websites",
  "/services/seo",
  "/services/internal-tools",
  "/services/analytics",
  "/about",
  "/blog",
  "/contact",
  "/industries",
  "/industries/construction",
  "/industries/hvac",
  "/industries/manufacturing",
];

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

// Simple static server that falls back to index.html (SPA behavior)
function startServer() {
  return new Promise((res) => {
    const server = createServer((req, reply) => {
      const url = req.url.split("?")[0];
      let filePath = join(DIST, url);

      if (!existsSync(filePath) || !extname(filePath)) {
        filePath = join(DIST, "index.html");
      }

      try {
        const data = readFileSync(filePath);
        const ext = extname(filePath);
        reply.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        reply.end(data);
      } catch {
        reply.writeHead(404);
        reply.end("Not found");
      }
    });
    server.listen(PORT, () => res(server));
  });
}

async function prerender() {
  console.log("[prerender] Starting static server...");
  const server = await startServer();

  console.log("[prerender] Launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();

    // Block external requests that slow down rendering (fonts, analytics, etc.)
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const url = req.url();
      if (
        url.includes("fonts.googleapis.com") ||
        url.includes("fonts.gstatic.com") ||
        url.includes("google-analytics") ||
        url.includes("googletagmanager")
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    const url = `http://localhost:${PORT}${route}`;
    console.log(`[prerender] Rendering ${route}...`);

    await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });

    // Wait a moment for React to fully render
    await page.waitForSelector("h1", { timeout: 5000 }).catch(() => {});

    // Get the rendered HTML
    let html = await page.content();

    // Clean up: remove scripts that would cause React to re-mount
    // We keep them — React hydrates gracefully on top of existing DOM

    // Write to the appropriate path
    const dir = route === "/" ? DIST : join(DIST, route);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    const outFile = join(dir, "index.html");
    writeFileSync(outFile, html);
    console.log(`[prerender] Saved ${outFile}`);

    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`[prerender] Done! Pre-rendered ${ROUTES.length} pages.`);
}

prerender().catch((e) => {
  console.error("[prerender] Error:", e);
  process.exit(1);
});
