import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import i18n from "./i18n.js";
import Home from "./pages/Home.jsx";

const Services = lazy(() => import("./pages/Services.jsx"));
const ServicePage = lazy(() => import("./pages/ServicePage.jsx"));
const Industries = lazy(() => import("./pages/Industries.jsx"));
const IndustryPage = lazy(() => import("./pages/IndustryPage.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const SUPPORTED_LANGS = ["en", "es", "de"];

function LanguageWrapper() {
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!SUPPORTED_LANGS.includes(lang)) {
      const restPath = location.pathname.replace(/^\/[^/]*/, "") || "";
      navigate(`/en${restPath}`, { replace: true });
      return;
    }
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, location.pathname]);

  if (!SUPPORTED_LANGS.includes(lang)) return null;
  return <Outlet />;
}

function Fallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-hive-yellow border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        {/* Redirect bare root to /en */}
        <Route path="/" element={<Navigate to="/en" replace />} />

        {/* All marketing pages live under /:lang */}
        <Route path="/:lang" element={<LanguageWrapper />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServicePage />} />
          <Route path="industries" element={<Industries />} />
          <Route path="industries/:slug" element={<IndustryPage />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Fallback: redirect unknown top-level paths to /en */}
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </Suspense>
  );
}
