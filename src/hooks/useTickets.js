import { useState, useCallback } from "react";
import portalClient from "../api/portalClient.js";

export function useTickets() {
  const [tickets, setTickets] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20 });
  const [loading, setLoading] = useState(false);

  const fetchTickets = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status) params.set("status", filters.status);
      if (filters.page) params.set("page", filters.page);
      const { data } = await portalClient.get(`/tickets/mine?${params}`);
      setTickets(data.tickets);
      setPagination({ total: data.total, page: data.page, limit: data.limit });
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTicket = useCallback(async (ticketData) => {
    const { data } = await portalClient.post("/tickets", ticketData);
    return data;
  }, []);

  const getTicket = useCallback(async (id) => {
    const { data } = await portalClient.get(`/tickets/${id}`);
    return data;
  }, []);

  const addMessage = useCallback(async (ticketId, text) => {
    const { data } = await portalClient.post(`/tickets/${ticketId}/messages`, { text });
    return data;
  }, []);

  const markRead = useCallback(async (ticketId) => {
    await portalClient.put(`/tickets/${ticketId}/messages/read`);
  }, []);

  return { tickets, pagination, loading, fetchTickets, createTicket, getTicket, addMessage, markRead };
}
