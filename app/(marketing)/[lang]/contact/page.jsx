import Contact from "@/views/Contact.jsx";
import { buildMetadata, t } from "@/seo/metadata.js";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return buildMetadata({
    lang,
    path: "/contact",
    title: t(lang, "seo.contact_title"),
    description: t(lang, "seo.contact_desc"),
  });
}

export default function Page() {
  return <Contact />;
}
