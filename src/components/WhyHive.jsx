import { useScrollReveal } from "../hooks/useScrollReveal.js";

const CLIENT_LOGOS = [
  "HVAC Pro", "BuildRight", "FastFix", "ProClean",
  "ServicePro", "ElectriCo", "PlumbX", "RoofTop",
  "ClimaCool", "StructureLab",
];

const PARTNER_LOGOS = [
  "Google Partners", "Meta Business Suite", "Stripe",
  "Google Analytics", "Google Tag Manager", "SEMrush",
];

const VALUES = [
  {
    visual: "🏗️",
    title: "Entendemos los negocios de servicios",
    description:
      "Trabajamos con HVAC, construcción y servicios del hogar. Conocemos tus ciclos de venta, la estacionalidad y cómo se ve un lead realmente calificado.",
  },
  {
    visual: "🔧",
    title: "Stack técnico completo bajo un mismo techo",
    description:
      "Estrategia, tracking, desarrollo web y herramientas internas en una sola agencia. Sin dedo acusatorio entre proveedores.",
  },
  {
    visual: "📊",
    title: "Obsesionados con la claridad y los datos",
    description:
      "Recibís dashboards y reportes que muestran dónde va tu dinero, qué funciona y qué hacemos después — no métricas de vanidad.",
  },
];

function EcosystemDiagram() {
  const steps = [
    { emoji: "🎯", label: "Google Ads", desc: "Tráfico con intención de compra" },
    { emoji: "⚡", label: "Landing Page", desc: "Conversión al instante" },
    { emoji: "🤖", label: "Automatización", desc: "Lead → presupuesto → cierre" },
  ];
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <p className="text-xs font-semibold text-hive-yellow uppercase tracking-wider mb-5">
        Cómo conectamos todo tu ecosistema
      </p>
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-0">
        {steps.map((s, i) => (
          <div key={i} className="flex sm:flex-col items-center flex-1">
            {/* Node */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-14 h-14 rounded-2xl border border-hive-yellow/30 bg-hive-yellow/10 flex items-center justify-center text-2xl mb-2">
                {s.emoji}
              </div>
              <p className="text-sm font-semibold text-slate-100">{s.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.desc}</p>
            </div>
            {/* Arrow */}
            {i < steps.length - 1 && (
              <>
                {/* Desktop: horizontal arrow */}
                <div className="hidden sm:flex items-center px-2 text-hive-yellow/50 text-lg mt-6">→</div>
                {/* Mobile: vertical arrow */}
                <div className="flex sm:hidden items-center py-1 text-hive-yellow/50 text-lg">↓</div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap gap-3 justify-center text-xs text-slate-400">
        <span>✓ Sin saltos entre herramientas</span>
        <span>✓ Todo en un mismo tablero</span>
        <span>✓ Resultados medibles en 30 días</span>
      </div>
    </div>
  );
}

export default function WhyHive() {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="py-12 border-t border-slate-800">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-6">
        <p className="scroll-reveal inline-flex items-center gap-2 rounded-full border border-hive-yellow/30 bg-hive-yellow/5 px-3 py-1 text-xs font-medium text-hive-yellow mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-hive-yellow inline-block" />
          8 años escalando negocios locales
        </p>
        <h2 className="scroll-reveal delay-1 text-2xl sm:text-3xl font-semibold mb-2">
          ¿Por qué elegir{" "}
          <span className="text-hive-yellow">Hive Media?</span>
        </h2>
        <p className="scroll-reveal delay-2 text-base text-slate-300">
          Somos tu socio técnico y de marketing, no solo un proveedor de anuncios. Nuestro
          objetivo es construir un motor predecible de leads y revenue, paso a paso.
        </p>
      </div>

      {/* Client logo strip */}
      <div className="scroll-reveal overflow-hidden py-4 mb-10 border-y border-slate-800/60">
        <p className="text-center text-xs text-slate-500 mb-3 uppercase tracking-wider">
          Clientes que confían en nosotros
        </p>
        <div className="overflow-hidden">
          <div className="marquee-track gap-6">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((name, i) => (
              <span
                key={i}
                className="flex-shrink-0 rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-sm font-medium text-slate-300"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Value props — Z alternating layout */}
      <div className="space-y-10 mb-12">
        {VALUES.map((item, i) => (
          <div
            key={item.title}
            className={`scroll-reveal delay-${i + 1} grid gap-6 md:gap-12 md:grid-cols-2 items-center ${
              i % 2 !== 0 ? "md:[direction:rtl]" : ""
            }`}
          >
            {/* Visual */}
            <div className={i % 2 !== 0 ? "[direction:ltr]" : ""}>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-10 flex items-center justify-center card-hover min-h-[140px]">
                <div className="text-center">
                  <div className="text-5xl mb-2">{item.visual}</div>
                  <div className="w-10 h-1 bg-hive-yellow/40 rounded-full mx-auto" />
                </div>
              </div>
            </div>
            {/* Text */}
            <div className={i % 2 !== 0 ? "[direction:ltr]" : ""}>
              <h3 className="text-lg font-semibold text-slate-50 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-300">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Ecosystem diagram */}
      <div className="scroll-reveal mb-10">
        <EcosystemDiagram />
      </div>

      {/* Partner logo strip */}
      <div className="scroll-reveal overflow-hidden pt-8 border-t border-slate-800/60">
        <p className="text-center text-xs text-slate-500 mb-3 uppercase tracking-wider">
          Plataformas con las que trabajamos
        </p>
        <div className="overflow-hidden">
          <div className="marquee-track gap-5" style={{ animationDuration: "18s", animationDirection: "reverse" }}>
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((name, i) => (
              <span
                key={i}
                className="flex-shrink-0 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
