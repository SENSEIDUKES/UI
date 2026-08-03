"use client";

import { useState } from "react";
import { Command, Layers, ListMusic, Radio, ShieldCheck, Sparkles } from "lucide-react";

import { mockPlayerTracks, mockVaultFragments } from "@/lib/mock-data/examples";
import { RegistrySeal } from "@seihouse/ui";
import { ShowcaseBlock } from "@seihouse/ui";
import { VaultFragmentCard } from "@seihouse/ui";
import { SEIBadge } from "@seihouse/ui";
import { SEIButton } from "@seihouse/ui";
import { cn } from "@seihouse/ui";
import { seiButtonVariants } from "@seihouse/ui";
import { reducedMotionNotes } from "@seihouse/ui";

import {
  SEINativeDrawer,
  SEINativeDrawerBody,
  SEINativeDrawerClose,
  SEINativeDrawerContent,
  SEINativeDrawerFooter,
  SEINativeDrawerHeader,
  SEINativeDrawerTitle,
  SEINativeDrawerTrigger,
} from "@seihouse/ui";
import { SEIMultiSelectCombobox } from "@seihouse/ui";
import { SEICommandPalette } from "@seihouse/ui";
import {
  mockCommandGroups,
  mockDojoCategories,
  mockGenreOptions,
  mockRecentCommandIds,
  mockRegistryLabels,
  mockVaultTags,
} from "@/lib/mock-data/behavior-mock";

type ButtonVariant = "solid" | "soft" | "outline" | "ghost";
const triggerClass = (variant: ButtonVariant) => seiButtonVariants({ variant });

