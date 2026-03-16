import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import portalClient from "../../api/portalClient.js";
import { usePortalConfig } from "../../hooks/usePortalConfig.js";

const PUBLIC_COMPANY_ID = import.meta.env.VITE_PUBLIC_COMPANY_ID || "";

export default function PortalRegister() {
  const { config } = usePortalConfig();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (config && !config.allowSelfRegistration) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-slate-400">Registration is not available.</p>
          <Link to="/portal/login" className="text-hive-yellow text-sm mt-2 inline-block">Back to login</Link>
        </div>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await portalClient.post("/portal/auth/register", {
        ...form,
        companyId: PUBLIC_COMPANY_ID,
      });
      localStorage.setItem("portal_token", data.token);
      localStorage.setItem("portal_user", JSON.stringify(data.user));
      navigate("/portal");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-hive-yellow">Create Account</h1>
          <p className="text-sm text-slate-400 mt-1">Register for the client portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-400 mb-1">First name</label>
              <input type="text" required value={form.firstName}
                onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Last name</label>
              <input type="text" required value={form.lastName}
                onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <input type="email" required value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Password</label>
            <input type="password" required value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
            />
            <p className="text-xs text-slate-600 mt-1">Min 8 chars, uppercase, lowercase, number, special char</p>
          </div>

          <button type="submit" disabled={loading}
            className="w-full rounded-lg bg-hive-yellow px-4 py-2.5 text-sm font-semibold text-slate-950 hover:brightness-110 transition-all disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/portal/login" className="text-hive-yellow hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
