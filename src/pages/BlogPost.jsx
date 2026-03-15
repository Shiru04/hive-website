import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SeoHead from "../seo/SeoHead.jsx";

const API_URL = import.meta.env.VITE_API_URL;

// ─── TipTap JSON → React renderer ───────────────────────────────────────

function renderMarks(text, marks) {
  if (!marks || marks.length === 0) return text;

  return marks.reduce((acc, mark) => {
    switch (mark.type) {
      case "bold":
        return <strong>{acc}</strong>;
      case "italic":
        return <em>{acc}</em>;
      case "underline":
        return <u>{acc}</u>;
      case "strike":
        return <s>{acc}</s>;
      case "code":
        return (
          <code className="px-1.5 py-0.5 rounded bg-slate-800 text-hive-yellow text-sm font-mono">
            {acc}
          </code>
        );
      case "link": {
        // Ensure URL has protocol — prevents relative path like /blog/google.com
        let href = mark.attrs?.href || "";
        if (href && !/^(https?:\/\/|mailto:|tel:|#|\/)/i.test(href)) {
          href = `https://${href}`;
        }
        return (
          <a
            href={href}
            target={mark.attrs?.target || "_blank"}
            rel="noopener noreferrer nofollow"
            className="text-hive-yellow underline hover:text-yellow-300"
          >
            {acc}
          </a>
        );
      }
      case "highlight":
        return (
          <mark className="bg-hive-yellow/20 text-inherit px-0.5 rounded">
            {acc}
          </mark>
        );
      case "superscript":
        return <sup>{acc}</sup>;
      case "subscript":
        return <sub>{acc}</sub>;
      default:
        return acc;
    }
  }, text);
}

function renderTipTapNode(node, idx = 0) {
  if (!node) return null;
  const key = `${node.type}-${idx}`;

  // Text node
  if (node.type === "text") {
    return renderMarks(node.text || "", node.marks);
  }

  // Recursively render children
  const children = node.content?.map((child, i) => renderTipTapNode(child, i));

  switch (node.type) {
    case "doc":
      return <>{children}</>;

    case "paragraph":
      return (
        <p key={key} className="text-slate-200 mb-4 leading-relaxed">
          {children}
        </p>
      );

    case "heading": {
      const level = node.attrs?.level || 2;
      const cls = {
        1: "text-3xl font-bold mb-4 mt-8 leading-tight",
        2: "text-2xl font-semibold mb-3 mt-6 leading-tight",
        3: "text-xl font-semibold mb-2 mt-5 leading-tight",
        4: "text-lg font-semibold mb-2 mt-4 leading-tight",
      };
      const Tag = `h${level}`;
      return (
        <Tag key={key} className={cls[level] || cls[2]}>
          {children}
        </Tag>
      );
    }

    case "bulletList":
      return (
        <ul key={key} className="list-disc list-inside mb-4 space-y-1 text-slate-200">
          {children}
        </ul>
      );

    case "orderedList":
      return (
        <ol key={key} className="list-decimal list-inside mb-4 space-y-1 text-slate-200">
          {children}
        </ol>
      );

    case "listItem":
      return (
        <li key={key} className="leading-relaxed">
          {children}
        </li>
      );

    case "taskList":
      return (
        <ul key={key} className="mb-4 space-y-1 text-slate-200">
          {children}
        </ul>
      );

    case "taskItem": {
      const checked = !!node.attrs?.checked;
      return (
        <li key={key} className="flex items-start gap-2 leading-relaxed list-none">
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              marginTop: 2,
              borderRadius: 4,
              border: `2px solid ${checked ? "#facc15" : "#475569"}`,
              background: checked ? "#facc15" : "transparent",
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            {checked && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 6L5 8.5L9.5 3.5"
                  stroke="#020617"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          <span className={checked ? "line-through text-slate-500" : ""}>
            {children}
          </span>
        </li>
      );
    }

    case "blockquote":
      return (
        <blockquote
          key={key}
          className="border-l-4 border-hive-yellow pl-4 my-4 italic text-slate-300"
        >
          {children}
        </blockquote>
      );

    case "codeBlock":
      return (
        <pre
          key={key}
          className="bg-slate-900 border border-slate-700 rounded-xl p-4 mb-4 overflow-x-auto"
        >
          <code className="text-sm text-slate-200 font-mono">{children}</code>
        </pre>
      );

    case "horizontalRule":
      return <hr key={key} className="border-slate-700 my-6" />;

    case "hardBreak":
      return <br key={key} />;

    case "image":
      return (
        <figure key={key} className="my-6">
          <img
            src={node.attrs?.src}
            alt={node.attrs?.alt || ""}
            title={node.attrs?.title || ""}
            loading="lazy"
            className="w-full rounded-2xl border border-slate-800"
          />
          {node.attrs?.alt && (
            <figcaption className="text-xs text-slate-400 mt-1">
              {node.attrs.alt}
            </figcaption>
          )}
        </figure>
      );

    case "youtube": {
      const rawSrc = node.attrs?.src || "";
      // Convert watch/shorts/youtu.be URLs to embed format
      let embedSrc = rawSrc;
      const ytMatch = rawSrc.match(
        /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      if (ytMatch) {
        embedSrc = `https://www.youtube.com/embed/${ytMatch[1]}`;
      }
      return (
        <div
          key={key}
          className="my-6 aspect-video rounded-2xl overflow-hidden border border-slate-800"
        >
          <iframe
            src={embedSrc}
            title="YouTube video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      );
    }

    // ─── Tables ───
    case "table":
      return (
        <div key={key} className="overflow-x-auto mb-4">
          <table className="w-full border-collapse border border-slate-700 text-sm">
            <tbody>{children}</tbody>
          </table>
        </div>
      );

    case "tableRow":
      return <tr key={key}>{children}</tr>;

    case "tableCell":
      return (
        <td key={key} className="border border-slate-700 px-3 py-2 text-slate-200">
          {children}
        </td>
      );

    case "tableHeader":
      return (
        <th
          key={key}
          className="border border-slate-700 px-3 py-2 bg-slate-800 font-semibold text-slate-100"
        >
          {children}
        </th>
      );

    // ─── Custom blocks ───

    case "calloutBlock": {
      const calloutType = node.attrs?.calloutType || node.attrs?.type || "info";
      const text = node.attrs?.text || "";
      const icons = { info: "💡", tip: "✅", warning: "⚠️", important: "🔴" };
      const colors = {
        info: "border-blue-500/40 bg-blue-500/5",
        tip: "border-green-500/40 bg-green-500/5",
        warning: "border-yellow-500/40 bg-yellow-500/5",
        important: "border-red-500/40 bg-red-500/5",
      };
      return (
        <div
          key={key}
          className={`my-4 p-4 rounded-xl border-l-4 ${colors[calloutType] || colors.info}`}
        >
          <span className="mr-2">{icons[calloutType] || icons.info}</span>
          {text || children}
        </div>
      );
    }

    case "callToAction":
    case "ctaBlock": {
      const a = node.attrs || {};
      const title = a.heading || a.title || "";
      const subtitle = a.subtitle || "";
      const buttonLabel = a.buttonLabel || "Let's talk";
      const href = a.buttonUrl || a.href || "/contact";
      return (
        <div
          key={key}
          className="my-8 p-6 rounded-2xl border border-hive-yellow/40 bg-hive-yellow/5"
        >
          {title && <h3 className="text-xl font-semibold mb-1">{title}</h3>}
          {subtitle && (
            <p className="text-sm text-slate-200 mb-3">{subtitle}</p>
          )}
          <a
            href={href}
            className="inline-flex items-center px-4 py-2 rounded-full bg-hive-yellow text-slate-900 text-sm font-semibold hover:bg-yellow-300 transition-colors"
          >
            {buttonLabel}
          </a>
        </div>
      );
    }

    case "accordionBlock": {
      let items = node.attrs?.items || [];
      if (typeof items === "string") {
        try { items = JSON.parse(items); } catch { items = []; }
      }
      if (!items.length) return null;
      return (
        <div key={key} className="my-6 space-y-2">
          {items.map((item, i) => (
            <details
              key={i}
              className="border border-slate-700 rounded-xl overflow-hidden"
            >
              <summary className="px-4 py-3 cursor-pointer bg-slate-800/50 hover:bg-slate-800 font-medium text-slate-100">
                {item.question}
              </summary>
              <div className="px-4 py-3 text-slate-300 text-sm leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      );
    }

    case "columnLayout":
    case "columnsBlock": {
      const a = node.attrs || {};
      const leftContent = a.leftContent || a.columns?.[0]?.content || "";
      const rightContent = a.rightContent || a.columns?.[1]?.content || "";
      const ratio = a.ratio || a.layout || "50-50";
      const gridCols = {
        "50-50": "grid-cols-2",
        "60-40": "grid-cols-[3fr_2fr]",
        "40-60": "grid-cols-[2fr_3fr]",
        "70-30": "grid-cols-[7fr_3fr]",
        "30-70": "grid-cols-[3fr_7fr]",
        "33-67": "grid-cols-[1fr_2fr]",
        "67-33": "grid-cols-[2fr_1fr]",
        "33-33-33": "grid-cols-3",
      };
      return (
        <div
          key={key}
          className={`my-6 grid gap-4 ${gridCols[ratio] || "grid-cols-2"}`}
        >
          <div className="text-slate-200 text-sm leading-relaxed">
            {leftContent}
          </div>
          <div className="text-slate-200 text-sm leading-relaxed">
            {rightContent}
          </div>
        </div>
      );
    }

    case "galleryBlock": {
      let images = node.attrs?.images || [];
      if (typeof images === "string") {
        try { images = JSON.parse(images); } catch { images = []; }
      }
      const cols = node.attrs?.columns || 3;
      const gridClass = {
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
      };
      return (
        <div
          key={key}
          className={`my-6 grid gap-3 ${gridClass[cols] || "grid-cols-3"}`}
        >
          {images
            .filter((img) => img.url)
            .map((img, i) => (
              <figure key={i}>
                <img
                  src={img.url}
                  alt={img.alt || ""}
                  loading="lazy"
                  className="w-full rounded-xl border border-slate-800 aspect-square object-cover"
                />
                {img.caption && (
                  <figcaption className="text-xs text-slate-400 mt-1">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
        </div>
      );
    }

    case "dividerBlock": {
      const divStyle = node.attrs?.style || "solid";
      const styles = {
        solid: "border-t border-slate-700",
        dashed: "border-t border-dashed border-slate-700",
        dots: "border-t border-dotted border-slate-600",
        gradient:
          "h-px bg-gradient-to-r from-transparent via-slate-500 to-transparent border-0",
        space: "h-8 border-0",
      };
      return (
        <hr
          key={key}
          className={`my-6 ${styles[divStyle] || styles.solid}`}
        />
      );
    }

    // ─── Custom image & video blocks (from editor extensions) ───

    case "imageBlock": {
      const a = node.attrs || {};
      return (
        <figure key={key} className="my-6" data-alignment={a.alignment}>
          <img
            src={a.src}
            alt={a.alt || ""}
            loading="lazy"
            className="w-full rounded-2xl border border-slate-800"
          />
          {a.caption && (
            <figcaption className="text-xs text-slate-400 mt-1">
              {a.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "videoEmbed": {
      const a = node.attrs || {};
      const src = a.src || "";
      // Convert watch URLs to embed
      let embedUrl = src;
      const ytMatch = src.match(
        /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      if (ytMatch) embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
      const vimeoMatch = src.match(/vimeo\.com\/(\d+)/);
      if (vimeoMatch)
        embedUrl = `https://player.vimeo.com/video/${vimeoMatch[1]}`;
      const loomMatch = src.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
      if (loomMatch) embedUrl = `https://www.loom.com/embed/${loomMatch[1]}`;

      if (!embedUrl) return null;
      return (
        <div
          key={key}
          className="my-6 aspect-video rounded-2xl overflow-hidden border border-slate-800"
        >
          <iframe
            src={embedUrl}
            title={a.title || "Video"}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    default:
      // Unknown node type — try rendering children
      return children ? <div key={key}>{children}</div> : null;
  }
}

// ─── FAQ Schema generator for accordion blocks ───────────────────────────
function extractFaqSchema(content) {
  if (!content?.content) return null;
  const faqItems = [];
  for (const node of content.content) {
    if (node.type === "accordionBlock") {
      let items = node.attrs?.items || [];
      if (typeof items === "string") {
        try { items = JSON.parse(items); } catch { items = []; }
      }
      for (const item of items) {
        if (item.question && item.answer) {
          faqItems.push({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          });
        }
      }
    }
  }
  if (faqItems.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };
}

// ─── Main component ──────────────────────────────────────────────────────

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_URL}/api/public/blog/posts/${slug}`);
        if (res.status === 404) {
          setStatus("notfound");
          return;
        }
        if (!res.ok) throw new Error("Error fetching article");
        const data = await res.json();
        setPost(data);
        setStatus("ready");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (status === "loading") {
    return (
      <>
        <SeoHead title="Loading article" description="Loading article…" />
        <section className="pt-4 pb-10 max-w-3xl mx-auto">
          <p className="text-sm text-slate-400">Loading article…</p>
        </section>
      </>
    );
  }

  if (status === "notfound") {
    return (
      <>
        <SeoHead
          title="Article not found"
          description="The article you are looking for could not be found."
        />
        <section className="pt-4 pb-10 max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="text-xs text-slate-400 hover:text-hive-yellow"
          >
            &larr; Back to blog
          </Link>
          <h1 className="text-2xl font-semibold mt-3 mb-2">
            Article not found
          </h1>
          <p className="text-sm text-slate-300 mb-4">
            The article you tried to open does not exist or has been moved.
          </p>
        </section>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <SeoHead
          title="Error loading article"
          description="We could not load this article. Please try again later."
        />
        <section className="pt-4 pb-10 max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="text-xs text-slate-400 hover:text-hive-yellow"
          >
            &larr; Back to blog
          </Link>
          <h1 className="text-2xl font-semibold mt-3 mb-2">
            Error loading article
          </h1>
          <p className="text-sm text-red-400">
            We could not load this article. Please try again later.
          </p>
        </section>
      </>
    );
  }

  if (!post) return null;

  const seoTitle = post.seoTitle || post.title;
  const metaDescription = post.metaDescription || post.excerpt;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: metaDescription,
    url: `https://hivemediastop.com/blog/${slug}`,
    author: {
      "@type": "Organization",
      name: "Hive Media",
      url: "https://hivemediastop.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Hive Media",
      logo: {
        "@type": "ImageObject",
        url: "https://hivemediastop.com/logo-hive.png",
      },
    },
    ...(post.publishedAt && { datePublished: post.publishedAt }),
    ...(post.coverImage && { image: post.coverImage }),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://hivemediastop.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://hivemediastop.com/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `https://hivemediastop.com/blog/${slug}`,
        },
      ],
    },
  };

  // Determine content type and render accordingly
  const isTipTapJSON =
    post.content &&
    typeof post.content === "object" &&
    post.content.type === "doc";

  // Extract FAQ schema from TipTap content (for accordion blocks)
  const faqSchema = isTipTapJSON ? extractFaqSchema(post.content) : null;

  // Legacy: string content split by double newline
  let legacyParagraphs = [];
  if (typeof post.content === "string") {
    legacyParagraphs = post.content.split("\n\n").filter(Boolean);
  }

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={metaDescription}
        ogType="article"
        ogImage={post.ogImage || post.coverImage}
        schema={articleSchema}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <section className="pt-4 pb-10 max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="text-xs text-slate-400 hover:text-hive-yellow"
        >
          &larr; Back to blog
        </Link>
        <h1 className="text-3xl sm:text-4xl font-semibold mt-3 mb-2">
          {post.title}
        </h1>
        <p className="text-xs text-slate-400 mb-4">
          {post.publishedAt && (
            <>
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              <span className="mx-1">&bull;</span>
            </>
          )}
          {post.readingTimeMinutes && (
            <span>{post.readingTimeMinutes} min read</span>
          )}
        </p>
        {post.coverImage && (
          <div className="mb-4">
            <img
              src={post.coverImage}
              alt={post.title}
              loading="lazy"
              className="w-full rounded-2xl border border-slate-800"
            />
          </div>
        )}

        {/* TipTap JSON content */}
        {isTipTapJSON && (
          <div className="prose-blog">{renderTipTapNode(post.content)}</div>
        )}

        {/* Legacy string content */}
        {!isTipTapJSON && legacyParagraphs.length > 0 && (
          <div className="space-y-4 text-sm text-slate-300">
            {legacyParagraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
