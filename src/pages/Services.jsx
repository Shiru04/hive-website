import SeoHead from "../seo/SeoHead.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";
import { Link } from "react-router-dom";

// ── Service icons ──────────────────────────────────────────────────────────
function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="icon-search w-6 h-6">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function IconLightning() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="icon-pulse w-6 h-6">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="icon-search w-6 h-6">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}
function IconGear() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="icon-gear w-6 h-6">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function IconChart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="icon-arrow w-6 h-6">
      <path d="M18 20V10" strokeLinecap="round" /><path d="M12 20V4" strokeLinecap="round" /><path d="M6 20v-6" strokeLinecap="round" />
    </svg>
  );
}
function IconChat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="icon-pulse w-6 h-6">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
// ──────────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: <IconTarget />,
    tag: "Marketing",
    title: "Google Ads & Performance Marketing",
    subtitle: "Clientes que ya buscan lo que ofrecés",
    description:
      "Diseñamos e implementamos campañas enfocadas en leads calificados, no en clics vacíos. Cada euro invertido está vinculado a un objetivo concreto.",
    bullets: [
      "Estructura de cuenta y limpieza inicial",
      "Seguimiento de conversiones y llamadas",
      "Optimización de pujas y presupuesto",
      "Reportes mensuales con insights accionables",
    ],
    visual: "🎯",
  },
  {
    icon: <IconLightning />,
    tag: "Web",
    title: "Webs & Landing Pages",
    subtitle: "Velocidad instantánea para no perder clientes",
    description:
      "Tu web carga rápido, explica lo que hacés con claridad y hace que sea fácil contactarte. Diseñamos y construimos con ese objetivo en mente.",
    bullets: [
      "Estrategia UX e información arquitectural",
      "Copywriting orientado a conversión",
      "Diseño responsive de alta velocidad",
      "Mejores prácticas de SEO técnico",
    ],
    visual: "⚡",
  },
  {
    icon: <IconSearch />,
    tag: "SEO",
    title: "SEO Fundamentals",
    subtitle: "Que Google te encuentre antes que a la competencia",
    description:
      "Alineamos la estructura, el contenido y los metadatos de tu web para que los motores de búsqueda entiendan tu negocio y envíen el tráfico correcto.",
    bullets: [
      "Investigación de palabras clave e intención",
      "Optimización on-page y metadatos",
      "Linking interno y estructura",
      "SEO local para áreas de servicio",
    ],
    visual: "🔍",
  },
  {
    icon: <IconGear />,
    tag: "Automatización",
    title: "Herramientas Internas & Operations Hub",
    subtitle: "Tu equipo cierra, el sistema hace el resto",
    description:
      "Construimos apps internas para gestionar leads, proyectos, presupuestos y facturas para que tu equipo tenga un solo lugar donde operar.",
    bullets: [
      "Gestión de leads y clientes",
      "Presupuestos y facturas automáticas",
      "Seguimiento de tareas y proyectos",
      "Acceso por roles y seguridad",
    ],
    visual: "⚙️",
  },
  {
    icon: <IconChart />,
    tag: "Analytics",
    title: "Analytics & Reporting",
    subtitle: "Tomá decisiones con datos reales, no métricas de vanidad",
    description:
      "Configuramos tracking y reportes para que entiendas de dónde vienen tus leads y cómo rinden tus campañas — sin cifras vacías.",
    bullets: [
      "Google Analytics & Tag Manager",
      "Seguimiento de eventos y conversiones",
      "Atribución de fuente de leads",
      "Reportes personalizados fáciles de leer",
    ],
    visual: "📊",
  },
  {
    icon: <IconChat />,
    tag: "Consultoría",
    title: "Consultoría & Soporte Técnico",
    subtitle: "Para equipos que ya gestionan campañas",
    description:
      "Si tu equipo ya hace ads o maneja la web, podemos sumarnos como soporte técnico y estratégico cuando lo necesitás.",
    bullets: [
      "Auditorías y planes de acción",
      "Soporte en implementación",
      "Resolución de problemas a nivel código",
      "Asesoramiento continuo",
    ],
    visual: "💬",
  },
];

