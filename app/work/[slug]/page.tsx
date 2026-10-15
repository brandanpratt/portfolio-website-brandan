import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/app/data/site";
import { getProject, projects } from "@/app/data/projects";
import { CtaBand, ProjectCard } from "@/app/components/cards";
import { Arrow, ButtonLink } from "@/app/components/ui/Button";
import { Reveal } from "@/app/components/ui/Reveal";
import { JsonLd, personId } from "@/app/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, ...(project.images[0] && { images: [project.images[0]] }) },
  };
}

export default async function CaseStudy({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          url: `${SITE_URL}/work/${project.slug}`,
          creator: { "@id": personId },
          keywords: project.stack.join(", "),
          ...(project.images[0] && { image: `${SITE_URL}${project.images[0]}` }),
        }}
      />
      <article>
        <header className="container-page pt-36 md:pt-44">
          <Reveal>
            <Link href="/work" className="font-mono text-xs text-fog hover:text-signal">← All work</Link>
            <p className="eyebrow mt-8 mb-5">{project.category}</p>
            <h1 className="max-w-4xl text-5xl font-medium tracking-tight text-paper md:text-7xl">{project.title}</h1>
            <p className="mt-6 max-w-2xl text-lg text-fog md:text-xl">{project.summary}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mt-12 grid gap-6 border-y border-line py-6 sm:grid-cols-3">
              <div><dt className="font-mono text-xs uppercase tracking-widest text-fog">Client</dt><dd className="mt-2 text-paper">{project.client}</dd></div>
              <div><dt className="font-mono text-xs uppercase tracking-widest text-fog">Stack</dt><dd className="mt-2 text-paper">{project.stack.slice(0, 4).join(", ")}</dd></div>
              <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                {project.liveUrl && <ButtonLink href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="!py-2.5">Visit live <Arrow /></ButtonLink>}
                {project.repoUrl && <ButtonLink href={project.repoUrl} target="_blank" rel="noopener noreferrer" variant="ghost" className="!py-2.5">Source</ButtonLink>}
              </div>
            </dl>
          </Reveal>
        </header>

        {project.images[0] && (
          <Reveal className="container-page mt-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line bg-surface">
              <Image src={project.images[0]} alt={`${project.title} screenshot`} fill priority sizes="(min-width: 1216px) 1152px, 100vw" className="object-cover object-top" />
            </div>
          </Reveal>
        )}

        <div className="container-page mt-20 grid gap-16 md:grid-cols-[1fr_2fr]">
          <Reveal>
            <h2 className="eyebrow">The problem</h2>
          </Reveal>
          <Reveal><p className="text-2xl leading-snug text-paper md:text-3xl">{project.problem}</p></Reveal>

          <Reveal><h2 className="eyebrow">The approach</h2></Reveal>
          <Reveal>
            <ol className="space-y-6">
              {project.approach.map((a, i) => (
                <li key={a} className="flex gap-6 border-t border-line pt-6 text-lg text-mist">
                  <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</span>
                  {a}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal><h2 className="eyebrow">The outcome</h2></Reveal>
          <Reveal><p className="text-2xl leading-snug text-paper md:text-3xl">{project.outcome}</p></Reveal>

          <Reveal><h2 className="eyebrow">Stack</h2></Reveal>
          <Reveal>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => <li key={s} className="rounded-full border border-line px-4 py-2 font-mono text-xs text-mist">{s}</li>)}
            </ul>
          </Reveal>
        </div>

        {project.images.length > 1 && (
          <div className="container-page mt-24 grid gap-5 md:grid-cols-2">
            {project.images.slice(1).map((src, i) => (
              <Reveal key={src} delay={(i % 2) * 0.08}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface">
                  <Image src={src} alt={`${project.title} screen ${i + 2}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </article>

      <section className="container-page mt-32">
        <p className="eyebrow mb-10">More work</p>
        <div className="grid gap-x-6 gap-y-14 md:grid-cols-3">
          {others.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
