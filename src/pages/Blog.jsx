import { Link } from "react-router-dom";
import SeoHead from "../seo/SeoHead.jsx";

const POSTS = [
  {
    slug: "designing-a-lead-engine-for-service-businesses",
    title: "Designing a Lead Engine for Service Businesses",
    excerpt:
      "A practical framework to align your website, campaigns and internal tools so you can generate and close more leads consistently.",
    date: "2025-01-10",
    readTime: "7 min"
  },
  {
    slug: "google-ads-for-hvac-and-home-services",
    title: "Google Ads for HVAC and Home Services: What Actually Matters",
    excerpt:
      "Beyond keywords and bids: how to structure campaigns, track calls and avoid wasted spend in local service markets.",
    date: "2025-01-18",
    readTime: "6 min"
  },
  {
    slug: "why-your-website-isnt-converting-and-how-to-fix-it",
    title: "Why Your Website Is Not Converting (and How to Fix It)",
    excerpt:
      "Common UX, copy and technical mistakes that silently kill conversions—and simple ways to fix them.",
    date: "2025-02-02",
    readTime: "8 min"
  }
];

export default function Blog() {
  return (
    <>
      <SeoHead
        title="Blog & Insights"
        description="Hive Media's articles on performance marketing, web development and operations for service-based businesses."
      />
      <section className="pt-4 pb-10 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
          Blog & Insights
        </h1>
        <p className="text-base text-slate-300 mb-6">
          Short, practical articles for owners and teams who want to understand
          what actually moves the needle in digital marketing and operations.
        </p>

        <div className="space-y-4">
          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-hive-yellow/70 transition"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <h2 className="text-lg sm:text-lg font-semibold text-slate-50 mb-1">
                  {post.title}
                </h2>
              </Link>
              <p className="text-[11px] text-slate-400 mb-2">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span className="mx-1">•</span>
                <span>{post.readTime} read</span>
              </p>
              <p className="text-sm text-slate-300 mb-2">{post.excerpt}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="text-sm text-hive-yellow hover:opacity-90"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
