import { Suspense } from "react";
import { site } from "./data/site";
import { engagementProcess, services } from "./data/services";
import { featuredProjects } from "./data/projects";
import { governmentProjectCount } from "./data/experience";
import { getAllPosts } from "./lib/blog";
import { HeroScene } from "./components/three/HeroScene";
import { GitHubPulse } from "./components/github/GitHubPulse";
import { CtaBand, PostCard, ProjectCard, ServiceCard, TechMarquee } from "./components/cards";
import { Arrow, ButtonLink } from "./components/ui/Button";
import { Reveal } from "./components/ui/Reveal";
import { Section, Serif } from "./components/ui/Section";
import { AskPrompt } from "./components/chat/AskPrompt";

const multipliers = [
  {
    k: "Strategy",
    title: "Advice grounded in shipping",
    body: "I've built national government systems and client SaaS. Recommendations come from what actually works in production, not slideware.",
  },
  {
    k: "Speed",
    title: "AI-multiplied delivery",
    body: "AI-assisted engineering lets one senior builder move like a small team: prototypes in days, production in weeks.",
  },
  {
    k: "Reach",
    title: "Caribbean roots, global clients",
    body: "Based in Nassau on US Eastern time. I understand regional businesses and work remotely with teams anywhere.",
  },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <HeroScene />
        <div className="container-page relative z-10 pt-28 pb-20">
          <div className="animate-rise">
            <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-ink/60 px-4 py-2 font-mono text-xs text-mist backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-aqua animate-pulse-dot" />
              {site.availability}
            </p>
          </div>
          <div className="animate-rise [animation-delay:100ms]">
            <h1 className="max-w-5xl text-[clamp(2.75rem,8vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.035em] text-paper">
              I advise on AI, <br className="hidden sm:block" />
              then I <Serif>build it.</Serif>
            </h1>
          </div>
          <div className="animate-rise [animation-delay:200ms]">
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-mist md:text-xl">
              AI consultant and software engineer from The Bahamas. I help startups and growing businesses find where AI
              pays off, then ship the agents, automations and web apps to make it real.
            </p>
          </div>
          <div className="mt-10 flex animate-rise flex-col gap-3 [animation-delay:300ms] sm:flex-row">
            <ButtonLink href="/contact">Book a free call <Arrow /></ButtonLink>
            <ButtonLink href="/work" variant="ghost">See the work</ButtonLink>
          </div>
          <div className="animate-rise [animation-delay:450ms]">
            <dl className="mt-20 grid max-w-2xl grid-cols-3 gap-6 border-t border-line/70 pt-6">
              <div>
                <dd className="text-3xl font-medium text-paper">{site.yearsExperience}+</dd>
                <dt className="mt-1 text-xs text-fog md:text-sm">years shipping production software</dt>
              </div>
              <div>
                <dd className="text-3xl font-medium text-paper">{governmentProjectCount}</dd>
                <dt className="mt-1 text-xs text-fog md:text-sm">national government projects</dt>
              </div>
              <div>
                <dd className="text-3xl font-medium text-paper">1</dd>
                <dt className="mt-1 text-xs text-fog md:text-sm">partner from strategy to launch</dt>
              </div>
            </dl>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-fog md:block">
          Scroll
        </div>
      </section>

      <TechMarquee />

      {/* Why */}
      <Section
        eyebrow="The AI multiplier"
        title={<>One engineer. <Serif>A team&apos;s output.</Serif></>}
        intro="AI has changed what a single senior engineer can deliver. You get the judgment of a consultant and the output of a dev team, without the agency overhead."
      >
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {multipliers.map((m, i) => (
            <Reveal key={m.k} delay={i * 0.08} className="bg-ink p-8 md:p-10">
              <p className="font-mono text-xs uppercase tracking-widest text-signal">{m.k}</p>
              <h3 className="mt-6 text-2xl font-medium text-paper">{m.title}</h3>
              <p className="mt-3 leading-relaxed text-fog">{m.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section
        id="services"
        eyebrow="Services"
        title={<>Advise. <Serif>Build.</Serif> Or both.</>}
        intro="Clear packages with transparent starting prices. Every engagement starts with a free discovery call and ends with a fixed quote."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section eyebrow="How it works" title={<>From idea to <Serif>impact</Serif></>}>
        <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
          {engagementProcess.map((p, i) => (
            <Reveal as="li" key={p.step} delay={i * 0.1} className="relative border-t border-line pt-6">
              <span className="absolute -top-px left-0 h-px w-12 bg-signal" />
              <p className="font-mono text-sm text-signal">{p.step}</p>
              <h3 className="mt-4 text-2xl font-medium text-paper">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-fog">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Work */}
      <Section eyebrow="Selected work" title={<>Built for <Serif>real</Serif> users</>}>
        <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
        <Reveal className="mt-14">
          <ButtonLink href="/work" variant="ghost">All projects <Arrow /></ButtonLink>
        </Reveal>
      </Section>

      {/* Ask */}
      <Section
        eyebrow="Try it live"
        title={<>Don&apos;t take my word for it. <Serif>Ask my agent.</Serif></>}
        intro="This site has an AI assistant built on my own work: services, projects and experience. It's a small example of what I build for clients."
      >
        <AskPrompt />
      </Section>

      {/* GitHub */}
      <Suspense fallback={null}>
        <Section eyebrow="Always shipping" title={<>What I&apos;m <Serif>building</Serif> right now</>}>
          <GitHubPulse />
        </Section>
      </Suspense>

      {/* Insights */}
      {posts.length > 0 && (
        <Section eyebrow="Insights" title={<>Notes on <Serif>AI in business</Serif></>}>
          <div className="border-b border-line">
            {posts.map((p, i) => (
              <PostCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
