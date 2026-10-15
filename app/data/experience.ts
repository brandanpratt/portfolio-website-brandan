export type Role = {
  org: string;
  unit?: string;
  title: string;
  start: string;
  end: string;
  highlights: string[];
};

export const experience: Role[] = [
  {
    org: "Ministry of Economic Affairs",
    unit: "Digital Transformation Unit",
    title: "Junior Software Developer",
    start: "Aug 2023",
    end: "Present",
    highlights: [
      "Turn requirements from stakeholders, analysts and leadership into working government applications.",
      "Build and support REST API integrations across internal and public-facing national systems.",
      "Write and optimise SQL behind backend logic, reporting workflows and data integrity in production.",
      "Own the full SDLC — development, testing, deployment and post-launch support — under formal change management.",
    ],
  },
  {
    org: "Plato Alpha Designs",
    title: "Full-Stack Developer",
    start: "Aug 2022",
    end: "Jul 2023",
    highlights: [
      "Built and maintained client web applications, including a proprietary HR management platform (TriblockHR).",
      "Managed Linux hosting: deployments, configuration, SSL and vulnerability remediation.",
      "Built deployment workflows for consistent, reliable releases.",
    ],
  },
  {
    org: "Bahamas First General Insurance",
    title: "Software Developer",
    start: "May 2021",
    end: "Jul 2022",
    highlights: [
      "Designed and shipped front-end and back-end features aligned to business needs.",
      "Maintained and enhanced existing insurance systems for stability and usability.",
    ],
  },
];

// Government work is described by capability only; individual projects are not named publicly.
export const governmentProjectCount = 8;

export const governmentWork = [
  { title: "Citizen-facing digital services", body: "Public portals and online services used by residents and businesses across The Bahamas." },
  { title: "Payments & integrations", body: "REST API integrations connecting internal systems, payment flows and partner agencies." },
  { title: "Identity & records systems", body: "Registration, verification and credential workflows with role-based access and audit trails." },
  { title: "Internal tools & reporting", body: "Back-office applications and SQL-driven reporting that keep public-sector teams running." },
] as const;

export const education = {
  school: "Bahamas Technical & Vocational Institute",
  detail: "Network Engineering (Associate's coursework completed), 2020–2023",
  certifications: ["CompTIA IT Fundamentals+ (ITF+), 2021"],
} as const;
