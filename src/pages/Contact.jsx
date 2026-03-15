import SeoHead from "../seo/SeoHead.jsx";
import ContactForm from "../components/ContactForm.jsx";

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

      <section className="pt-8 pb-14">
        {/* Centered header */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Let's talk about{" "}
            <span className="text-hive-yellow">growing your business.</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Fill out the form and we'll get back to you within 1–2 business days
            with next steps or a proposal for a strategy call.
          </p>
        </div>

        {/* Main grid: form + side info */}
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[5fr,3fr] items-start">

          {/* Form — no wrapper card, let it breathe */}
          <ContactForm />

          {/* Side info */}
          <div className="space-y-6">

            {/* Process steps */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h2 className="text-sm font-semibold text-slate-50 mb-4 uppercase tracking-wide">
                What happens next
              </h2>
              <div className="space-y-5">
                {[
                  {
                    step: "1",
                    title: "We review your info",
                    desc: "We read your message and check if we're a good fit."
                  },
                  {
                    step: "2",
                    title: "We get context",
                    desc: "We may request view-only access to your website or ad account."
                  },
                  {
                    step: "3",
                    title: "Strategy call",
                    desc: "We schedule a call to walk through priorities and next steps."
                  }
                ].map((item, i) => (
                  <div key={item.step} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-lg bg-hive-yellow/10 border border-hive-yellow/30 flex items-center justify-center text-sm font-bold text-hive-yellow shrink-0">
                        {item.step}
                      </div>
                      {i < 2 && (
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
              {[
                { icon: "shield", text: "No obligation — no spam, no strings attached" },
                { icon: "globe", text: "We communicate in English and Spanish" },
                { icon: "clock", text: "Response within 1–2 business days" }
              ].map((item) => (
                <div key={item.icon} className="flex items-center gap-3 text-sm text-slate-300">
                  <svg className="w-4 h-4 text-hive-yellow shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item.text}
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
              Prefer to chat? Talk to us now
            </button>

          </div>
        </div>
      </section>
    </>
  );
}
