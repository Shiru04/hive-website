import About from "@/views/About.jsx";
import { buildMetadata, t } from "@/seo/metadata.js";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return buildMetadata({
    lang,
    path: "/about",
    title: t(lang, "seo.about_title"),
    description: t(lang, "seo.about_desc"),
  });
}

export default function Page() {
  return <About />;
}
