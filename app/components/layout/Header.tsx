"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { nav } from "@/app/data/site";
import { buttonClass } from "../ui/Button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-line/70 bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="group flex items-center gap-3" aria-label="Brandan Pratt — home">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface font-mono text-xs text-paper transition-colors group-hover:border-signal">
            BP
          </span>
          <span className="hidden text-sm font-medium text-paper sm:block">Brandan Pratt</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm transition-colors ${active ? "text-signal" : "text-mist hover:text-paper"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            onClick={() => track("book_call_click", { location: "header" })}
            className={buttonClass("primary", "hidden !py-2.5 sm:inline-flex")}
          >
            Book a call
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-px w-4 bg-paper transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-4 bg-paper transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="container-page flex flex-col gap-1 pb-6 md:hidden">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="border-b border-line/60 py-4 text-2xl text-paper">
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className={buttonClass("primary", "mt-5")}>
            Book a call
          </Link>
        </nav>
      )}
    </header>
  );
}
