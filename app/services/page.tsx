import type { Metadata } from "next";
import { faqs, engagementProcess, payments, services } from "../data/services";
import { CtaBand, ServiceCard } from "../components/cards";
import { PageHeader, Section, Serif } from "../components/ui/Section";
import { Reveal } from "../components/ui/Reveal";
import { JsonLd } from "../lib/jsonld";

export const metadata: Metadata = {
  title: "AI Consulting, Agents & Web Development Services",
  description:
    "AI readiness audits, custom AI agents and automation, web and app development, and fractional CTO advisory. Transparent starting prices. Bahamas-based, working worldwide. Crypto accepted.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <PageHeader
        eyebrow="Services & pricing"
        title={<>Advice you can act on. <Serif>Software that ships.</Serif></>}
        intro="Start with strategy, go straight to building, or keep me on as your technical partner. Every engagement begins with a free discovery call and a fixed quote."
      />

      <section className="container-page pb-12">
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} detailed />
          ))}
        </div>
      </section>

      <section className="container-page">
        <Reveal className="glass flex flex-col gap-6 rounded-3xl p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="eyebrow mb-2">Payment</p>
            <p className="text-lg text-paper">{payments.summary}</p>
            <p className="mt-1 text-sm text-fog">{payments.terms}</p>
          </div>
          <ul className="flex flex-wrap gap-2" aria-label="Accepted currencies">
            {["USD", "BSD", ...payments.crypto].map((c) => (
              <li key={c} className={`rounded-full border px-4 py-2 font-mono text-xs ${payments.crypto.includes(c as never) ? "border-sun/40 text-sun" : "border-line text-mist"}`}>
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <Section eyebrow="Process" title={<>How we&apos;ll <Serif>work</Serif></>}>
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

      <Section eyebrow="FAQ" title={<>Questions, <Serif>answered</Serif></>}>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg text-paper [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-signal transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-3xl leading-relaxed text-fog">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <CtaBand title="Not sure which package fits?" body="Book a free call. We'll figure out the smallest step that gets you a real result." />
    </>
  );
}
