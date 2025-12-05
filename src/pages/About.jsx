import SeoHead from "../seo/SeoHead.jsx";

export default function About() {
  return (
    <>
      <SeoHead
        title="About Us"
        description="Hive Media is a digital growth agency focused on helping service-based businesses generate and close more leads with performance marketing, modern websites and internal tools."
      />
      <section className="pt-4 pb-10 space-y-6 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">About Hive Media</h1>
        <p className="text-base text-slate-300">
          Hive Media is a digital growth agency created by marketers and
          developers who have spent years working directly with service
          businesses—HVAC, construction, and other home services. We understand
          what it means to depend on a consistent flow of real, qualified leads.
        </p>
        <p className="text-base text-slate-300">
          We combine performance marketing, modern web development and internal
          tools to build predictable systems. Our philosophy is simple:
          <span className="text-slate-100 font-medium">
            {" "}
            strategy first, then execution, then iteration.
          </span>
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
            <p className="text-hive-yellow text-base font-semibold mb-1">
              Technical and marketing in one place
            </p>
            <p>
              We bridge the gap between the marketing strategy and the code
              that needs to be written to make it real.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
            <p className="text-hive-yellow text-base font-semibold mb-1">
              Transparent communication
            </p>
            <p>
              We share what we are doing, why we are doing it, and how it is
              performing—good or bad.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
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
