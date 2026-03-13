import { Link } from "react-router-dom";

const ECOSYSTEM_STEPS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="icon-search w-5 h-5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
    label: "Google Ads",
    sub: "Captás clientes con intención de compra real",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="icon-pulse w-5 h-5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Landing Page",
    sub: "Velocidad instantánea para no perder leads",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="icon-gear w-5 h-5">
        <path d="M12 2a10 10 0 1 0 10 10" strokeLinecap="round" />
        <path d="M12 6v6l4 2" strokeLinecap="round" />
        <path d="M18 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Automatización",
    sub: "Del lead al presupuesto, sin tocar planillas",
  },
];

export default function Hero() {
  return (
    <section className="relative pt-6 pb-14 sm:pt-10 sm:pb-20 overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-hive-yellow/5 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-sky-500/5 blur-[80px]" />
      </div>

      <div className="relative grid gap-10 lg:grid-cols-[3fr,2fr] items-center">
        {/* ── Left column ── */}
        <div>
          <p
            className="hero-animate inline-flex items-center gap-2 rounded-full border border-hive-yellow/30 bg-hive-yellow/5 px-3 py-1 text-sm font-medium text-hive-yellow mb-5"
            style={{ animationDelay: "0ms" }}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-hive-yellow animate-pulse" />
            8 años escalando negocios de servicios
          </p>

          <h1
            className="hero-animate text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5"
            style={{ animationDelay: "120ms" }}
          >
            Más clientes.{" "}
            <span className="text-hive-yellow">Menos desperdicio.</span>
          </h1>

          <p
            className="hero-animate text-lg text-slate-300 max-w-xl mb-8"
            style={{ animationDelay: "240ms" }}
          >
            Unimos marketing de alto rendimiento, webs que convierten y
            automatizaciones para que tu negocio crezca con datos, no con
            intuición.
          </p>

          <div
            className="hero-animate flex flex-wrap gap-3"
            style={{ animationDelay: "360ms" }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full border border-hive-yellow bg-hive-yellow px-6 py-3 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-110 transition-all duration-200"
            >
              Agenda tu llamada estratégica
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-base font-medium text-slate-100 hover:border-hive-yellow/70 hover:text-hive-yellow transition-all duration-200"
            >
              Ver servicios →
            </Link>
          </div>
        </div>

        {/* ── Right column – ecosystem visual ── */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-hive-yellow/10 via-transparent to-sky-500/10 blur-3xl pointer-events-none rounded-3xl" />
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
            <p className="text-xs font-semibold text-hive-yellow uppercase tracking-wider mb-4">
              Tu ecosistema de crecimiento
            </p>

            {/* Flow steps with connecting lines */}
            <div className="space-y-0">
              {ECOSYSTEM_STEPS.map((step, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-950/60 px-3 py-2.5 hover:border-hive-yellow/40 transition-colors duration-200">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-hive-yellow/10 flex items-center justify-center text-hive-yellow">
                      {step.icon}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-100">{step.label}</div>
                      <div className="text-xs text-slate-400">{step.sub}</div>
                    </div>
                  </div>
                  {i < ECOSYSTEM_STEPS.length - 1 && (
                    <div className="ml-7 w-0.5 h-3 bg-hive-yellow/30" />
                  )}
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
              {[
                { val: "+40%", label: "conversiones" },
                { val: "8 años", label: "experiencia" },
                { val: "0", label: "contratos largos" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-700 bg-slate-950/60 p-2.5 text-center"
                >
                  <div className="text-sm font-semibold text-hive-yellow">{m.val}</div>
                  <div className="text-slate-400">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
