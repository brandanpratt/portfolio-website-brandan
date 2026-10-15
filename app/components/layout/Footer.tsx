import Link from "next/link";
import { nav, site } from "@/app/data/site";
import { payments } from "@/app/data/services";
import { Arrow } from "../ui/Button";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line">
      <div className="container-page py-20">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="eyebrow mb-5">Let&apos;s build</p>
            <Link href="/contact" className="group inline-flex items-end gap-4 text-4xl font-medium tracking-tight text-paper md:text-6xl">
              Start a project
              <Arrow className="mb-2 h-8 w-8 transition-transform group-hover:translate-x-2 group-hover:text-signal" />
            </Link>
            <p className="mt-6 max-w-sm text-fog">
              {site.location}. Working with clients across the Caribbean and worldwide. {payments.summary}
            </p>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-fog">Site</p>
            <ul className="space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-mist hover:text-signal">{n.label}</Link>
                </li>
              ))}
              <li><Link href="/contact" className="text-mist hover:text-signal">Contact</Link></li>
              <li><a href="/feed.xml" className="text-mist hover:text-signal">RSS</a></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-fog">Elsewhere</p>
            <ul className="space-y-3">
              <li><a href={site.links.github} target="_blank" rel="noopener noreferrer" className="text-mist hover:text-signal">GitHub</a></li>
              <li><a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-mist hover:text-signal">LinkedIn</a></li>
              <li><a href={site.links.x} target="_blank" rel="noopener noreferrer" className="text-mist hover:text-signal">X / Twitter</a></li>
              <li><a href={`mailto:${site.email}`} className="text-mist hover:text-signal">Email</a></li>
              <li><a href={site.resume} target="_blank" className="text-mist hover:text-signal">Résumé (PDF)</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-line pt-8 font-mono text-xs text-fog md:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. Built with Next.js, Three.js &amp; Claude.</p>
          <p>Nassau, BS · 25.04° N, 77.35° W</p>
        </div>
      </div>
    </footer>
  );
}
