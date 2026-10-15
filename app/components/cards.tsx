import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/app/data/projects";
import type { Service } from "@/app/data/services";
import { techLogoUrl, techStack } from "@/app/data/techStack";
import { formatDate, type PostMeta } from "@/app/lib/blog";
import { Arrow, ButtonLink } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

export function ServiceCard({ service, index, detailed = false }: { service: Service; index: number; detailed?: boolean }) {
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article
        id={service.slug}
        className="group glass relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl p-7 transition-colors hover:border-signal/40 md:p-8"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-signal/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <div className="mb-8 flex items-center justify-between">
          <span className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${service.kind === "advise" ? "bg-sun/10 text-sun" : "bg-aqua/10 text-aqua"}`}>
            {service.kind}
          </span>
          <span className="font-mono text-xs text-fog">{service.timeline}</span>
        </div>
        <h3 className="text-2xl font-medium text-paper">{service.name}</h3>
        <p className="mt-3 leading-relaxed text-fog">{service.summary}</p>
        {detailed && (
          <>
            <ul className="mt-6 space-y-2.5">
              {service.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-sm text-mist">
                  <span className="mt-2 h-1 w-3 shrink-0 bg-signal" />
                  {o}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-fog"><span className="text-mist">Ideal for:</span> {service.idealFor}</p>
          </>
        )}
        <div className="mt-auto flex items-end justify-between pt-8">
          <p>
            <span className="block font-mono text-[11px] uppercase tracking-widest text-fog">Starting at</span>
            <span className="text-3xl font-medium text-paper">{service.startingAt}</span>
            {service.cadence && <span className="text-fog">{service.cadence}</span>}
          </p>
          {detailed ? (
            <ButtonLink href={`/contact?service=${service.slug}`} variant="ghost" className="!py-2.5">
              Get started <Arrow />
            </ButtonLink>
          ) : (
            <Link href={`/services#${service.slug}`} aria-label={`More about ${service.name}`} className="grid h-11 w-11 place-items-center rounded-full border border-line text-paper transition-all group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
              <Arrow />
            </Link>
          )}
        </div>
      </article>
    </Reveal>
  );
}

function ProjectVisual({ project, sizes }: { project: Project; sizes: string }) {
  if (project.images[0]) {
    return (
      <Image
        src={project.images[0]}
        alt={`${project.title} screenshot`}
        fill
        sizes={sizes}
        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
      />
    );
  }
  return (
    <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_30%_20%,color-mix(in_oklab,var(--color-signal)_22%,transparent),transparent),radial-gradient(60%_60%_at_80%_90%,color-mix(in_oklab,var(--color-aqua)_18%,transparent),transparent)] p-6">
      <div className="flex h-full flex-col justify-end gap-1 font-mono text-xs text-mist/80">
        {project.stack.map((s, i) => (
          <span key={s} style={{ paddingLeft: `${i * 10}px` }}>
            <span className="text-signal">→</span> {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProjectCard({ project, index, large = false }: { project: Project; index: number; large?: boolean }) {
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <Link href={`/work/${project.slug}`} className="group flex h-full flex-col">
        <div className={`relative overflow-hidden rounded-3xl border border-line bg-surface ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          <ProjectVisual project={project} sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-mist backdrop-blur">
            {project.category}
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-medium text-paper transition-colors group-hover:text-signal">{project.title}</h3>
            <p className="mt-1 text-sm text-fog">{project.client}{project.year && ` · ${project.year}`}</p>
          </div>
          <Arrow className="mt-1.5 shrink-0 -rotate-45 text-fog transition-all group-hover:rotate-0 group-hover:text-signal" />
        </div>
        <p className="mt-3 line-clamp-2 text-fog">{project.summary}</p>
      </Link>
    </Reveal>
  );
}

export function PostCard({ post, index }: { post: PostMeta; index: number }) {
  return (
    <Reveal as="article" delay={index * 0.08}>
      <Link href={`/blog/${post.slug}`} className="group block border-t border-line py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between md:gap-12">
          <p className="shrink-0 font-mono text-xs text-fog md:w-40">{formatDate(post.date)}</p>
          <div className="flex-1">
            <h3 className="text-2xl font-medium text-paper transition-colors group-hover:text-signal">{post.title}</h3>
            <p className="mt-2 text-fog">{post.description}</p>
          </div>
          <p className="shrink-0 font-mono text-xs text-fog">{post.readingTime}</p>
        </div>
      </Link>
    </Reveal>
  );
}

export function TechMarquee() {
  const items = [...techStack, ...techStack];
  return (
    <div className="relative overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <ul className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]" aria-label="Technologies">
        {items.map((t, i) => (
          <li key={`${t.slug}-${i}`} aria-hidden={i >= techStack.length} className="flex items-center gap-3 text-sm text-fog">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={techLogoUrl(t.slug, t.color)} alt="" width={20} height={20} loading="lazy" className="h-5 w-5" />
            {t.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CtaBand({ title = "Have a problem AI could solve?", body }: { title?: string; body?: string }) {
  return (
    <section className="container-page py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-16 text-center md:px-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,color-mix(in_oklab,var(--color-signal)_22%,transparent),transparent)]" />
          <p className="eyebrow relative mb-5">Free 30-minute discovery call</p>
          <h2 className="relative mx-auto max-w-3xl text-4xl font-medium tracking-tight text-paper md:text-6xl">{title}</h2>
          <p className="relative mx-auto mt-6 max-w-xl text-lg text-fog">
            {body ?? "Tell me what's slowing your business down. You'll leave the call with ideas you can use — whether or not we work together."}
          </p>
          <div className="relative mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact">Book a call <Arrow /></ButtonLink>
            <ButtonLink href="/services" variant="ghost">See packages</ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
