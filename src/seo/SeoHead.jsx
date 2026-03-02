import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://hivemediastop.com";

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

function upsertLink(rel, href) {
  if (!href) return;
  let link = document.head.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export default function SeoHead({
  title,
  description,
  ogImage = "/og-image.jpg",
  ogType = "website",
  schema = null,
}) {
  const location = useLocation();

  useEffect(() => {
    const baseTitle = "Hive Media";
    const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
    document.title = fullTitle;

    const url = SITE_URL + location.pathname;

    // Ensure og:image is always an absolute URL
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
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:site_name", "Hive Media");
    upsertMeta("property", "og:locale", "en_US");

    // Twitter Card
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", absoluteOgImage);

    // Canonical
    upsertLink("canonical", url);

    // Schema (JSON-LD) — inject per-page schema if provided
    const existingPageSchema = document.head.querySelector(
      'script[data-seo-head="true"]'
    );
    if (existingPageSchema) {
      existingPageSchema.remove();
    }
    if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-head", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // Cleanup page-level schema on unmount
    return () => {
      const el = document.head.querySelector(
        'script[data-seo-head="true"]'
      );
      if (el) el.remove();
    };
  }, [title, description, ogImage, ogType, schema, location.pathname]);

  return null;
}
