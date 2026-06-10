import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import es from "./locales/es.json";
import de from "./locales/de.json";

export const SUPPORTED_LANGS = ["en", "es", "de"];

export const resources = {
  en: { translation: en },
  es: { translation: es },
  de: { translation: de },
};

/**
 * Creates an i18next instance for a given language.
 * `initImmediate: false` makes init synchronous (resources are bundled),
 * which is required so server-side rendering picks the right language.
 */
export function createI18n(lang) {
  const i18n = createInstance();
  i18n.use(initReactI18next).init({
    resources,
    lng: SUPPORTED_LANGS.includes(lang) ? lang : "en",
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGS,
    interpolation: { escapeValue: false },
    initImmediate: false,
  });
  return i18n;
}
