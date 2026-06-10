import { getServiceBySlug } from "./services.js";
import { getIndustryBySlug } from "./industries.js";
import { SERVICES_I18N } from "./services.i18n.js";
import { INDUSTRIES_I18N } from "./industries.i18n.js";

/** Server-side (non-hook) variants of useLocalizedService / useLocalizedIndustry. */

export function getLocalizedService(slug, lang) {
  const service = getServiceBySlug(slug);
  if (!service || lang === "en") return service;
  const override = SERVICES_I18N[lang]?.[slug];
  return override ? { ...service, ...override } : service;
}

export function getLocalizedIndustry(slug, lang) {
  const industry = getIndustryBySlug(slug);
  if (!industry || lang === "en") return industry;
  const override = INDUSTRIES_I18N[lang]?.[slug];
  return override ? { ...industry, ...override } : industry;
}
