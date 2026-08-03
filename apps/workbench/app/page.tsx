import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  componentRegistry,
  getComponentsByLayer,
  getComponentsByStatus,
  statusMeta,
  type ReviewStatus,
  type WorkbenchComponentEntry,
} from "@/registry/component-registry";
import { contextRegistry } from "@/registry/context-registry";
import { SEIBadge } from "@seihouse/ui";
import { WorkbenchNav } from "@/components/workbench/workbench-nav";

const sections = [
  {
    name: "Foundation Diagnostics",
    href: "/foundations",
    description: "Tokens, surfaces, states, forms, scroll, layering — the infrastructure layer.",
    count: () => null,
  },
  {
    name: "Foundation",
    href: "/gallery#foundation",
    description: "Buttons, badges, cards, panels, sections.",
    count: () => getComponentsByLayer("foundation").length,
  },
  {
    name: "Music Particles",
    href: "/gallery#music-particles",
    description: "Albums, artists, vault, player, dashboard pieces.",
    count: () => getComponentsByLayer("music-particle").length,
  },
  {
    name: "Behavior",
    href: "/gallery#behavior",
    description: "Dialogs, drawers, tabs, comboboxes, command palette.",
    count: () => getComponentsByLayer("behavior").length,
  },
  {
    name: "Registry",
    href: "/gallery#registry",
    description: "Seals and panels for verification states.",
    count: () => getComponentsByLayer("registry").length,
  },
  {
    name: "Layout Contexts",
    href: "/contexts",
    description: "Components inside real SEIHouse product situations.",
    count: () => contextRegistry.length,
  },
  {
    name: "Raw Lab",
    href: "/lab/raw",
    description: "The original all-in-one showcase, preserved as-is.",
    count: () => null,
  },
];

const queueColumns: { title: string; statuses: ReviewStatus[] }[] = [
  { title: "Needs review", statuses: ["not-designed", "rough", "reviewing"] },
  { title: "Experimental", statuses: ["experimental"] },
  { title: "Approved foundation", statuses: ["approved-foundation"] },
];

function QueueItem({ entry }: { entry: WorkbenchComponentEntry }) {
  return (
    <li>
      <Link
        href={`/workbench/${entry.slug}`}
        className="group flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.025] px-3 py-2 transition-colors hover:border-white/18 hover:bg-white/[0.05]"
      >
        <span className="flex min-w-0 items-center gap-2 text-sm text-[var(--sh-color-cloud)] group-hover:text-white">
          <span
            aria-hidden="true"
            className={`size-1.5 shrink-0 rounded-full ${statusMeta[entry.status].dot}`}
          />
          <span className="truncate">{entry.name}</span>
        </span>
        <ArrowRight
          aria-hidden="true"
          className="size-3.5 shrink-0 text-[var(--sh-color-mist)] group-hover:text-white"
        />
      </Link>
    </li>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[var(--sh-color-ivory)]">
      <WorkbenchNav current="/" />

      <main className="mx-auto w-full max-w-6xl px-5 pb-20">
        <section className="border-b border-white/10 py-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--sh-interactive-text)]">
            Internal design review
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            SEIHouse UI Workbench
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--sh-color-cloud)]">
            SEIHouse UI Workbench is an internal place to inspect and design SEIHouse components
            before they become final. One component at a time — change variants, mock data, and
            canvas, then say &ldquo;change this.&rdquo;
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/workbench"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,122,255,0.45)] bg-[var(--sh-color-sea)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2490ff]"
            >
              Open workbench
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-white/14 px-5 py-2.5 text-sm font-semibold text-[var(--sh-color-ivory)] transition-colors hover:border-white/28 hover:bg-white/[0.05]"
            >
              Component list
            </Link>
            <SEIBadge variant="registry" size="sm">
              {componentRegistry.length} components · mock data only
            </SEIBadge>
          </div>
        </section>

        <section aria-labelledby="sections-heading" className="border-b border-white/10 py-10">
          <h2
            id="sections-heading"
            className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]"
          >
            Sections
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => {
              const count = section.count();
              return (
                <Link
                  key={section.name}
                  href={section.href}
                  className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.045]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-white">{section.name}</h3>
                    {count !== null ? (
                      <span className="font-mono text-xs text-[var(--sh-color-mist)]">{count}</span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--sh-color-cloud)]">
                    {section.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="queue-heading" className="py-10">
          <h2
            id="queue-heading"
            className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]"
          >
            Design review queue
          </h2>
          <div className="mt-4 grid gap-5 lg:grid-cols-3">
            {queueColumns.map((column) => {
              const entries = column.statuses.flatMap((status) => getComponentsByStatus(status));
              return (
                <div key={column.title}>
                  <div className="mb-2 flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-white">{column.title}</h3>
                    <span className="font-mono text-xs text-[var(--sh-color-mist)]">
                      {entries.length}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {entries.map((entry) => (
                      <QueueItem key={entry.slug} entry={entry} />
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t border-white/10 py-8 text-xs text-[var(--sh-color-mist)] sm:flex-row sm:items-center sm:justify-between">
          <span>SEIHOUSE-UI · internal component workbench</span>
          <span className="font-mono">nothing here is final · mock data only</span>
        </footer>
      </main>
    </div>
  );
}
