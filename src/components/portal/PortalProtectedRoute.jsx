"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePortalAuth } from "../../hooks/usePortalAuth.js";

export default function PortalProtectedRoute({ children }) {
  const { isAuthenticated, loading } = usePortalAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/portal/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="w-6 h-6 border-2 border-hive-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return children;
}
