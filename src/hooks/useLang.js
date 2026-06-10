"use client";

import { usePathname } from "next/navigation";

const SUPPORTED_LANGS = ["en", "es", "de"];

/**
 * Returns the current language derived from the URL path and a helper
 * function `lp(path)` that prefixes any path with the current lang segment.
 */
export function useLang() {
  const pathname = usePathname() || "/";
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  const lang = SUPPORTED_LANGS.includes(firstSegment) ? firstSegment : "en";

  /**
   * lp('/services') → '/en/services'
   * lp('/')         → '/en'
   * lp('')          → '/en'
   */
  const lp = (path) => {
    if (!path || path === "/") return `/${lang}`;
    return `/${lang}${path}`;
  };

  return { lang, lp, SUPPORTED_LANGS };
}
