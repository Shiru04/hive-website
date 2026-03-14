import SeoHead from "../seo/SeoHead.jsx";
import ContactForm from "../components/ContactForm.jsx";

const STEPS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: "We review your info",
    description: "We read your message and check if we are a good fit for what you need."
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
    title: "We get context",
    description: "We may request view-only access to your website or ad account to prepare better."
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    title: "Strategy call",
    description: "We schedule a call to walk through priorities and potential next steps."
  }
];

export default function Contact() {
  return (
    <>
      <SeoHead
        title="Contact"
        description="Contact Hive Media to discuss performance marketing, web development or internal tools for your service business."
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact | Hive Media",
          "url": "https://hivemediastop.com/contact",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hivemediastop.com/" },
              { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://hivemediastop.com/contact" }
            ]
          }
        }}
      />
      <section className="pt-4 pb-10 grid gap-8 md:grid-cols-[3fr,2fr] items-start">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
            Let's talk about your numbers.{" "}
            <span className="text-hive-yellow">We're ready to scale.</span>
          </h1>
          <p className="text-base text-slate-300 mb-4">
            Tell us about your business, your current marketing and what you
            want to improve. We'll come back with next steps or a proposal
            for a strategy call.
          </p>
          <ul className="text-sm text-slate-400 space-y-1 mb-4">
            <li>• Answer within 1–2 business days.</li>
            <li className="flex items-center gap-2">
              •{" "}
              <span className="inline-flex items-center rounded-full bg-hive-yellow/15 border border-hive-yellow/40 px-2 py-0.5 text-xs font-semibold text-hive-yellow">
                No obligation
              </span>{" "}
              No spam. No strings attached.
            </li>
            <li>• We can communicate in English or Spanish.</li>
          </ul>
          <ContactForm />
        </div>

        <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-300">
          <h2 className="text-base font-semibold text-slate-50 mb-4">
            What happens after you contact us?
          </h2>
          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex gap-3 group">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-700 bg-slate-950/60 text-hive-yellow group-hover:border-hive-yellow/60 group-hover:bg-hive-yellow/10 transition-colors">
                    {step.icon}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-px flex-1 bg-slate-800 mt-1" />
                  )}
                </div>
                <div className="pb-4">
                  <p className="text-sm font-semibold text-slate-50 mb-0.5">
                    {step.title}
                  </p>
                  <p className="text-sm text-slate-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-400 mt-2 pt-3 border-t border-slate-800">
            Prefer a faster channel? We're also on WhatsApp and email after
            the first contact.
          </p>
        </aside>
      </section>
    </>
  );
}
