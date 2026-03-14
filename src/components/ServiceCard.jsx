import { Link } from "react-router-dom";

export default function ServiceCard({ title, subtitle, description, bullets }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-hive-yellow/60 hover:shadow-lg hover:shadow-hive-yellow/5 transition-all shadow-sm flex flex-col">
      <h3 className="text-lg font-semibold text-slate-50 mb-1">{title}</h3>
      {subtitle && (
        <p className="text-sm text-hive-yellow mb-2">{subtitle}</p>
      )}
      <p className="text-sm text-slate-300 mb-3">{description}</p>
      {bullets && bullets.length > 0 && (
        <ul className="text-sm text-slate-400 space-y-1 mb-4">
          {bullets.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      )}
      <div className="mt-auto pt-2">
        <Link
          to="/contact"
          className="text-sm font-medium text-hive-yellow hover:underline"
        >
          Get a quote →
        </Link>
      </div>
    </article>
  );
}
