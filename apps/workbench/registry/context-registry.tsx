import type { ComponentType } from "react";
import {
  ArrowRight,
  Command,
  Music,
  Radio,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Vault,
} from "lucide-react";

import {
  mockAlbums,
  mockArtists,
  mockDojoModules,
  mockMetrics,
  mockPlayerTracks,
  mockRegistryItems,
  mockShowcaseEntries,
  mockVaultFragments,
} from "@/lib/mock-data/examples";
import {
  ActionStrip,
  AlbumCard,
  ArtistCard,
  DojoModuleCard,
  MetricCard,
  PlayerShellExpanded,
  RegistryPanel,
  RegistrySeal,
  ShowcaseHero,
  VaultFragmentCard,
} from "@seihouse/ui";
import { SEIBadge } from "@seihouse/ui";
import { SEIButton } from "@seihouse/ui";
import { SEIPanel } from "@seihouse/ui";
import {
  SEIAvatar,
  SEICheckbox,
  SEIContainer,
  SEIField,
  SEIFilterBar,
  SEIInput,
  SEIMediaRow,
  SEIPageHeader,
  SEIProgressBar,
  SEIScrollArea,
  SEIStatusLine,
  SEISwitch,
  SEITable,
  SEITableBody,
  SEITableCell,
  SEITableHead,
  SEITableHeader,
  SEITableRow,
  SEIThumbnail,
} from "@seihouse/ui";
import {
  SEIDialog,
  SEIDialogClose,
  SEIDialogContent,
  SEIDialogDescription,
  SEIDialogTitle,
  SEIDialogTrigger,
} from "@seihouse/ui";
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
import { seiButtonVariants } from "@seihouse/ui";

/* ------------------------------------------------------------------ */
/* Context registry — review environments, not final designs.          */
/* Each context places components inside a real SEIHouse product       */
/* situation so the founder can judge them in place.                   */
/* ------------------------------------------------------------------ */

export interface ContextEntry {
  id: string;
  name: string;
  description: string;
  component: ComponentType;
}

/** Mock settings toggle backed by a real (visually hidden) checkbox so it stays keyboard-accessible. */
export function MockSwitchRow({ label }: { label: string }) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[var(--sh-color-cloud)]">
      {label}
      <input type="checkbox" defaultChecked className="peer sr-only" />
      <span
        aria-hidden="true"
        className="relative h-5 w-9 shrink-0 rounded-full bg-white/10 transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white/60 after:transition-transform peer-checked:bg-[rgba(0,122,255,0.55)] peer-checked:after:translate-x-4 peer-checked:after:bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--sh-color-sea)]"
      />
    </label>
  );
}

function SeaPortalShellContext() {
  return (
    <SEIPanel variant="dark" padding="md" className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full border border-dashed border-[var(--sh-interactive-selected-border)] bg-[var(--sh-interactive-selected)] text-[0.6rem] font-black tracking-[0.14em] text-[var(--sh-interactive-text)]">
            SEA
          </div>
          <div>
            <p className="text-sm font-bold tracking-[-0.02em] text-white">SEA Portal</p>
            <p className="font-mono text-[0.65rem] text-[var(--sh-color-mist)]">
              mock shell · no auth
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SEIBadge variant="soft" size="sm">
            Education
          </SEIBadge>
          <SEIBadge variant="registry" size="sm">
            Registry
          </SEIBadge>
          <SEIButton variant="ghost" size="sm" icon={Command} aria-label="Command palette" />
        </div>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <DojoModuleCard module={mockDojoModules[0]} variant="lesson" />
        <div className="space-y-4">
          <MetricCard {...mockMetrics[2]} variant="soft" />
          <MetricCard {...mockMetrics[5]} variant="default" />
        </div>
      </div>
    </SEIPanel>
  );
}

function AlbumWorldHeroContext() {
  return (
    <div className="w-full space-y-4">
      <ShowcaseHero
        variant="media"
        headingLevel={1}
        entry={mockShowcaseEntries[0]}
        primaryAction="Enter album world"
        secondaryAction="View registry"
        preview={<AlbumCard album={mockAlbums[0]} variant="default" />}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <ArtistCard artist={mockArtists[0]} variant="default" />
        <AlbumCard album={mockAlbums[1]} variant="compact" />
      </div>
    </div>
  );
}

function VaultFragmentListContext() {
  return (
    <SEIPanel variant="default" padding="md" className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Vault aria-hidden="true" className="size-4 text-[var(--sh-interactive-text)]" />
          <h3 className="text-sm font-semibold text-white">Vault · recovered fragments</h3>
        </div>
        <SEIBadge variant="warning" size="sm">
          24 need review
        </SEIBadge>
      </div>
      <div className="mt-4 space-y-3">
        {mockVaultFragments.map((fragment) => (
          <VaultFragmentCard key={fragment.id} fragment={fragment} variant="compact" />
        ))}
      </div>
    </SEIPanel>
  );
}

