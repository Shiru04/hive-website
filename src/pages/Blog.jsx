import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SeoHead from "../seo/SeoHead.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/public/blog/posts?limit=20`);
        if (!res.ok) throw new Error("Error fetching blog posts");
        const data = await res.json();
        setPosts(data.items || []);
        setStatus("ready");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <SeoHead
        title="Blog & Insights"
        description="Hive Media's articles on performance marketing, web development and operations for service-based businesses."
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Blog & Insights | Hive Media",
          "url": "https://hivemediastop.com/blog",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hivemediastop.com/" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://hivemediastop.com/blog" }
            ]
          }
        }}
      />
      <section className="pt-4 pb-10 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
          Blog & Insights
        </h1>
        <p className="text-base text-slate-300 mb-6">
          Short, practical articles for owners and teams who want to understand
          what actually moves the needle in digital marketing and operations.
        </p>

        {status === "loading" && (
          <p className="text-sm text-slate-400">Loading articles…</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400">
            We could not load the articles right now. Please try again later.
          </p>
        )}
        {status === "ready" && posts.length === 0 && (
          <p className="text-sm text-slate-400">
            No articles published yet. Please check back soon.
          </p>
        )}

        {status === "ready" && posts.length > 0 && (
          <div className="space-y-4">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-hive-yellow/70 transition"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <h2 className="text-lg font-semibold text-slate-50 mb-1">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-xs text-slate-400 mb-2">
                  {post.publishedAt && (
                    <>
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                      <span className="mx-1">•</span>
                    </>
                  )}
                  {post.readingTimeMinutes && (
                    <span>{post.readingTimeMinutes} min read</span>
                  )}
                </p>
                {post.excerpt && (
                  <p className="text-sm text-slate-300 mb-2">
                    {post.excerpt}
                  </p>
                )}
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-sm text-hive-yellow hover:opacity-90"
                >
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