function NativeDrawerDemos() {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Player queue — bottom drawer with snap points */}
      <SEINativeDrawer side="bottom" snapPoints={[0.4, 0.9]}>
        <SEINativeDrawerTrigger className={triggerClass("solid")}>
          <ListMusic aria-hidden="true" className="size-4" />
          Player queue
        </SEINativeDrawerTrigger>
        <SEINativeDrawerContent side="bottom" tone="dark">
          <SEINativeDrawerHeader>
            <SEINativeDrawerTitle>Up next · drag or snap</SEINativeDrawerTitle>
          </SEINativeDrawerHeader>
          <SEINativeDrawerBody>
            <ul className="space-y-2 pb-4">
              {mockPlayerTracks[0].queue.concat(mockPlayerTracks[1].queue).map((track, i) => (
                <li
                  key={`${track}-${i}`}
                  className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-sm"
                >
                  <span className="text-[var(--sh-color-cloud)]">
                    <span className="mr-2 font-mono text-xs text-[var(--sh-color-mist)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {track}
                  </span>
                  <SEIBadge size="sm" variant="outline">
                    mock
                  </SEIBadge>
                </li>
              ))}
            </ul>
          </SEINativeDrawerBody>
          <SEINativeDrawerFooter>
            <SEINativeDrawerClose className={triggerClass("ghost")}>Done</SEINativeDrawerClose>
          </SEINativeDrawerFooter>
        </SEINativeDrawerContent>
      </SEINativeDrawer>

      {/* Vault fragment detail — right drawer */}
      <SEINativeDrawer side="right">
        <SEINativeDrawerTrigger className={triggerClass("soft")}>
          <Layers aria-hidden="true" className="size-4" />
          Vault fragment
        </SEINativeDrawerTrigger>
        <SEINativeDrawerContent side="right" size="wide" tone="dark">
          <SEINativeDrawerHeader>
            <SEINativeDrawerTitle>Vault fragment detail</SEINativeDrawerTitle>
          </SEINativeDrawerHeader>
          <SEINativeDrawerBody>
            <VaultFragmentCard fragment={mockVaultFragments[0]} variant="default" />
          </SEINativeDrawerBody>
          <SEINativeDrawerFooter>
            <SEINativeDrawerClose className={triggerClass("ghost")}>Close</SEINativeDrawerClose>
            <SEIButton variant="solid">Tag fragment</SEIButton>
          </SEINativeDrawerFooter>
        </SEINativeDrawerContent>
      </SEINativeDrawer>

      {/* Plugin settings — right drawer */}
      <SEINativeDrawer side="right">
        <SEINativeDrawerTrigger className={triggerClass("outline")}>
          <Radio aria-hidden="true" className="size-4" />
          Plugin settings
        </SEINativeDrawerTrigger>
        <SEINativeDrawerContent side="right" size="default" tone="glass-test">
          <SEINativeDrawerHeader>
            <SEINativeDrawerTitle>Plugin slot · SAP</SEINativeDrawerTitle>
          </SEINativeDrawerHeader>
          <SEINativeDrawerBody>
            <p className="text-[var(--sh-color-cloud)]">
              Mock plugin configuration surface. No plugin runtime is loaded — this only previews
              how a settings drawer would feel.
            </p>
            <div className="mt-4 space-y-2">
              {["Enable visualizer", "Auto-tag metadata", "Vault Radio eligible"].map((label) => (
                <label
                  key={label}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[var(--sh-color-cloud)]"
                >
                  {label}
                  <span
                    className="h-5 w-9 rounded-full bg-[rgba(0,122,255,0.4)]"
                    aria-hidden="true"
                  />
                </label>
              ))}
            </div>
          </SEINativeDrawerBody>
          <SEINativeDrawerFooter>
            <SEINativeDrawerClose className={triggerClass("ghost")}>Cancel</SEINativeDrawerClose>
            <SEINativeDrawerClose className={triggerClass("solid")}>Save</SEINativeDrawerClose>
          </SEINativeDrawerFooter>
        </SEINativeDrawerContent>
      </SEINativeDrawer>

      {/* Registry detail — bottom drawer */}
      <SEINativeDrawer side="bottom">
        <SEINativeDrawerTrigger className={triggerClass("ghost")}>
          <ShieldCheck aria-hidden="true" className="size-4" />
          Registry detail
        </SEINativeDrawerTrigger>
        <SEINativeDrawerContent side="bottom" tone="soft">
          <SEINativeDrawerHeader>
            <SEINativeDrawerTitle>Registry record</SEINativeDrawerTitle>
          </SEINativeDrawerHeader>
          <SEINativeDrawerBody>
            <div className="flex flex-wrap items-center gap-3 pb-4">
              <RegistrySeal status="verified" registryId="V-777" />
              <RegistrySeal status="registered" registryId="SEI-042" />
              <p className="text-sm text-[var(--sh-color-cloud)]">
                Mock verification line — no registry service is attached.
              </p>
            </div>
          </SEINativeDrawerBody>
          <SEINativeDrawerFooter>
            <SEINativeDrawerClose className={triggerClass("ghost")}>Close</SEINativeDrawerClose>
          </SEINativeDrawerFooter>
        </SEINativeDrawerContent>
      </SEINativeDrawer>
    </div>
  );
}

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <SEIButton variant="solid" icon={Command} onClick={() => setOpen(true)}>
          Open command palette
        </SEIButton>
        <span className="text-sm text-[var(--sh-color-mist)]">
          or press{" "}
          <kbd className="rounded-md border border-white/12 bg-white/[0.05] px-1.5 py-0.5 font-mono text-xs">
            ⌘K
          </kbd>{" "}
          /{" "}
          <kbd className="rounded-md border border-white/12 bg-white/[0.05] px-1.5 py-0.5 font-mono text-xs">
            Ctrl K
          </kbd>
        </span>
      </div>
      <p className="text-xs text-[var(--sh-color-mist)]">
        Fuzzy search (try <span className="font-mono text-[var(--sh-color-cloud)]">ovf</span> →
        “Open Vault Fragments”), grouped arrow-key navigation, and a recent-commands section.
        {last ? (
          <span className="ml-1 text-[var(--sh-interactive-text)]">Last run (mock): {last}</span>
        ) : null}
      </p>
      <SEICommandPalette
        groups={mockCommandGroups}
        defaultRecentIds={mockRecentCommandIds}
        open={open}
        onOpenChange={setOpen}
        onCommand={(id) => setLast(id)}
      />
    </div>
  );
}

