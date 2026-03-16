import { useState } from "react";
import { usePortalAuth } from "../../hooks/usePortalAuth.js";
import portalClient from "../../api/portalClient.js";

export default function PortalAccount() {
  const { user } = usePortalAuth();
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleChangePw(e) {
    e.preventDefault();
    setError(""); setMessage("");
    setLoading(true);
    try {
      const { data } = await portalClient.put("/portal/auth/password", {
        currentPassword: currentPw, newPassword: newPw,
      });
      localStorage.setItem("portal_token", data.token);
      setMessage("Password changed successfully.");
      setCurrentPw(""); setNewPw("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-6">Account</h1>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6">
        <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
        <p className="text-xs text-slate-500 mt-0.5">{user?.email}</p>
      </div>

      <h2 className="text-sm font-semibold text-slate-300 mb-3">Change Password</h2>
      <form onSubmit={handleChangePw} className="space-y-3">
        {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-sm text-red-400">{error}</div>}
        {message && <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2 text-sm text-green-400">{message}</div>}

        <input type="password" placeholder="Current password" required value={currentPw}
          onChange={e => setCurrentPw(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
        />
        <input type="password" placeholder="New password" required value={newPw}
          onChange={e => setNewPw(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
        />
        <button type="submit" disabled={loading}
          className="w-full rounded-lg bg-hive-yellow px-4 py-2.5 text-sm font-semibold text-slate-950 hover:brightness-110 disabled:opacity-50"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
