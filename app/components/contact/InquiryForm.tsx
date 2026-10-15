"use client";

import { track } from "@vercel/analytics";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { services } from "@/app/data/services";

const budgets = ["Under $2,500", "$2,500 – $5,000", "$5,000 – $15,000", "$15,000+", "Not sure yet"];
const timelines = ["ASAP", "Within 1 month", "1–3 months", "Just exploring"];

const field =
  "w-full rounded-2xl border border-line bg-surface px-4 py-3.5 text-paper placeholder:text-fog transition-colors focus:border-signal/60 focus:outline-none";
const label = "mb-2 block font-mono text-xs uppercase tracking-widest text-fog";

export function InquiryForm() {
  const params = useSearchParams();
  const preset = services.find((s) => s.slug === params.get("service"))?.name ?? "";
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setState("sent");
      track("form_submit", { service: String(data.service || "none") });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="glass rounded-3xl p-8 text-center md:p-12" role="status">
        <p className="eyebrow mb-4">Message received</p>
        <h3 className="text-3xl font-medium text-paper">Thanks, I&apos;ll be in touch within one business day.</h3>
        <p className="mt-4 text-fog">In the meantime, feel free to ask my AI assistant anything.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass grid gap-5 rounded-3xl p-6 md:grid-cols-2 md:p-8">
      <div>
        <label htmlFor="name" className={label}>Name *</label>
        <input id="name" name="name" required maxLength={100} autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="email" className={label}>Email *</label>
        <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="company" className={label}>Company</label>
        <input id="company" name="company" maxLength={150} autoComplete="organization" className={field} />
      </div>
      <div>
        <label htmlFor="service" className={label}>Interested in</label>
        <select id="service" name="service" defaultValue={preset} className={field}>
          <option value="">Not sure yet</option>
          {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="budget" className={label}>Budget</label>
        <select id="budget" name="budget" defaultValue="" className={field}>
          <option value="" disabled>Select a range</option>
          {budgets.map((b) => <option key={b}>{b}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="timeline" className={label}>Timeline</label>
        <select id="timeline" name="timeline" defaultValue="" className={field}>
          <option value="" disabled>Select a timeline</option>
          {timelines.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="message" className={label}>What are you trying to solve? *</label>
        <textarea id="message" name="message" required rows={5} maxLength={5000} placeholder="A few sentences about your business and the problem is plenty." className={field} />
      </div>
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-fog" aria-live="polite">
          {state === "error" ? <span className="text-red-300">{error}</span> : "I reply within one business day."}
        </p>
        <button type="submit" disabled={state === "sending"} className="rounded-full bg-signal px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-paper disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Send inquiry"}
        </button>
      </div>
    </form>
  );
}
