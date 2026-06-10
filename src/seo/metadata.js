import en from "../locales/en.json";
import es from "../locales/es.json";
import de from "../locales/de.json";

export const SITE_URL = "https://hivemediastop.com";
export const SUPPORTED_LANGS = ["en", "es", "de"];

const OG_LOCALES = { en: "en_US", es: "es_ES", de: "de_DE" };
const DICTS = { en, es, de };

/** Server-side translation lookup: t('es', 'seo.home_title') */
export function t(lang, key) {
  const dict = DICTS[lang] || DICTS.en;
  const value = key.split(".").reduce((obj, k) => obj?.[k], dict);
  if (value !== undefined) return value;
  return key.split(".").reduce((obj, k) => obj?.[k], DICTS.en);
}

/**
 * Builds a Next.js Metadata object with canonical URL, hreflang alternates,
 * Open Graph and Twitter cards — the server-side replacement for SeoHead.
 *
 * `path` is the language-less page path ('' for home, '/services', ...).
 */
export function buildMetadata({
  lang,
  path = "",
  title,
  description,
  ogImage = "/og-image.jpg",
  ogType = "website",
}) {
  const baseTitle = "Hive Media";
  const fullTitle = title ? `${title} | ${baseTitle}` : `${baseTitle} | Digital Growth Agency`;
  const canonical = `${SITE_URL}/${lang}${path}`;
  const absoluteOgImage = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  const languages = Object.fromEntries(
    SUPPORTED_LANGS.map((lng) => [lng, `${SITE_URL}/${lng}${path}`])
  );
  languages["x-default"] = `${SITE_URL}/en${path}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      url: canonical,
      siteName: "Hive Media",
      locale: OG_LOCALES[lang] || "en_US",
      images: [{ url: absoluteOgImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteOgImage],
    },
  };
}
