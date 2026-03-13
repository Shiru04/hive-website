import { useEffect, useRef } from "react";

export default function ServiceCard({
  title,
  subtitle,
  description,
  bullets,
  icon,
  ctaLabel,
  ctaHref,
}) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="scroll-reveal">
      <article className="group h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-5 card-hover transition-colors duration-300 shadow-sm cursor-default">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-hive-yellow/10 flex items-center justify-center mb-3 text-hive-yellow group-hover:bg-hive-yellow/20 transition-colors duration-300">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-slate-50 mb-1">{title}</h3>
        {subtitle && (
          <p className="text-sm text-hive-yellow mb-2">{subtitle}</p>
        )}
        <p className="text-sm text-slate-300 mb-3">{description}</p>
        {bullets && bullets.length > 0 && (
          <ul className="text-sm text-slate-400 space-y-1 mb-3">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-hive-yellow mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        )}
        {ctaLabel && ctaHref && (
          <a
            href={ctaHref}
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-950 bg-hive-yellow px-4 py-1.5 rounded-full hover:brightness-110 transition-all duration-200 mt-1 no-underline"
          >
            {ctaLabel} →
          </a>
        )}
      </article>
    </div>
  );
}
