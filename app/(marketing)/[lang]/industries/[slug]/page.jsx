import { notFound } from "next/navigation";
import IndustryPage from "@/views/IndustryPage.jsx";
import { INDUSTRIES } from "@/data/industries.js";
import { getLocalizedIndustry } from "@/data/localize.js";
import { buildMetadata } from "@/seo/metadata.js";
import PageTransition from "@/components/PageTransition.jsx";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const industry = getLocalizedIndustry(slug, lang);
  if (!industry) return {};
  return buildMetadata({
    lang,
    path: `/industries/${slug}`,
    title: industry.title,
    description: industry.metaDescription,
  });
}

export default async function Page({ params }) {
  const { lang, slug } = await params;
  if (!getLocalizedIndustry(slug, lang)) notFound();
  return (
    <PageTransition>
      <IndustryPage />
    </PageTransition>
  );
}
