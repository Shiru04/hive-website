import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SeoHead from "../seo/SeoHead.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { buildIndustrySchema } from "../seo/schemaHelpers.js";
import NotFound from "./NotFound.jsx";
import { useLang } from "../hooks/useLang.js";
import { useLocalizedIndustry, useLocalizedRelevantServices } from "../hooks/useLocalizedData.js";

export default function IndustryPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { lp } = useLang();
  const industry = useLocalizedIndustry(slug);
  const relevantServices = useLocalizedRelevantServices(slug);

  if (!industry) return <NotFound />;

  return (
    <>
      <SeoHead
        title={industry.title}
        description={industry.metaDescription}
        schema={buildIndustrySchema(industry)}
      />
      <section className="pt-8 pb-14 space-y-14">
        {/* Breadcrumbs + Hero */}
        <div>
          <Breadcrumbs
            items={[
              { label: t("industry_page.breadcrumb_home"), to: lp("/") },
              { label: t("industry_page.breadcrumb_industries"), to: lp("/industries") },
              { label: industry.shortTitle },
            ]}
          />
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-hive-yellow/30 bg-hive-yellow/5 px-4 py-1.5 text-sm font-medium text-hive-yellow mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-hive-yellow" />
              {industry.shortTitle}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              {industry.heroTagline}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              {industry.heroDescription}
            </p>
            <Link
              to={lp("/contact")}
              className="group inline-flex items-center gap-2 rounded-full border border-hive-yellow bg-hive-yellow px-6 py-3 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-105 transition-all"
            >
              {t("industry_page.get_strategy")}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Pain points */}
        <div className="pt-8 border-t border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-50 mb-6">
            {t("industry_page.challenges", { industry: industry.shortTitle.toLowerCase() })}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3 max-w-5xl">
            {industry.painPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
              >
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4">
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-slate-50 mb-2">{point.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Solutions */}
        <div className="pt-8 border-t border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-50 mb-6">
            {t("industry_page.how_hive_helps")}
          </h2>
          <div className="space-y-6 max-w-4xl">
            {industry.solutions.map((solution, i) => (
              <div
                key={solution.title}
                className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 hover:border-hive-yellow/50 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-hive-yellow/10 border border-hive-yellow/30 flex items-center justify-center text-sm font-bold text-hive-yellow shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-50 mb-1">{solution.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-2">{solution.description}</p>
                  <Link
                    to={lp(`/services/${solution.serviceSlug}`)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-hive-yellow hover:underline"
                  >
                    {t("industry_page.learn_more_service")}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Relevant services */}
        <div className="pt-8 border-t border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-50 mb-6">
            {t("industry_page.services_for", { industry: industry.shortTitle.toLowerCase() })}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 max-w-4xl">
            {relevantServices.map((service) => (
              <Link
                key={service.slug}
                to={lp(`/services/${service.slug}`)}
                className="group flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4 hover:border-hive-yellow/50 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-hive-yellow/10 border border-hive-yellow/30 flex items-center justify-center text-hive-yellow shrink-0 group-hover:bg-hive-yellow/20 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-50">{service.title}</p>
                  <p className="text-xs text-slate-400">{service.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-slate-700/80 bg-gradient-to-r from-slate-900 via-slate-900/95 to-hive-yellow/5 p-8 sm:p-10 text-center max-w-4xl">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            {t("industry_page.cta_heading", { industry: industry.shortTitle.toLowerCase() })}
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto mb-6">
            {t("industry_page.cta_sub")}
          </p>
          <Link
            to={lp("/contact")}
            className="group inline-flex items-center gap-2 rounded-full border border-hive-yellow bg-hive-yellow px-6 py-3 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-105 transition-all"
          >
            {t("industry_page.cta_btn")}
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
