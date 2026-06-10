# Hive Media Website

Next.js 15 (App Router) site for hivemediastop.com — migrated from a Vite + React Router SPA.

## Structure

- `app/(marketing)/[lang]/…` — public site in `en` / `es` / `de`. Pages are statically generated at build time (SSG) with per-language `generateMetadata` (title, description, canonical, hreflang, Open Graph).
- `app/(marketing)/[lang]/blog` and `blog/[slug]` — **dynamic** (server-rendered on every request): content comes from the backend API, so new/edited posts show up without a redeploy.
- `app/(portal)/portal/…` — client portal (client-side rendering, `noindex`).
- `app/sitemap.js` — `sitemap.xml` generated automatically (static pages + service/industry slugs from `src/data`, blog posts from the API, hreflang alternates). Dynamic — always fresh.
- `app/robots.js` — `robots.txt` (disallows `/portal`).
- `src/views` — page components; `src/components`, `src/hooks`, `src/data`, `src/locales` as before.

URL behavior (`next.config.mjs` redirects):

- `/` → `/en`
- legacy URLs without language prefix (`/services/seo`) → `/en/services/seo` (301)
- unsupported languages (`/fr/...`) → `/en/...` (307)

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Environment variables

Set in `.env.local` for local dev and in Vercel → Project Settings → Environment Variables for production:

- `NEXT_PUBLIC_API_URL` — backend API base URL (blog, contact form, portal)
- `NEXT_PUBLIC_HUB_URL` — socket.io hub URL (chat widget)

## Deploy (Vercel)

1. Push the repo to GitHub/GitLab and import it in Vercel (framework auto-detected: Next.js), or run `vercel` from this folder.
2. Add the two environment variables above (Production + Preview).
3. Deploy. `sitemap.xml`, `robots.txt`, redirects and per-language metadata all work out of the box — no extra config needed.
