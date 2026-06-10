import { cache } from "react";
import BlogPost from "@/views/BlogPost.jsx";
import { buildMetadata } from "@/seo/metadata.js";

// Articles live in the API — render on every request so edits and new
// posts are visible immediately without a redeploy.
export const dynamic = "force-dynamic";

// cache() dedupes the fetch between generateMetadata and the page render
// within a single request.
const fetchPost = cache(async (slug) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return { post: null, status: "error" };
  try {
    const res = await fetch(`${apiUrl}/api/public/blog/posts/${slug}`, {
      cache: "no-store",
    });
    if (res.status === 404) return { post: null, status: "notfound" };
    if (!res.ok) throw new Error("Error fetching article");
    return { post: await res.json(), status: "ready" };
  } catch (err) {
    console.error(err);
    return { post: null, status: "error" };
  }
});

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const { post, status } = await fetchPost(slug);
  if (!post) {
    return {
      ...buildMetadata({
        lang,
        path: `/blog/${slug}`,
        title: status === "notfound" ? "Article not found" : "Blog & Insights",
        description:
          "Hive Media's articles on performance marketing, web development and operations for service-based businesses.",
      }),
      robots: { index: false, follow: false },
    };
  }
  const metadata = buildMetadata({
    lang,
    path: `/blog/${slug}`,
    title: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt,
    ogType: "article",
    ogImage: post.ogImage || post.coverImage || undefined,
  });
  // Content-freshness signals (article:published_time / article:modified_time)
  if (post.publishedAt) metadata.openGraph.publishedTime = post.publishedAt;
  if (post.updatedAt || post.publishedAt) {
    metadata.openGraph.modifiedTime = post.updatedAt || post.publishedAt;
  }
  return metadata;
}

export default async function Page({ params }) {
  const { lang, slug } = await params;
  const { post, status } = await fetchPost(slug);
  return <BlogPost post={post} slug={slug} lang={lang} status={status} />;
}
