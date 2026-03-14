import { useState, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_HUB_URL || "http://localhost:5000";
const STORAGE_KEY = "hive_chat_conversation_id";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(
    () => localStorage.getItem(STORAGE_KEY)
  );
  const [status, setStatus] = useState("idle");
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const connect = useCallback(() => {
    if (socketRef.current?.connected) return;

    const socket = io(`${SOCKET_URL}/chat/visitor`, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10,
    });

    socket.on("connect", () => {
      setIsConnected(true);
      setStatus("connecting");

      const savedId = localStorage.getItem(STORAGE_KEY);
      if (savedId) {
        socket.emit("chat:reconnect", { conversationId: savedId });
      }
    });

    socket.on("disconnect", () => setIsConnected(false));

    socket.on("chat:started", ({ conversationId: id, messages: msgs }) => {
      setConversationId(id);
      setMessages(msgs);
      setStatus("active");
      localStorage.setItem(STORAGE_KEY, id);
    });

    socket.on("chat:reconnected", ({ conversationId: id, messages: msgs, status: s }) => {
      setConversationId(id);
      setMessages(msgs);
      setStatus(s === "closed" ? "closed" : "active");
    });

    socket.on("chat:message", ({ message }) => {
      setMessages(prev => [...prev, message]);
      setIsTyping(false);
    });

    socket.on("chat:agent_typing", () => {
      setIsTyping(true);
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 3000);
    });

    socket.on("chat:agent_joined", () => {
      // Optional: show notification
    });

    socket.on("chat:closed", ({ message }) => {
      setStatus("closed");
      setMessages(prev => [...prev, {
        _id: Date.now(),
        from: "agent",
        text: message,
        createdAt: new Date().toISOString(),
      }]);
      localStorage.removeItem(STORAGE_KEY);
    });

    socket.on("chat:error", ({ message }) => {
      console.error("[Chat]", message);
      if (message === "Conversation not found or closed") {
        localStorage.removeItem(STORAGE_KEY);
        setStatus("idle");
        setConversationId(null);
      }
    });

    socketRef.current = socket;
  }, []);

  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const startChat = useCallback((data = {}) => {
    connect();
    const tryStart = () => {
      if (socketRef.current?.connected) {
        socketRef.current.emit("chat:start", {
          name: data.name || "Visitor",
          email: data.email,
          phone: data.phone,
          page: window.location.pathname,
          source: "website",
        });
      } else {
        setTimeout(tryStart, 200);
      }
    };
    tryStart();
  }, [connect]);

  const sendMessage = useCallback((text) => {
    if (!text?.trim() || !conversationId || !socketRef.current?.connected) return;
    socketRef.current.emit("chat:message", { conversationId, text });
    setMessages(prev => [...prev, {
      _id: `temp-${Date.now()}`,
      from: "visitor",
      text,
      createdAt: new Date().toISOString(),
    }]);
  }, [conversationId]);

  const emitTyping = useCallback(() => {
    if (!conversationId || !socketRef.current?.connected) return;
    socketRef.current.emit("chat:typing", { conversationId });
  }, [conversationId]);

  const resetChat = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setConversationId(null);
    setMessages([]);
    setStatus("idle");
  }, []);

  return {
    messages,
    isConnected,
    isTyping,
    status,
    conversationId,
    startChat,
    sendMessage,
    emitTyping,
    resetChat,
    connect,
  };
}
