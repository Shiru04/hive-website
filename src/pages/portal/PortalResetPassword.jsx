import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import portalClient from "../../api/portalClient.js";

export default function PortalResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">Invalid or missing reset link.</p>
          <Link to="/portal/login" className="text-hive-yellow text-sm mt-2 inline-block">
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match"); return; }
    setError("");
    setLoading(true);
    try {
      const { data } = await portalClient.post("/portal/auth/reset-password", { token, password });
      localStorage.setItem("portal_token", data.token);
      navigate("/portal");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-hive-yellow">New Password</h1>
          <p className="text-sm text-slate-400 mt-1">Enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-slate-400 mb-1">New password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Confirm password</label>
            <input
              type="password"
              required
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-hive-yellow px-4 py-2.5 text-sm font-semibold text-slate-950 hover:brightness-110 disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/portal/login" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
            &larr; Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
