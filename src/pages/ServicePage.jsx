import { useParams, Link } from "react-router-dom";
import SeoHead from "../seo/SeoHead.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import { getServiceBySlug, getRelatedServices } from "../data/services.js";
import { buildServiceSchema } from "../seo/schemaHelpers.js";
import NotFound from "./NotFound.jsx";

export default function ServicePage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <NotFound />;

  const related = getRelatedServices(slug, 3);

  return (
    <>
      <SeoHead
        title={service.metaTitle}
        description={service.metaDescription}
        schema={buildServiceSchema(service)}
      />
      <section className="pt-8 pb-14 space-y-14">
        {/* Breadcrumbs */}
        <div>
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Services", to: "/services" },
              { label: service.shortTitle },
            ]}
          />

          {/* Hero */}
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-hive-yellow/30 bg-hive-yellow/5 px-4 py-1.5 text-sm font-medium text-hive-yellow mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-hive-yellow" />
              {service.shortTitle}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              {service.heroTagline}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              {service.heroDescription}
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-hive-yellow bg-hive-yellow px-6 py-3 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-105 transition-all"
            >
              Get a free strategy call
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* What's included */}
        <div className="pt-8 border-t border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-50 mb-6">
            What's included
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 max-w-4xl">
            {service.includes.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-hive-yellow/10 border border-hive-yellow/30 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-hive-yellow" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-sm text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Our process */}
        <div className="pt-8 border-t border-slate-800 max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-50 mb-6">
            Our process
          </h2>
          <div className="space-y-5">
            {service.process.map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-hive-yellow/10 border border-hive-yellow/30 flex items-center justify-center text-sm font-bold text-hive-yellow shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-50 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who this is for */}
        <div className="rounded-2xl border border-hive-yellow/30 bg-gradient-to-br from-hive-yellow/5 to-transparent p-8 max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-hive-yellow" />
            <p className="text-sm font-semibold text-hive-yellow tracking-wide uppercase">Who this is for</p>
          </div>
          <p className="text-base text-slate-200 leading-relaxed">
            {service.idealFor}
          </p>
        </div>

        {/* Related services */}
        {related.length > 0 && (
          <div className="pt-8 border-t border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-50 mb-6">
              Related services
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s.slug} slug={s.slug} {...s} />
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="rounded-2xl border border-slate-700/80 bg-gradient-to-r from-slate-900 via-slate-900/95 to-hive-yellow/5 p-8 sm:p-10 text-center max-w-4xl">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Ready to get started with {service.shortTitle.toLowerCase()}?
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto mb-6">
            Book a free strategy call and we'll show you exactly how we can help your business grow.
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
