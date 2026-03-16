import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTickets } from "../../hooks/useTickets.js";
import portalClient from "../../api/portalClient.js";

export default function NewTicket() {
  const { createTicket } = useTickets();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    subject: "", category: "", subcategory: "", priority: "medium", description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    portalClient.get("/portal-config/categories")
      .then(({ data }) => {
        setCategories(data);
        if (data.length > 0) setForm(f => ({ ...f, category: data[0].key }));
      })
      .catch(() => {});
  }, []);

  const selectedCategory = categories.find(c => c.key === form.category);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const ticket = await createTicket(form);
      navigate(`/portal/tickets/${ticket._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create ticket");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-6">New Support Ticket</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-sm text-red-400">{error}</div>
        )}

        <div>
          <label className="block text-sm text-slate-400 mb-1">Category</label>
          <select value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value, subcategory: "" }))}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
          >
            {categories.map(c => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>
        </div>

        {selectedCategory?.subcategories?.length > 0 && (
          <div>
            <label className="block text-sm text-slate-400 mb-1">Subcategory</label>
            <select value={form.subcategory}
              onChange={e => setForm(f => ({ ...f, subcategory: e.target.value }))}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
            >
              <option value="">Select...</option>
              {selectedCategory.subcategories.map(s => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm text-slate-400 mb-1">Subject</label>
          <input type="text" required value={form.subject}
            onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
            maxLength={200}
            placeholder="Brief description of your issue"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Priority</label>
          <select value={form.priority}
            onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Description</label>
          <textarea required value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            rows={5}
            placeholder="Describe your issue in detail..."
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow resize-none"
          />
        </div>

        <button type="submit" disabled={loading}
          className="w-full rounded-lg bg-hive-yellow px-4 py-2.5 text-sm font-semibold text-slate-950 hover:brightness-110 disabled:opacity-50 transition-all"
        >
          {loading ? "Creating..." : "Submit Ticket"}
        </button>
      </form>
    </div>
  );
}
