"use client";

import { useEffect, useRef, useState } from "react";

const NUM_RE = /(\d+(?:[.,]\d+)?)/;

/**
 * Counts a numeric stat up from 0 when it enters the viewport.
 * Non-numeric values render unchanged. SSR renders the final value, so
 * SEO and no-JS users always see the real number.
 */
export default function CountUp({ value, duration = 1400, className = "" }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = typeof value === "string" ? value.match(NUM_RE) : null;
    const el = ref.current;
    if (!match || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = parseFloat(match[1].replace(",", "."));
    const decimals = /[.,]/.test(match[1]) ? 1 : 0;
    const prefix = value.slice(0, match.index);
    const suffix = value.slice(match.index + match[1].length);

    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(prefix + (target * eased).toFixed(decimals) + suffix);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {display}
    </span>
  );
}
