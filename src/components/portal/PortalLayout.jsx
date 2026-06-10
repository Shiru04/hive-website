"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { usePortalAuth } from "../../hooks/usePortalAuth.js";

export default function PortalLayout({ children }) {
  const { user, logout } = usePortalAuth();
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    logout();
    router.push("/portal/login");
  }

  const navItems = [
    { to: "/portal", label: "Dashboard", end: true },
    { to: "/portal/tickets", label: "Tickets" },
    { to: "/portal/invoices", label: "Invoices" },
    { to: "/portal/quotations", label: "Quotations" },
    { to: "/portal/projects", label: "Projects" },
    { to: "/portal/contracts", label: "Contracts" },
    { to: "/portal/account", label: "Account" },
  ];

  function isActive(item) {
    if (item.end) return pathname === item.to;
    return pathname === item.to || pathname?.startsWith(`${item.to}/`);
  }

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <div className="min-h-screen bg-slate-950 text-slate-50">
        {/* Top bar */}
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-sm font-bold text-hive-yellow tracking-tight">
                Hive Media
              </span>
              <nav className="hidden sm:flex items-center gap-1">
                {navItems.map(item => (
                  <Link
                    key={item.to}
                    href={item.to}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      isActive(item)
                        ? "bg-hive-yellow/10 text-hive-yellow font-semibold"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">
                {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={handleLogout}
                className="text-xs text-slate-500 hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
          {/* Mobile nav */}
          <nav className="sm:hidden flex items-center gap-1 px-4 pb-2 overflow-x-auto">
            {navItems.map(item => (
              <Link
                key={item.to}
                href={item.to}
                className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                  isActive(item)
                    ? "bg-hive-yellow/10 text-hive-yellow font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        {/* Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          {children}
        </main>
      </div>
    </>
  );
}
