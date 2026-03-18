import { useState, useEffect, useCallback } from "react";
import { getPortalProjects } from "../../api/portalData.js";

const STATUS_STYLES = {
  planning:    "bg-slate-700 text-slate-300",
  in_progress: "bg-blue-500/15 text-blue-400",
  on_hold:     "bg-yellow-500/15 text-yellow-400",
  completed:   "bg-green-500/15 text-green-400",
  cancelled:   "bg-red-500/15 text-red-400",
};

export default function PortalProjects() {
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const limit = 20;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPortalProjects({ page, limit, status: status || undefined });
      setProjects(data.projects || []);
      setTotal(data.total || 0);
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, [page, status]);

  useEffect(() => { load(); }, [load]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Projects</h1>
        <select
          value={status}
          onChange={e => { setStatus(e.target.value); setPage(1); }}
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-50 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
        >
          <option value="">All</option>
          <option value="planning">Planning</option>
          <option value="in_progress">In Progress</option>
          <option value="on_hold">On Hold</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-5 h-5 border-2 border-hive-yellow border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <p className="text-sm text-slate-500 py-12 text-center">No projects found.</p>
      ) : (
        <div className="space-y-2">
          {projects.map(p => {
            const done = p.taskStats?.completed || 0;
            const totalTasks = p.taskStats?.total || 0;
            const pct = totalTasks > 0 ? Math.round((done / totalTasks) * 100) : 0;

            return (
              <div key={p._id} className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    {p.description && (
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{p.description}</p>
                    )}
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${STATUS_STYLES[p.status] || "bg-slate-700 text-slate-400"}`}>
                    {p.status?.replace(/_/g, " ")}
                  </span>
                </div>
                {totalTasks > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-hive-yellow rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-500 shrink-0">{done}/{totalTasks} tasks</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
            className="px-3 py-1 text-xs rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-30"
          >Prev</button>
          <span className="text-xs text-slate-500">{page} / {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}
            className="px-3 py-1 text-xs rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-30"
          >Next</button>
        </div>
      )}
    </div>
  );
}
