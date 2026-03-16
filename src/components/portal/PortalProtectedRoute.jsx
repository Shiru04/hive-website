import { Navigate } from "react-router-dom";
import { usePortalAuth } from "../../hooks/usePortalAuth.js";

export default function PortalProtectedRoute({ children }) {
  const { isAuthenticated, loading } = usePortalAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="w-6 h-6 border-2 border-hive-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/portal/login" replace />;
  return children;
}
