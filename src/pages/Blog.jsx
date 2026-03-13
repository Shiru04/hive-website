import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SeoHead from "../seo/SeoHead.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

const API_URL = import.meta.env.VITE_API_URL;

const CATEGORIES = ["Todos", "SEO", "Web", "Google Ads", "Casos de Éxito"];

const PLACEHOLDER_COLORS = [
  "from-hive-yellow/20 to-slate-800",
  "from-sky-500/20 to-slate-800",
  "from-emerald-500/20 to-slate-800",
  "from-purple-500/20 to-slate-800",
  "from-rose-500/20 to-slate-800",
];

// Infer category from post title/excerpt if API doesn't provide one
function inferCategory(post) {
  if (post.category) return post.category;
  const text = `${post.title ?? ""} ${post.excerpt ?? ""}`.toLowerCase();
  if (text.includes("seo") || text.includes("posicionamiento")) return "SEO";
  if (text.includes("web") || text.includes("landing") || text.includes("sitio")) return "Web";
  if (text.includes("google ads") || text.includes("adwords") || text.includes("ppc")) return "Google Ads";
  if (text.includes("caso") || text.includes("cliente") || text.includes("resultado")) return "Casos de Éxito";
  return "General";
}

// Static "Lo último en Hive Media" project highlights
const RECENT_PROJECTS = [
  {
    emoji: "🎯",
    title: "Campaña Google Ads para HVAC",
    desc: "Reducción del 38% en costo por lead en 60 días.",
    tag: "Google Ads",
    color: "from-hive-yellow/10",
  },
  {
    emoji: "⚡",
    title: "Landing page industrial — 0.9s de carga",
    desc: "Rediseño completo orientado a conversión.",
    tag: "Web",
    color: "from-sky-500/10",
  },
  {
    emoji: "🔍",
    title: "SEO local para empresa de plomería",
    desc: "De posición 42 a posición 4 en 90 días.",
    tag: "SEO",
    color: "from-emerald-500/10",
  },
];

function PostThumbnail({ post, index }) {
  if (post.coverImage) {
    return (
      <div className="w-full h-36 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={post.coverImage}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  const gradient = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
  return (
    <div
      className={`w-full h-36 rounded-xl flex-shrink-0 bg-gradient-to-br ${gradient} to-slate-900 flex items-center justify-center border border-slate-800`}
    >
      <span className="text-3xl opacity-60">📝</span>
    </div>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const headerRef = useScrollReveal();
  const listRef = useScrollReveal();

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

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (activeCategory !== "Todos") {
      result = result.filter((p) => inferCategory(p) === activeCategory);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [posts, activeCategory, search]);

  return (
    <>
      <SeoHead
        title="Blog & Insights"
        description="Artículos de Hive Media sobre marketing de rendimiento, desarrollo web y operaciones para negocios de servicios."
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

      {/* ── "Lo último en Hive Media" gallery ── */}
      <section className="pt-4 pb-8 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-slate-50 mb-4">
          Lo último en <span className="text-hive-yellow">Hive Media</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {RECENT_PROJECTS.map((p, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-slate-800 bg-gradient-to-br ${p.color} to-slate-900 p-5 card-hover`}
            >
              <div className="text-3xl mb-3">{p.emoji}</div>
              <span className="inline-block rounded-full border border-hive-yellow/30 bg-hive-yellow/5 px-2 py-0.5 text-xs font-medium text-hive-yellow mb-2">
                {p.tag}
              </span>
              <p className="text-sm font-semibold text-slate-100 mb-1">{p.title}</p>
              <p className="text-xs text-slate-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Blog listing ── */}
      <section className="pt-8 pb-10 max-w-3xl mx-auto">
        {/* Header */}
        <div ref={headerRef}>
          <h1 className="scroll-reveal text-3xl sm:text-4xl font-semibold mb-2">
            Blog & Insights
          </h1>
          <p className="scroll-reveal delay-1 text-base text-slate-300 mb-6">
            Artículos cortos y prácticos para dueños y equipos que quieren entender
            qué mueve realmente la aguja en marketing digital.
          </p>
        </div>

        {/* Search bar */}
        <div className="scroll-reveal relative mb-4">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Buscar artículos…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 pl-9 pr-4 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow transition-colors"
          />
        </div>

        {/* Category filters */}
        <div className="scroll-reveal delay-1 flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1 text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "border-hive-yellow bg-hive-yellow text-slate-950"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-hive-yellow/50 hover:text-hive-yellow"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* States */}
        {status === "loading" && (
          <p className="text-sm text-slate-400">Cargando artículos…</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400">
            No pudimos cargar los artículos. Intentá más tarde.
          </p>
        )}
        {status === "ready" && filteredPosts.length === 0 && (
          <p className="text-sm text-slate-400">
            {posts.length === 0
              ? "Aún no hay artículos publicados. Volvé pronto."
              : "No encontramos artículos con ese filtro."}
          </p>
        )}

        {/* Post list */}
        {status === "ready" && filteredPosts.length > 0 && (
          <div ref={listRef} className="space-y-4">
            {filteredPosts.map((post, i) => (
              <div key={post.slug} className="scroll-reveal">
                <article className="group rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden card-hover">
                  <PostThumbnail post={post} index={i} />
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="inline-block rounded-full border border-slate-700 bg-slate-900 px-2 py-0.5 text-xs text-slate-400">
                        {inferCategory(post)}
                      </span>
                      <p className="text-xs text-slate-500">
                        {post.publishedAt && (
                          <span>{new Date(post.publishedAt).toLocaleDateString("es-AR")}</span>
                        )}
                        {post.publishedAt && post.readingTimeMinutes && (
                          <span className="mx-1">·</span>
                        )}
                        {post.readingTimeMinutes && (
                          <span>{post.readingTimeMinutes} min</span>
                        )}
                      </p>
                    </div>
                    <Link to={`/blog/${post.slug}`} className="block group-hover:text-hive-yellow transition-colors">
                      <h2 className="text-lg font-semibold text-slate-50 mb-1 group-hover:text-hive-yellow transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    {post.excerpt && (
                      <p className="text-sm text-slate-300 mb-2">{post.excerpt}</p>
                    )}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-sm text-hive-yellow hover:opacity-90"
                    >
                      Leer artículo →
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
