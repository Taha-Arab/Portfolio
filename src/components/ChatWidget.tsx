"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const STARTER: Message = {
  role: "assistant",
  content:
    "Hey, I'm Taha's digital twin — ask me about his engineering projects, the INEOS internship, skills, or background.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showCallout, setShowCallout] = useState(false);
  const [messages, setMessages] = useState<Message[]>([STARTER]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowCallout(true), 1800);
    return () => clearTimeout(showTimer);
  }, []);

  function dismissCallout() {
    setShowCallout(false);
  }

  async function send() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const next: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        const errText = data?.error ?? "Something went wrong reaching the digital twin.";
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: errText };
          return copy;
        });
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Connection dropped. Please try again in a moment.",
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* One-time callout pointing at the chat button */}
      {!open && (
        <div
          className={`fixed bottom-24 right-5 md:bottom-28 md:right-8 z-40 max-w-[280px] transition-all duration-300 ${
            showCallout ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="relative rounded-xl bg-neutral-900 border border-sky-500/40 text-neutral-100 text-base font-medium px-5 py-4 shadow-xl shadow-sky-500/10">
            <button
              onClick={dismissCallout}
              aria-label="Dismiss"
              className="absolute -top-2.5 -right-2.5 h-6 w-6 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-400 text-xs flex items-center justify-center hover:bg-neutral-700 hover:text-neutral-100"
            >
              ✕
            </button>
            <span className="text-sky-400">Curious what I&apos;d say in an interview?</span> Ask my AI digital twin
            <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-neutral-900 border-r border-b border-sky-500/40" />
          </div>
        </div>
      )}

      {/* Floating action button */}
      <button
        onClick={() => {
          setOpen(true);
          dismissCallout();
        }}
        aria-label="Open chat with Taha's digital twin"
        className={`fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 h-14 w-14 rounded-full bg-sky-500 text-neutral-950 shadow-lg flex items-center justify-center transition-transform hover:scale-105 ${
          open ? "scale-0" : "scale-100"
        }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.8 3.8a.5.5 0 0 1-.8-.4V16h-.7A2.5 2.5 0 0 1 4 13.5v-8Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <circle cx="8.5" cy="9.5" r="1.1" fill="currentColor" />
          <circle cx="12" cy="9.5" r="1.1" fill="currentColor" />
          <circle cx="15.5" cy="9.5" r="1.1" fill="currentColor" />
        </svg>
      </button>

      {/* Chat panel */}
      <div
        className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute bottom-0 right-0 w-full h-[85dvh] md:h-[600px] md:bottom-6 md:right-6 md:w-[380px] md:rounded-2xl rounded-t-2xl bg-neutral-950 border border-neutral-800 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-neutral-800 p-4 md:p-5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-medium text-neutral-200">
                TA
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-100">Taha&apos;s Digital Twin</p>
                <p className="text-xs text-neutral-500">Ask about his work &amp; projects</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="h-9 w-9 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-sky-300 hover:border-sky-500 transition-colors"
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-5 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-sky-500 text-neutral-950 rounded-br-sm"
                      : "bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-bl-sm"
                  }`}
                >
                  {m.content || (loading && i === messages.length - 1 ? <TypingDots /> : "")}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-neutral-800 p-3 md:p-4"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the INEOS project..."
              className="flex-1 rounded-full bg-neutral-900 border border-neutral-800 px-4 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="h-10 w-10 shrink-0 rounded-full bg-sky-500 text-neutral-950 flex items-center justify-center disabled:opacity-40 transition-opacity"
            >
              ↑
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1 items-center py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-neutral-500 animate-bounce [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 rounded-full bg-neutral-500 animate-bounce [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 rounded-full bg-neutral-500 animate-bounce" />
    </span>
  );
}
