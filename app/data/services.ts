export type Service = {
  slug: string;
  name: string;
  kind: "advise" | "build";
  summary: string;
  startingAt: string;
  cadence?: string;
  timeline: string;
  outcomes: string[];
  idealFor: string;
};

export const services: Service[] = [
  {
    slug: "ai-readiness-audit",
    name: "AI Readiness Audit",
    kind: "advise",
    summary:
      "A focused review of your workflows, data and tools that ends in a prioritised roadmap of where AI saves real time and money — and where it doesn't.",
    startingAt: "$750",
    timeline: "1–2 weeks",
    outcomes: [
      "Workflow and data audit with stakeholder interviews",
      "Ranked list of automation and AI opportunities with ROI estimates",
      "Build-vs-buy recommendations and tool shortlist",
      "90-day implementation roadmap you can hand to any team",
    ],
    idealFor: "Teams who know AI matters but don't know where to start.",
  },
  {
    slug: "ai-agents-automation",
    name: "AI Agents & Automation",
    kind: "build",
    summary:
      "Custom AI agents and automations wired into the tools you already use — support assistants, document processing, lead qualification, internal copilots and back-office workflows.",
    startingAt: "$3,500",
    timeline: "3–6 weeks",
    outcomes: [
      "Production agent or workflow integrated with your systems and data",
      "Guardrails, logging and human-in-the-loop review where it matters",
      "Usage and cost monitoring",
      "Handover docs and team training",
    ],
    idealFor: "Businesses with repetitive, high-volume work that slows the team down.",
  },
  {
    slug: "web-app-development",
    name: "Web & App Development",
    kind: "build",
    summary:
      "Full-stack web applications, portals and SaaS products — from first prototype to a production system with auth, payments, dashboards and APIs.",
    startingAt: "$2,500",
    timeline: "2–8 weeks",
    outcomes: [
      "Modern, fast, SEO-ready web app (Next.js, React, Laravel)",
      "Database design, REST APIs and third-party integrations",
      "Deployment, monitoring and CI/CD",
      "AI features built in where they add value",
    ],
    idealFor: "Founders and organisations that need a reliable product shipped fast.",
  },
  {
    slug: "fractional-cto",
    name: "Advisory / Fractional CTO",
    kind: "advise",
    summary:
      "Ongoing senior technical leadership without a full-time hire: architecture decisions, vendor and hiring guidance, AI strategy and hands-on reviews.",
    startingAt: "$1,500",
    cadence: "/mo",
    timeline: "Monthly retainer",
    outcomes: [
      "Regular strategy calls and async access",
      "Architecture, security and code reviews",
      "AI adoption strategy and vendor evaluation",
      "Hiring support and team mentoring",
    ],
    idealFor: "Startups and SMBs without in-house technical leadership.",
  },
];

export const engagementProcess = [
  {
    step: "01",
    title: "Advise",
    body: "We map your workflows, data and goals, and find the highest-leverage places for AI and software. You leave with a clear plan whether or not we keep working together.",
  },
  {
    step: "02",
    title: "Prototype",
    body: "A working slice in days, not months. AI-accelerated development means you see and test real software early, and we adjust before committing budget.",
  },
  {
    step: "03",
    title: "Build",
    body: "Production-grade engineering: secure, tested, documented and integrated with your systems — the same standards I apply to government digital services.",
  },
  {
    step: "04",
    title: "Scale",
    body: "Monitoring, iteration and training so your team owns the result. Optional ongoing advisory as you grow.",
  },
] as const;

export const payments = {
  summary: "Invoices in USD or BSD. Crypto accepted.",
  crypto: ["USDC", "BTC", "ETH"],
  terms: "Project work is typically 50% upfront and 50% on delivery; retainers are billed monthly in advance.",
} as const;

export const faqs = [
  {
    q: "Do you work with clients outside The Bahamas?",
    a: "Yes. I work remotely with clients across the Caribbean, the US, Canada, the UK and beyond. Nassau is on US Eastern time, which makes collaboration with North America easy.",
  },
  {
    q: "What does \"starting at\" mean?",
    a: "It's the price for a typical, well-scoped engagement. After a free discovery call I send a fixed quote, so there are no surprise invoices.",
  },
  {
    q: "How do you accept payment?",
    a: `Bank transfer or card in USD or BSD, and crypto (${payments.crypto.join(", ")}). ${payments.terms}`,
  },
  {
    q: "Do I need to have my data \"ready\" for AI?",
    a: "No. The audit exists precisely to figure out what's usable today and what needs work first. Many quick wins need very little data preparation.",
  },
  {
    q: "Who owns the code and IP?",
    a: "You do. Once the project is paid in full, all code, prompts and assets are yours.",
  },
  {
    q: "Can you work with my existing team or vendor?",
    a: "Absolutely. I often act as the technical lead alongside in-house staff or other agencies.",
  },
] as const;
