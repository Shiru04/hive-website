import { SERVICES } from "@/data/services.js";
import { INDUSTRIES } from "@/data/industries.js";
import { SITE_URL, SUPPORTED_LANGS } from "@/seo/metadata.js";

// Generated on every request so new blog posts appear immediately.
export const dynamic = "force-dynamic";

const STATIC_PATHS = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/industries", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
];

function languageAlternates(path) {
  const languages = Object.fromEntries(
    SUPPORTED_LANGS.map((lang) => [lang, `${SITE_URL}/${lang}${path}`])
  );
  languages["x-default"] = `${SITE_URL}/en${path}`;
  return languages;
}

async function fetchBlogPaths() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return [];
  try {
    const res = await fetch(`${apiUrl}/api/public/blog/posts?limit=100`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map((post) => ({
      path: `/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || undefined,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const pages = [
    ...STATIC_PATHS,
    ...SERVICES.map((s) => ({
      path: `/services/${s.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...INDUSTRIES.map((i) => ({
      path: `/industries/${i.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...(await fetchBlogPaths()),
  ];

  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME;

  return pages.flatMap(({ path, lastModified, changeFrequency, priority }) =>
    SUPPORTED_LANGS.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified: lastModified || buildTime,
      changeFrequency,
      priority: lang === "en" ? priority : Math.max(priority - 0.1, 0.1),
      alternates: { languages: languageAlternates(path) },
    }))
  );
}
