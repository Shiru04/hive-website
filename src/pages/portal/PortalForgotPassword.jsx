import { useState } from "react";
import { Link } from "react-router-dom";
import portalClient from "../../api/portalClient.js";

export default function PortalForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await portalClient.post("/portal/auth/forgot-password", { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-hive-yellow">Reset Password</h1>
          <p className="text-sm text-slate-400 mt-1">
            {sent
              ? "Check your inbox for the reset link"
              : "Enter your email to receive a reset link"
            }
          </p>
        </div>

        {sent ? (
          <div className="space-y-4">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-3 text-sm text-emerald-400">
              If an account exists with that email, we've sent a password reset link. Please check your inbox.
            </div>
            <Link
              to="/portal/login"
              className="block w-full text-center rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Back to login
            </Link>
          </div>
        ) : (
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

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-hive-yellow px-4 py-2.5 text-sm font-semibold text-slate-950 hover:brightness-110 transition-all disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="text-center text-sm text-slate-500">
              <Link to="/portal/login" className="text-hive-yellow hover:underline">
                Back to login
              </Link>
            </p>
          </form>
        )}

        <div className="mt-8 text-center">
          <Link to="/" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
            &larr; Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
