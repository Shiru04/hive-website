import SeoHead from "../seo/SeoHead.jsx";
import ContactForm from "../components/ContactForm.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

const TIMELINE_STEPS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
    step: "01",
    title: "Verificamos el fit",
    description:
      "Leemos tu mensaje y evaluamos si somos la opción correcta para tu negocio. Honestidad ante todo.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    step: "02",
    title: "Pedimos acceso de vista",
    description:
      "Podemos pedir acceso de solo lectura a tu web o cuenta publicitaria para entender el contexto real.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
        <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    step: "03",
    title: "Agendamos la llamada",
    description:
      "30 minutos para recorrer prioridades y diseñar los próximos pasos. Sin presión, sin venta agresiva.",
  },
];

function StrategistCard() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
      {/* Photo placeholder */}
      <div className="relative h-44 bg-gradient-to-br from-hive-yellow/10 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(250,204,21,0.08),transparent_70%)]" />
        <svg
          viewBox="0 0 80 80"
          fill="none"
          className="w-24 h-24 relative z-10"
        >
          <circle cx="40" cy="40" r="40" fill="rgba(250,204,21,0.08)" />
          <circle cx="40" cy="30" r="14" fill="rgba(250,204,21,0.2)" stroke="rgba(250,204,21,0.4)" strokeWidth="1.5" />
          <path d="M14 66c0-14.36 11.64-26 26-26s26 11.64 26 26" fill="rgba(250,204,21,0.1)" stroke="rgba(250,204,21,0.3)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="p-4">
        <p className="font-semibold text-slate-50">Andrés R.</p>
        <p className="text-sm text-hive-yellow">Estratega Digital · Hive Media</p>
        <p className="text-xs text-slate-400 mt-2">
          "Antes de recomendarte cualquier servicio, entendemos tu negocio."
        </p>
      </div>
    </div>
  );
}

export default function Contact() {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  return (
    <>
      <SeoHead
        title="Contacto"
        description="Contactá a Hive Media para hablar de marketing de rendimiento, desarrollo web o herramientas internas para tu negocio de servicios."
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contacto | Hive Media",
          "url": "https://hivemediastop.com/contact",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hivemediastop.com/" },
              { "@type": "ListItem", "position": 2, "name": "Contacto", "item": "https://hivemediastop.com/contact" }
            ]
          }
        }}
      />

      <section className="pt-4 pb-10">
        <div className="grid gap-10 md:grid-cols-[3fr,2fr] items-start">
          {/* ── Left: form + title ── */}
          <div ref={leftRef}>
            <h1 className="scroll-reveal text-2xl sm:text-3xl font-semibold mb-2">
              Hablemos de tus números.{" "}
              <span className="text-hive-yellow">Estamos listos para escalar.</span>
            </h1>
            <p className="scroll-reveal delay-1 text-base text-slate-300 mb-5">
              Contanos tu situación actual y qué querés mejorar. Revisamos tu
              información y respondemos con los próximos pasos concretos.
            </p>

            {/* Yellow checkmarks list */}
            <ul className="scroll-reveal delay-2 space-y-2 mb-6">
              {[
                "Respondemos en 1–2 días hábiles.",
                "Sin obligación. Sin spam.",
                "Podemos comunicarnos en español o inglés.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-hive-yellow mt-0.5 flex-shrink-0 font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="scroll-reveal delay-3">
              <ContactForm />
            </div>
          </div>

          {/* ── Right: timeline + strategist ── */}
          <div ref={rightRef} className="space-y-6">
            {/* Timeline */}
            <div className="scroll-reveal rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h2 className="text-base font-semibold text-slate-50 mb-5">
                ¿Qué pasa después de que nos escribís?
              </h2>
              <div className="relative space-y-0">
                {/* Vertical line */}
                <div className="absolute left-[1.55rem] top-6 bottom-6 w-px bg-slate-700" />

                {TIMELINE_STEPS.map((s, i) => (
                  <div
                    key={i}
                    className={`timeline-step relative flex gap-4 rounded-xl border border-transparent p-3 cursor-default group ${
                      i < TIMELINE_STEPS.length - 1 ? "mb-2" : ""
                    }`}
                  >
                    {/* Icon circle */}
                    <div className="flex-shrink-0 w-11 h-11 rounded-full border border-slate-700 bg-slate-950 flex items-center justify-center text-hive-yellow z-10 group-hover:border-hive-yellow/50 group-hover:bg-hive-yellow/10 transition-colors duration-300">
                      {s.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-hive-yellow/60 uppercase tracking-wider">
                        Paso {s.step}
                      </span>
                      <p className="text-sm font-semibold text-slate-100">{s.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategist card */}
            <div className="scroll-reveal delay-1">
              <StrategistCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
