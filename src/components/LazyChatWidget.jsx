"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("./ChatWidget.jsx"), { ssr: false });

/**
 * Defers loading the chat widget (and socket.io-client with it) until the
 * browser is idle, keeping it out of the critical rendering path. If the
 * user clicks a "chat" link before that, it loads immediately and re-fires
 * the open-chat event once the widget is mounted.
 */
export default function LazyChatWidget() {
  const [load, setLoad] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(false);

  useEffect(() => {
    const loadNow = () => setLoad(true);
    const openRequested = () => {
      setPendingOpen(true);
      setLoad(true);
    };

    window.addEventListener("open-chat", openRequested);
    if ("requestIdleCallback" in window) {
      requestIdleCallback(loadNow, { timeout: 4000 });
    } else {
      setTimeout(loadNow, 3000);
    }
    return () => window.removeEventListener("open-chat", openRequested);
  }, []);

  useEffect(() => {
    if (load && pendingOpen) {
      // Give the widget a tick to mount and attach its own listener.
      const t = setTimeout(() => window.dispatchEvent(new Event("open-chat")), 300);
      return () => clearTimeout(t);
    }
  }, [load, pendingOpen]);

  if (!load) return null;
  return <ChatWidget />;
}
