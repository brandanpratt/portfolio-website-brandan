"use client";

import { useState } from "react";
import { askBrandan, suggestions } from "./AskBrandan";
import { Reveal } from "../ui/Reveal";

export function AskPrompt() {
  const [value, setValue] = useState("");
  return (
    <Reveal className="glass relative overflow-hidden rounded-3xl p-6 md:p-10">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-signal/15 blur-3xl" />
      <form
        className="relative flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          askBrandan(value.trim() || undefined);
          setValue("");
        }}
      >
        <label htmlFor="ask-inline" className="sr-only">Ask a question</label>
        <input
          id="ask-inline"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. We run a clinic. Could AI handle appointment questions?"
          className="flex-1 rounded-full border border-line bg-ink/70 px-6 py-4 text-paper placeholder:text-fog focus:border-signal/60 focus:outline-none"
        />
        <button type="submit" className="rounded-full bg-signal px-6 py-4 text-sm font-medium text-ink transition-colors hover:bg-paper">
          Ask the agent
        </button>
      </form>
      <div className="relative mt-5 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button key={s} type="button" onClick={() => askBrandan(s)} className="rounded-full border border-line px-4 py-2 text-sm text-mist transition-colors hover:border-signal hover:text-signal">
            {s}
          </button>
        ))}
      </div>
    </Reveal>
  );
}
