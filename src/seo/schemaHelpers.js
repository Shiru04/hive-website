export const SITE_URL = "https://hivemediastop.com";

export const ORG = {
  "@type": "ProfessionalService",
  name: "Hive Media",
  url: SITE_URL,
};

export function buildBreadcrumbs(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildServiceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: ORG,
    areaServed: [
      { "@type": "Country", name: "Dominican Republic" },
      { "@type": "Country", name: "United States" },
    ],
    breadcrumb: buildBreadcrumbs([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Services", url: `${SITE_URL}/services` },
      { name: service.title, url: `${SITE_URL}/services/${service.slug}` },
    ]),
  };
}

export function buildIndustrySchema(industry) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: industry.title,
    description: industry.metaDescription,
    url: `${SITE_URL}/industries/${industry.slug}`,
    breadcrumb: buildBreadcrumbs([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Industries", url: `${SITE_URL}/industries` },
      { name: industry.shortTitle, url: `${SITE_URL}/industries/${industry.slug}` },
    ]),
  };
}