function SapPlayerDockContext() {
  return (
    <div className="w-full space-y-4">
      <div className="grid min-h-40 place-items-center rounded-[1.35rem] border border-dashed border-white/12 text-sm text-[var(--sh-color-mist)]">
        Page content above the dock
      </div>
      <PlayerShellExpanded track={mockPlayerTracks[0]} variant="docked" />
    </div>
  );
}

function RegistryConfirmationContext() {
  return (
    <div className="w-full space-y-4">
      <RegistryPanel item={mockRegistryItems[0]} />
      <div className="flex flex-wrap items-center gap-3">
        <SEIDialog>
          <SEIDialogTrigger
            render={
              <SEIButton variant="solid" icon={ShieldCheck}>
                Register this work
              </SEIButton>
            }
          />
          <SEIDialogContent variant="default" className="max-w-md">
            <SEIDialogTitle>Register this work?</SEIDialogTitle>
            <SEIDialogDescription>
              Mocked confirmation flow — nothing is created or sent anywhere.
            </SEIDialogDescription>
            <div className="mt-4 flex items-center gap-3">
              <RegistrySeal status="draft" registryId="D-001" compact />
              <ArrowRight aria-hidden="true" className="size-4 text-[var(--sh-color-mist)]" />
              <RegistrySeal status="registered" registryId="SEI-042" compact />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <SEIDialogClose render={<SEIButton variant="ghost">Cancel</SEIButton>} />
              <SEIDialogClose render={<SEIButton variant="solid">Confirm</SEIButton>} />
            </div>
          </SEIDialogContent>
        </SEIDialog>
        <RegistrySeal status="verified" registryId="V-777" compact />
      </div>
    </div>
  );
}

function CreatorDashboardContext() {
  return (
    <SEIPanel variant="default" padding="md" className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <h3 className="text-sm font-semibold text-white">Creator dashboard</h3>
        <SEIBadge variant="registry" size="sm">
          Mock data
        </SEIBadge>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {mockMetrics.slice(0, 4).map((metric, index) => (
          <MetricCard key={metric.label} {...metric} variant={index % 2 ? "default" : "soft"} />
        ))}
      </div>
      <div className="mt-4 border-t border-white/10 pt-4">
        <ActionStrip
          primary={{ label: "Register work", icon: <ArrowRight className="size-3.5" /> }}
          secondary={{ label: "Review splits" }}
          iconActions={[{ label: "Radio", icon: <Radio className="size-4" /> }]}
        />
      </div>
    </SEIPanel>
  );
}

function PluginSettingsDrawerContext() {
  return (
    <SEIPanel variant="glass-test" padding="md" className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">Plugin slot · SAP</h3>
          <p className="mt-1 text-sm text-[var(--sh-color-cloud)]">
            Settings open in a swipeable drawer. No plugin runtime is loaded.
          </p>
        </div>
        <SEINativeDrawer side="right">
          <SEINativeDrawerTrigger className={seiButtonVariants({ variant: "solid", size: "sm" })}>
            <Radio aria-hidden="true" className="size-4" />
            Open settings
          </SEINativeDrawerTrigger>
          <SEINativeDrawerContent side="right" size="default" tone="glass-test">
            <SEINativeDrawerHeader>
              <SEINativeDrawerTitle>Plugin slot · SAP</SEINativeDrawerTitle>
            </SEINativeDrawerHeader>
            <SEINativeDrawerBody>
              <div className="space-y-2">
                {["Enable visualizer", "Auto-tag metadata", "Vault Radio eligible"].map((label) => (
                  <MockSwitchRow key={label} label={label} />
                ))}
              </div>
            </SEINativeDrawerBody>
            <SEINativeDrawerFooter>
              <SEINativeDrawerClose className={seiButtonVariants({ variant: "ghost" })}>
                Cancel
              </SEINativeDrawerClose>
              <SEINativeDrawerClose className={seiButtonVariants({ variant: "solid" })}>
                Save
              </SEINativeDrawerClose>
            </SEINativeDrawerFooter>
          </SEINativeDrawerContent>
        </SEINativeDrawer>
      </div>
      <div className="mt-4 grid min-h-24 place-items-center rounded-[1.1rem] border border-dashed border-white/15 bg-white/[0.035] text-sm text-[var(--sh-color-mist)]">
        Plugin placeholder area
      </div>
    </SEIPanel>
  );
}

