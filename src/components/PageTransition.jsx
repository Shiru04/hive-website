import { unstable_ViewTransition as ViewTransition } from "react";

/**
 * Page-level view transition: quick fade-out, gentle fade+rise in.
 * Lateral navigation (top-nav pages), so no directional slides.
 * Animation CSS lives in src/styles/index.css (.page-enter / .page-exit).
 */
export default function PageTransition({ children }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
