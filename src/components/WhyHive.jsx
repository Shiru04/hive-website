export default function WhyHive() {
  const items = [
    {
      title: "We understand service businesses",
      description:
        "We work with HVAC, construction and home services providers. We know your sales cycles, seasonality and what a real qualified lead looks like."
    },
    {
      title: "Full technical stack in-house",
      description:
        "Strategy, tracking, web development and internal tools under one roof. No finger-pointing between agencies and developers."
    },
    {
      title: "Obsessed with clarity and reporting",
      description:
        "You get dashboards and reports that show where your money goes, what works, and what we are doing next—not vanity metrics."
    }
  ];

  return (
    <section className="py-10 border-t border-slate-800">
      <div className="max-w-4xl mx-auto text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
          Why work with{" "}
          <span className="text-hive-yellow">Hive Media?</span>
        </h2>
        <p className="text-base text-slate-300">
          We don't just run ads—we build the entire system that turns
          clicks into closed deals, so you can focus on running your
          business while leads come in consistently.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-left hover:border-hive-yellow/50 transition-colors"
          >
            <h3 className="text-base font-semibold mb-1 text-slate-50">
              {item.title}
            </h3>
            <p className="text-sm text-slate-300">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