function FoundationFormStateContext() {
  return (
    <SEIPanel variant="default" padding="md" className="w-full">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Registry intake</h3>
          <p className="mt-1 text-sm text-[var(--sh-color-cloud)]">
            Form controls, status lines, and progress states in one mocked setup panel.
          </p>
        </div>
        <SEIStatusLine
          tone="success"
          label="Autosaved"
          description="No network request was made."
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SEIField
          label="Release title"
          htmlFor="context-release-title"
          helperText="Used for the mock registry preview."
          required
        >
          {({ describedBy }) => (
            <SEIInput
              id="context-release-title"
              aria-describedby={describedBy}
              defaultValue="North Room"
            />
          )}
        </SEIField>
        <SEIField
          label="Search collaborators"
          htmlFor="context-collaborator"
          helperText="Mock-only collaborator lookup."
        >
          {({ describedBy }) => (
            <SEIInput
              id="context-collaborator"
              aria-describedby={describedBy}
              iconLeft={<Search aria-hidden="true" className="size-4" />}
              placeholder="Find creator"
            />
          )}
        </SEIField>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <SEISwitch defaultSelected>Enable registry reminders</SEISwitch>
        <SEICheckbox defaultSelected>Include vault notes</SEICheckbox>
      </div>

      <div className="mt-5">
        <SEIProgressBar value={76} label="Metadata readiness" showValue tone="sea" />
      </div>
    </SEIPanel>
  );
}

function LayoutMediaListContext() {
  const rows = mockVaultFragments.slice(0, 3);
  return (
    <SEIContainer size="lg" className="w-full">
      <SEIPageHeader
        eyebrow="Vault"
        title="Fragment review"
        description="Layout, scroll, media rows, avatars, and a compact table in a review surface."
        actions={
          <SEIButton variant="solid" size="sm" icon={SlidersHorizontal}>
            Tune view
          </SEIButton>
        }
      />

      <SEIPanel variant="default" padding="md" className="mt-5 w-full">
        <SEIFilterBar aria-label="Filter fragments" resultCount={rows.length} className="mb-4">
          <SEIBadge variant="soft">Voice notes</SEIBadge>
          <SEIBadge variant="outline">Needs split review</SEIBadge>
        </SEIFilterBar>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <SEIScrollArea
            maxHeight="16rem"
            label="Context media list"
            className="rounded-2xl border border-white/10"
          >
            <div className="space-y-2 p-2">
              {rows.map((fragment, index) => (
                <SEIMediaRow
                  key={fragment.id}
                  interactive
                  thumbnail={
                    <SEIThumbnail alt={fragment.title} fallbackIcon={Music} className="size-12" />
                  }
                  title={fragment.title}
                  subtitle={`${fragment.type} · ${fragment.status}`}
                  meta={<SEIAvatar name={mockArtists[index]?.name ?? "SEA"} size="sm" tone="sea" />}
                />
              ))}
            </div>
          </SEIScrollArea>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <SEITable density="compact">
              <SEITableHeader>
                <SEITableRow hover={false}>
                  <SEITableHead>Item</SEITableHead>
                  <SEITableHead align="right">Ready</SEITableHead>
                </SEITableRow>
              </SEITableHeader>
              <SEITableBody>
                {rows.map((fragment, index) => (
                  <SEITableRow key={fragment.id} zebra>
                    <SEITableCell>{fragment.title}</SEITableCell>
                    <SEITableCell align="right">{index === 0 ? "Yes" : "Review"}</SEITableCell>
                  </SEITableRow>
                ))}
              </SEITableBody>
            </SEITable>
          </div>
        </div>
      </SEIPanel>
    </SEIContainer>
  );
}

export const contextRegistry: ContextEntry[] = [
  {
    id: "sea-portal",
    name: "SEA Portal shell",
    description: "Portal header with Dojo modules and registry metrics inside.",
    component: SeaPortalShellContext,
  },
  {
    id: "album-world-hero",
    name: "Album world hero",
    description: "A release landing: hero, album card, and artist card together.",
    component: AlbumWorldHeroContext,
  },
  {
    id: "vault-fragment-list",
    name: "Vault fragment list",
    description: "Recovered fragments stacked in a review list.",
    component: VaultFragmentListContext,
  },
  {
    id: "sap-player-dock",
    name: "SAP player dock",
    description: "The docked player shell pinned under page content.",
    component: SapPlayerDockContext,
  },
  {
    id: "registry-confirmation",
    name: "Registry confirmation",
    description: "Registry record plus the register-this-work dialog flow.",
    component: RegistryConfirmationContext,
  },
  {
    id: "creator-dashboard",
    name: "Creator dashboard",
    description: "Metrics and an action strip in an internal dashboard panel.",
    component: CreatorDashboardContext,
  },
  {
    id: "plugin-settings-drawer",
    name: "Plugin settings drawer",
    description: "A plugin slot whose settings open in a swipeable drawer.",
    component: PluginSettingsDrawerContext,
  },
  {
    id: "foundation-form-state",
    name: "Foundation form and state",
    description: "Forms, status, and progress primitives composed in a registry intake panel.",
    component: FoundationFormStateContext,
  },
  {
    id: "layout-media-list",
    name: "Layout media list",
    description: "Layout, scroll, media, and table primitives composed in a vault review surface.",
    component: LayoutMediaListContext,
  },
];

export function getContextById(id: string): ContextEntry | undefined {
  return contextRegistry.find((entry) => entry.id === id);
}
