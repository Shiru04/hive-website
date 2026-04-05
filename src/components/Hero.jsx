import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import remoteCallImg from "../assets/remote-call.webp";
import { useLang } from "../hooks/useLang.js";

export default function Hero() {
  const { t } = useTranslation();
  const { lp } = useLang();

  return (
    <section className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-hive-yellow/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid gap-12 lg:grid-cols-[3fr,2fr] items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-hive-yellow/30 bg-hive-yellow/5 px-4 py-1.5 text-sm font-medium text-hive-yellow mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-hive-yellow animate-pulse" />
            {t("hero.badge")}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            {t("hero.title_part1")}{" "}
            <span className="text-hive-yellow relative">
              {t("hero.title_highlight")}
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-hive-yellow/30 rounded-full" />
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-xl mb-8 leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <Link
              to={lp("/contact")}
              className="group inline-flex items-center gap-2 rounded-full border border-hive-yellow bg-hive-yellow px-6 py-3 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-105 transition-all"
            >
              {t("hero.cta_primary")}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              to={lp("/services")}
              className="inline-flex items-center rounded-full border border-slate-600 bg-slate-900/80 px-6 py-3 text-base font-semibold text-slate-200 hover:border-hive-yellow/60 hover:text-hive-yellow transition-colors"
            >
              {t("hero.cta_secondary")}
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 pt-6 border-t border-slate-800/60">
            <div>
              <div className="text-2xl font-bold text-hive-yellow">{t("hero.stat1_value")}</div>
              <div className="text-sm text-slate-400">{t("hero.stat1_label")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-50">{t("hero.stat2_value")}</div>
              <div className="text-sm text-slate-400">{t("hero.stat2_label")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-50">{t("hero.stat3_value")}</div>
              <div className="text-sm text-slate-400">{t("hero.stat3_label")}</div>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -inset-4 bg-gradient-to-tr from-hive-yellow/10 via-transparent to-sky-500/10 blur-3xl pointer-events-none" />
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl">
            <img
              src={remoteCallImg}
              alt="Strategy call with a client"
              className="w-full h-[420px] object-cover object-center"
              loading="eager"
              width="600"
              height="420"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Floating card over image */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="rounded-xl border border-slate-700/60 bg-slate-950/80 backdrop-blur-md p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-400">{t("hero.chart_label")}</span>
                  <span className="text-xs text-emerald-400 font-medium">{t("hero.chart_trend")}</span>
                </div>
                <div className="flex items-end gap-1 h-10">
                  {[35, 45, 30, 55, 40, 65, 50, 70, 60, 80, 75, 90].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-hive-yellow/25 hover:bg-hive-yellow/50 transition-colors"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
