import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePortalAuth } from "../../hooks/usePortalAuth.js";
import { useTickets } from "../../hooks/useTickets.js";

export default function PortalDashboard() {
  const { user } = usePortalAuth();
  const { tickets, fetchTickets, loading } = useTickets();

  useEffect(() => { fetchTickets({ page: 1 }); }, [fetchTickets]);

  const openCount = tickets.filter(t => !["resolved", "closed"].includes(t.status)).length;

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">Welcome, {user?.firstName}</h1>
      <p className="text-sm text-slate-400 mb-6">Here's an overview of your support tickets.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-hive-yellow">{openCount}</p>
          <p className="text-xs text-slate-500 mt-1">Open tickets</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-2xl font-bold">{tickets.length}</p>
          <p className="text-xs text-slate-500 mt-1">Total tickets</p>
        </div>
        <Link to="/portal/tickets/new"
          className="bg-hive-yellow/10 border border-hive-yellow/30 rounded-xl p-4 flex items-center justify-center hover:bg-hive-yellow/20 transition-colors"
        >
          <span className="text-sm font-semibold text-hive-yellow">+ New Ticket</span>
        </Link>
      </div>

      <h2 className="text-sm font-semibold text-slate-300 mb-3">Recent Tickets</h2>
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-5 h-5 border-2 border-hive-yellow border-t-transparent rounded-full animate-spin" />
        </div>
      ) : tickets.length === 0 ? (
        <p className="text-sm text-slate-500 py-8 text-center">No tickets yet. Create your first ticket to get support.</p>
      ) : (
        <div className="space-y-2">
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
    </div>
  );
}
