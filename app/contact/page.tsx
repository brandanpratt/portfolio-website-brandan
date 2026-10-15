import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "../data/site";
import { payments } from "../data/services";
import { InquiryForm } from "../components/contact/InquiryForm";
import { CalEmbed } from "../components/contact/CalEmbed";
import { PageHeader, Serif } from "../components/ui/Section";
import { Reveal } from "../components/ui/Reveal";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Book a free 30-minute discovery call with Brandan Pratt, or send a project inquiry. AI consulting, agents, automation and web development for clients worldwide.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Let&apos;s talk about <Serif>your</Serif> project</>}
        intro="Book a free 30-minute discovery call, or tell me about your project and I'll reply within one business day."
      />

      <section id="book" className="container-page scroll-mt-28">
        <Reveal>
          <CalEmbed />
        </Reveal>
      </section>

      <section className="container-page mt-20 grid gap-12 md:grid-cols-[1fr_2fr]">
        <Reveal>
          <p className="eyebrow mb-4">Or send an inquiry</p>
          <h2 className="text-3xl font-medium text-paper">Prefer to write it down?</h2>
          <ul className="mt-8 space-y-5 text-fog">
            <li><span className="block font-mono text-xs uppercase tracking-widest">Email</span><a href={`mailto:${site.email}`} className="text-paper hover:text-signal">{site.email}</a></li>
            <li><span className="block font-mono text-xs uppercase tracking-widest">Based in</span><span className="text-paper">{site.location} · US Eastern</span></li>
            <li><span className="block font-mono text-xs uppercase tracking-widest">Payment</span><span className="text-paper">{payments.summary}</span></li>
            <li className="flex gap-4 pt-2">
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-signal hover:underline">LinkedIn</a>
              <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="text-signal hover:underline">GitHub</a>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="relative">
          <Suspense fallback={null}>
            <InquiryForm />
          </Suspense>
        </Reveal>
      </section>
    </>
  );
}
