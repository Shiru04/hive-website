import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function usePortalConfig() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await axios.get(`${API_URL}/portal/config/public`);
        setConfig(data);
      } catch {
        setConfig(null);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return { config, loading };
}
