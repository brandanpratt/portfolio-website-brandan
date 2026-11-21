import type { Metadata } from "next";
import { site } from "./data/site";
import { Arrow, ButtonLink } from "./components/ui/Button";
import { Serif } from "./components/ui/Section";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — Under maintenance` },
  robots: { index: false, follow: true },
};

export default function Home() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="container-page relative z-10 pt-28 pb-20">
        <div className="animate-rise">
          <p className="eyebrow mb-8">Under maintenance · {site.location}</p>
        </div>
        <div className="animate-rise [animation-delay:100ms]">
          <h1 className="max-w-5xl text-[clamp(2.75rem,8vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.035em] text-paper">
            Something new is <br className="hidden sm:block" />
            <Serif>being built.</Serif>
          </h1>
        </div>
        <div className="animate-rise [animation-delay:200ms]">
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-mist md:text-xl">
            I&apos;m redesigning this site. Check back soon. In the meantime, you can still reach me directly.
          </p>
        </div>
        <div className="mt-10 flex animate-rise flex-col gap-3 [animation-delay:300ms] sm:flex-row">
          <ButtonLink href={`mailto:${site.email}`}>Email me <Arrow /></ButtonLink>
          <ButtonLink href={site.links.linkedin} variant="ghost">LinkedIn</ButtonLink>
        </div>
      </div>
    </section>
  );
}
