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

// Save the original index.html before first route overwrites it
let originalIndexHtml = null;

function startServer() {
  return new Promise((res) => {
    const server = createServer((req, reply) => {
      const url = req.url.split("?")[0];
      let filePath = join(DIST, url);

      if (!existsSync(filePath) || !extname(filePath)) {
        // SPA fallback — always serve the original index.html
        reply.writeHead(200, { "Content-Type": "text/html" });
        reply.end(originalIndexHtml);
        return;
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
  // Save original index.html before we overwrite it with prerendered version
  originalIndexHtml = readFileSync(join(DIST, "index.html"), "utf8");

  console.log("[prerender] Starting static server...");
  const server = await startServer();

  console.log("[prerender] Launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();

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
    await page.waitForSelector("h1", { timeout: 5000 }).catch(() => {});

    let html = await page.content();

    const dir = route === "/" ? DIST : join(DIST, route);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    writeFileSync(join(dir, "index.html"), html);
    console.log(`[prerender] ✓ ${route}`);

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
