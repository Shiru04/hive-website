import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-400">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {i > 0 && (
                <svg className="w-3 h-3 text-slate-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              )}
              {isLast ? (
                <span className="text-slate-300">{item.label}</span>
              ) : (
                <Link to={item.to} className="hover:text-hive-yellow transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
