import SeoHead from "../seo/SeoHead.jsx";
import ServiceCard from "../components/ServiceCard.jsx";

const SERVICES = [
  {
    title: "Google Ads & Performance Marketing",
    subtitle: "Search, Local Services and Display (when it makes sense)",
    description:
      "We design, implement and maintain campaigns focused on qualified leads, not just clicks. Every campaign is tied to a clear business objective.",
    bullets: [
      "Account structure and cleanup",
      "Conversion & call tracking setup",
      "Bid and budget optimization",
      "Monthly reporting with insights and actions"
    ]
  },
  {
    title: "Websites & Landing Pages",
    subtitle: "Built with React, Vite and Tailwind",
    description:
      "Your website should load fast, explain what you do clearly and make it easy for visitors to contact you. We design and build with that in mind.",
    bullets: [
      "UX strategy and information architecture",
      "Conversion-focused copywriting",
      "Responsive UI with TailwindCSS",
      "Technical SEO best practices"
    ]
  },
  {
    title: "SEO Fundamentals",
    subtitle: "Technical, on-page and local",
    description:
      "We align your website structure, content and metadata so search engines understand your business and send the right people to you.",
    bullets: [
      "Keyword and intent research",
      "On-page optimization and metadata",
      "Internal linking and structure",
      "Local SEO for service areas"
    ]
  },
  {
    title: "Internal Tools & Operations Hub",
    subtitle: "Custom CRM-style tools for service businesses",
    description:
      "We build internal web apps to manage leads, projects, quotes and invoices so your team has one place to operate.",
    bullets: [
      "Lead and client management",
      "Quotes and invoices",
      "Task and project tracking",
      "Role-based access and security"
    ]
  },
  {
    title: "Analytics & Reporting",
    subtitle: "Make decisions with clear data",
    description:
      "We configure tracking and reporting so you can understand where your leads come from and how campaigns perform.",
    bullets: [
      "Google Analytics & Tag Manager setup",
      "Event and conversion tracking",
      "Lead source attribution",
      "Custom, easy-to-read reports"
    ]
  },
  {
    title: "Consulting & Technical Support",
    subtitle: "For teams that already run campaigns",
    description:
      "If your team already runs ads or manages the website, we can come in as technical and strategy support.",
    bullets: [
      "Audits and action plans",
      "Implementation support",
      "Code-level troubleshooting",
      "Ongoing advisory"
    ]
  }
];

export default function Services() {
  return (
    <>
      <SeoHead
        title="Services"
        description="Explore Hive Media's services: performance marketing, websites, SEO, analytics and internal tools for service-based businesses."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Services | Hive Media",
          "url": "https://hivemediastop.com/services",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hivemediastop.com/" },
              { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://hivemediastop.com/services" }
            ]
          }
        }}
      />
      <section className="pt-4 pb-10">
        <div className="mb-6 max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
            Services built around{" "}
            <span className="text-hive-yellow">measurable growth.</span>
          </h1>
          <p className="text-base text-slate-300">
            Every service we offer exists to move one of three levers: more
            qualified traffic, better conversion rates, and stronger internal
            systems to handle the demand.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>
    </>
  );
}
