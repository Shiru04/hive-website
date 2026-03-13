import SeoHead from "../seo/SeoHead.jsx";
import Hero from "../components/Hero.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import WhyHive from "../components/WhyHive.jsx";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

// ── Icons ──────────────────────────────────────────────────────────────────
function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="icon-search w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function IconLightning() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="icon-pulse w-5 h-5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconGear() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="icon-gear w-5 h-5">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
// ──────────────────────────────────────────────────────────────────────────

const FEATURED_SERVICES = [
  {
    icon: <IconTarget />,
    title: "Clientes que ya buscan lo que ofrecés",
    subtitle: "Google Ads & Performance Marketing",
    description:
      "Campañas diseñadas para capturar búsquedas de alta intención y llenar tu pipeline de oportunidades reales, no de clics vacíos.",
    bullets: [
      "Solo pagás por leads calificados",
      "Seguimiento de llamadas y conversiones",
      "Optimización continua con reportes claros",
    ],
  },
  {
    icon: <IconLightning />,
    title: "Velocidad de carga instantánea para no perder clientes",
    subtitle: "Webs & Landing Pages que convierten",
    description:
      "Sitios rápidos, claros y diseñados para convertir visitantes en consultas. Cada sección tiene un objetivo.",
    bullets: [
      "Carga en menos de 2 segundos",
      "Diseño orientado a conversión",
      "SEO técnico incluido",
    ],
  },
  {
    icon: <IconGear />,
    title: "Tu equipo cierra, nosotros automatizamos lo demás",
    subtitle: "Herramientas internas & automatización",
    description:
      "Sistemas a medida para gestionar leads, presupuestos y operaciones para que tu equipo gane tiempo, no lo pierda.",
    bullets: [
      "CRM adaptado a tu negocio",
      "Presupuestos y facturas automáticas",
      "Dashboards de operaciones en tiempo real",
    ],
  },
];

export default function Home() {
  const servicesRef = useScrollReveal();
  const contactRef = useScrollReveal();

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
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hivemediastop.com/" }
            ]
          }
        }}
      />

      <Hero />

      {/* ── Services preview ── */}
      <section ref={servicesRef} className="py-8 border-t border-slate-800">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-xl font-semibold text-slate-50">
            Lo que hacemos por nuestros clientes
          </h2>
          <Link to="/services" className="text-sm text-slate-300 hover:text-hive-yellow transition-colors">
            Ver todos los servicios →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {FEATURED_SERVICES.map((service, i) => (
            <div key={service.title} className={`scroll-reveal delay-${i + 1}`}>
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </section>

      <WhyHive />

      {/* ── Contact CTA ── */}
      <section ref={contactRef} className="py-10 border-t border-slate-800">
        <div className="grid gap-8 md:grid-cols-[3fr,2fr] items-start">
          <div>
            <h2 className="scroll-reveal text-xl sm:text-2xl font-semibold mb-3">
              Diseñemos tu próximo paso de crecimiento.
            </h2>
            <ul className="scroll-reveal delay-1 text-sm text-slate-300 space-y-2 mb-4">
              {[
                "Auditoría honesta de tu marketing y tracking actual",
                "Hoja de ruta clara para los próximos 90 días",
                "Sin contratos a largo plazo — solo trabajo que rinde",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-hive-yellow mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="scroll-reveal delay-2">
            <ContactForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
