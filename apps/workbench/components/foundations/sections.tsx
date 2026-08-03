"use client";

import { useState } from "react";
import { RefreshCw, Search, Filter, Inbox, Music, Plus, Star } from "lucide-react";

import {
  SEIButton,
  SEIBadge,
  SEIPanel,
  // states
  SEISkeleton,
  SEISpinner,
  SEIProgressBar,
  SEIStatusLine,
  SEIStatusDot,
  SEIEmptyState,
  SEILoadingState,
  SEIErrorState,
  SEISuccessState,
  // forms
  SEIField,
  SEIInput,
  SEITextarea,
  SEISelect,
  SEISwitch,
  SEICheckbox,
  SEIRadioGroup,
  SEIRadio,
  SEISlider,
  // layout
  SEIContainer,
  SEIAppShell,
  SEIPageHeader,
  SEIToolbar,
  SEIActionBar,
  SEIFilterBar,
  SEISplitPane,
  SEIStickyFooter,
  SEISafeArea,
  // scroll
  SEIScrollArea,
  SEIScrollLane,
  // media
  SEIAspectRatio,
  SEIThumbnail,
  SEIAvatar,
  SEIMediaRow,
  // utilities
  SEI_Z_INDEX,
  seiLayer,
  seiSurfaceVariants,
  reducedMotionNotes,
  cn,
} from "@seihouse/ui";

import { DiagBlock, DiagGrid, DiagTile } from "./shared";

/* ------------------------------------------------------------------ */
/* 1 — Tokens                                                          */
/* ------------------------------------------------------------------ */

const textSizes = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"] as const;
const colorTokens = [
  "charcoal",
  "iron",
  "steel",
  "slate",
  "mist",
  "cloud",
  "ivory",
  "sea",
  "accent",
  "success",
  "warning",
  "danger",
] as const;
const spaceTokens = ["1", "2", "3", "4", "6", "8", "12", "16"] as const;
const radiusTokens = ["sm", "md", "lg", "xl", "2xl", "full"] as const;

