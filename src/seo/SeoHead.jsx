import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "../hooks/useLang.js";

const SITE_URL = "https://hivemediastop.com";
const SUPPORTED_LANGS = ["en", "es", "de"];

const OG_LOCALES = { en: "en_US", es: "es_ES", de: "de_DE" };

function upsertMeta(attr, key, value) {
  if (!value) return;
  let meta = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", value);
}

function upsertLink(rel, href, attrs = {}) {
  if (!href) return;
  let link = document.head.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
  Object.entries(attrs).forEach(([k, v]) => link.setAttribute(k, v));
}

function upsertHreflang(hreflang, href) {
  let link = document.head.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", hreflang);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function removeHreflangLinks() {
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove());
}

export default function SeoHead({
  title,
  description,
  ogImage = "/og-image.jpg",
  ogType = "website",
  schema = null,
}) {
  const location = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    const baseTitle = "Hive Media";
    const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
    document.title = fullTitle;

    // Strip the /:lang prefix to get the page path (e.g. /en/services → /services)
    const pathWithoutLang = location.pathname.replace(/^\/[a-z]{2}(\/|$)/, "/") || "/";
    const canonicalUrl = `${SITE_URL}/${lang}${pathWithoutLang === "/" ? "" : pathWithoutLang}`;

    const absoluteOgImage = ogImage.startsWith("http")
      ? ogImage
      : `${SITE_URL}${ogImage}`;

    // Standard meta
    upsertMeta("name", "description", description);

    // Open Graph
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", ogType);
    upsertMeta("property", "og:image", absoluteOgImage);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:site_name", "Hive Media");
    upsertMeta("property", "og:locale", OG_LOCALES[lang] || "en_US");

    // Twitter Card
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", absoluteOgImage);

    // Canonical
    upsertLink("canonical", canonicalUrl);

    // Hreflang alternates
    removeHreflangLinks();
    SUPPORTED_LANGS.forEach((lng) => {
      const altUrl = `${SITE_URL}/${lng}${pathWithoutLang === "/" ? "" : pathWithoutLang}`;
      upsertHreflang(lng, altUrl);
    });
    // x-default points to /en
    upsertHreflang("x-default", `${SITE_URL}/en${pathWithoutLang === "/" ? "" : pathWithoutLang}`);

    // Schema (JSON-LD)
    const existingPageSchema = document.head.querySelector(
      'script[data-seo-head="true"]'
    );
    if (existingPageSchema) existingPageSchema.remove();
    if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-head", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const el = document.head.querySelector('script[data-seo-head="true"]');
      if (el) el.remove();
    };
  }, [title, description, ogImage, ogType, schema, location.pathname, lang]);

  return null;
}
