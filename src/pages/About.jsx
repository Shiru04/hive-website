import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SeoHead from "../seo/SeoHead.jsx";
import teamImg from "../assets/team-collab.webp";
import { useLang } from "../hooks/useLang.js";

const VALUE_ICONS = [
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" key="0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>,
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" key="1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" key="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>,
];

export default function About() {
  const { t } = useTranslation();
  const { lp } = useLang();
  const values = t("about.values", { returnObjects: true });
  const steps = t("about.steps", { returnObjects: true });

  return (
    <>
      <SeoHead
        title={t("seo.about_title")}
        description={t("seo.about_desc")}
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": `${t("seo.about_title")} | Hive Media`,
          "url": "https://hivemediastop.com/about",
        }}
      />
      <section className="pt-8 pb-14 space-y-14">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-hive-yellow/30 bg-hive-yellow/5 px-4 py-1.5 text-sm font-medium text-hive-yellow mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-hive-yellow" />
            {t("about.badge")}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t("about.h1")}</h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            {t("about.intro")}
          </p>
        </div>

        {/* Team image */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 max-w-5xl">
          <img
            src={teamImg}
            alt="Hive Media team collaborating"
            className="w-full h-[280px] sm:h-[340px] object-cover object-top"
            loading="lazy"
            width="1200"
            height="340"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />
        </div>

        {/* Why we exist */}
        <div className="rounded-2xl border border-hive-yellow/30 bg-gradient-to-br from-hive-yellow/5 to-transparent p-8 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-hive-yellow" />
            <p className="text-sm font-semibold text-hive-yellow tracking-wide uppercase">{t("about.why_badge")}</p>
          </div>
          <p className="text-base text-slate-200 leading-relaxed mb-3">{t("about.why_p1")}</p>
          <p className="text-base text-slate-200 leading-relaxed">{t("about.why_p2")}</p>
        </div>

        {/* Philosophy */}
        <div className="max-w-3xl">
          <p className="text-base text-slate-300 leading-relaxed">
            {t("about.philosophy_part1")}
            <span className="text-slate-50 font-semibold"> {t("about.philosophy_highlight")}</span>{" "}
            {t("about.philosophy_rest")}
          </p>
        </div>

        {/* Values grid */}
        <div className="grid gap-6 sm:grid-cols-3 max-w-5xl">
          {values.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 hover:border-hive-yellow/50 transition-all"
            >
              <div className="w-11 h-11 rounded-xl border border-slate-700 bg-slate-950/60 flex items-center justify-center text-hive-yellow mb-4 group-hover:border-hive-yellow/40 group-hover:bg-hive-yellow/10 transition-colors">
                {VALUE_ICONS[idx]}
              </div>
              <h3 className="text-base font-semibold text-slate-50 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* How we work */}
        <div className="pt-8 border-t border-slate-800 max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-50 mb-4">
            {t("about.how_we_work_heading")}
          </h2>
          <div className="space-y-4">
            {steps.map((text, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-hive-yellow/10 border border-hive-yellow/30 flex items-center justify-center text-sm font-bold text-hive-yellow shrink-0">
                  {idx + 1}
                </div>
                <p className="text-base text-slate-300 pt-1">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-slate-700/80 bg-gradient-to-r from-slate-900 via-slate-900/95 to-hive-yellow/5 p-8 sm:p-10 text-center max-w-4xl">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">{t("about.cta_heading")}</h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto mb-6">{t("about.cta_sub")}</p>
          <Link
            to={lp("/contact")}
            className="group inline-flex items-center gap-2 rounded-full border border-hive-yellow bg-hive-yellow px-6 py-3 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-105 transition-all"
          >
            {t("about.cta_btn")}
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
