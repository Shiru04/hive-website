"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useLang } from "../hooks/useLang.js";
import { SERVICE_ICONS } from "./serviceIcons.jsx";
import { unstable_ViewTransition as ViewTransition } from "react";


export default function ServiceCard({ title, shortTitle, subtitle, description, bullets, slug }) {
  const { t } = useTranslation();
  const { lp } = useLang();
  // Look up icon by slug (preferred) or by title (legacy fallback)
  const icon = SERVICE_ICONS[slug] || SERVICE_ICONS[title];

  return (
    <article className="group h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-hive-yellow/60 hover:shadow-lg hover:shadow-hive-yellow/5 hover:-translate-y-1 transition shadow-sm flex flex-col">
      {icon && (
        <ViewTransition name={`svc-${slug}`} share="morph" default="none">
          <div className="w-11 h-11 rounded-xl border border-slate-700 bg-slate-950/60 flex items-center justify-center text-hive-yellow mb-4 group-hover:border-hive-yellow/40 group-hover:bg-hive-yellow/10 transition-colors">
            {icon}
          </div>
        </ViewTransition>
      )}
      <h3 className="text-lg font-semibold text-slate-50 mb-1">{title}</h3>
      {subtitle && (
        <p className="text-sm text-hive-yellow mb-3">{subtitle}</p>
      )}
      <p className="text-sm text-slate-300 mb-4 leading-relaxed">{description}</p>
      {bullets && bullets.length > 0 && (
        <ul className="text-sm text-slate-400 space-y-2 mb-4">
          {bullets.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <svg aria-hidden="true" className="w-3.5 h-3.5 text-hive-yellow shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto pt-3 flex items-center gap-4">
        {slug && (
          <Link
            href={lp(`/services/${slug}`)}
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-hive-yellow transition-colors"
          >
            {t("service_card.learn_more", { name: shortTitle || title })}
            <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        )}
        <Link
          href={lp("/contact")}
          className="inline-flex items-center gap-1 text-sm font-medium text-hive-yellow hover:underline group-hover:gap-2 transition"
        >
          {t("service_card.get_quote")}
          <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
