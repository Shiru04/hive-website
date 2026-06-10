import { SITE_URL } from "@/seo/metadata.js";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/portal"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
