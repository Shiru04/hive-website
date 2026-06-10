import Blog from "@/views/Blog.jsx";
import { buildMetadata } from "@/seo/metadata.js";

// Blog content lives in the API — render on every request so new posts
// show up without a redeploy.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return buildMetadata({
    lang,
    path: "/blog",
    title: "Blog & Insights",
    description:
      "Hive Media's articles on performance marketing, web development and operations for service-based businesses.",
  });
}

async function fetchPosts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return { posts: [], status: "error" };
  try {
    const res = await fetch(`${apiUrl}/api/public/blog/posts?limit=20`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Error fetching blog posts");
    const data = await res.json();
    return { posts: data.items || [], status: "ready" };
  } catch (err) {
    console.error(err);
    return { posts: [], status: "error" };
  }
}

export default async function Page({ params }) {
  const { lang } = await params;
  const { posts, status } = await fetchPosts();
  return <Blog posts={posts} status={status} lang={lang} />;
}
