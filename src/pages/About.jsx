import SeoHead from "../seo/SeoHead.jsx";
import { Link } from "react-router-dom";
import teamImg from "../assets/team-collab.webp";

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
      <section className="pt-8 pb-14 space-y-14">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-hive-yellow/30 bg-hive-yellow/5 px-4 py-1.5 text-sm font-medium text-hive-yellow mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-hive-yellow" />
            About us
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">About Hive Media</h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            We combine performance marketing, modern web development and internal
            tools to build predictable growth systems for service businesses.
          </p>
        </div>

        {/* Team image */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 max-w-5xl">
          <img
            src={teamImg}
            alt="Hive Media team collaborating"
            className="w-full h-[280px] sm:h-[340px] object-cover object-top"
            loading="lazy"
            width="1200"
            height="340"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />
        </div>

        {/* Why we exist - highlight box */}
        <div className="rounded-2xl border border-hive-yellow/30 bg-gradient-to-br from-hive-yellow/5 to-transparent p-8 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-hive-yellow" />
            <p className="text-sm font-semibold text-hive-yellow tracking-wide uppercase">Why we exist</p>
          </div>
          <p className="text-base text-slate-200 leading-relaxed mb-3">
            We started Hive Media after seeing the same problem over and over:
            9 out of 10 service businesses—HVAC, roofing, construction—were
            burning money on ads that generated clicks but not real customers.
            Agencies would report on impressions and CTR, but nobody was asking
            "how many of those clicks turned into booked jobs?"
          </p>
          <p className="text-base text-slate-200 leading-relaxed">
            We built Hive to answer that question and fix the entire pipeline
            from the ad click to the closed deal.
          </p>
        </div>

        {/* Philosophy */}
        <div className="max-w-3xl">
          <p className="text-base text-slate-300 leading-relaxed">
            Our philosophy is simple:
            <span className="text-slate-50 font-semibold">
              {" "}strategy first, then execution, then iteration.
            </span>{" "}
            We don't believe in vanity metrics, long-term lock-in contracts, or
            doing work that doesn't directly move your business forward.
          </p>
        </div>

        {/* Values grid */}
        <div className="grid gap-6 sm:grid-cols-3 max-w-5xl">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
              ),
              title: "Technical and marketing in one place",
              desc: "We bridge the gap between the marketing strategy and the code that needs to be written to make it real."
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              title: "Transparent communication",
              desc: "We share what we are doing, why we are doing it, and how it is performing—good or bad."
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              ),
              title: "Long-term partnerships",
              desc: "Our best work happens with clients that see us as partners and collaborators, not just another vendor."
            }
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 hover:border-hive-yellow/50 transition-all"
            >
              <div className="w-11 h-11 rounded-xl border border-slate-700 bg-slate-950/60 flex items-center justify-center text-hive-yellow mb-4 group-hover:border-hive-yellow/40 group-hover:bg-hive-yellow/10 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-base font-semibold text-slate-50 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* How we work */}
        <div className="pt-8 border-t border-slate-800 max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-50 mb-4">
            How we like to work
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", text: "We start with a discovery call and a simple audit." },
              { step: "2", text: "We design a 60–90 day plan focused on quick wins and critical fixes." },
              { step: "3", text: "We implement, measure, and iterate with clear communication every step of the way." }
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-hive-yellow/10 border border-hive-yellow/30 flex items-center justify-center text-sm font-bold text-hive-yellow shrink-0">
                  {item.step}
                </div>
                <p className="text-base text-slate-300 pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-slate-700/80 bg-gradient-to-r from-slate-900 via-slate-900/95 to-hive-yellow/5 p-8 sm:p-10 text-center max-w-4xl">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Want to see if we're a good fit?
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto mb-6">
            Let's have a conversation. No commitment, no pressure—just an honest look at where your business stands and what could move the needle.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-hive-yellow bg-hive-yellow px-6 py-3 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-105 transition-all"
          >
            Book a free strategy call
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
