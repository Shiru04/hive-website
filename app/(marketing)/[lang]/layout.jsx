import { Montserrat } from "next/font/google";
import "@/styles/index.css";
import I18nProvider from "@/components/I18nProvider.jsx";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import LazyChatWidget from "@/components/LazyChatWidget.jsx";
import JsonLd from "@/seo/JsonLd.jsx";
import { SITE_URL, SUPPORTED_LANGS } from "@/seo/metadata.js";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Hive Media | Digital Growth Agency",
  description:
    "Hive Media is a digital growth agency helping service businesses acquire more leads through performance marketing, web development, and automation.",
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.ico" },
  other: {
    "geo.region": "GT",
    "geo.placename": "Guatemala City",
    "geo.position": "14.6349;-90.5069",
    ICBM: "14.6349, -90.5069",
  },
};

export const viewport = {
  themeColor: "#020617",
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Hive Media",
  url: "https://hivemediastop.com",
  logo: "https://hivemediastop.com/logo-hive.png",
  description:
    "Digital growth agency helping service businesses acquire and close more leads through performance marketing, web development and internal tools.",
  sameAs: [],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Guatemala City",
    addressCountry: "GT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "14.6349",
    longitude: "-90.5069",
  },
  areaServed: [
    { "@type": "Country", name: "Guatemala" },
    { "@type": "Country", name: "United States" },
  ],
  priceRange: "$$",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "https://hivemediastop.com/contact",
    availableLanguage: ["English", "Spanish"],
  },
  knowsAbout: [
    "Google Ads",
    "Performance Marketing",
    "Web Development",
    "SEO",
    "Lead Generation",
    "Marketing Automation",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Marketing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Google Ads & Performance Marketing",
          url: "https://hivemediastop.com/services/google-ads",
          description:
            "Campaign design, conversion tracking, and ongoing optimization focused on qualified lead generation for service businesses.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Websites & Landing Pages",
          url: "https://hivemediastop.com/services/websites",
          description:
            "Fast, modern websites built with React and Tailwind for SEO, clarity and conversions.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO Fundamentals",
          url: "https://hivemediastop.com/services/seo",
          description:
            "Technical, on-page and local SEO to align website structure and content with search intent.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Internal Tools & Automation",
          url: "https://hivemediastop.com/services/internal-tools",
          description:
            "Custom CRM-style web apps for lead management, quotes, invoices and operations.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Analytics & Reporting",
          url: "https://hivemediastop.com/services/analytics",
          description:
            "Google Analytics, Tag Manager setup, event tracking and custom reporting dashboards.",
        },
      },
    ],
  },
};

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

const SKIP_LINK_LABEL = {
  en: "Skip to content",
  es: "Saltar al contenido",
  de: "Zum Inhalt springen",
};

export default async function MarketingLayout({ children, params }) {
  const { lang } = await params;
  const resolvedLang = SUPPORTED_LANGS.includes(lang) ? lang : "en";

  return (
    <html lang={resolvedLang} className={montserrat.variable}>
      <body className="bg-slate-950 text-slate-50">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-hive-yellow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
        >
          {SKIP_LINK_LABEL[resolvedLang]}
        </a>
        <JsonLd schema={ORG_SCHEMA} />
        <I18nProvider lang={resolvedLang}>
          <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
            <Navbar />
            <main id="main-content" className="flex-1 pt-20 pb-12">{children}</main>
            <Footer />
            <LazyChatWidget />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
