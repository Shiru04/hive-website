import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import LogoHive from "../assets/logo-hive.png";

const navLinkClasses =
  "text-base font-medium transition hover:text-hive-yellow px-3 py-2";
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
    <header className="fixed top-0 inset-x-0 z-40 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <nav className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" onClick={close} className="flex items-center">
          <img
            src={LogoHive}
            alt="Hive Media logo"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={close}
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? navLinkActive : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={close}
            className="ml-2 inline-flex items-center rounded-full border border-hive-yellow bg-hive-yellow px-4 py-1.5 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-105"
          >
            Get a strategy call
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md border border-slate-700 p-1.5 text-slate-200"
          onClick={toggle}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className="sr-only">Open main menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-slate-200"></span>
            <span className="block h-0.5 w-5 bg-slate-200"></span>
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950">
          <div className="max-w-[1500px] mx-auto px-4 py-3 flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={close}
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
              className="mt-2 inline-flex justify-center rounded-full border border-hive-yellow bg-hive-yellow px-4 py-2 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-105"
            >
              Get a strategy call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
