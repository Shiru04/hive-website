import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useTickets } from "../../hooks/useTickets.js";
import { usePortalAuth } from "../../hooks/usePortalAuth.js";

export default function TicketDetail() {
  const { id } = useParams();
  const { getTicket, addMessage, markRead } = useTickets();
  const { user } = usePortalAuth();
  const [ticket, setTicket] = useState(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  async function loadTicket() {
    try {
      const data = await getTicket(id);
      setTicket(data);
      await markRead(id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadTicket(); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket?.messages]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || sending) return;
    setSending(true);
    try {
      await addMessage(id, input.trim());
      setInput("");
      await loadTicket();
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-5 h-5 border-2 border-hive-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!ticket) {
    return <p className="text-slate-400 text-center py-12">Ticket not found.</p>;
  }

  const isClosed = ticket.status === "closed";

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/portal/tickets" className="text-xs text-slate-500 hover:text-slate-300 mb-4 inline-block">
        ← Back to tickets
      </Link>

      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold">{ticket.subject}</h1>
            <p className="text-xs text-slate-500 mt-1">
              {ticket.ticketNumber} · {ticket.category} · Priority: {ticket.priority}
            </p>
          </div>
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${
            ticket.status === "open" ? "bg-blue-500/15 text-blue-400"
            : ticket.status === "in_progress" ? "bg-yellow-500/15 text-yellow-400"
            : ticket.status === "awaiting_client" ? "bg-orange-500/15 text-orange-400"
            : ticket.status === "resolved" ? "bg-green-500/15 text-green-400"
            : "bg-slate-700 text-slate-400"
          }`}>
            {ticket.status.replace(/_/g, " ")}
          </span>
        </div>
        {ticket.assignedTo && (
          <p className="text-xs text-slate-500 mt-2">
            Assigned to: {ticket.assignedTo.firstName} {ticket.assignedTo.lastName}
          </p>
        )}
      </div>

      {/* Messages */}
      <div className="space-y-3 mb-4">
        {ticket.messages.map((msg, i) => {
          const isMe = msg.author === user?.id || msg.author?._id === user?.id;
          return (
            <div key={msg._id || i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                isMe
                  ? "bg-hive-yellow/15 border border-hive-yellow/30 rounded-br-sm"
                  : "bg-slate-800 border border-slate-700 rounded-bl-sm"
              }`}>
                <p className="text-[10px] text-slate-500 mb-1">{msg.authorName}</p>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                <p className="text-[10px] text-slate-600 mt-1">
                  {new Date(msg.createdAt).toLocaleString(undefined, {
                    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {!isClosed ? (
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
          />
          <button type="submit" disabled={!input.trim() || sending}
            className="rounded-lg bg-hive-yellow px-5 py-2.5 text-sm font-semibold text-slate-950 hover:brightness-110 disabled:opacity-40 transition-all"
          >
            Send
          </button>
        </form>
      ) : (
        <p className="text-center text-sm text-slate-500 py-3">This ticket is closed.</p>
      )}
    </div>
  );
}
