import Home from "@/views/Home.jsx";
import { buildMetadata, t } from "@/seo/metadata.js";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return buildMetadata({
    lang,
    path: "",
    title: t(lang, "seo.home_title"),
    description: t(lang, "seo.home_desc"),
  });
}

export default function Page() {
  return <Home />;
}
