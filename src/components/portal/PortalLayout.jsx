import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { usePortalAuth } from "../../hooks/usePortalAuth.js";

export default function PortalLayout() {
  const { user, logout } = usePortalAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/portal/login");
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
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-hive-yellow/10 text-hive-yellow font-semibold"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
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
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-hive-yellow/10 text-hive-yellow font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        {/* Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <Outlet />
        </main>
      </div>
    </>
  );
}
