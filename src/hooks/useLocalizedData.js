import { useLang } from './useLang.js';
import { SERVICES, getServiceBySlug } from '../data/services.js';
import { INDUSTRIES, getIndustryBySlug } from '../data/industries.js';
import { SERVICES_I18N } from '../data/services.i18n.js';
import { INDUSTRIES_I18N } from '../data/industries.i18n.js';

/** Merge English service data with locale-specific overrides. */
function localizeService(service, lang) {
  if (lang === 'en' || !service) return service;
  const override = SERVICES_I18N[lang]?.[service.slug];
  return override ? { ...service, ...override } : service;
}

/** Merge English industry data with locale-specific overrides. */
function localizeIndustry(industry, lang) {
  if (lang === 'en' || !industry) return industry;
  const override = INDUSTRIES_I18N[lang]?.[industry.slug];
  return override ? { ...industry, ...override } : industry;
}

/** Returns all services translated for the current language. */
export function useLocalizedServices() {
  const { lang } = useLang();
  return SERVICES.map((s) => localizeService(s, lang));
}

/** Returns a single service translated for the current language. */
export function useLocalizedService(slug) {
  const { lang } = useLang();
  const service = getServiceBySlug(slug);
  return localizeService(service, lang);
}

/** Returns all industries translated for the current language. */
export function useLocalizedIndustries() {
  const { lang } = useLang();
  return INDUSTRIES.map((i) => localizeIndustry(i, lang));
}

/** Returns a single industry translated for the current language. */
export function useLocalizedIndustry(slug) {
  const { lang } = useLang();
  const industry = getIndustryBySlug(slug);
  return localizeIndustry(industry, lang);
}

/** Returns related services (localized) for a given service slug. */
export function useLocalizedRelatedServices(slug, limit = 3) {
  const { lang } = useLang();
  const service = getServiceBySlug(slug);
  if (!service) return [];
  return service.relatedSlugs
    .map((s) => localizeService(getServiceBySlug(s), lang))
    .filter(Boolean)
    .slice(0, limit);
}

/** Returns relevant services (localized) for a given industry slug. */
export function useLocalizedRelevantServices(industrySlug) {
  const { lang } = useLang();
  const industry = getIndustryBySlug(industrySlug);
  if (!industry) return [];
  return industry.relevantServices
    .map((s) => localizeService(getServiceBySlug(s), lang))
    .filter(Boolean);
}
