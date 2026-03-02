import { useEffect } from "react";
import { Link } from "react-router-dom";
import SeoHead from "../seo/SeoHead.jsx";

function upsertMeta(attr, key, value) {
  let meta = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", value);
}

export default function NotFound() {
  useEffect(() => {
    upsertMeta("name", "robots", "noindex, nofollow");
    return () => {
      const el = document.head.querySelector('meta[name="robots"]');
      if (el) el.remove();
    };
  }, []);

  return (
    <>
      <SeoHead
        title="Page Not Found"
        description="The page you are looking for does not exist. Browse Hive Media's services, blog or contact us."
      />
      <section className="pt-10 pb-16 max-w-2xl mx-auto text-center">
        <p className="text-6xl font-bold text-hive-yellow mb-4">404</p>
        <h1 className="text-2xl sm:text-3xl font-semibold mb-3">
          Page not found
        </h1>
        <p className="text-base text-slate-300 mb-8">
          The page you were looking for doesn't exist or has been moved.
          Here are some links that might help:
        </p>
        <nav className="flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-hive-yellow bg-hive-yellow px-5 py-2.5 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-105"
          >
            Go to Home
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-5 py-2.5 text-base font-medium text-slate-100 hover:border-hive-yellow/70"
          >
            Our Services
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-5 py-2.5 text-base font-medium text-slate-100 hover:border-hive-yellow/70"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-5 py-2.5 text-base font-medium text-slate-100 hover:border-hive-yellow/70"
          >
            Contact Us
          </Link>
        </nav>
      </section>
    </>
  );
}
