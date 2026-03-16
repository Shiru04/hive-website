import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePortalAuth } from "../../hooks/usePortalAuth.js";
import { usePortalConfig } from "../../hooks/usePortalConfig.js";

export default function PortalLogin() {
  const { login } = usePortalAuth();
  const { config } = usePortalConfig();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/portal");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-hive-yellow">Client Portal</h1>
          <p className="text-sm text-slate-400 mt-1">
            {config?.branding?.welcomeMessage || "Sign in to access your support portal"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm text-slate-400 mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-slate-400 mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-hive-yellow px-4 py-2.5 text-sm font-semibold text-slate-950 hover:brightness-110 transition-all disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {config?.allowSelfRegistration && (
            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link to="/portal/register" className="text-hive-yellow hover:underline">
                Register
              </Link>
            </p>
          )}
        </form>

        <div className="mt-8 text-center">
          <Link to="/" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
