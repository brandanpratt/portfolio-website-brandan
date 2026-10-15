import type { Metadata } from "next";
import { projects } from "../data/projects";
import { governmentWork } from "../data/experience";
import { CtaBand, ProjectCard } from "../components/cards";
import { PageHeader, Section, Serif } from "../components/ui/Section";
import { Reveal } from "../components/ui/Reveal";

export const metadata: Metadata = {
  title: "Work & Case Studies",
  description:
    "Case studies from Brandan Pratt: government digital services, SaaS platforms, data pipelines and real-time analytics, built for users in The Bahamas and beyond.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const [first, ...rest] = projects;
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title={<>Systems people <Serif>actually use</Serif></>}
        intro="From national government services to SaaS and real-time data platforms. Here's a selection, with the problem, approach and outcome for each."
      />
      <section className="container-page">
        <ProjectCard project={first} index={0} large />
        <div className="mt-16 grid gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      <Section
        eyebrow="Government digital transformation"
        title={<>Trusted with <Serif>national</Serif> systems</>}
        intro="As a developer in the Ministry of Economic Affairs' Digital Transformation Unit, I've contributed to public-facing and internal government platforms in The Bahamas. Project specifics stay confidential; here's the kind of work involved."
      >
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {governmentWork.map((g, i) => (
            <Reveal as="li" key={g.title} delay={(i % 4) * 0.05} className="bg-ink p-6">
              <p className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-3 text-paper">{g.title}</p>
              <p className="mt-2 text-sm text-fog">{g.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaBand title="Want results like these?" />
    </>
  );
}
