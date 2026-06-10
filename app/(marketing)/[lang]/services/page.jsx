import Services from "@/views/Services.jsx";
import { buildMetadata, t } from "@/seo/metadata.js";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return buildMetadata({
    lang,
    path: "/services",
    title: t(lang, "seo.services_title"),
    description: t(lang, "seo.services_desc"),
  });
}

export default function Page() {
  return <Services />;
}
