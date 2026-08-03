"use client";

import { useState } from "react";

import { cn } from "@seihouse/ui";

import { WorkbenchNav } from "@/components/workbench/workbench-nav";
import { foundationSections } from "@/components/foundations/sections";

export default function FoundationsPage() {
  const [activeId, setActiveId] = useState(foundationSections[0]?.id);
  const active =
    foundationSections.find((section) => section.id === activeId) ?? foundationSections[0];

  if (!active) {
    return null;
  }
  const ActiveSection = active.Component;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[var(--sh-color-ivory)]">
      <WorkbenchNav current="/foundations" />

      <main className="mx-auto w-full max-w-6xl px-5 pb-20">
        <div className="border-b border-white/10 py-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--sh-interactive-text)]">
            Core UI infrastructure
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
            Foundation Diagnostics
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--sh-color-cloud)]">
            The systems future SEIHouse apps depend on — tokens, surfaces, states, forms, layout,
            scroll, media, and layering. This exposes infrastructure, not finished screens.
            Everything is mock-only and application-agnostic.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 py-6" role="tablist" aria-label="Foundation systems">
          {foundationSections.map((section) => (
            <button
              key={section.id}
              type="button"
              role="tab"
              aria-selected={section.id === active.id}
              onClick={() => setActiveId(section.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)]",
                section.id === active.id
                  ? "border-[rgba(0,122,255,0.45)] bg-[rgba(0,122,255,0.14)] text-white"
                  : "border-white/10 bg-white/[0.03] text-[var(--sh-color-cloud)] hover:border-white/20 hover:text-white",
              )}
            >
              {section.name}
            </button>
          ))}
        </div>

        <section aria-label={active.name}>
          <p className="mb-6 text-sm text-[var(--sh-color-mist)]">{active.description}</p>
          <ActiveSection />
        </section>
      </main>
    </div>
  );
}
