import SeoHead from "../seo/SeoHead.jsx";
import Hero from "../components/Hero.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import WhyHive from "../components/WhyHive.jsx";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm.jsx";

export default function Home() {
  const featuredServices = [
    {
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
      title: "Websites that convert",
      subtitle: "Instant load speed, built to sell",
      description:
        "Fast, modern websites built for SEO, clarity and conversions—not for awards. Every section has a job.",
      bullets: ["Information architecture", "UX & conversion copy", "Technical SEO"]
    },
    {
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

      <section className="py-6">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-50">
            What we do for our clients
          </h2>
          <Link
            to="/services"
            className="text-sm text-slate-300 hover:text-hive-yellow"
          >
            View all services →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredServices.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <WhyHive />

      <section className="py-10 border-t border-slate-800">
        <div className="grid gap-8 md:grid-cols-[3fr,2fr] items-start">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">
              Ready to stop guessing and start growing?
            </h2>
            <p className="text-base text-slate-300 mb-4">
              Whether you need to fix tracking, clean up your Google Ads,
              redesign your website or build an internal tool, we can help you
              prioritize what will move the needle first.
            </p>
            <ul className="text-sm space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <span className="text-hive-yellow font-bold">✓</span>
                <span className="text-slate-300">Honest audit of your current marketing and tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-hive-yellow font-bold">✓</span>
                <span className="text-slate-300">Clear roadmap for the next 90 days</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-hive-yellow font-bold">✓</span>
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
