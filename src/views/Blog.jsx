import Link from "next/link";
import JsonLd from "../seo/JsonLd.jsx";

/**
 * Server-rendered blog index. Receives the posts already fetched by the
 * route's page.jsx (dynamic rendering — always fresh from the API).
 */
export default function Blog({ posts = [], status = "ready", lang = "en" }) {
  return (
    <>
      <JsonLd schema={{
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
        }} />
      <section className="pt-4 pb-10 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
          Blog & Insights
        </h1>
        <p className="text-base text-slate-300 mb-6">
          Short, practical articles for owners and teams who want to understand
          what actually moves the needle in digital marketing and operations.
        </p>

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
                <Link href={`/${lang}/blog/${post.slug}`} className="block">
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
                  href={`/${lang}/blog/${post.slug}`}
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
