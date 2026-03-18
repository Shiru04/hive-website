import { useState, useEffect, useCallback } from "react";
import { getPortalContracts } from "../../api/portalData.js";

const STATUS_STYLES = {
  draft:     "bg-slate-700 text-slate-300",
  active:    "bg-green-500/15 text-green-400",
  expired:   "bg-red-500/15 text-red-400",
  cancelled: "bg-red-500/15 text-red-400",
};

function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString();
}

function fmtMoney(n, cur = "USD") {
  try { return new Intl.NumberFormat("en-US", { style: "currency", currency: cur }).format(n || 0); }
  catch { return `${cur} ${Number(n || 0).toFixed(2)}`; }
}

export default function PortalContracts() {
  const [contracts, setContracts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const limit = 20;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPortalContracts({ page, limit, status: status || undefined });
      setContracts(data.contracts || []);
      setTotal(data.total || 0);
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, [page, status]);

  useEffect(() => { load(); }, [load]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Contracts</h1>
        <select
          value={status}
          onChange={e => { setStatus(e.target.value); setPage(1); }}
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-50 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
        >
          <option value="">All</option>
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-5 h-5 border-2 border-hive-yellow border-t-transparent rounded-full animate-spin" />
        </div>
      ) : contracts.length === 0 ? (
        <p className="text-sm text-slate-500 py-12 text-center">No contracts found.</p>
      ) : (
        <div className="space-y-2">
          {contracts.map(c => (
            <div key={c._id} className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{c.title || c.number}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {fmtDate(c.startDate)} — {fmtDate(c.endDate)}
                    {c.billingCycle && ` · ${c.billingCycle}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-semibold">{fmtMoney(c.value, c.currency)}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[c.status] || "bg-slate-700 text-slate-400"}`}>
                    {c.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
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
