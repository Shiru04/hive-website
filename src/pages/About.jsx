import SeoHead from "../seo/SeoHead.jsx";

export default function About() {
  return (
    <>
      <SeoHead
        title="About Us"
        description="Hive Media is a digital growth agency focused on helping service-based businesses generate and close more leads with performance marketing, modern websites and internal tools."
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Us | Hive Media",
          "url": "https://hivemediastop.com/about",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hivemediastop.com/" },
              { "@type": "ListItem", "position": 2, "name": "About", "item": "https://hivemediastop.com/about" }
            ]
          }
        }}
      />
      <section className="pt-4 pb-10 space-y-6 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">About Hive Media</h1>

        <div className="rounded-2xl border border-hive-yellow/30 bg-hive-yellow/5 p-5 text-base text-slate-200">
          <p className="font-medium text-slate-50 mb-2">Why we exist</p>
          <p>
            We started Hive Media after seeing the same problem over and over:
            9 out of 10 service businesses—HVAC, roofing, construction—were
            burning money on ads that generated clicks but not real customers.
            Agencies would report on impressions and CTR, but nobody was asking
            "how many of those clicks turned into booked jobs?"
          </p>
          <p className="mt-2">
            We built Hive to answer that question and fix the entire pipeline
            from the ad click to the closed deal.
          </p>
        </div>

        <p className="text-base text-slate-300">
          We combine performance marketing, modern web development and internal
          tools to build predictable systems. Our philosophy is simple:
          <span className="text-slate-100 font-medium">
            {" "}
            strategy first, then execution, then iteration.
          </span>
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300 hover:border-hive-yellow/50 transition-colors">
            <p className="text-hive-yellow text-base font-semibold mb-1">
              Technical and marketing in one place
            </p>
            <p>
              We bridge the gap between the marketing strategy and the code
              that needs to be written to make it real.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300 hover:border-hive-yellow/50 transition-colors">
            <p className="text-hive-yellow text-base font-semibold mb-1">
              Transparent communication
            </p>
            <p>
              We share what we are doing, why we are doing it, and how it is
              performing—good or bad.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300 hover:border-hive-yellow/50 transition-colors">
            <p className="text-hive-yellow text-base font-semibold mb-1">
              Long-term partnerships
            </p>
            <p>
              Our best work happens with clients that see us as partners and
              collaborators, not just another vendor.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-base text-slate-300 space-y-3">
          <h2 className="text-lg font-semibold text-slate-50">
            How we like to work
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
            <li>We start with a discovery call and a simple audit.</li>
            <li>
              We design a 60–90 day plan focused on quick wins and critical
              fixes.
            </li>
            <li>
              We implement, measure, and iterate with clear communication every
              step of the way.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
