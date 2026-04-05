import { useTranslation } from "react-i18next";

const ICONS = [
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" key="0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
  </svg>,
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" key="1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>,
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" key="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
  </svg>,
];

export default function WhyHive() {
  const { t } = useTranslation();
  const items = t("why_hive.items", { returnObjects: true });

  return (
    <section className="py-14 border-t border-slate-800">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          {t("why_hive.heading_part1")}{" "}
          <span className="text-hive-yellow">{t("why_hive.heading_highlight")}</span>
        </h2>
        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t("why_hive.sub")}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-left hover:border-hive-yellow/50 transition-all"
          >
            <div className="w-11 h-11 rounded-xl border border-slate-700 bg-slate-950/60 flex items-center justify-center text-hive-yellow mb-4 group-hover:border-hive-yellow/40 group-hover:bg-hive-yellow/10 transition-colors">
              {ICONS[idx]}
            </div>
            <h3 className="text-base font-semibold mb-2 text-slate-50">
              {item.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
