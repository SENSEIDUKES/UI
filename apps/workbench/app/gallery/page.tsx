import type { Metadata } from "next";
import Link from "next/link";

import {
  getComponentsByLayer,
  layerMeta,
  orderedLayers,
  statusMeta,
} from "@/registry/component-registry";
import { WorkbenchNav } from "@/components/workbench/workbench-nav";

export const metadata: Metadata = {
  title: "Gallery — SEIHOUSE-UI",
  description: "Grouped list of every reviewable SEIHouse component.",
};

const layerAnchors: Record<string, string> = {
  foundation: "foundation",
  state: "states",
  form: "forms",
  behavior: "behavior",
  menu: "menus",
  layout: "layout",
  media: "media",
  "music-particle": "music-particles",
  registry: "registry",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[var(--sh-color-ivory)]">
      <WorkbenchNav current="/gallery" />

      <main className="mx-auto w-full max-w-4xl px-5 pb-20">
        <div className="border-b border-white/10 py-10">
          <h1 className="text-2xl font-semibold tracking-[-0.04em] text-white">Components</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--sh-color-cloud)]">
            Every reviewable component, grouped by layer. Click a name to inspect it in the
            workbench — no previews here on purpose.
          </p>
        </div>

        <div className="space-y-10 py-10">
          {orderedLayers.map((layer) => {
            const entries = getComponentsByLayer(layer);
            if (entries.length === 0) return null;
            return (
              <section
                key={layer}
                id={layerAnchors[layer]}
                aria-labelledby={`gallery-${layer}`}
                className="scroll-mt-20"
              >
                <h2
                  id={`gallery-${layer}`}
                  className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]"
                >
                  {layerMeta[layer].label}
                </h2>
                <ul className="mt-3 grid gap-x-8 gap-y-1 sm:grid-cols-2">
                  {entries.map((entry) => (
                    <li key={entry.slug}>
                      <Link
                        href={`/workbench/${entry.slug}`}
                        className="group flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/[0.04]"
                      >
                        <span className="flex min-w-0 items-center gap-2 text-sm text-[var(--sh-color-cloud)] group-hover:text-white">
                          <span
                            aria-hidden="true"
                            className={`size-1.5 shrink-0 rounded-full ${statusMeta[entry.status].dot}`}
                          />
                          <span className="truncate">{entry.name}</span>
                        </span>
                        <span className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-[var(--sh-color-mist)]">
                          {statusMeta[entry.status].label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
