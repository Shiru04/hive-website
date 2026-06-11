/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // The project keeps its own flat eslint config (run via `npm run lint`).
    ignoreDuringBuilds: true,
  },
  experimental: {
    viewTransition: true,
  },
  env: {
    // Inlined at build time — static marketing pages only change on deploy,
    // so the build date is their sitemap <lastmod>.
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
      // Unsupported 2-letter language prefixes fall back to English,
      // preserving the rest of the path (/fr/services -> /en/services).
      {
        source: "/:lang((?!en|es|de)[a-z]{2})/:path*",
        destination: "/en/:path*",
        permanent: false,
      },
      // Legacy URLs without a language prefix (the old prerendered site
      // lived at /services, /about, ...) keep working at /en/...
      {
        source:
          "/:path((?!en$|es$|de$|en/|es/|de/|portal|api|_next|.*\\..*).+)",
        destination: "/en/:path",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
