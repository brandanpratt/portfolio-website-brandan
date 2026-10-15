"use client";

import { useChat } from "@ai-sdk/react";
import { track } from "@vercel/analytics";
import { AnimatePresence, motion } from "motion/react";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

export const ASK_EVENT = "ask-brandan";
export const askBrandan = (text?: string) => window.dispatchEvent(new CustomEvent(ASK_EVENT, { detail: { text } }));

export const suggestions = [
  "What could AI automate in my business?",
  "How much does an AI agent cost?",
  "What has Brandan built?",
  "Do you accept crypto?",
];

// Minimal, safe markdown: links, bold, inline code and bullet lists.
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] && /^(https?:\/\/|\/|mailto:)/.test(m[2])) {
      const external = /^https?:/.test(m[2]);
      out.push(
        <a key={m.index} href={m[2]} className="text-signal underline underline-offset-2" {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
          {m[1]}
        </a>,
      );
    } else if (m[1]) out.push(m[1]);
    else if (m[3]) out.push(<strong key={m.index} className="font-semibold text-paper">{m[3]}</strong>);
    else if (m[4]) out.push(<code key={m.index} className="rounded bg-line px-1 font-mono text-[0.85em]">{m[4]}</code>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Markdown({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <>
      {blocks.map((b, i) => {
        const lines = b.split("\n");
        if (lines.every((l) => /^\s*([-*]|\d+\.)\s/.test(l))) {
          return (
            <ul key={i} className="my-2 list-disc space-y-1 pl-5">
              {lines.map((l, j) => <li key={j}>{inline(l.replace(/^\s*([-*]|\d+\.)\s/, ""))}</li>)}
            </ul>
          );
        }
        return (
          <p key={i} className="my-2 first:mt-0 last:mb-0">
            {lines.map((l, j) => <Fragment key={j}>{j > 0 && <br />}{inline(l)}</Fragment>)}
          </p>
        );
      })}
    </>
  );
}

export function AskBrandan() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop } = useChat();
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const busy = status === "submitted" || status === "streaming";

  const send = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    sendMessage({ text: t });
    setInput("");
    track("chat_message");
  };

  useEffect(() => {
    const onAsk = (e: Event) => {
      const text = (e as CustomEvent<{ text?: string }>).detail?.text;
      setOpen(true);
      track("chat_open", { source: "prompt" });
      if (text) send(text);
      else setTimeout(() => inputRef.current?.focus(), 50);
    };
    window.addEventListener(ASK_EVENT, onAsk);
    return () => window.removeEventListener(ASK_EVENT, onAsk);
  });

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          if (!open) track("chat_open", { source: "launcher" });
        }}
        aria-expanded={open}
        aria-controls="ask-brandan"
        className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 rounded-full border border-signal/40 bg-ink/85 py-2 pl-2 pr-5 text-sm text-paper shadow-[0_0_40px_-10px_var(--color-signal)] backdrop-blur-xl transition-all hover:border-signal md:bottom-8 md:right-8"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-signal text-ink">
          {open ? (
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="2.2" /><circle cx="5" cy="6" r="1.6" /><circle cx="19" cy="6" r="1.6" /><circle cx="5" cy="18" r="1.6" /><circle cx="19" cy="18" r="1.6" /><path d="M6.3 7l4.2 3.6M17.7 7l-4.2 3.6M6.3 17l4.2-3.6M17.7 17l-4.2-3.6" /></svg>
          )}
        </span>
        {open ? "Close" : "Ask Brandan's AI"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="ask-brandan"
            role="dialog"
            aria-label="Ask Brandan's AI assistant"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="fixed inset-x-3 bottom-20 z-[60] flex max-h-[min(70vh,640px)] flex-col overflow-hidden rounded-3xl border border-line bg-ink/95 shadow-2xl backdrop-blur-2xl md:inset-x-auto md:bottom-28 md:right-8 md:w-[420px]"
          >
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <div>
                <p className="text-sm font-medium text-paper">Ask Brandan&apos;s AI</p>
                <p className="text-xs text-fog">Answers about services, work &amp; pricing. Can make mistakes.</p>
              </div>
            </div>

            <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto px-5 py-5 text-sm leading-relaxed" aria-live="polite">
              {messages.length === 0 && (
                <div>
                  <p className="text-mist">
                    Hi! I&apos;m an AI assistant trained on Brandan&apos;s work. Ask me how AI could help your business, what
                    he&apos;s built, or what a project might cost.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-line px-3 py-1.5 text-left text-xs text-mist transition-colors hover:border-signal hover:text-signal">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : ""}>
                  <div className={m.role === "user" ? "max-w-[85%] rounded-2xl rounded-br-md bg-signal/15 px-4 py-2.5 text-paper" : "text-mist"}>
                    {m.parts.map((part, i) => {
                      if (part.type === "text") return m.role === "user" ? <p key={i}>{part.text}</p> : <Markdown key={i} text={part.text} />;
                      if (part.type === "tool-bookCall" && part.state === "output-available") {
                        const { url, introUrl } = part.output as { url: string; introUrl?: string };
                        return (
                          <div key={i} className="my-3">
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => track("book_call_click", { location: "chat" })}
                            className="flex items-center justify-between rounded-2xl border border-signal/40 bg-signal/10 px-4 py-3 text-paper transition-colors hover:bg-signal/20"
                          >
                            <span>
                              <span className="block font-medium">Book a free discovery call</span>
                              <span className="text-xs text-fog">30 minutes · no obligation</span>
                            </span>
                            <span aria-hidden className="text-signal">→</span>
                          </a>
                          {introUrl && (
                            <a href={introUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-xs text-fog underline-offset-2 hover:text-signal hover:underline">
                              Short on time? Book a 15-minute intro instead
                            </a>
                          )}
                          </div>
                        );
                      }
                      if (part.type.startsWith("tool-") && "state" in part && part.state !== "output-available") {
                        return <p key={i} className="font-mono text-xs text-fog">Looking that up…</p>;
                      }
                      return null;
                    })}
                  </div>
                </div>
              ))}

              {status === "submitted" && (
                <p className="font-mono text-xs text-fog">Thinking…</p>
              )}
              {error && (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                  Sorry, the assistant is unavailable right now. You can still <a href="/contact" className="underline">book a call</a>.
                </p>
              )}
            </div>

            <form
              className="flex items-end gap-2 border-t border-line p-3"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <label htmlFor="ask-input" className="sr-only">Your question</label>
              <textarea
                id="ask-input"
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={2000}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask about services, projects, pricing…"
                className="max-h-32 flex-1 resize-none rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-paper placeholder:text-fog focus:border-signal/60 focus:outline-none"
              />
              {busy ? (
                <button type="button" onClick={() => stop()} className="h-11 rounded-full border border-line px-4 text-xs text-mist hover:text-paper">
                  Stop
                </button>
              ) : (
                <button type="submit" disabled={!input.trim()} aria-label="Send" className="grid h-11 w-11 place-items-center rounded-full bg-signal text-ink transition-opacity disabled:opacity-40">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden><path d="M8 13V3m0 0L3.5 7.5M8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
