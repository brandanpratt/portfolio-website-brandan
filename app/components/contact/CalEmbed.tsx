"use client";

import { track } from "@vercel/analytics";
import { useState } from "react";
import { site } from "@/app/data/site";

const options = [
  { key: "discovery", label: "30-min discovery call", note: "Scope a project, get ideas you can use", url: site.booking.discovery },
  { key: "intro", label: "15-min intro", note: "Quick hello, see if we're a fit", url: site.booking.intro },
] as const;

function embedUrl(url: string) {
  const u = new URL(url);
  u.searchParams.set("embed", "true");
  u.searchParams.set("theme", "dark");
  u.searchParams.set("layout", "month_view");
  return u.toString();
}

export function CalEmbed() {
  const [active, setActive] = useState<(typeof options)[number]["key"]>("discovery");
  const current = options.find((o) => o.key === active)!;

  return (
    <div>
      <div role="tablist" aria-label="Call length" className="mb-5 flex flex-col gap-2 sm:flex-row">
        {options.map((o) => (
          <button
            key={o.key}
            role="tab"
            type="button"
            aria-selected={active === o.key}
            onClick={() => {
              setActive(o.key);
              track("booking_option", { option: o.key });
            }}
            className={`rounded-2xl border px-5 py-3 text-left transition-colors ${
              active === o.key ? "border-signal/60 bg-signal/10" : "border-line hover:border-signal/40"
            }`}
          >
            <span className={`block text-sm font-medium ${active === o.key ? "text-signal" : "text-paper"}`}>{o.label}</span>
            <span className="text-xs text-fog">{o.note}</span>
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-3xl border border-line bg-surface">
        <iframe
          key={current.key}
          src={embedUrl(current.url)}
          title={`Book a ${current.label} with ${site.name}`}
          className="h-[720px] w-full"
          loading="lazy"
        />
      </div>
      <p className="mt-3 text-sm text-fog">
        Calendar not loading?{" "}
        <a href={current.url} target="_blank" rel="noopener noreferrer" className="text-signal underline">
          Open it on Cal.com
        </a>
        .
      </p>
    </div>
  );
}
