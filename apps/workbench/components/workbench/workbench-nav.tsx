import Link from "next/link";

import {
  SEIDrawer,
  SEIDrawerBody,
  SEIDrawerClose,
  SEIDrawerContent,
  SEIDrawerDescription,
  SEIDrawerHeader,
  SEIDrawerTitle,
  SEIDrawerTrigger,
  cn,
} from "@seihouse/ui";
import { Menu } from "lucide-react";

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
  const activeLink = navLinks.find((link) => link.href === current);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0c]/90 backdrop-blur-xl">
      <div
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 pb-3 md:gap-4"
        style={{
          paddingTop: "max(0.75rem, var(--sh-safe-top))",
          paddingInlineStart: "max(1.25rem, var(--sh-safe-left))",
          paddingInlineEnd: "max(1.25rem, var(--sh-safe-right))",
        }}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="grid size-7 shrink-0 place-items-center rounded-full border border-dashed border-[var(--sh-interactive-selected-border)] bg-[var(--sh-interactive-selected)] text-[0.55rem] font-black tracking-[0.1em] text-[var(--sh-interactive-text)]">
            SEI
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-white md:hidden">
            SEIHouse
          </span>
          <span className="hidden text-xs font-bold uppercase tracking-[0.16em] text-white md:inline">
            SEIHouse UI Workbench
          </span>
        </Link>

        <nav aria-label="Workbench" className="hidden items-center gap-1 text-xs md:flex">
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

        <div className="md:hidden">
          <SEIDrawer modal>
            <SEIDrawerTrigger className="flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-white transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)]">
              <Menu aria-hidden="true" className="size-4 shrink-0" />
              <span>Menu</span>
              {activeLink ? (
                <span className="flex items-center gap-2 text-[var(--sh-color-cloud)]">
                  <span aria-hidden="true">·</span>
                  <span>{activeLink.label}</span>
                </span>
              ) : null}
            </SEIDrawerTrigger>
            <SEIDrawerContent
              side="right"
              size="compact"
              tone="dark"
              className="pt-[var(--sh-safe-top)] pr-[var(--sh-safe-right)] pl-[var(--sh-safe-left)]"
            >
              <SEIDrawerHeader>
                <SEIDrawerTitle>Workbench navigation</SEIDrawerTitle>
                <SEIDrawerDescription>Choose a destination.</SEIDrawerDescription>
              </SEIDrawerHeader>
              <SEIDrawerBody>
                <nav aria-label="Workbench">
                  <ul className="grid gap-1">
                    {navLinks.map((link) => {
                      const isActive = current === link.href;

                      return (
                        <li key={link.href}>
                          <SEIDrawerClose
                            render={
                              <Link
                                href={link.href}
                                aria-current={isActive ? "page" : undefined}
                                className={cn(
                                  "flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 py-2.5 font-semibold text-[var(--sh-color-cloud)] transition-colors hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)]",
                                  isActive && "bg-white/[0.07] text-white",
                                )}
                              >
                                <span>{link.label}</span>
                                {isActive ? (
                                  <span
                                    aria-hidden="true"
                                    className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--sh-interactive-text)]"
                                  >
                                    Current
                                  </span>
                                ) : null}
                              </Link>
                            }
                          />
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </SEIDrawerBody>
            </SEIDrawerContent>
          </SEIDrawer>
        </div>
      </div>
    </header>
  );
}
