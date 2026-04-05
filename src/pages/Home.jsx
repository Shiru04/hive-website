import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SeoHead from "../seo/SeoHead.jsx";
import Hero from "../components/Hero.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import WhyHive from "../components/WhyHive.jsx";
import ContactForm from "../components/ContactForm.jsx";
import { useLang } from "../hooks/useLang.js";
import { useLocalizedServices } from "../hooks/useLocalizedData.js";

const FEATURED_SLUGS = ["google-ads", "websites", "internal-tools"];

export default function Home() {
  const { t } = useTranslation();
  const { lp } = useLang();
  const allServices = useLocalizedServices();
  const featuredServices = allServices.filter((s) => FEATURED_SLUGS.includes(s.slug));
  const process = t("home.process", { returnObjects: true });

  return (
    <>
      <SeoHead
        title={t("seo.home_title")}
        description={t("seo.home_desc")}
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": `${t("seo.home_title")} | Hive Media`,
          "description": t("seo.home_desc"),
          "url": "https://hivemediastop.com/",
        }}
      />
      <Hero />

      {/* Services section */}
      <section className="py-14 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 mb-2">
              {t("home.services_heading")}
            </h2>
            <p className="text-base text-slate-400 max-w-lg">
              {t("home.services_sub")}
            </p>
          </div>
          <Link
            to={lp("/services")}
            className="inline-flex items-center gap-1 text-sm font-medium text-hive-yellow hover:underline shrink-0"
          >
            {t("home.view_all_services")}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredServices.map((service) => (
            <ServiceCard key={service.slug} {...service} />
          ))}
        </div>
      </section>

      <WhyHive />

      {/* Process / How it works */}
      <section className="py-14 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            {t("home.how_we_work_heading_part1")}{" "}
            <span className="text-hive-yellow">{t("home.how_we_work_heading_highlight")}</span>
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto">
            {t("home.how_we_work_sub")}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {process.map((item) => (
            <div key={item.step} className="relative text-center sm:text-left">
              <div className="text-4xl font-bold text-hive-yellow/25 mb-2">{item.step}</div>
              <h3 className="text-base font-semibold text-slate-50 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA + Contact Form */}
      <section className="py-14 border-t border-slate-800">
        <div className="grid gap-10 md:grid-cols-[3fr,2fr] items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              {t("home.cta_heading_part1")}{" "}
              <span className="text-hive-yellow">{t("home.cta_heading_highlight")}</span>
            </h2>
            <p className="text-base text-slate-300 mb-6 leading-relaxed">
              {t("home.cta_sub")}
            </p>
            <ul className="space-y-3 mb-6">
              {[t("home.cta_li1"), t("home.cta_li2"), t("home.cta_li3")].map((text, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-hive-yellow/10 border border-hive-yellow/30 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-hive-yellow" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-slate-300">
                    {text}
                    {i === 2 && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-hive-yellow/15 border border-hive-yellow/40 px-2 py-0.5 text-xs font-semibold text-hive-yellow">
                        {t("home.zero_risk")}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ContactForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
