import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { usePortalAuth } from "../../hooks/usePortalAuth.js";
import { useTickets } from "../../hooks/useTickets.js";
import { getPortalDashboard } from "../../api/portalData.js";

function fmtMoney(n, cur = "USD") {
  try { return new Intl.NumberFormat("en-US", { style: "currency", currency: cur }).format(n || 0); }
  catch { return `${cur} ${Number(n || 0).toFixed(2)}`; }
}

function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString();
}

export default function PortalDashboard() {
  const { user } = usePortalAuth();
  const { tickets, fetchTickets, loading: ticketsLoading } = useTickets();
  const [dashboard, setDashboard] = useState(null);
  const [dashLoading, setDashLoading] = useState(true);

  useEffect(() => { fetchTickets({ page: 1 }); }, [fetchTickets]);

  useEffect(() => {
    getPortalDashboard()
      .then(setDashboard)
      .catch(() => {})
      .finally(() => setDashLoading(false));
  }, []);

  const openCount = tickets.filter(t => !["resolved", "closed"].includes(t.status)).length;
  const counts = dashboard?.counts || {};

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">Welcome, {user?.firstName}</h1>
      <p className="text-sm text-slate-400 mb-6">Here's an overview of your account.</p>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-hive-yellow">{openCount}</p>
          <p className="text-xs text-slate-500 mt-1">Open tickets</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-2xl font-bold">{counts.activeProjects ?? "—"}</p>
          <p className="text-xs text-slate-500 mt-1">Active projects</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-2xl font-bold">{counts.pendingInvoices ?? "—"}</p>
          <p className="text-xs text-slate-500 mt-1">Pending invoices</p>
        </div>
        <Link to="/portal/tickets/new"
          className="bg-hive-yellow/10 border border-hive-yellow/30 rounded-xl p-4 flex items-center justify-center hover:bg-hive-yellow/20 transition-colors"
        >
          <span className="text-sm font-semibold text-hive-yellow">+ New Ticket</span>
        </Link>
      </div>

      {/* Recent Tickets */}
      <h2 className="text-sm font-semibold text-slate-300 mb-3">Recent Tickets</h2>
      {ticketsLoading ? (
        <div className="flex justify-center py-8">
          <div className="w-5 h-5 border-2 border-hive-yellow border-t-transparent rounded-full animate-spin" />
        </div>
      ) : tickets.length === 0 ? (
        <p className="text-sm text-slate-500 py-4 text-center">No tickets yet.</p>
      ) : (
        <div className="space-y-2 mb-8">
          {tickets.slice(0, 5).map(ticket => (
            <Link key={ticket._id} to={`/portal/tickets/${ticket._id}`}
              className="block bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{ticket.subject}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{ticket.ticketNumber} · {ticket.category}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                  ticket.status === "open" ? "bg-blue-500/15 text-blue-400"
                  : ticket.status === "in_progress" ? "bg-yellow-500/15 text-yellow-400"
                  : ticket.status === "awaiting_client" ? "bg-orange-500/15 text-orange-400"
                  : ticket.status === "resolved" ? "bg-green-500/15 text-green-400"
                  : "bg-slate-700 text-slate-400"
                }`}>
                  {ticket.status.replace(/_/g, " ")}
                </span>
              </div>
            </Link>
          ))}
          {tickets.length > 5 && (
            <Link to="/portal/tickets" className="block text-center text-xs text-hive-yellow py-2 hover:underline">
              View all tickets →
            </Link>
          )}
        </div>
      )}

      {/* Recent Invoices */}
      {dashboard?.recentInvoices?.length > 0 && (
        <>
          <h2 className="text-sm font-semibold text-slate-300 mb-3">Recent Invoices</h2>
          <div className="space-y-2 mb-8">
            {dashboard.recentInvoices.slice(0, 3).map(inv => (
              <div key={inv._id} className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{inv.number}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{fmtDate(inv.issueDate)}</p>
                  </div>
                  <span className="text-sm font-semibold">{fmtMoney(inv.total, inv.currency)}</span>
                </div>
              </div>
            ))}
            <Link to="/portal/invoices" className="block text-center text-xs text-hive-yellow py-2 hover:underline">
              View all invoices →
            </Link>
          </div>
        </>
      )}

      {/* Recent Projects */}
      {dashboard?.recentProjects?.length > 0 && (
        <>
          <h2 className="text-sm font-semibold text-slate-300 mb-3">Active Projects</h2>
          <div className="space-y-2">
            {dashboard.recentProjects.slice(0, 3).map(p => (
              <div key={p._id} className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                    p.status === "in_progress" ? "bg-blue-500/15 text-blue-400"
                    : p.status === "completed" ? "bg-green-500/15 text-green-400"
                    : "bg-slate-700 text-slate-400"
                  }`}>
                    {p.status?.replace(/_/g, " ")}
                  </span>
                </div>
              </div>
            ))}
            <Link to="/portal/projects" className="block text-center text-xs text-hive-yellow py-2 hover:underline">
              View all projects →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
