import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
  ogType = "website"
}) {
  const location = useLocation();

  useEffect(() => {
    const baseTitle = "Hive Media";
    const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
    document.title = fullTitle;

    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const url = origin + location.pathname;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", ogType);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:url", url);

    upsertLink("canonical", url);
  }, [title, description, ogImage, ogType, location.pathname]);

  return null;
}
