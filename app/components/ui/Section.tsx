import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`container-page py-24 md:py-32 ${className}`}>
      {(eyebrow || title) && (
        <Reveal className="mb-14 max-w-3xl">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          {title && (
            <h2 className="text-4xl font-medium tracking-tight text-paper md:text-6xl">{title}</h2>
          )}
          {intro && <p className="mt-6 text-lg leading-relaxed text-fog">{intro}</p>}
        </Reveal>
      )}
      {children}
    </section>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <header className="container-page pt-40 pb-12 md:pt-48">
      <Reveal className="max-w-4xl">
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h1 className="text-5xl font-medium tracking-tight text-paper md:text-7xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fog md:text-xl">{intro}</p>}
      </Reveal>
    </header>
  );
}

export function Serif({ children }: { children: ReactNode }) {
  return <span className="font-display font-normal italic text-glow">{children}</span>;
}
