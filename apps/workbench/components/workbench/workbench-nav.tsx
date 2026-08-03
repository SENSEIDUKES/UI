import Link from "next/link";

import { cn } from "@seihouse/ui";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/workbench", label: "Workbench" },
  { href: "/foundations", label: "Foundations" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contexts", label: "Contexts" },
  { href: "/lab/raw", label: "Raw Lab" },
] as const;

/** Calm top bar shared by all workbench pages. */
export function WorkbenchNav({ current }: { current?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0c]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-7 shrink-0 place-items-center rounded-full border border-dashed border-[var(--sh-interactive-selected-border)] bg-[var(--sh-interactive-selected)] text-[0.55rem] font-black tracking-[0.1em] text-[var(--sh-interactive-text)]">
            SEI
          </span>
          <span className="truncate text-xs font-bold uppercase tracking-[0.16em] text-white">
            SEIHouse UI Workbench
          </span>
        </Link>
        <nav aria-label="Workbench" className="flex items-center gap-1 overflow-x-auto text-xs">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current === link.href ? "page" : undefined}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-1.5 font-semibold text-[var(--sh-color-cloud)] transition-colors hover:text-white",
                current === link.href && "bg-white/[0.07] text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
