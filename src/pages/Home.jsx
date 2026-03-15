import SeoHead from "../seo/SeoHead.jsx";
import Hero from "../components/Hero.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import WhyHive from "../components/WhyHive.jsx";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm.jsx";

export default function Home() {
  const featuredServices = [
    {
      slug: "google-ads",
      title: "Performance Marketing (Google Ads)",
      subtitle: "Lead generation with intent",
      description:
        "Campaigns engineered to capture high-intent searches, filter out noise and feed your sales pipeline with real opportunities.",
      bullets: [
        "Campaign build and restructure",
        "Conversion and call tracking",
        "Ongoing optimization and reporting"
      ]
    },
    {
      slug: "websites",
      title: "Websites that convert",
      subtitle: "Instant load speed, built to sell",
      description:
        "Fast, modern websites built for SEO, clarity and conversions—not for awards. Every section has a job.",
      bullets: ["Information architecture", "UX & conversion copy", "Technical SEO"]
    },
    {
      slug: "internal-tools",
      title: "Internal tools & automation",
      subtitle: "From lead to invoice",
      description:
        "Custom tools to manage leads, quotes, invoices and operations so your team spends more time closing and less time chasing spreadsheets.",
      bullets: ["CRM-style tools", "Reporting dashboards", "Process automation"]
    }
  ];

  return (
    <>
      <SeoHead
        title="Digital Marketing & Web Development Agency"
        description="Hive Media is a digital growth agency helping service businesses acquire and close more leads through performance marketing, web development and internal tools."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Digital Marketing & Web Development Agency | Hive Media",
          "description": "Hive Media is a digital growth agency helping service businesses acquire and close more leads through performance marketing, web development and internal tools.",
          "url": "https://hivemediastop.com/",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://hivemediastop.com/"
              }
            ]
          }
        }}
      />
      <Hero />

      {/* Services section */}
      <section className="py-14 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 mb-2">
              What we do for our clients
            </h2>
            <p className="text-base text-slate-400 max-w-lg">
              End-to-end services designed to drive qualified leads, convert them faster, and keep your operations lean.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-sm font-medium text-hive-yellow hover:underline shrink-0"
          >
            View all services
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
            How we <span className="text-hive-yellow">work together</span>
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto">
            A straightforward process designed to deliver results quickly without the usual agency runaround.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              step: "01",
              title: "Discovery call",
              desc: "We learn about your business, current marketing and goals. No sales pitch—just honest conversation."
            },
            {
              step: "02",
              title: "Audit & strategy",
              desc: "We audit your ads, website and tracking, then build a 90-day roadmap with clear priorities."
            },
            {
              step: "03",
              title: "Build & launch",
              desc: "We execute on the plan—campaigns, pages, tools—while keeping you in the loop at every step."
            },
            {
              step: "04",
              title: "Optimize & grow",
              desc: "We track results weekly, refine what works, cut what doesn't, and scale what converts."
            }
          ].map((item) => (
            <div key={item.step} className="relative text-center sm:text-left">
              <div className="text-4xl font-bold text-hive-yellow/15 mb-2">{item.step}</div>
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
              Ready to stop guessing and{" "}
              <span className="text-hive-yellow">start growing?</span>
            </h2>
            <p className="text-base text-slate-300 mb-6 leading-relaxed">
              Whether you need to fix tracking, clean up your Google Ads,
              redesign your website or build an internal tool, we can help you
              prioritize what will move the needle first.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-hive-yellow/10 border border-hive-yellow/30 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-hive-yellow" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-slate-300">Honest audit of your current marketing and tracking</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-hive-yellow/10 border border-hive-yellow/30 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-hive-yellow" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-slate-300">Clear roadmap for the next 90 days</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-hive-yellow/10 border border-hive-yellow/30 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-hive-yellow" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="inline-flex items-center gap-2 text-slate-300">
                  No long-term contracts, just work that performs
                  <span className="inline-flex items-center rounded-full bg-hive-yellow/15 border border-hive-yellow/40 px-2 py-0.5 text-xs font-semibold text-hive-yellow">
                    Zero risk
                  </span>
                </span>
              </li>
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
