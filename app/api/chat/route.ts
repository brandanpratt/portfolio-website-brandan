import { convertToModelMessages, stepCountIs, streamText, tool, type UIMessage } from "ai";
import { z } from "zod";
import { bookingUrls, projectsForAgent, servicesForAgent, systemPrompt } from "@/app/lib/knowledge";

export const maxDuration = 30;

const MODEL = process.env.CHAT_MODEL ?? "anthropic/claude-haiku-5.5";
const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;

// Best-effort per-instance limiter (Fluid Compute reuses instances). Swap for a shared store if abused.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 30;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return new Response("You're sending messages quickly — please try again in a few minutes.", { status: 429 });
  }

  let messages: UIMessage[];
  try {
    ({ messages } = (await req.json()) as { messages: UIMessage[] });
    if (!Array.isArray(messages) || messages.length === 0) throw new Error();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const trimmed = messages.slice(-MAX_MESSAGES).map((m) => ({
    ...m,
    parts: m.parts.map((p) => (p.type === "text" ? { ...p, text: p.text.slice(0, MAX_CHARS) } : p)),
  }));

  const result = streamText({
    model: MODEL,
    system: systemPrompt(),
    messages: await convertToModelMessages(trimmed),
    maxOutputTokens: 700,
    stopWhen: stepCountIs(4),
    tools: {
      getServices: tool({
        description: "List Brandan's service packages with starting prices, timelines and what's included.",
        inputSchema: z.object({}),
        execute: async () => servicesForAgent(),
      }),
      getProjects: tool({
        description: "List Brandan's portfolio projects and case studies, optionally filtered by keyword.",
        inputSchema: z.object({
          query: z.string().optional().describe("Optional keyword, e.g. 'data', 'government', 'Laravel'"),
        }),
        execute: async ({ query }) => {
          const all = projectsForAgent();
          if (!query) return all;
          const q = query.toLowerCase();
          const hits = all.filter((p) => JSON.stringify(p).toLowerCase().includes(q));
          return hits.length ? hits : all;
        },
      }),
      bookCall: tool({
        description: "Get links for the visitor to book a free 30-minute discovery call (or a quick 15-minute intro) with Brandan.",
        inputSchema: z.object({
          topic: z.string().optional().describe("Short summary of what the visitor wants to discuss"),
        }),
        execute: async ({ topic }) => ({ url: bookingUrls.discovery, introUrl: bookingUrls.intro, topic: topic ?? null }),
      }),
    },
    onError: ({ error }) => console.error("chat error", error),
  });

  return result.toUIMessageStreamResponse();
}
