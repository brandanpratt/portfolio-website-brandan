export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-website-brandan.vercel.app"
).replace(/\/$/, "");

export const site = {
  name: "Brandan Pratt",
  shortName: "Brandan",
  title: "AI Consultant & Software Engineer",
  tagline: "I advise on AI, then I build it.",
  description:
    "Brandan Pratt is a Bahamas-based AI consultant and software engineer. He helps startups and growing businesses across the Caribbean and worldwide plan, build and ship AI agents, automation and production web apps.",
  location: "Nassau, The Bahamas",
  timezone: "America/Nassau",
  availability: "Taking on new clients — remote worldwide",
  yearsExperience: 5,
  email: "brandan.pratt1@gmail.com",
  resume: "/brandan-pratt-resume.pdf",
  booking: {
    discovery: process.env.NEXT_PUBLIC_CAL_URL ?? "https://cal.com/brandan-pratt-eytpru/30min",
    intro: "https://cal.com/brandan-pratt-eytpru/15min",
  },
  links: {
    github: "https://github.com/brandanpratt",
    linkedin: "https://www.linkedin.com/in/brandan-p-267549114/",
    x: "https://x.com/brxn94",
  },
  githubUser: "brandanpratt",
} as const;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Insights" },
] as const;
