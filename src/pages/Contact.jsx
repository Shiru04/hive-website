import { useTranslation } from "react-i18next";
import SeoHead from "../seo/SeoHead.jsx";
import ContactForm from "../components/ContactForm.jsx";

export default function Contact() {
  const { t } = useTranslation();
  const steps = t("contact.steps", { returnObjects: true });
  const trust = t("contact.trust", { returnObjects: true });

  return (
    <>
      <SeoHead
        title={t("seo.contact_title")}
        description={t("seo.contact_desc")}
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": `${t("seo.contact_title")} | Hive Media`,
          "url": "https://hivemediastop.com/contact",
        }}
      />

      <section className="pt-8 pb-14">
        {/* Centered header */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            {t("contact.h1_part1")}{" "}
            <span className="text-hive-yellow">{t("contact.h1_highlight")}</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            {t("contact.sub")}
          </p>
        </div>

        {/* Main grid: form + side info */}
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[5fr,3fr] items-start">
          <ContactForm />

          {/* Side info */}
          <div className="space-y-6">
            {/* Process steps */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h2 className="text-sm font-semibold text-slate-50 mb-4 uppercase tracking-wide">
                {t("contact.what_next_heading")}
              </h2>
              <div className="space-y-5">
                {steps.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-lg bg-hive-yellow/10 border border-hive-yellow/30 flex items-center justify-center text-sm font-bold text-hive-yellow shrink-0">
                        {i + 1}
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-px flex-1 bg-slate-800 mt-1" />
                      )}
                    </div>
                    <div className="pb-1">
                      <p className="text-sm font-semibold text-slate-50">{item.title}</p>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust signals */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
              {trust.map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <svg className="w-4 h-4 text-hive-yellow shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {text}
                </div>
              ))}
            </div>

            {/* Chat CTA */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-chat"))}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4 text-sm font-medium text-slate-300 hover:border-hive-yellow/50 hover:text-hive-yellow transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
              {t("contact.chat_cta")}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
