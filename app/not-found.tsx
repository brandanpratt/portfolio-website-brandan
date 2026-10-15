import { Arrow, ButtonLink } from "./components/ui/Button";
import { Serif } from "./components/ui/Section";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80vh] flex-col items-start justify-center pt-32">
      <p className="eyebrow mb-5">404</p>
      <h1 className="text-5xl font-medium tracking-tight text-paper md:text-7xl">
        This node is <Serif>disconnected.</Serif>
      </h1>
      <p className="mt-6 max-w-lg text-lg text-fog">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-10 flex gap-3">
        <ButtonLink href="/">Back home <Arrow /></ButtonLink>
        <ButtonLink href="/contact" variant="ghost">Book a call</ButtonLink>
      </div>
    </section>
  );
}
