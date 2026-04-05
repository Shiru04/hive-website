import { useLocation } from 'react-router-dom';

const SUPPORTED_LANGS = ['en', 'es', 'de'];

/**
 * Returns the current language derived from the URL path and a helper
 * function `lp(path)` that prefixes any path with the current lang segment.
 *
 * Works in any component inside BrowserRouter — no need to be inside a
 * /:lang route context.
 */
export function useLang() {
  const { pathname } = useLocation();
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  const lang = SUPPORTED_LANGS.includes(firstSegment) ? firstSegment : 'en';

  /**
   * lp('/services') → '/en/services'
   * lp('/')         → '/en'
   * lp('')          → '/en'
   */
  const lp = (path) => {
    if (!path || path === '/') return `/${lang}`;
    return `/${lang}${path}`;
  };

  return { lang, lp, SUPPORTED_LANGS };
}
