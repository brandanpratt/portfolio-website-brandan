import type { Metadata } from "next";
import { site } from "../data/site";
import { education, experience } from "../data/experience";
import { techByCategory, techLogoUrl } from "../data/techStack";
import { CtaBand } from "../components/cards";
import { Arrow, ButtonLink } from "../components/ui/Button";
import { PageHeader, Section, Serif } from "../components/ui/Section";
import { Reveal } from "../components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Brandan Pratt is a Nassau-based software engineer and AI consultant with 5+ years building government and private-sector systems, now helping businesses worldwide put AI to work.",
  alternates: { canonical: "/about" },
};

const categoryLabel = { ai: "AI", frontend: "Frontend", backend: "Backend", data: "Data", devops: "DevOps" } as const;

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={<>From Nassau, <Serif>for everywhere.</Serif></>}
        intro={`I'm ${site.name}: a software engineer who spent ${site.yearsExperience}+ years building systems governments and businesses depend on, and now helps companies put AI to work.`}
      />

      <section className="container-page grid gap-12 pb-12 md:grid-cols-[2fr_1fr]">
        <Reveal className="space-y-6 text-lg leading-relaxed text-mist">
          <p>
            My career started close to the work: building insurance systems at Bahamas First, running Linux servers and
            shipping a HR SaaS at Plato Alpha Designs, then joining the Ministry of Economic Affairs&apos; Digital
            Transformation Unit to build services Bahamians use every day.
          </p>
          <p>
            Government work taught me what &ldquo;production-grade&rdquo; really means: change management, documentation,
            security, and software that has to work for everyone, not just early adopters.
          </p>
          <p>
            Then AI changed the maths. With modern models and AI-assisted engineering, one experienced builder can now
            deliver what used to take a team. I want to put that leverage in the hands of startups and growing businesses,
            in the Caribbean and well beyond it.
          </p>
          <p className="text-paper">
            So I do two things: I <Serif>advise</Serif> on where AI actually pays off, and I <Serif>build</Serif> it.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="glass h-fit rounded-3xl p-6">
          <dl className="space-y-5">
            <div><dt className="font-mono text-xs uppercase tracking-widest text-fog">Based in</dt><dd className="mt-1 text-paper">{site.location}</dd></div>
            <div><dt className="font-mono text-xs uppercase tracking-widest text-fog">Timezone</dt><dd className="mt-1 text-paper">US Eastern (EST/EDT)</dd></div>
            <div><dt className="font-mono text-xs uppercase tracking-widest text-fog">Working with</dt><dd className="mt-1 text-paper">Startups, SMBs, the public sector</dd></div>
            <div><dt className="font-mono text-xs uppercase tracking-widest text-fog">Availability</dt><dd className="mt-1 text-paper">{site.availability}</dd></div>
          </dl>
          <ButtonLink href={site.resume} target="_blank" variant="ghost" className="mt-6 w-full">Download résumé <Arrow /></ButtonLink>
        </Reveal>
      </section>

      <Section eyebrow="Experience" title={<>Where I&apos;ve <Serif>shipped</Serif></>}>
        <ol className="relative space-y-12 border-l border-line pl-8 md:pl-12">
          {experience.map((r, i) => (
            <Reveal as="li" key={r.org} delay={i * 0.06} className="relative">
              <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full border-2 border-signal bg-ink md:-left-[53px]" />
              <p className="font-mono text-xs text-fog">{r.start} — {r.end}</p>
              <h3 className="mt-2 text-2xl font-medium text-paper">{r.title}</h3>
              <p className="text-signal">{r.org}{r.unit && ` · ${r.unit}`}</p>
              <ul className="mt-4 max-w-3xl space-y-2 text-fog">
                {r.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            </Reveal>
          ))}
          <Reveal as="li" className="relative">
            <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full border-2 border-line bg-ink md:-left-[53px]" />
            <h3 className="text-xl font-medium text-paper">Education &amp; certification</h3>
            <p className="mt-2 text-fog">{education.school}: {education.detail}</p>
            <p className="text-fog">{education.certifications.join(" · ")}</p>
          </Reveal>
        </ol>
      </Section>

      <Section eyebrow="Toolkit" title={<>The <Serif>stack</Serif></>}>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-5">
          {(Object.keys(techByCategory) as (keyof typeof techByCategory)[]).map((cat, i) => (
            <Reveal key={cat} delay={i * 0.05} className="bg-ink p-6">
              <p className="mb-5 font-mono text-xs uppercase tracking-widest text-signal">{categoryLabel[cat]}</p>
              <ul className="space-y-3">
                {techByCategory[cat].map((t) => (
                  <li key={t.slug} className="flex items-center gap-3 text-mist">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={techLogoUrl(t.slug, t.color)} alt="" width={18} height={18} loading="lazy" className="h-[18px] w-[18px]" />
                    {t.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand title="Let's build something together" />
    </>
  );
}
