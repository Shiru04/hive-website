import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTickets } from "../../hooks/useTickets.js";

const STATUSES = ["all", "open", "in_progress", "awaiting_client", "resolved", "closed"];

export default function TicketsList() {
  const { tickets, pagination, loading, fetchTickets } = useTickets();
  const [status, setStatus] = useState("all");

  useEffect(() => { fetchTickets({ status: status === "all" ? undefined : status }); }, [status, fetchTickets]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">My Tickets</h1>
        <Link to="/portal/tickets/new"
          className="rounded-lg bg-hive-yellow px-4 py-2 text-sm font-semibold text-slate-950 hover:brightness-110 transition-all"
        >
          New Ticket
        </Link>
      </div>

      <div className="flex gap-1.5 mb-4 flex-wrap">
        {STATUSES.map(s => (
          <button key={s} onClick={() => setStatus(s)}
            className={`px-3 py-1 rounded-full text-xs transition-colors ${
              status === s
                ? "bg-hive-yellow/15 text-hive-yellow font-semibold"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {s === "all" ? "All" : s.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-5 h-5 border-2 border-hive-yellow border-t-transparent rounded-full animate-spin" />
        </div>
      ) : tickets.length === 0 ? (
        <p className="text-sm text-slate-500 py-12 text-center">No tickets found.</p>
      ) : (
        <div className="space-y-2">
          {tickets.map(ticket => (
            <Link key={ticket._id} to={`/portal/tickets/${ticket._id}`}
              className="block bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{ticket.subject}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {ticket.ticketNumber} · {ticket.category} · {ticket.priority}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    ticket.status === "open" ? "bg-blue-500/15 text-blue-400"
                    : ticket.status === "in_progress" ? "bg-yellow-500/15 text-yellow-400"
                    : ticket.status === "awaiting_client" ? "bg-orange-500/15 text-orange-400"
                    : ticket.status === "resolved" ? "bg-green-500/15 text-green-400"
                    : "bg-slate-700 text-slate-400"
                  }`}>
                    {ticket.status.replace(/_/g, " ")}
                  </span>
                  {ticket.unreadCount > 0 && (
                    <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                      {ticket.unreadCount} new
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {pagination.total > pagination.limit && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: Math.ceil(pagination.total / pagination.limit) }, (_, i) => (
            <button key={i} onClick={() => fetchTickets({ status: status === "all" ? undefined : status, page: i + 1 })}
              className={`w-8 h-8 rounded-lg text-xs ${
                pagination.page === i + 1
                  ? "bg-hive-yellow text-slate-950 font-bold"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
