import Industries from "@/views/Industries.jsx";
import { buildMetadata, t } from "@/seo/metadata.js";
import PageTransition from "@/components/PageTransition.jsx";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return buildMetadata({
    lang,
    path: "/industries",
    title: t(lang, "seo.industries_title"),
    description: t(lang, "seo.industries_desc"),
  });
}

export default function Page() {
  return (
    <PageTransition>
      <Industries />
    </PageTransition>
  );
}