function ServiceBlock({ service, index }) {
  const ref = useScrollReveal();
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="scroll-reveal">
      <div
        className={`group grid gap-6 md:gap-10 md:grid-cols-2 items-center ${
          !isEven ? "md:[direction:rtl]" : ""
        }`}
      >
        {/* Visual side */}
        <div className={!isEven ? "[direction:ltr]" : ""}>
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-8 flex items-center justify-center card-hover min-h-[180px]">
            <div className="absolute inset-0 bg-gradient-to-br from-hive-yellow/5 to-transparent rounded-2xl" />
            <div className="relative text-center">
              <div className="text-6xl mb-3">{service.visual}</div>
              <span className="inline-block rounded-full border border-hive-yellow/30 bg-hive-yellow/5 px-3 py-0.5 text-xs font-medium text-hive-yellow">
                {service.tag}
              </span>
            </div>
          </div>
        </div>

        {/* Content side */}
        <div className={!isEven ? "[direction:ltr]" : ""}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-lg bg-hive-yellow/10 flex items-center justify-center text-hive-yellow">
              {service.icon}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-50 mb-1">{service.title}</h2>
          <p className="text-sm font-medium text-hive-yellow mb-3">{service.subtitle}</p>
          <p className="text-sm text-slate-300 mb-4">{service.description}</p>
          <ul className="text-sm text-slate-400 space-y-1.5 mb-5">
            {service.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="text-hive-yellow mt-0.5 flex-shrink-0">✓</span>
                {b}
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-950 bg-hive-yellow px-5 py-2 rounded-full hover:brightness-110 transition-all duration-200 no-underline"
          >
            Cotizar este servicio →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const headerRef = useScrollReveal();

  return (
    <>
      <SeoHead
        title="Servicios"
        description="Servicios de Hive Media: marketing de rendimiento, webs, SEO, analítica y herramientas internas para negocios de servicios."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Servicios | Hive Media",
          "url": "https://hivemediastop.com/services",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hivemediastop.com/" },
              { "@type": "ListItem", "position": 2, "name": "Servicios", "item": "https://hivemediastop.com/services" }
            ]
          }
        }}
      />

      <section className="pt-4 pb-10">
        {/* Header */}
        <div ref={headerRef} className="mb-10 max-w-3xl">
          <p className="scroll-reveal inline-flex items-center gap-2 rounded-full border border-hive-yellow/30 bg-hive-yellow/5 px-3 py-1 text-sm font-medium text-hive-yellow mb-4">
            <span className="w-2 h-2 rounded-full bg-hive-yellow inline-block" />
            Servicios diseñados para crecer
          </p>
          <h1 className="scroll-reveal delay-1 text-2xl sm:text-3xl font-semibold mb-3">
            Cada servicio mueve uno de{" "}
            <span className="text-hive-yellow">tres palancas.</span>
          </h1>
          <p className="scroll-reveal delay-2 text-base text-slate-300">
            Más tráfico calificado, mejor tasa de conversión y sistemas internos sólidos para manejar la demanda. Todo medible, todo con resultados claros.
          </p>
        </div>

        {/* Service blocks with Z layout + section separators */}
        <div className="space-y-12">
          {SERVICES.map((service, i) => (
            <div key={service.title}>
              <ServiceBlock service={service} index={i} />
              {i < SERVICES.length - 1 && (
                <div className="mt-12 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 rounded-2xl border border-hive-yellow/20 bg-hive-yellow/5 p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">¿No sabés por dónde empezar?</h2>
          <p className="text-slate-300 mb-5 max-w-md mx-auto text-sm">
            Contanos tu situación y te ayudamos a priorizar qué moverá la aguja primero.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full border border-hive-yellow bg-hive-yellow px-6 py-3 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-110 transition-all duration-200 no-underline"
          >
            Agenda tu llamada gratuita
          </Link>
        </div>
      </section>
    </>
  );
}
