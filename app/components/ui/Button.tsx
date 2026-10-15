import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "subtle";

const styles: Record<Variant, string> = {
  primary:
    "bg-signal text-ink hover:bg-paper shadow-[0_0_40px_-8px_var(--color-signal)] hover:shadow-[0_0_60px_-6px_var(--color-signal)]",
  ghost: "border border-line text-paper hover:border-signal/60 hover:text-signal",
  subtle: "text-mist hover:text-signal",
};

export function buttonClass(variant: Variant = "primary", className = "") {
  return `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 ${styles[variant]} ${className}`;
}

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", className, children, ...props }: Props) {
  return (
    <Link {...props} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={`h-4 w-4 ${className}`}>
      <path d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
