import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-slate-500">
        <p>
          © {year} Hive Media. All rights reserved. Built with React, Vite and
          Tailwind.
        </p>
        <div className="flex gap-4">
          <Link to="/services" className="hover:text-hive-yellow">
            Services
          </Link>
          <Link to="/about" className="hover:text-hive-yellow">
            About
          </Link>
          <Link to="/blog" className="hover:text-hive-yellow">
            Blog
          </Link>
          <Link to="/contact" className="hover:text-hive-yellow">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
