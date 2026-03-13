import { useState } from "react";
import { Link } from "react-router-dom";
import SeoHead from "../seo/SeoHead.jsx";

export default function SupportLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("idle"); // idle | loading

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    // Portal authentication is handled server-side.
    // This form is the visual entry point; wire up to your auth endpoint.
    setTimeout(() => setStatus("idle"), 2000);
  }

  const inputClass =
    "w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-base text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow transition-colors";

  return (
    <>
      <SeoHead
        title="Hive Client Support"
        description="Portal de soporte para clientes de Hive Media."
        noindex
      />

      {/* Full-screen centered layout */}
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="w-full max-w-sm">
          {/* Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-hive-yellow/5 blur-3xl" />
            </div>

            {/* Logo / Title */}
            <div className="relative mb-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-hive-yellow/30 bg-hive-yellow/10 mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  className="w-6 h-6 text-hive-yellow"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-slate-50">Hive Client Support</h1>
              <p className="text-sm text-slate-400 mt-1">
                Accedé a tu portal de soporte
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="relative space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="tu@empresa.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center rounded-full border border-hive-yellow bg-hive-yellow px-5 py-3 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-110 disabled:opacity-60 transition-all duration-200 mt-2"
              >
                {status === "loading" ? "Ingresando…" : "Access Support Portal"}
              </button>
            </form>

            {/* Request access link */}
            <div className="relative mt-5 text-center">
              <p className="text-sm text-slate-400">
                ¿No tenés acceso?{" "}
                <Link to="/contact" className="text-hive-yellow hover:opacity-90 font-medium">
                  Request access
                </Link>
              </p>
            </div>
          </div>

          {/* Back to home */}
          <p className="mt-4 text-center text-xs text-slate-500">
            <Link to="/" className="hover:text-hive-yellow transition-colors">
              ← Volver al sitio principal
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
