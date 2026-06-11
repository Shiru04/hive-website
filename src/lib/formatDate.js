const LOCALES = { en: "en-US", es: "es-ES", de: "de-DE" };

/** Formats a date in the page's language (server-safe, no locale drift). */
export function formatDate(value, lang = "en") {
  if (!value) return "";
  return new Intl.DateTimeFormat(LOCALES[lang] || LOCALES.en, {
    dateStyle: "medium",
  }).format(new Date(value));
}
