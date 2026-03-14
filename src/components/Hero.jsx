import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pt-10">
      <div className="grid gap-10 lg:grid-cols-[3fr,2fr] items-center">
        <div>
          <p className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm font-medium text-slate-300 mb-4">
            Growth systems for service businesses
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            We scale your service business so{" "}
            <span className="text-hive-yellow">prospects come to you.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mb-6">
            Stop chasing clients. We build the marketing engine, the website
            and the internal systems so qualified leads find you and your team
            closes them faster.
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full border border-hive-yellow bg-hive-yellow px-5 py-2.5 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-105"
            >
              Book a free strategy call
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center rounded-full border border-hive-yellow/60 bg-slate-900 px-5 py-2.5 text-base font-semibold text-hive-yellow hover:bg-hive-yellow hover:text-slate-950 transition-colors"
            >
              View all services
            </Link>
          </div>

        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-hive-yellow/10 via-transparent to-sky-500/10 blur-3xl" />
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
            <p className="text-sm font-semibold text-hive-yellow mb-2">
              What we focus on
            </p>
            <ul className="space-y-2 text-sm text-slate-200">
              <li>• High-intent lead generation via Google Ads</li>
              <li>• Websites that load instantly and convert visitors</li>
              <li>• Tracking, analytics and reporting that make sense</li>
              <li>• Internal tools to manage leads, quotes and invoices</li>
            </ul>
            <div className="mt-4 grid grid-cols-3 gap-3 text-[11px]">
              <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-3">
                <div className="text-base font-semibold text-hive-yellow">
                  +40%
                </div>
                <div className="text-slate-400">Average conversion rate lift</div>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-3">
                <div className="text-base font-semibold text-hive-yellow">
                  Full-funnel
                </div>
                <div className="text-slate-400">From click to closed deal</div>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-3">
                <div className="text-base font-semibold text-hive-yellow">
                  Owner-friendly
                </div>
                <div className="text-slate-400">Clear numbers, clear actions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
