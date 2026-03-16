import { createContext, useState, useEffect, useCallback } from "react";
import portalClient from "../api/portalClient.js";

export const PortalAuthContext = createContext(null);

export function PortalAuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("portal_user")); }
    catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem("portal_token"));
  const [loading, setLoading] = useState(true);
  const [branding, setBranding] = useState(null);

  const isAuthenticated = !!token && !!user;

  const login = useCallback(async (email, password) => {
    const { data } = await portalClient.post("/portal/auth/login", { email, password });
    localStorage.setItem("portal_token", data.token);
    localStorage.setItem("portal_user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("portal_token");
    localStorage.removeItem("portal_user");
    setToken(null);
    setUser(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const { data } = await portalClient.get("/portal/auth/me");
      setUser(data.user);
      setBranding(data.branding);
      localStorage.setItem("portal_user", JSON.stringify(data.user));
    } catch {
      logout();
    }
  }, [logout]);

  useEffect(() => {
    if (token) {
      refreshProfile().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PortalAuthContext.Provider value={{ user, token, loading, isAuthenticated, branding, login, logout, refreshProfile }}>
      {children}
    </PortalAuthContext.Provider>
  );
}