export function TokensSection() {
  return (
    <div className="space-y-10">
      <DiagBlock title="Typography scale" hint="--sh-text-*">
        <div className="space-y-2">
          {textSizes.map((size) => (
            <div key={size} className="flex items-baseline gap-4">
              <span className="w-12 shrink-0 font-mono text-[0.66rem] text-[var(--sh-color-mist)]">
                {size}
              </span>
              <span
                className="truncate text-[var(--sh-color-ivory)]"
                style={{ fontSize: `var(--sh-text-${size})` }}
              >
                SEIHouse foundation
              </span>
            </div>
          ))}
        </div>
      </DiagBlock>

      <DiagBlock title="Color & tone" hint="--sh-color-*">
        <DiagGrid cols={4}>
          {colorTokens.map((c) => (
            <DiagTile key={c} label={c}>
              <div
                className="h-12 w-full rounded-lg border border-white/10"
                style={{ background: `var(--sh-color-${c})` }}
              />
            </DiagTile>
          ))}
        </DiagGrid>
      </DiagBlock>

      <DiagBlock title="Spacing" hint="--sh-space-*">
        <div className="space-y-2">
          {spaceTokens.map((s) => (
            <div key={s} className="flex items-center gap-3">
              <span className="w-8 shrink-0 font-mono text-[0.66rem] text-[var(--sh-color-mist)]">
                {s}
              </span>
              <div
                className="h-3 rounded-full bg-[var(--sh-color-sea)]"
                style={{ width: `var(--sh-space-${s})` }}
              />
            </div>
          ))}
        </div>
      </DiagBlock>

      <DiagBlock title="Radius" hint="--sh-radius-*">
        <DiagGrid cols={4}>
          {radiusTokens.map((r) => (
            <DiagTile key={r} label={r}>
              <div
                className="h-12 w-full border border-[rgba(0,122,255,0.4)] bg-[rgba(0,122,255,0.12)]"
                style={{ borderRadius: `var(--sh-radius-${r})` }}
              />
            </DiagTile>
          ))}
        </DiagGrid>
      </DiagBlock>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2 — Surfaces, elevation, blur, glass, glow                          */
/* ------------------------------------------------------------------ */

export function SurfacesSection() {
  return (
    <div className="space-y-10">
      <DiagBlock title="Surface tones" hint="seiSurfaceVariants({ surface })">
        <DiagGrid cols={4}>
          {(["base", "elevated", "raised", "glass", "sunken"] as const).map((surface) => (
            <DiagTile key={surface} label={surface}>
              <div
                className={cn(
                  seiSurfaceVariants({ surface, elevation: 2 }),
                  "grid h-16 place-items-center rounded-xl text-xs text-[var(--sh-color-cloud)]",
                )}
              >
                {surface}
              </div>
            </DiagTile>
          ))}
        </DiagGrid>
      </DiagBlock>

      <DiagBlock title="Elevation" hint="--sh-elevation-0…5">
        <DiagGrid cols={3}>
          {([0, 1, 2, 3, 4, 5] as const).map((elevation) => (
            <DiagTile key={elevation} label={`elevation ${elevation}`}>
              <div
                className={cn(
                  seiSurfaceVariants({ surface: "elevated", elevation }),
                  "h-16 rounded-xl",
                )}
              />
            </DiagTile>
          ))}
        </DiagGrid>
      </DiagBlock>

      <DiagBlock title="Blur, glass & glow" hint="--sh-blur-* · --sh-glow-*">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_25%_20%,rgba(0,122,255,0.4),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,107,53,0.3),transparent_40%)] p-6">
          <DiagGrid cols={3}>
            <DiagTile label="glass">
              <div className="grid h-16 place-items-center rounded-xl border border-[var(--sh-glass-border)] bg-[var(--sh-glass-bg)] text-xs text-white backdrop-blur-[var(--sh-blur-md)]">
                glass
              </div>
            </DiagTile>
            <DiagTile label="glow sea">
              <div className="grid h-16 place-items-center rounded-xl border border-[rgba(0,122,255,0.4)] bg-[rgba(0,122,255,0.14)] text-xs text-white shadow-[var(--sh-glow-sea)]">
                glow
              </div>
            </DiagTile>
            <DiagTile label="glow accent">
              <div className="grid h-16 place-items-center rounded-xl border border-[rgba(255,107,53,0.4)] bg-[rgba(255,107,53,0.14)] text-xs text-white shadow-[var(--sh-glow-accent)]">
                glow
              </div>
            </DiagTile>
          </DiagGrid>
        </div>
      </DiagBlock>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3 — Interaction states                                              */
/* ------------------------------------------------------------------ */

export function InteractionSection() {
  return (
    <div className="space-y-10">
      <DiagBlock title="Button states" hint="hover · active · focus-visible · disabled · loading">
        <div className="flex flex-wrap items-center gap-3">
          <SEIButton variant="solid">Default</SEIButton>
          <SEIButton variant="solid" className="hover:bg-[#2490ff]">
            Hover me
          </SEIButton>
          <SEIButton variant="solid" loading>
            Loading
          </SEIButton>
          <SEIButton variant="solid" disabled>
            Disabled
          </SEIButton>
          <SEIButton variant="outline" icon={Star}>
            Focus (Tab)
          </SEIButton>
        </div>
        <p className="text-xs text-[var(--sh-color-mist)]">
          Tab through to see the shared <code>focusRing</code>. All movement is reduced-motion safe.
        </p>
      </DiagBlock>

      <DiagBlock title="Selected / current" hint="data-[selected]">
        <div className="flex flex-wrap gap-3">
          {["Vault", "Audio", "Registry", "Dojo"].map((label, i) => (
            <button
              key={label}
              type="button"
              data-selected={i === 1 ? "true" : undefined}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                "border-white/12 bg-white/[0.03] text-[var(--sh-color-cloud)] hover:border-white/24 hover:text-white",
                "data-[selected=true]:border-[rgba(0,122,255,0.45)] data-[selected=true]:bg-[rgba(0,122,255,0.14)] data-[selected=true]:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)]",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </DiagBlock>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4 — Application states                                              */
/* ------------------------------------------------------------------ */

export function StatesSection() {
  const [progress, setProgress] = useState(40);
  return (
    <div className="space-y-10">
      <DiagBlock title="Skeleton & spinner" hint="loading placeholders">
        <DiagGrid cols={2}>
          <DiagTile label="skeleton">
            <div className="space-y-2">
              <SEISkeleton height={14} width="60%" />
              <SEISkeleton height={14} />
              <SEISkeleton height={14} width="80%" />
            </div>
          </DiagTile>
          <DiagTile label="spinner">
            <div className="grid h-16 place-items-center">
              <SEISpinner size="lg" />
            </div>
          </DiagTile>
        </DiagGrid>
      </DiagBlock>

      <DiagBlock title="Progress" hint="clamped 0–100 · indeterminate">
        <div className="space-y-4">
          <SEIProgressBar value={progress} label="Upload" showValue tone="sea" />
          <SEIProgressBar indeterminate label="Importing" tone="accent" />
          <div className="flex gap-2">
            <SEIButton
              size="sm"
              variant="outline"
              onClick={() => setProgress((p) => Math.max(0, p - 10))}
            >
              −10
            </SEIButton>
            <SEIButton
              size="sm"
              variant="outline"
              onClick={() => setProgress((p) => Math.min(100, p + 10))}
            >
              +10
            </SEIButton>
          </div>
        </div>
      </DiagBlock>

      <DiagBlock title="Status" hint="dot & line">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <SEIStatusDot tone="success" pulse />
            <span className="text-sm text-[var(--sh-color-cloud)]">live</span>
          </div>
          <SEIStatusLine tone="sea" label="Syncing" description="3 of 12 fragments" />
          <SEIStatusLine tone="warning" label="Needs review" />
          <SEIStatusLine tone="danger" label="Failed" description="retry available" />
        </div>
      </DiagBlock>

      <DiagBlock title="Empty / loading / error / success" hint="application-agnostic blocks">
        <DiagGrid cols={2}>
          <DiagTile>
            <SEIEmptyState
              icon={Inbox}
              title="No fragments yet"
              description="Recovered audio will appear here once imported."
              action={
                <SEIButton size="sm" variant="soft" icon={Plus}>
                  Add
                </SEIButton>
              }
            />
          </DiagTile>
          <DiagTile>
            <SEILoadingState title="Loading vault" description="Fetching fragments…" />
          </DiagTile>
          <DiagTile>
            <SEIErrorState
              title="Couldn’t load"
              description="The request timed out."
              action={
                <SEIButton size="sm" variant="outline" icon={RefreshCw}>
                  Retry
                </SEIButton>
              }
            />
          </DiagTile>
          <DiagTile>
            <SEISuccessState title="Registered" description="Your work is now on-chain (mock)." />
          </DiagTile>
        </DiagGrid>
      </DiagBlock>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5 — Forms                                                           */
/* ------------------------------------------------------------------ */

export function FormsSection() {
  return (
    <div className="space-y-10">
      <DiagBlock title="Text fields" hint="label · helper · error · required · disabled">
        <DiagGrid cols={2}>
          <SEIField label="Title" htmlFor="f-title" helperText="Shown on the album page." required>
            <SEIInput id="f-title" placeholder="Midnight Sessions" />
          </SEIField>
          <SEIField label="Catalog ID" htmlFor="f-cat" error="Already taken.">
            <SEIInput id="f-cat" defaultValue="SEA-001" invalid />
          </SEIField>
          <SEIField label="Notes" htmlFor="f-notes" helperText="Optional.">
            <SEITextarea id="f-notes" placeholder="Liner notes…" />
          </SEIField>
          <SEIField label="Release type" htmlFor="f-type">
            <SEISelect id="f-type" defaultValue="album">
              <option value="single">Single</option>
              <option value="ep">EP</option>
              <option value="album">Album</option>
            </SEISelect>
          </SEIField>
          <SEIField label="Disabled" htmlFor="f-dis" disabled>
            <SEIInput id="f-dis" placeholder="Unavailable" disabled />
          </SEIField>
          <SEIField label="Compact" htmlFor="f-cmp" size="compact">
            <SEIInput id="f-cmp" size="compact" placeholder="Dense form row" />
          </SEIField>
        </DiagGrid>
      </DiagBlock>

      <DiagBlock title="Toggles & choices" hint="switch · checkbox · radio · slider">
        <DiagGrid cols={2}>
          <DiagTile label="switch">
            <div className="flex flex-col gap-3">
              <SEISwitch defaultSelected>Public registry entry</SEISwitch>
              <SEISwitch>Allow remixes</SEISwitch>
              <SEISwitch isDisabled>Locked</SEISwitch>
            </div>
          </DiagTile>
          <DiagTile label="checkbox">
            <div className="flex flex-col gap-3">
              <SEICheckbox defaultSelected>Lossless master</SEICheckbox>
              <SEICheckbox>Explicit</SEICheckbox>
              <SEICheckbox isIndeterminate>Partial stems</SEICheckbox>
            </div>
          </DiagTile>
          <DiagTile label="radio group">
            <SEIRadioGroup label="Visibility" defaultValue="unlisted">
              <SEIRadio value="public">Public</SEIRadio>
              <SEIRadio value="unlisted">Unlisted</SEIRadio>
              <SEIRadio value="private">Private</SEIRadio>
            </SEIRadioGroup>
          </DiagTile>
          <DiagTile label="slider">
            <SEISlider label="Master volume" defaultValue={70} showValue />
          </DiagTile>
        </DiagGrid>
      </DiagBlock>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6 — Layout shells                                                   */
/* ------------------------------------------------------------------ */

export function LayoutSection() {
  return (
    <div className="space-y-10">
      <DiagBlock title="App shell" hint="header · sidebar · main · footer">
        <div className="h-72 overflow-hidden rounded-2xl border border-white/10">
          <SEIAppShell
            sidebarWidth="180px"
            sidebarLabel="Demo sidebar"
            header={
              <div className="flex h-12 items-center px-4 text-sm font-semibold text-white">
                SEIHouse
              </div>
            }
            sidebar={
              <nav className="space-y-1 p-3 text-sm text-[var(--sh-color-cloud)]">
                {["Vault", "Audio", "Registry", "Dojo"].map((l) => (
                  <div key={l} className="rounded-lg px-3 py-1.5 hover:bg-white/[0.05]">
                    {l}
                  </div>
                ))}
              </nav>
            }
            footer={
              <div className="px-4 py-2 text-xs text-[var(--sh-color-mist)]">mock footer</div>
            }
          >
            <div className="p-4 text-sm text-[var(--sh-color-cloud)]">Scrollable main region.</div>
          </SEIAppShell>
        </div>
      </DiagBlock>

      <DiagBlock title="Page header & toolbar" hint="SEIPageHeader · SEIToolbar · SEIActionBar">
        <div className="space-y-4 rounded-2xl border border-white/10 p-4">
          <SEIPageHeader
            eyebrow="Vault"
            title="Recovered fragments"
            description="12 items · last synced 2m ago"
            actions={
              <SEIButton size="sm" variant="solid" icon={Plus}>
                Import
              </SEIButton>
            }
          />
          <SEIToolbar
            aria-label="Fragment actions"
            start={
              <SEIBadge variant="soft" size="sm">
                12 selected
              </SEIBadge>
            }
            end={
              <div className="flex gap-2">
                <SEIButton size="sm" variant="ghost">
                  Export
                </SEIButton>
                <SEIButton size="sm" variant="outline">
                  Tag
                </SEIButton>
              </div>
            }
          />
          <SEIActionBar align="end">
            <SEIButton size="sm" variant="ghost">
              Cancel
            </SEIButton>
            <SEIButton size="sm" variant="solid">
              Save
            </SEIButton>
          </SEIActionBar>
        </div>
      </DiagBlock>

      <DiagBlock title="Filter bar" hint="SEIFilterBar">
        <SEIFilterBar resultCount={42} onClear={() => undefined}>
          <SEIBadge variant="outline" size="sm" iconLeft={<Filter className="size-3" />}>
            Type: Audio
          </SEIBadge>
          <SEIBadge variant="outline" size="sm">
            Status: Draft
          </SEIBadge>
          <SEIBadge variant="outline" size="sm">
            Year: 2026
          </SEIBadge>
        </SEIFilterBar>
      </DiagBlock>

      <DiagBlock title="Split pane" hint="static · resize deferred">
        <div className="h-48 overflow-hidden rounded-2xl border border-white/10">
          <SEISplitPane
            startWidth="160px"
            start={
              <div className="h-full bg-white/[0.03] p-3 text-xs text-[var(--sh-color-cloud)]">
                List
              </div>
            }
            end={<div className="h-full p-3 text-xs text-[var(--sh-color-cloud)]">Detail</div>}
          />
        </div>
      </DiagBlock>

      <DiagBlock title="Container & sticky footer" hint="SEIContainer · SEIStickyFooter">
        <div className="relative h-48 overflow-y-auto rounded-2xl border border-white/10">
          <SEIContainer size="sm" padding="md" className="py-4">
            <p className="text-sm text-[var(--sh-color-cloud)]">
              Centered, width-constrained content. Scroll to see the sticky footer pin to the bottom
              of this region.
            </p>
            <div className="h-40" />
          </SEIContainer>
          <SEIStickyFooter className="border-t border-white/10 bg-[#0a0a0c]/85 px-4 py-2 backdrop-blur-xl">
            <div className="flex justify-end">
              <SEIButton size="sm" variant="solid">
                Confirm
              </SEIButton>
            </div>
          </SEIStickyFooter>
        </div>
      </DiagBlock>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 7 — Scroll & overflow                                               */
/* ------------------------------------------------------------------ */

export function ScrollSection() {
  return (
    <div className="space-y-10">
      <DiagBlock title="Scroll area" hint="scroll shadows · keyboard-accessible">
        <SEIScrollArea
          label="Fragment list"
          maxHeight="14rem"
          className="rounded-2xl border border-white/10"
        >
          <ul className="divide-y divide-white/5">
            {Array.from({ length: 18 }).map((_, i) => (
              <li key={i} className="px-4 py-3 text-sm text-[var(--sh-color-cloud)]">
                Fragment {String(i + 1).padStart(2, "0")}
              </li>
            ))}
          </ul>
        </SEIScrollArea>
        <p className="text-xs text-[var(--sh-color-mist)]">
          Top/bottom shadows appear only when content overflows in that direction. The region is
          focusable (Tab) so keyboard users can scroll.
        </p>
      </DiagBlock>

      <DiagBlock title="Horizontal lane" hint="scroll-snap · overscroll-contain">
        <SEIScrollLane label="Featured albums" snap>
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="w-40 shrink-0 snap-start rounded-2xl border border-white/10 bg-white/[0.03] p-3"
            >
              <SEIThumbnail alt={`Album ${i + 1}`} ratio={1} radius="md" />
              <p className="mt-2 truncate text-sm text-[var(--sh-color-cloud)]">Album {i + 1}</p>
            </div>
          ))}
        </SEIScrollLane>
      </DiagBlock>

      <DiagBlock title="Dense list mode" hint="compact rows in a scroll area">
        <SEIScrollArea
          label="Dense tracks"
          maxHeight="13rem"
          className="rounded-2xl border border-white/10"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <SEIMediaRow
              key={i}
              as="div"
              className="px-3 py-1.5"
              thumbnail={<SEIAvatar name={`Track ${i + 1}`} size="sm" tone="sea" />}
              title={`Track ${i + 1}`}
              subtitle="2:4"
              meta={
                <span className="font-mono text-xs text-[var(--sh-color-mist)]">3:0{i % 6}</span>
              }
            />
          ))}
        </SEIScrollArea>
      </DiagBlock>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 8 — Media fallbacks                                                 */
/* ------------------------------------------------------------------ */

export function MediaSection() {
  return (
    <div className="space-y-10">
      <DiagBlock title="Thumbnail fallback" hint="broken / missing src → placeholder">
        <DiagGrid cols={4}>
          <DiagTile label="ok (1:1)">
            <SEIThumbnail
              alt="Working artwork"
              ratio={1}
              src="https://picsum.photos/seed/seihouse/200"
            />
          </DiagTile>
          <DiagTile label="broken src">
            <SEIThumbnail alt="Broken artwork" ratio={1} src="https://invalid.seihouse/x.png" />
          </DiagTile>
          <DiagTile label="no src">
            <SEIThumbnail alt="No artwork" ratio={1} fallbackIcon={Music} />
          </DiagTile>
          <DiagTile label="16:9">
            <SEIThumbnail alt="Wide" ratio="16/9" />
          </DiagTile>
        </DiagGrid>
      </DiagBlock>

      <DiagBlock title="Avatar fallback" hint="image → initials">
        <div className="flex flex-wrap items-end gap-4">
          <SEIAvatar name="Sensei Dukes" size="xl" tone="sea" />
          <SEIAvatar name="Ada Lovelace" size="lg" tone="accent" />
          <SEIAvatar name="Brian Eno" size="md" />
          <SEIAvatar name="X" size="sm" src="https://invalid.seihouse/x.png" />
        </div>
      </DiagBlock>

      <DiagBlock title="Aspect ratio & media row" hint="intrinsic boxes · compact rows">
        <DiagGrid cols={2}>
          <DiagTile label="aspect 21/9">
            <SEIAspectRatio
              ratio="21/9"
              className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
            >
              <div className="grid h-full place-items-center text-xs text-[var(--sh-color-mist)]">
                21 / 9
              </div>
            </SEIAspectRatio>
          </DiagTile>
          <DiagTile label="interactive media row">
            <SEIMediaRow
              interactive
              onClick={() => undefined}
              thumbnail={<SEIThumbnail alt="Cover" ratio={1} radius="md" className="w-12" />}
              title="Midnight Sessions"
              subtitle="Sensei Dukes · 2026"
              meta={
                <SEIBadge variant="soft" size="sm">
                  Album
                </SEIBadge>
              }
            />
          </DiagTile>
        </DiagGrid>
      </DiagBlock>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 9 — Layering, safe-area & reduced motion                            */
/* ------------------------------------------------------------------ */

const layerOrder = [
  "base",
  "raised",
  "sticky",
  "dropdown",
  "overlay",
  "modal",
  "popover",
  "toast",
] as const;

export function SystemSection() {
  return (
    <div className="space-y-10">
      <DiagBlock title="Overlay & z-index layering" hint="one shared stacking scale">
        <div className="relative h-44">
          {layerOrder.map((layer, i) => (
            <div
              key={layer}
              className={cn(
                "absolute flex h-16 w-40 flex-col justify-center rounded-xl border px-3",
                seiLayer[layer],
                "border-white/12 bg-[rgba(18,20,26,0.92)] backdrop-blur-md",
              )}
              style={{ left: i * 26, top: i * 12 }}
            >
              <span className="text-xs font-semibold text-white">{layer}</span>
              <span className="font-mono text-[0.62rem] text-[var(--sh-color-mist)]">
                z = {SEI_Z_INDEX[layer]}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-[var(--sh-color-mist)]">
          Every overlay, portal and sticky region maps to <code>seiLayer</code> /{" "}
          <code>--sh-z-*</code>, so they never fight over z-index.
        </p>
      </DiagBlock>

      <DiagBlock title="Mobile safe-area" hint="env(safe-area-inset-*)">
        <SEISafeArea
          edges={["top", "bottom", "left", "right"]}
          className="rounded-2xl border border-dashed border-[rgba(0,122,255,0.4)] bg-[rgba(0,122,255,0.06)]"
        >
          <div className="rounded-xl bg-white/[0.03] p-4 text-sm text-[var(--sh-color-cloud)]">
            Content padded by the device safe-area insets (visible on notched devices). The dashed
            frame is the safe-area wrapper.
          </div>
        </SEISafeArea>
      </DiagBlock>

      <DiagBlock title="Reduced motion" hint="prefers-reduced-motion">
        <SEIPanel padding="md" variant="outline">
          <ul className="space-y-1.5 text-sm text-[var(--sh-color-cloud)]">
            {reducedMotionNotes.map((note) => (
              <li key={note} className="flex gap-2">
                <span aria-hidden="true" className="text-[var(--sh-interactive-text)]">
                  ·
                </span>
                {note}
              </li>
            ))}
          </ul>
        </SEIPanel>
      </DiagBlock>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Registry                                                            */
/* ------------------------------------------------------------------ */

export interface FoundationSection {
  id: string;
  name: string;
  description: string;
  Component: () => React.JSX.Element;
}

export const foundationSections: FoundationSection[] = [
  {
    id: "tokens",
    name: "Tokens",
    description: "Typography, color, spacing, and radius scales.",
    Component: TokensSection,
  },
  {
    id: "surfaces",
    name: "Surfaces",
    description: "Surface tones, elevation, blur, glass, and glow.",
    Component: SurfacesSection,
  },
  {
    id: "interaction",
    name: "Interaction",
    description: "Hover, pressed, focus-visible, disabled, loading, selected.",
    Component: InteractionSection,
  },
  {
    id: "states",
    name: "States",
    description: "Empty, loading, skeleton, error, success, progress, status.",
    Component: StatesSection,
  },
  {
    id: "forms",
    name: "Forms",
    description: "Fields, inputs, toggles, choices, and sizing.",
    Component: FormsSection,
  },
  {
    id: "layout",
    name: "Layout",
    description: "App shell, page header, toolbar, filter bar, split pane.",
    Component: LayoutSection,
  },
  {
    id: "scroll",
    name: "Scroll",
    description: "Scroll area, horizontal lanes, dense list mode.",
    Component: ScrollSection,
  },
  {
    id: "media",
    name: "Media",
    description: "Thumbnail and avatar fallbacks, aspect ratio, media rows.",
    Component: MediaSection,
  },
  {
    id: "system",
    name: "Layering & motion",
    description: "Overlay/z-index layering, safe-area, reduced motion.",
    Component: SystemSection,
  },
];
