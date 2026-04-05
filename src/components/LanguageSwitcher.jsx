import { useLocation, Link } from "react-router-dom";
import { useLang } from "../hooks/useLang.js";

const LANG_LABELS = { en: "EN", es: "ES", de: "DE" };

/**
 * Renders language links that switch between /en/..., /es/..., /de/...
 * while keeping the current page path intact.
 */
export default function LanguageSwitcher({ className = "" }) {
  const { lang: currentLang, SUPPORTED_LANGS } = useLang();
  const { pathname } = useLocation();

  // Strip the current lang prefix and keep the rest of the path
  const restPath = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/") || "/";

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {SUPPORTED_LANGS.map((lng, i) => {
        const isActive = lng === currentLang;
        const to = restPath === "/" ? `/${lng}` : `/${lng}${restPath}`;
        return (
          <span key={lng} className="flex items-center gap-1">
            {i > 0 && <span className="text-slate-700 text-xs">|</span>}
            <Link
              to={to}
              className={`text-xs font-medium transition-colors px-1 py-0.5 rounded ${
                isActive
                  ? "text-hive-yellow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              aria-current={isActive ? "true" : undefined}
            >
              {LANG_LABELS[lng]}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
