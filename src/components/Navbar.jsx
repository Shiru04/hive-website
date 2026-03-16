import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import LogoHive from "../assets/logo-hive.webp";

const navLinkClasses =
  "text-base font-medium transition-colors hover:text-hive-yellow px-3 py-2 rounded-lg";
const navLinkActive = "text-hive-yellow";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60">
      <nav className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" onClick={close} className="flex items-center">
          <img
            src={LogoHive}
            alt="Hive Media logo"
            className="h-10 md:h-12 w-auto object-contain"
            width="132"
            height="60"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={close}
              end={link.to === "/"}
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? navLinkActive : "text-slate-300"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={close}
            className="group ml-3 inline-flex items-center gap-2 rounded-full border border-hive-yellow bg-hive-yellow px-5 py-2 text-sm font-semibold text-slate-950 shadow-hive-glow hover:brightness-105 transition-all"
          >
            Get a strategy call
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-700 p-2 text-slate-200 hover:border-slate-500 transition-colors"
          onClick={toggle}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl">
          <div className="max-w-[1500px] mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={close}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `block ${navLinkClasses} ${
                    isActive ? navLinkActive : "text-slate-200"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={close}
              className="mt-3 inline-flex justify-center rounded-full border border-hive-yellow bg-hive-yellow px-4 py-2.5 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-105"
            >
              Get a strategy call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
