"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import JsonLd from "../seo/JsonLd.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import { useLang } from "../hooks/useLang.js";
import { useLocalizedServices } from "../hooks/useLocalizedData.js";
import Reveal from "../components/Reveal.jsx";

export default function Services() {
  const { t } = useTranslation();
  const { lp } = useLang();
  const services = useLocalizedServices();

  return (
    <>
      <JsonLd schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": `${t("seo.services_title")} | Hive Media`,
          "url": "https://hivemediastop.com/services",
        }} />
      <section className="pt-8 pb-14">
        <div className="mb-10 max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-hive-yellow/30 bg-hive-yellow/5 px-4 py-1.5 text-sm font-medium text-hive-yellow mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-hive-yellow" />
            {t("services_page.badge")}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            {t("services_page.h1_part1")}{" "}
            <span className="text-hive-yellow">{t("services_page.h1_highlight")}</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            {t("services_page.sub")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 2) * 90} className="h-full">
              <ServiceCard slug={service.slug} {...service} />
            </Reveal>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-14 rounded-2xl border border-slate-700/80 bg-gradient-to-r from-slate-900 via-slate-900/95 to-hive-yellow/5 p-8 sm:p-10 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            {t("services_page.cta_heading")}
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto mb-6">
            {t("services_page.cta_sub")}
          </p>
          <Link
            href={lp("/contact")}
            className="group inline-flex items-center gap-2 rounded-full border border-hive-yellow bg-hive-yellow px-6 py-3 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-105 transition"
          >
            {t("services_page.cta_btn")}
            <svg aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
