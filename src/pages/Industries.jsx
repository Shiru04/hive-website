import { Link } from "react-router-dom";
import SeoHead from "../seo/SeoHead.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import { INDUSTRIES } from "../data/industries.js";
import { buildBreadcrumbs, SITE_URL } from "../seo/schemaHelpers.js";

const INDUSTRY_ICONS = {
  construction: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
    </svg>
  ),
  hvac: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
    </svg>
  ),
  manufacturing: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  ),
};

export default function Industries() {
  return (
    <>
      <SeoHead
        title="Industries We Serve"
        description="Hive Media provides digital marketing services for construction, HVAC, and manufacturing companies. Industry-specific strategies that drive qualified leads."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Industries We Serve | Hive Media",
          url: `${SITE_URL}/industries`,
          breadcrumb: buildBreadcrumbs([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Industries", url: `${SITE_URL}/industries` },
          ]),
        }}
      />
      <section className="pt-8 pb-14">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Industries" },
          ]}
        />
        <div className="mb-10 max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-hive-yellow/30 bg-hive-yellow/5 px-4 py-1.5 text-sm font-medium text-hive-yellow mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-hive-yellow" />
            Industries
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Industries we{" "}
            <span className="text-hive-yellow">specialize in.</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            We work with service businesses and manufacturers that need more
            qualified leads, better websites, and systems to manage growth.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.slug}
              to={`/industries/${industry.slug}`}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-hive-yellow/60 hover:shadow-lg hover:shadow-hive-yellow/5 transition-all flex flex-col"
            >
              <div className="w-11 h-11 rounded-xl border border-slate-700 bg-slate-950/60 flex items-center justify-center text-hive-yellow mb-4 group-hover:border-hive-yellow/40 group-hover:bg-hive-yellow/10 transition-colors">
                {INDUSTRY_ICONS[industry.slug]}
              </div>
              <h2 className="text-lg font-semibold text-slate-50 mb-2">
                {industry.shortTitle}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 flex-1">
                {industry.heroTagline}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-hive-yellow">
                Learn more
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-slate-700/80 bg-gradient-to-r from-slate-900 via-slate-900/95 to-hive-yellow/5 p-8 sm:p-10 text-center max-w-5xl">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Don't see your industry?
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto mb-6">
            We work with all types of service businesses. Book a call and we'll
            discuss how we can help your specific situation.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-hive-yellow bg-hive-yellow px-6 py-3 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-105 transition-all"
          >
            Book a free strategy call
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
