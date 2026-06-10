import { notFound } from "next/navigation";
import ServicePage from "@/views/ServicePage.jsx";
import { SERVICES } from "@/data/services.js";
import { getLocalizedService } from "@/data/localize.js";
import { buildMetadata } from "@/seo/metadata.js";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const service = getLocalizedService(slug, lang);
  if (!service) return {};
  return buildMetadata({
    lang,
    path: `/services/${slug}`,
    title: service.metaTitle,
    description: service.metaDescription,
  });
}

export default async function Page({ params }) {
  const { lang, slug } = await params;
  if (!getLocalizedService(slug, lang)) notFound();
  return <ServicePage />;
}
