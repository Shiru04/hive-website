import { useState, useRef, useEffect } from "react";
import { useChat } from "../hooks/useChat.js";

/* ------------------------------------------------------------------ */
/* Inline SVG icons                                                    */
/* ------------------------------------------------------------------ */

function ChatIcon({ className = "w-6 h-6" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
      <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
    </svg>
  );
}

function CloseIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
  );
}

function SendIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Typing indicator                                                    */
/* ------------------------------------------------------------------ */

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2" aria-live="polite" aria-label="Agent is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Message bubble                                                      */
/* ------------------------------------------------------------------ */

function MessageBubble({ message }) {
  const isVisitor = message.from === "visitor";
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${isVisitor ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
          isVisitor
            ? "bg-hive-yellow text-slate-950 rounded-br-sm"
            : "bg-slate-800 text-slate-100 rounded-bl-sm"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
        <p
          className={`mt-1 text-[10px] leading-none ${
            isVisitor ? "text-slate-700" : "text-slate-500"
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Intro form (idle state)                                             */
/* ------------------------------------------------------------------ */

function IntroForm({ onStart }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onStart({ name: name.trim() || "Visitor" });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4">
      <p className="text-sm text-slate-300">
        Hi there! Enter your name to start a conversation with our team.
      </p>

      <label htmlFor="chat-name" className="sr-only">Your name</label>
      <input
        id="chat-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        autoFocus
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
      />

      <button
        type="submit"
        className="rounded-full border border-hive-yellow bg-hive-yellow px-4 py-2 text-sm font-semibold text-slate-950 hover:brightness-105 transition-all"
      >
        Start chat
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Main ChatWidget                                                     */
/* ------------------------------------------------------------------ */

export default function ChatWidget() {
  const {
    messages,
    isTyping,
    status,
    startChat,
    sendMessage,
    emitTyping,
    resetChat,
  } = useChat();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  /* Auto-scroll on new messages */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* Track unread when widget is closed */
  useEffect(() => {
    if (!open && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.from === "agent") {
        setUnread((prev) => prev + 1);
      }
    }
  }, [messages, open]);

  /* Clear unread on open */
  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  /* Allow other components to open the chat via a custom event */
  useEffect(() => {
    function handleOpenChat() {
      setOpen(true);
    }
    window.addEventListener("open-chat", handleOpenChat);
    return () => window.removeEventListener("open-chat", handleOpenChat);
  }, []);

  /* Focus input when chat becomes active */
  useEffect(() => {
    if (open && status === "active") {
      inputRef.current?.focus();
    }
  }, [open, status]);

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  }

  function handleStartChat(data) {
    startChat(data);
  }

  function handleNewChat() {
    resetChat();
  }

  return (
    <>
      {/* ---- Floating toggle button ---- */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-hive-yellow text-slate-950 shadow-lg shadow-hive-yellow/20 transition-all duration-300 hover:scale-105 hover:brightness-110 ${
          open ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
      >
        <ChatIcon className="w-6 h-6" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {/* ---- Chat panel ---- */}
      <div
        className={`fixed bottom-5 right-5 z-50 flex flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl transition-all duration-300 origin-bottom-right ${
          open
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-0 opacity-0 pointer-events-none"
        } w-[calc(100vw-2.5rem)] sm:w-[380px] h-[min(500px,calc(100vh-6rem))]`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-hive-yellow/15 text-hive-yellow">
              <ChatIcon className="w-4 h-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-50">Hive Media</p>
              <p className="text-[11px] text-slate-400">
                {status === "active" ? "Online" : "Chat with us"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 scroll-smooth">
          {status === "idle" && <IntroForm onStart={handleStartChat} />}

          {(status === "active" || status === "connecting" || status === "closed") && (
            <>
              {messages.length === 0 && status !== "closed" && (
                <p className="py-8 text-center text-sm text-slate-500">
                  Connecting you with our team...
                </p>
              )}

              {messages.map((msg) => (
                <MessageBubble key={msg._id} message={msg} />
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm bg-slate-800">
                    <TypingDots />
                  </div>
                </div>
              )}

              {status === "closed" && (
                <div className="flex flex-col items-center gap-3 py-4">
                  <p className="text-sm text-slate-400">This chat has ended.</p>
                  <button
                    onClick={handleNewChat}
                    className="rounded-full border border-hive-yellow bg-hive-yellow/10 px-4 py-1.5 text-sm font-medium text-hive-yellow transition-colors hover:bg-hive-yellow/20"
                  >
                    Start new chat
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input bar */}
        {status === "active" && (
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-slate-800 bg-slate-900 px-3 py-2.5 shrink-0"
          >
            <label htmlFor="chat-message" className="sr-only">Type a message</label>
            <input
              id="chat-message"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                emitTyping();
              }}
              placeholder="Type a message..."
              className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-hive-yellow text-slate-950 transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <SendIcon />
            </button>
          </form>
        )}
      </div>
    </>
  );
}
