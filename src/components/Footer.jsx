import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LogoHive from "../assets/logo-hive.webp";
import { useLang } from "../hooks/useLang.js";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();
  const { lp } = useLang();

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-[2fr,1fr,1fr] lg:grid-cols-[2fr,1fr,1fr,1fr]">
          {/* Brand */}
          <div>
            <Link to={lp("/")} className="inline-block mb-3">
              <img
                src={LogoHive}
                alt="Hive Media logo"
                className="h-10 w-auto object-contain"
                width="132"
                height="60"
              />
            </Link>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-sm font-semibold text-slate-200 mb-3">{t("footer.services_heading")}</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to={lp("/services/google-ads")} className="hover:text-hive-yellow transition-colors">Google Ads</Link></li>
              <li><Link to={lp("/services/websites")} className="hover:text-hive-yellow transition-colors">{t("footer.about") === "Nosotros" ? "Sitios Web" : t("footer.about") === "Über uns" ? "Websites" : "Websites"}</Link></li>
              <li><Link to={lp("/services/seo")} className="hover:text-hive-yellow transition-colors">SEO</Link></li>
              <li><Link to={lp("/services/internal-tools")} className="hover:text-hive-yellow transition-colors">Internal Tools</Link></li>
              <li><Link to={lp("/services")} className="hover:text-hive-yellow transition-colors text-slate-400">{t("footer.all_services")}</Link></li>
            </ul>
          </div>

          {/* Company & Industries */}
          <div>
            <p className="text-sm font-semibold text-slate-200 mb-3">{t("footer.company_heading")}</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to={lp("/about")} className="hover:text-hive-yellow transition-colors">{t("footer.about")}</Link></li>
              <li><Link to={lp("/blog")} className="hover:text-hive-yellow transition-colors">{t("footer.blog")}</Link></li>
              <li><Link to={lp("/contact")} className="hover:text-hive-yellow transition-colors">{t("footer.contact")}</Link></li>
            </ul>
            <p className="text-sm font-semibold text-slate-200 mb-3 mt-5">{t("footer.industries_heading")}</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to={lp("/industries/construction")} className="hover:text-hive-yellow transition-colors">{t("footer.construction")}</Link></li>
              <li><Link to={lp("/industries/hvac")} className="hover:text-hive-yellow transition-colors">{t("footer.hvac")}</Link></li>
              <li><Link to={lp("/industries/manufacturing")} className="hover:text-hive-yellow transition-colors">{t("footer.manufacturing")}</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-sm font-semibold text-slate-200 mb-3">{t("footer.contact_heading")}</p>
            <div className="space-y-2 text-sm text-slate-400">
              <Link to={lp("/contact")} className="flex items-center gap-2 hover:text-hive-yellow transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {t("footer.contact_form")}
              </Link>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("open-chat"))}
                className="flex items-center gap-2 hover:text-hive-yellow transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                {t("footer.chat")}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-slate-400">
          <p>&copy; {year} Hive Media. {t("footer.copyright")}</p>
          <div className="flex items-center gap-4">
            <Link to="/portal/login" className="hover:text-hive-yellow transition-colors">{t("footer.client_portal")}</Link>
            <span className="text-slate-700">|</span>
            <p>Guatemala</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
