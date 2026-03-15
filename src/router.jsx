import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
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
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/industries/:slug" element={<IndustryPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