export function BehaviorHardeningShowcase() {
  return (
    <div id="behavior-hardening" className="space-y-6">
      {/* Native drawer */}
      <ShowcaseBlock
        variant="default"
        title="Native drawer — swipe & snap"
        description="vaul adds drag-to-dismiss and snap points on top of an accessible Radix Dialog (focus trap, Escape, focus return). Bottom drawers get a drag handle and snap points; side drawers slide in. Styling stays in SEIHouse variants."
        actions={
          <SEIBadge variant="soft" size="sm">
            vaul
          </SEIBadge>
        }
      >
        <NativeDrawerDemos />
      </ShowcaseBlock>

      {/* Multi-select combobox */}
      <ShowcaseBlock
        variant="soft"
        title="Multi-select combobox"
        description="Searchable tagging input with removable chips, keyboard navigation, disabled options, clear-all, helper/error text, and an empty state. React Aria provides combobox + tag-group semantics."
        actions={
          <SEIBadge variant="media-test" size="sm">
            React Aria
          </SEIBadge>
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          <SEIMultiSelectCombobox
            label="Vault tag picker"
            description="Mock vault tags — one option is disabled."
            options={mockVaultTags}
            defaultValue={["demo"]}
          />
          <SEIMultiSelectCombobox
            label="Album genre picker"
            description="Pick one or more genres."
            placeholder="Search genres…"
            options={mockGenreOptions}
            defaultValue={["melodic-rap", "rnb"]}
          />
          <SEIMultiSelectCombobox
            label="Registry label picker"
            placeholder="Search labels…"
            options={mockRegistryLabels}
            errorMessage="At least one label is required (mock validation)."
          />
          <SEIMultiSelectCombobox
            label="Dojo category picker"
            description="Categorize a Dojo module."
            placeholder="Search categories…"
            options={mockDojoCategories}
            defaultValue={["artist-world"]}
          />
        </div>
      </ShowcaseBlock>

      {/* Command palette */}
      <ShowcaseBlock
        variant="default"
        title="Global command palette"
        description="A modal command palette opened with ⌘K / Ctrl K. Base UI Dialog handles modal a11y; React Aria handles grouped keyboard navigation; a tiny dependency-free fuzzy matcher powers search with match highlighting."
        actions={
          <SEIBadge variant="soft" size="sm">
            Base UI + React Aria
          </SEIBadge>
        }
      >
        <CommandPaletteDemo />
      </ShowcaseBlock>

      {/* A11y tests + reduced motion */}
      <div className="grid gap-5 lg:grid-cols-2">
        <ShowcaseBlock
          variant="outline"
          title="Accessibility tests"
          description="Playwright + axe guard keyboard and ARIA behavior so the lab does not silently regress."
          actions={
            <SEIBadge variant="success" size="sm">
              Playwright + axe
            </SEIBadge>
          }
        >
          <div className="space-y-2 text-sm text-[var(--sh-color-cloud)]">
            <p>
              Specs live in <code className="font-mono text-xs">test/accessibility/</code>:
            </p>
            <ul className="ml-4 list-disc space-y-1 text-[var(--sh-color-mist)]">
              <li>
                axe scans on <span className="font-mono">/</span> and{" "}
                <span className="font-mono">/lab</span>
              </li>
              <li>dialog / drawer / tabs / palette keyboard flows</li>
              <li>multi-select focus + selection</li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs">
              <code className="rounded-md border border-white/12 bg-white/[0.05] px-2 py-1">
                npx playwright install
              </code>
              <code className="rounded-md border border-white/12 bg-white/[0.05] px-2 py-1">
                pnpm test:a11y
              </code>
              <code className="rounded-md border border-white/12 bg-white/[0.05] px-2 py-1">
                pnpm test:e2e
              </code>
            </div>
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock
          variant="glass-test"
          title="Reduced motion strategy"
          description="Motion is optional. The lab honours prefers-reduced-motion by shortening transitions rather than removing UI feedback."
          actions={
            <SEIBadge variant="warning" size="sm">
              prefers-reduced-motion
            </SEIBadge>
          }
        >
          <ul className="space-y-2 text-sm text-[var(--sh-color-cloud)]">
            {reducedMotionNotes.map((note) => (
              <li key={note} className="flex gap-2">
                <Sparkles
                  aria-hidden="true"
                  className="mt-0.5 size-3.5 shrink-0 text-[var(--sh-interactive-text)]"
                />
                {note}
              </li>
            ))}
          </ul>
        </ShowcaseBlock>
      </div>

      {/* Promoted variants */}
      <ShowcaseBlock
        variant="default"
        title="Promoted shared variants"
        description="Stable behavior styles now live in packages/seihouse-ui/src/styles/variants.ts and are reused across components: overlay scrim, popup surfaces, interactive item states, and command group headers."
        actions={
          <SEIBadge variant="registry" size="sm">
            @seihouse/ui styles
          </SEIBadge>
        }
      >
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {[
            "seiOverlayVariants",
            "seiPopupSurfaceVariants",
            "seiInteractiveItemVariants",
            "seiCommandGroupHeader",
          ].map((name) => (
            <code
              key={name}
              className={cn(
                "rounded-md border border-white/12 bg-white/[0.05] px-2 py-1 text-[var(--sh-color-cloud)]",
              )}
            >
              {name}
            </code>
          ))}
        </div>
      </ShowcaseBlock>
    </div>
  );
}
