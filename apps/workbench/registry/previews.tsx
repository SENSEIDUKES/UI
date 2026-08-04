"use client";

import { useState } from "react";
import {
  Archive,
  ArrowRight,
  BadgeCheck,
  Bell,
  CheckCircle2,
  ChevronDown,
  Command,
  Download,
  FileText,
  Filter,
  Home,
  ImageIcon,
  Info,
  Layers,
  ListFilter,
  ListMusic,
  LogOut,
  Mail,
  Menu as MenuIcon,
  MoreHorizontal,
  Music,
  Plus,
  Radio,
  Save,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  UserRound,
  XCircle,
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
  PluginSlotPreview,
  RegistryPanel,
  RegistrySeal,
  ShowcaseBlock,
  ShowcaseHero,
  VaultFragmentCard,
} from "@seihouse/ui";
import {
  SEIActionBar,
  SEIAppShell,
  SEIAspectRatio,
  SEIAvatar,
  SEIBottomNavigation,
  SEICheckbox,
  SEIContainer,
  SEIEmptyState,
  SEIErrorState,
  SEIField,
  SEIFilterBar,
  SEIInput,
  SEILoadingState,
  SEIMediaRow,
  SEINavigationDrawer,
  SEIPageHeader,
  SEIMenu,
  SEIMenuCheckboxItem,
  SEIMenuContent,
  SEIMenuGroup,
  SEIMenuItem,
  SEIMenuLabel,
  SEIMenuRadioGroup,
  SEIMenuRadioItem,
  SEIMenuSeparator,
  SEIMenuTrigger,
  SEIProgressBar,
  SEIRadio,
  SEIRadioGroup,
  SEISafeArea,
  SEIScrollArea,
  SEIScrollLane,
  SEISelect,
  SEISkeleton,
  SEISlider,
  SEISpinner,
  SEISplitPane,
  SEIStatusDot,
  SEIStatusLine,
  SEIStickyFooter,
  SEISuccessState,
  SEISwitch,
  SEITable,
  SEITableBody,
  SEITableCell,
  SEITableHead,
  SEITableHeader,
  SEITableRow,
  SEITableSelectionCell,
  SEITextarea,
  SEIThumbnail,
  SEIToolbar,
  sortRows,
  useSEIToast,
  type SEISortDirection,
} from "@seihouse/ui";
import { SEIBadge } from "@seihouse/ui";
import { SEIButton } from "@seihouse/ui";
import { SEICard } from "@seihouse/ui";
import { SEIPanel } from "@seihouse/ui";
import { SEISection } from "@seihouse/ui";

import {
  SEIDialog,
  SEIDialogClose,
  SEIDialogContent,
  SEIDialogDescription,
  SEIDialogTitle,
  SEIDialogTrigger,
} from "@seihouse/ui";
import {
  SEIDrawer,
  SEIDrawerBody,
  SEIDrawerClose,
  SEIDrawerContent,
  SEIDrawerFooter,
  SEIDrawerHeader,
  SEIDrawerTitle,
  SEIDrawerTrigger,
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
import {
  SEIPopover,
  SEIPopoverContent,
  SEIPopoverDescription,
  SEIPopoverTitle,
  SEIPopoverTrigger,
} from "@seihouse/ui";
import { SEITabs, SEITabsList, SEITabsPanel, SEITabsTrigger } from "@seihouse/ui";
import { SEITooltip, SEITooltipContent, SEITooltipProvider, SEITooltipTrigger } from "@seihouse/ui";
import { SEIComboboxPreview } from "@seihouse/ui";
import { SEICommandPalette } from "@seihouse/ui";
import { SEIMultiSelectCombobox } from "@seihouse/ui";
import {
  mockArtistOptions,
  mockCommandGroups,
  mockRecentCommandIds,
  mockDojoCategories,
  mockGenreOptions,
  mockRegistryLabels,
  mockVaultTagOptions,
  mockVaultTags,
} from "@/lib/mock-data/behavior-mock";
import { seiButtonVariants } from "@seihouse/ui";

import type { ComponentPreviewProps } from "./component-registry";
import { MockSwitchRow } from "./context-registry";

/* ------------------------------------------------------------------ */
/* Workbench previews                                                   */
/* One small, calm preview per registry entry. Each receives the        */
/* selected variant string and mock-data index from the workbench.      */
/* ------------------------------------------------------------------ */

const pick = <T,>(items: readonly T[], index: number): T =>
  items[Math.min(Math.max(index, 0), items.length - 1)];

/* ---- Foundation ---- */

export function ButtonPreview({ variant }: ComponentPreviewProps) {
  const v = variant as React.ComponentProps<typeof SEIButton>["variant"];
  return (
    <div className="space-y-4">
      <div className="mx-auto flex max-w-[17.5rem] flex-wrap items-center justify-center gap-3 sm:max-w-none">
        <SEIButton variant={v} size="sm">
          Small
        </SEIButton>
        <SEIButton variant={v} size="md" icon={Sparkles}>
          Medium
        </SEIButton>
        <SEIButton variant={v} size="lg" iconRight={<ArrowRight className="size-4" />}>
          Large
        </SEIButton>
      </div>
      <div className="mx-auto flex max-w-[17.5rem] flex-wrap items-center justify-center gap-3 sm:max-w-none">
        <SEIButton variant={v} loading>
          Saving
        </SEIButton>
        <SEIButton variant={v} disabled>
          Unavailable
        </SEIButton>
        <SEIButton variant={v} icon={Plus} aria-label="Add item" />
      </div>
    </div>
  );
}

export function BadgePreview({ variant }: ComponentPreviewProps) {
  const v = variant as React.ComponentProps<typeof SEIBadge>["variant"];
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <SEIBadge variant={v} size="sm">
        Small
      </SEIBadge>
      <SEIBadge variant={v} size="md" icon={BadgeCheck}>
        Medium
      </SEIBadge>
      <SEIBadge variant={v} size="lg">
        Large
      </SEIBadge>
    </div>
  );
}

export function CardPreview({ variant }: ComponentPreviewProps) {
  const [activationCount, setActivationCount] = useState(0);
  const [disabledActivationCount, setDisabledActivationCount] = useState(0);

  return (
    <div className="w-full max-w-sm space-y-3">
      <SEICard
        variant={variant as React.ComponentProps<typeof SEICard>["variant"]}
        interactive
        onClick={() => setActivationCount((count) => count + 1)}
        aria-describedby="card-activation-status"
        eyebrow="Project"
        title="SEA Portal shell"
        description="A reusable card with a keyboard-operable action."
        metadata="UI mock"
      />
      <p
        id="card-activation-status"
        data-testid="card-activation-status"
        role="status"
        className="text-center text-sm text-[var(--sh-text-muted)]"
      >
        Activated {activationCount} {activationCount === 1 ? "time" : "times"}
      </p>
      <SEICard
        variant={variant as React.ComponentProps<typeof SEICard>["variant"]}
        interactive
        disabled
        onClick={() => setDisabledActivationCount((count) => count + 1)}
        title="Unavailable card action"
        description="Disabled action cards remain visibly unavailable and out of keyboard navigation."
      />
      <p
        data-testid="disabled-card-activation-status"
        className="text-center text-sm text-[var(--sh-text-muted)]"
      >
        Disabled action activated {disabledActivationCount} times
      </p>
    </div>
  );
}

export function PanelPreview({ variant }: ComponentPreviewProps) {
  return (
    <SEIPanel
      variant={variant as React.ComponentProps<typeof SEIPanel>["variant"]}
      padding="md"
      className="w-full max-w-md"
    >
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]">
        Panel surface
      </p>
      <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em]">Registry summary</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--sh-color-cloud)]">
        Panels hold players, registry records, and dashboard groups.
      </p>
    </SEIPanel>
  );
}

export function GlassPanelPreview({ variant }: ComponentPreviewProps) {
  const glow = variant === "glow";
  return (
    <div className="relative w-full max-w-2xl">
      {/* Decorative backdrop so the translucency and blur read clearly. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_18%_0%,rgba(0,122,255,0.28),transparent_60%),radial-gradient(circle_at_85%_95%,rgba(255,107,53,0.18),transparent_55%)]"
      />
      <div className="relative space-y-4 p-1 sm:p-3">
        {/* Large content panel */}
        <SEIPanel variant="glass" glow={glow} padding="lg" as="section" className="w-full">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]">
            Content panel
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
            Midnight Sessions
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--sh-color-cloud)]">
            The glass surface carries primary content: a translucent dark body, soft blur, and a
            thin luminous edge that stays calm over busy artwork behind it.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {["12 tracks", "Registered", "Vault ready"].map((label) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-center text-xs text-[var(--sh-color-cloud)]"
              >
                {label}
              </div>
            ))}
          </div>
        </SEIPanel>

        {/* Smaller info / callout panel */}
        <SEIPanel variant="glass" glow={glow} padding="sm" className="w-full sm:max-w-md">
          <div className="flex items-start gap-3">
            <Info
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-[var(--sh-interactive-text)]"
            />
            <div>
              <p className="text-sm font-semibold">Registry note</p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--sh-color-cloud)]">
                A compact callout for hints, metadata, or secondary information.
              </p>
            </div>
          </div>
        </SEIPanel>

        {/* Footer / action strip panel */}
        <SEIPanel variant="glass" glow={glow} padding="sm" as="footer" className="w-full">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[var(--sh-color-mist)]">Draft saved · 2 minutes ago</p>
            <div className="flex items-center gap-2">
              <SEIButton variant="ghost" size="md">
                Discard
              </SEIButton>
              <SEIButton variant="solid" size="md" iconRight={<ArrowRight className="size-4" />}>
                Publish
              </SEIButton>
            </div>
          </div>
        </SEIPanel>
      </div>
    </div>
  );
}

export function SectionPreview({ variant }: ComponentPreviewProps) {
  return (
    <SEISection
      spacing={variant as React.ComponentProps<typeof SEISection>["spacing"]}
      eyebrow="01 / Example"
      title="Section header"
      description="Eyebrow, title, and a short description above the content area."
      aside={<SEIBadge variant="soft">Aside slot</SEIBadge>}
      className="w-full"
    >
      <div className="grid h-24 place-items-center rounded-2xl border border-dashed border-white/15 text-sm text-[var(--sh-color-mist)]">
        Section content area
      </div>
    </SEISection>
  );
}

/* ---- States ---- */

export function SkeletonPreview({ variant }: ComponentPreviewProps) {
  if (variant === "avatar") {
    return (
      <div className="flex w-full max-w-sm items-center gap-3">
        <SEISkeleton width={48} height={48} radius="full" variant="shimmer" />
        <div className="flex-1 space-y-2">
          <SEISkeleton height={12} width="62%" variant="shimmer" />
          <SEISkeleton height={10} width="88%" />
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="w-full max-w-sm space-y-3 rounded-2xl border border-white/10 p-4">
        <SEISkeleton height={140} radius="lg" variant="shimmer" />
        <SEISkeleton height={14} width="70%" />
        <SEISkeleton height={10} width="92%" />
        <SEISkeleton height={10} width="54%" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm space-y-2">
      <SEISkeleton
        height={12}
        width="88%"
        variant={variant as React.ComponentProps<typeof SEISkeleton>["variant"]}
      />
      <SEISkeleton height={12} width="74%" />
      <SEISkeleton height={12} width="52%" />
    </div>
  );
}

export function SpinnerPreview({ variant }: ComponentPreviewProps) {
  return (
    <div className="flex items-center gap-4">
      <SEISpinner
        size={variant as React.ComponentProps<typeof SEISpinner>["size"]}
        label="Loading vault"
      />
      <span className="text-sm text-[var(--sh-color-cloud)]">Loading vault fragments</span>
    </div>
  );
}

export function ProgressBarPreview({ variant }: ComponentPreviewProps) {
  const indeterminate = variant === "indeterminate";
  const tone = indeterminate
    ? "sea"
    : (variant as React.ComponentProps<typeof SEIProgressBar>["tone"]);
  return (
    <div className="w-full max-w-md">
      <SEIProgressBar
        value={68}
        indeterminate={indeterminate}
        tone={tone}
        label={indeterminate ? "Syncing registry" : "Registry readiness"}
        showValue
      />
    </div>
  );
}

export function StatusDotPreview({ variant }: ComponentPreviewProps) {
  const tone = variant.replace("-pulse", "") as React.ComponentProps<typeof SEIStatusDot>["tone"];
  const pulse = variant.endsWith("-pulse");
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <SEIStatusDot tone={tone} pulse={pulse} />
        <span className="text-sm text-[var(--sh-color-cloud)]">Live status dot</span>
      </div>
      <SEIStatusLine
        tone={tone}
        label="Registry sync"
        description="Status line pairs the decorative dot with readable copy."
      />
    </div>
  );
}

export function EmptyStatePreview({ variant }: ComponentPreviewProps) {
  return (
    <SEIEmptyState
      size={variant as React.ComponentProps<typeof SEIEmptyState>["size"]}
      title="No fragments yet"
      description="Recovered ideas will appear here once a creator starts collecting vault material."
      action={
        <SEIButton variant="solid" size="sm" icon={Archive}>
          Add fragment
        </SEIButton>
      }
      className="w-full max-w-md"
    />
  );
}

export function LoadingStatePreview({ variant }: ComponentPreviewProps) {
  return (
    <SEILoadingState
      size={variant as React.ComponentProps<typeof SEILoadingState>["size"]}
      title="Preparing workspace"
      description="Mock loading state for routes, panels, and deferred data."
      className="w-full max-w-md"
    />
  );
}

export function ErrorStatePreview({ variant }: ComponentPreviewProps) {
  return (
    <SEIErrorState
      tone={variant as React.ComponentProps<typeof SEIErrorState>["tone"]}
      title={variant === "warning" ? "Needs review" : "Could not load"}
      description="The surface gives users a clear recovery action without app logic."
      action={
        <SEIButton variant="outline" size="sm">
          Retry
        </SEIButton>
      }
      className="w-full max-w-md"
    />
  );
}

export function SuccessStatePreview({ variant }: ComponentPreviewProps) {
  return (
    <SEISuccessState
      size={variant as React.ComponentProps<typeof SEISuccessState>["size"]}
      title="Registration ready"
      description="All required metadata is present in this mock record."
      action={
        <SEIButton variant="solid" size="sm" icon={CheckCircle2}>
          Continue
        </SEIButton>
      }
      className="w-full max-w-md"
    />
  );
}

/* ---- Forms ---- */

export function FieldPreview({ variant }: ComponentPreviewProps) {
  const error = variant === "error" ? "Artist name is required." : undefined;
  return (
    <div className="w-full max-w-sm">
      <SEIField
        label="Artist name"
        htmlFor="field-preview-artist"
        helperText="Visible label, helper, required, disabled, and error states."
        error={error}
        required={variant === "required"}
        disabled={variant === "disabled"}
        size={variant === "compact" ? "compact" : "comfortable"}
      >
        {({ describedBy }) => (
          <SEIInput
            id="field-preview-artist"
            aria-describedby={describedBy}
            invalid={Boolean(error)}
            disabled={variant === "disabled"}
            size={variant === "compact" ? "compact" : "comfortable"}
            defaultValue={variant === "error" ? "" : "Sensei DUKES"}
          />
        )}
      </SEIField>
    </div>
  );
}

export function InputPreview({ variant }: ComponentPreviewProps) {
  return (
    <div className="w-full max-w-sm">
      <SEIInput
        size={variant === "compact" ? "compact" : "comfortable"}
        invalid={variant === "invalid"}
        disabled={variant === "disabled"}
        iconLeft={
          variant === "with-icons" ? <Search aria-hidden="true" className="size-4" /> : undefined
        }
        iconRight={
          variant === "with-icons" ? <Command aria-hidden="true" className="size-4" /> : undefined
        }
        placeholder="Search vault"
        defaultValue={variant === "filled" ? "Hidden demo vocal" : undefined}
      />
    </div>
  );
}

export function TextareaPreview({ variant }: ComponentPreviewProps) {
  return (
    <div className="w-full max-w-sm">
      <SEITextarea
        size={variant === "compact" ? "compact" : "comfortable"}
        invalid={variant === "invalid"}
        disabled={variant === "disabled"}
        placeholder="Write release notes"
        defaultValue={variant === "filled" ? "Draft notes for a mock release rollout." : undefined}
      />
    </div>
  );
}

export function SelectPreview({ variant }: ComponentPreviewProps) {
  return (
    <div className="w-full max-w-sm">
      <SEISelect
        size={variant === "compact" ? "compact" : "comfortable"}
        invalid={variant === "invalid"}
        disabled={variant === "disabled"}
        defaultValue="draft"
      >
        <option value="draft">Draft</option>
        <option value="registered">Registered</option>
        <option value="archived">Archived</option>
      </SEISelect>
    </div>
  );
}

export function SwitchPreview({ variant }: ComponentPreviewProps) {
  return (
    <div className="flex flex-col gap-3">
      <SEISwitch
        size={variant === "compact" ? "compact" : "comfortable"}
        defaultSelected={variant !== "off"}
        isDisabled={variant === "disabled"}
      >
        Vault Radio eligible
      </SEISwitch>
      <SEISwitch size="compact">Auto-tag metadata</SEISwitch>
    </div>
  );
}

export function CheckboxPreview({ variant }: ComponentPreviewProps) {
  return (
    <div className="flex flex-col gap-3">
      <SEICheckbox defaultSelected={variant !== "unchecked"} isDisabled={variant === "disabled"}>
        Include stems
      </SEICheckbox>
      <SEICheckbox isIndeterminate>Some files selected</SEICheckbox>
    </div>
  );
}

export function RadioGroupPreview({ variant }: ComponentPreviewProps) {
  return (
    <SEIRadioGroup
      label="Release lane"
      description="Arrow keys move through options."
      orientation={variant === "horizontal" ? "horizontal" : "vertical"}
      isInvalid={variant === "invalid"}
      errorMessage={variant === "invalid" ? "Pick a release lane." : undefined}
      defaultValue="vault"
    >
      <SEIRadio value="vault">Vault</SEIRadio>
      <SEIRadio value="registry">Registry</SEIRadio>
      <SEIRadio value="dojo">Dojo</SEIRadio>
    </SEIRadioGroup>
  );
}

export function SliderPreview({ variant }: ComponentPreviewProps) {
  return (
    <div className="w-full max-w-sm">
      <SEISlider
        label="Preview volume"
        showValue
        defaultValue={variant === "low" ? 24 : 72}
        isDisabled={variant === "disabled"}
      />
    </div>
  );
}

/* ---- Behavior ---- */

export function DialogPreview({ variant, mockIndex }: ComponentPreviewProps) {
  const v = variant as React.ComponentProps<typeof SEIDialogContent>["variant"];

  if (mockIndex === 1) {
    return (
      <SEIDialog>
        <SEIDialogTrigger
          render={
            <SEIButton variant="soft" icon={Layers}>
              View album details
            </SEIButton>
          }
        />
        <SEIDialogContent variant={v} className="max-w-md">
          <SEIDialogTitle className="sr-only">Album details</SEIDialogTitle>
          <SEIDialogDescription className="sr-only">
            An AlbumCard rendered inside an accessible dialog.
          </SEIDialogDescription>
          <AlbumCard album={mockAlbums[0]} variant="default" className="mt-1" />
        </SEIDialogContent>
      </SEIDialog>
    );
  }

  return (
    <SEIDialog>
      <SEIDialogTrigger
        render={
          <SEIButton variant="solid" icon={ShieldCheck}>
            Register this work
          </SEIButton>
        }
      />
      <SEIDialogContent variant={v} className="max-w-md">
        <SEIDialogTitle>Register this work?</SEIDialogTitle>
        <SEIDialogDescription>
          Mocked confirmation — no registry record is created. This only demonstrates the modal
          flow.
        </SEIDialogDescription>
        <div className="mt-5 flex justify-end gap-2">
          <SEIDialogClose render={<SEIButton variant="ghost">Cancel</SEIButton>} />
          <SEIDialogClose render={<SEIButton variant="solid">Confirm</SEIButton>} />
        </div>
      </SEIDialogContent>
    </SEIDialog>
  );
}

export function DrawerPreview({ variant, mockIndex }: ComponentPreviewProps) {
  const side = variant as React.ComponentProps<typeof SEIDrawerContent>["side"];
  const isQueue = mockIndex === 1;

  return (
    <SEIDrawer>
      <SEIDrawerTrigger
        render={
          <SEIButton variant="solid" icon={isQueue ? ListMusic : Layers}>
            {isQueue ? "Open player queue" : "Open vault details"}
          </SEIButton>
        }
      />
      <SEIDrawerContent side={side} size="wide" tone="dark">
        <SEIDrawerHeader>
          <SEIDrawerTitle>{isQueue ? "Up next" : "Vault fragment"}</SEIDrawerTitle>
        </SEIDrawerHeader>
        <SEIDrawerBody>
          {isQueue ? (
            <ul className="space-y-2">
              {mockPlayerTracks[0].queue.map((track, i) => (
                <li
                  key={track}
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
          ) : (
            <VaultFragmentCard fragment={mockVaultFragments[0]} variant="default" />
          )}
        </SEIDrawerBody>
        <SEIDrawerFooter>
          <SEIDrawerClose render={<SEIButton variant="ghost">Close</SEIButton>} />
          {!isQueue ? <SEIButton variant="solid">Tag fragment</SEIButton> : null}
        </SEIDrawerFooter>
      </SEIDrawerContent>
    </SEIDrawer>
  );
}

export function NativeDrawerPreview({ variant, mockIndex }: ComponentPreviewProps) {
  const side = variant as React.ComponentProps<typeof SEINativeDrawerContent>["side"];
  const isPlugin = mockIndex === 1;
  const triggerClass = seiButtonVariants({ variant: "solid" });

  return (
    <SEINativeDrawer side={side} snapPoints={side === "bottom" ? [0.4, 0.9] : undefined}>
      <SEINativeDrawerTrigger className={triggerClass}>
        {isPlugin ? (
          <Radio aria-hidden="true" className="size-4" />
        ) : (
          <ListMusic aria-hidden="true" className="size-4" />
        )}
        {isPlugin ? "Plugin settings" : "Player queue"}
      </SEINativeDrawerTrigger>
      <SEINativeDrawerContent side={side} tone="dark" size="default">
        <SEINativeDrawerHeader>
          <SEINativeDrawerTitle>
            {isPlugin ? "Plugin slot · SAP" : "Up next · drag or snap"}
          </SEINativeDrawerTitle>
        </SEINativeDrawerHeader>
        <SEINativeDrawerBody>
          {isPlugin ? (
            <div className="space-y-2 pb-4">
              {["Enable visualizer", "Auto-tag metadata", "Vault Radio eligible"].map((label) => (
                <MockSwitchRow key={label} label={label} />
              ))}
            </div>
          ) : (
            <ul className="space-y-2 pb-4">
              {mockPlayerTracks[0].queue.map((track, i) => (
                <li
                  key={track}
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
          )}
        </SEINativeDrawerBody>
        <SEINativeDrawerFooter>
          <SEINativeDrawerClose className={seiButtonVariants({ variant: "ghost" })}>
            Done
          </SEINativeDrawerClose>
        </SEINativeDrawerFooter>
      </SEINativeDrawerContent>
    </SEINativeDrawer>
  );
}

export function TabsPreview({ variant }: ComponentPreviewProps) {
  return (
    <div className="w-full max-w-md">
      <SEITabs
        defaultValue="albums"
        variant={variant as React.ComponentProps<typeof SEITabs>["variant"]}
      >
        <SEITabsList>
          <SEITabsTrigger value="albums">Albums</SEITabsTrigger>
          <SEITabsTrigger value="vault">Vault</SEITabsTrigger>
          <SEITabsTrigger value="registry">Registry</SEITabsTrigger>
          <SEITabsTrigger value="archived" disabled>
            Archived
          </SEITabsTrigger>
        </SEITabsList>
        <SEITabsPanel value="albums">Album lane panel. Tabs only switch panels.</SEITabsPanel>
        <SEITabsPanel value="vault">Vault lane panel — nothing is loaded.</SEITabsPanel>
        <SEITabsPanel value="registry">Registry lane panel. Verification is mocked.</SEITabsPanel>
      </SEITabs>
    </div>
  );
}

export function PopoverPreview({ variant }: ComponentPreviewProps) {
  return (
    <SEIPopover>
      <SEIPopoverTrigger
        render={
          <SEIButton variant="outline" icon={Info}>
            Metadata info
          </SEIButton>
        }
      />
      <SEIPopoverContent
        variant={variant as React.ComponentProps<typeof SEIPopoverContent>["variant"]}
        side="bottom"
        className="max-w-sm"
      >
        <SEIPopoverTitle>Quick actions</SEIPopoverTitle>
        <SEIPopoverDescription>
          Popovers host quick actions, plugin-slot notes, or metadata details.
        </SEIPopoverDescription>
      </SEIPopoverContent>
    </SEIPopover>
  );
}

export function TooltipPreview(_props: ComponentPreviewProps) {
  return (
    <SEITooltipProvider>
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]">
            {mockMetrics[0].label}
          </p>
          <p className="text-2xl font-black tracking-[-0.06em] text-white">
            {mockMetrics[0].value}
          </p>
        </div>
        <SEITooltip>
          <SEITooltipTrigger
            render={
              <button
                type="button"
                aria-label="About this metric"
                className="grid size-8 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-[var(--sh-color-mist)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)]"
              >
                <Info aria-hidden="true" className="size-4" />
              </button>
            }
          />
          <SEITooltipContent>{mockMetrics[0].helper}</SEITooltipContent>
        </SEITooltip>
      </div>
    </SEITooltipProvider>
  );
}

export function ComboboxWorkbenchPreview({ mockIndex }: ComponentPreviewProps) {
  if (mockIndex === 1) {
    return (
      <div className="w-full max-w-xs">
        <SEIComboboxPreview
          label="Pick vault tag"
          placeholder="Find a tag…"
          options={mockVaultTagOptions}
        />
      </div>
    );
  }
  return (
    <div className="w-full max-w-xs">
      <SEIComboboxPreview label="Search artists" options={mockArtistOptions} />
    </div>
  );
}

export function MultiSelectComboboxPreview({ mockIndex }: ComponentPreviewProps) {
  const configs = [
    {
      label: "Vault tag picker",
      description: "Mock vault tags — one option is disabled.",
      options: mockVaultTags,
      defaultValue: ["demo"],
    },
    {
      label: "Album genre picker",
      description: "Pick one or more genres.",
      options: mockGenreOptions,
      defaultValue: ["melodic-rap", "rnb"],
    },
    {
      label: "Registry label picker",
      description: "Mock validation shows the error state.",
      options: mockRegistryLabels,
      defaultValue: [] as string[],
    },
    {
      label: "Dojo category picker",
      description: "Categorize a Dojo module.",
      options: mockDojoCategories,
      defaultValue: ["artist-world"],
    },
  ] as const;
  const config = pick(configs, mockIndex);

  return (
    <div className="w-full max-w-sm">
      <SEIMultiSelectCombobox
        key={config.label}
        label={config.label}
        description={config.description}
        placeholder="Search…"
        options={config.options}
        defaultValue={[...config.defaultValue]}
        errorMessage={
          config.label === "Registry label picker"
            ? "At least one label is required (mock validation)."
            : undefined
        }
      />
    </div>
  );
}

export function CommandPaletteWorkbenchPreview(_props: ComponentPreviewProps) {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <SEIButton variant="solid" icon={Command} onClick={() => setOpen(true)}>
        Open command palette
      </SEIButton>
      <p className="text-xs text-[var(--sh-color-mist)]">
        or press{" "}
        <kbd className="rounded-md border border-white/12 bg-white/[0.05] px-1.5 py-0.5 font-mono text-xs">
          ⌘K
        </kbd>{" "}
        /{" "}
        <kbd className="rounded-md border border-white/12 bg-white/[0.05] px-1.5 py-0.5 font-mono text-xs">
          Ctrl K
        </kbd>
        {last ? (
          <span className="ml-2 text-[var(--sh-interactive-text)]">Last run (mock): {last}</span>
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

export function MenuPreview({ variant }: ComponentPreviewProps) {
  return (
    <SEIMenu>
      <SEIMenuTrigger
        render={
          <SEIButton
            variant="outline"
            icon={MenuIcon}
            iconRight={<ChevronDown className="size-4" />}
          >
            Open menu
          </SEIButton>
        }
      />
      <SEIMenuContent tone={variant as React.ComponentProps<typeof SEIMenuContent>["tone"]}>
        <SEIMenuGroup>
          <SEIMenuLabel>Vault actions</SEIMenuLabel>
          <SEIMenuItem>Open fragment</SEIMenuItem>
          <SEIMenuItem>Duplicate draft</SEIMenuItem>
          <SEIMenuCheckboxItem defaultChecked>Show registry metadata</SEIMenuCheckboxItem>
        </SEIMenuGroup>
        <SEIMenuSeparator />
        <SEIMenuRadioGroup defaultValue="compact">
          <SEIMenuLabel>Density</SEIMenuLabel>
          <SEIMenuRadioItem value="comfortable">Comfortable</SEIMenuRadioItem>
          <SEIMenuRadioItem value="compact">Compact</SEIMenuRadioItem>
        </SEIMenuRadioGroup>
        <SEIMenuSeparator />
        <SEIMenuItem destructive>Archive fragment</SEIMenuItem>
      </SEIMenuContent>
    </SEIMenu>
  );
}

export function ToastPreview({ variant }: ComponentPreviewProps) {
  const { toast } = useSEIToast();
  const tone = variant as React.ComponentProps<typeof SEIToastButton>["tone"];
  return <SEIToastButton tone={tone} onFire={toast} />;
}

function SEIToastButton({
  tone,
  onFire,
}: {
  tone: NonNullable<Parameters<ReturnType<typeof useSEIToast>["toast"]>[0]["tone"]>;
  onFire: ReturnType<typeof useSEIToast>["toast"];
}) {
  const label = `Fire ${tone} toast`;
  return (
    <SEIButton
      variant={tone === "danger" ? "outline" : "solid"}
      icon={Bell}
      onClick={() =>
        onFire({
          title: tone === "danger" ? "Upload failed" : "Vault update saved",
          description:
            tone === "danger"
              ? "A mock danger notification announces assertively."
              : "A mock notification was added to the toast queue.",
          tone,
        })
      }
    >
      {label}
    </SEIButton>
  );
}

/* ---- Music Particles ---- */

export function AlbumCardPreview({ variant, mockIndex }: ComponentPreviewProps) {
  return (
    <AlbumCard
      album={pick(mockAlbums, mockIndex)}
      variant={variant as React.ComponentProps<typeof AlbumCard>["variant"]}
      className={variant === "feature" ? "w-full max-w-xl md:col-span-1" : "w-full max-w-sm"}
    />
  );
}

export function ArtistCardPreview({ variant, mockIndex }: ComponentPreviewProps) {
  return (
    <ArtistCard
      artist={pick(mockArtists, mockIndex)}
      variant={variant as React.ComponentProps<typeof ArtistCard>["variant"]}
      className={variant === "profile" ? "w-full max-w-xl md:col-span-1" : "w-full max-w-sm"}
    />
  );
}

export function VaultFragmentCardPreview({ variant, mockIndex }: ComponentPreviewProps) {
  return (
    <VaultFragmentCard
      fragment={pick(mockVaultFragments, mockIndex)}
      variant={variant as React.ComponentProps<typeof VaultFragmentCard>["variant"]}
      className="w-full max-w-sm"
    />
  );
}

export function DojoModuleCardPreview({ variant, mockIndex }: ComponentPreviewProps) {
  return (
    <DojoModuleCard
      module={pick(mockDojoModules, mockIndex)}
      variant={variant as React.ComponentProps<typeof DojoModuleCard>["variant"]}
      className="w-full max-w-sm"
    />
  );
}

export function PlayerShellWorkbenchPreview({ variant, mockIndex }: ComponentPreviewProps) {
  return (
    <PlayerShellExpanded
      track={pick(mockPlayerTracks, mockIndex)}
      variant={variant as React.ComponentProps<typeof PlayerShellExpanded>["variant"]}
      className="w-full"
    />
  );
}

const pluginSlotMocks = [
  {
    slotName: "SAP",
    description: "Visual placeholder for future song asset package controls and metadata surfaces.",
  },
  {
    slotName: "Vault Radio",
    description: "A non-playing slot for future radio, queue, and fragment programming concepts.",
  },
  {
    slotName: "Environment Engine",
    description: "Mock controls for ambience, context, and adaptive player environments.",
  },
  {
    slotName: "Registry Seal",
    description: "Placeholder area for future verification visuals without registry logic.",
  },
  {
    slotName: "Creator Tools",
    description: "Future slot for rollout tasks, split reminders, templates, and internal actions.",
  },
] as const;

export function PluginSlotWorkbenchPreview({ variant, mockIndex }: ComponentPreviewProps) {
  const slot = pick(pluginSlotMocks, mockIndex);
  return (
    <PluginSlotPreview
      slotName={slot.slotName}
      description={slot.description}
      status={variant as React.ComponentProps<typeof PluginSlotPreview>["status"]}
      className="w-full max-w-sm"
    />
  );
}

export function MetricCardWorkbenchPreview({ variant, mockIndex }: ComponentPreviewProps) {
  const metric = pick(mockMetrics, mockIndex);
  return (
    <MetricCard
      {...metric}
      variant={variant as React.ComponentProps<typeof MetricCard>["variant"]}
      className="w-full max-w-xs"
    />
  );
}

export function ActionStripPreview({ variant }: ComponentPreviewProps) {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-dashed border-white/12 p-4">
      <ActionStrip
        align={variant as React.ComponentProps<typeof ActionStrip>["align"]}
        primary={{ label: "Launch showcase", icon: <ArrowRight className="size-3.5" /> }}
        secondary={{ label: "Save draft" }}
        iconActions={[
          { label: "Radio", icon: <Radio className="size-4" /> },
          { label: "More", icon: <MoreHorizontal className="size-4" /> },
        ]}
      />
    </div>
  );
}

/* ---- Registry ---- */

export function RegistrySealWorkbenchPreview({ variant, mockIndex }: ComponentPreviewProps) {
  return (
    <RegistrySeal
      status={variant as React.ComponentProps<typeof RegistrySeal>["status"]}
      registryId={mockIndex === 0 ? "SEI-042" : undefined}
    />
  );
}

export function RegistryPanelWorkbenchPreview({ variant, mockIndex }: ComponentPreviewProps) {
  return (
    <RegistryPanel
      item={pick(mockRegistryItems, mockIndex)}
      state={variant as React.ComponentProps<typeof RegistryPanel>["state"]}
      className="w-full max-w-md"
    />
  );
}

/* ---- Layout ---- */

export function ContainerPreview({ variant }: ComponentPreviewProps) {
  return (
    <div className="w-full rounded-2xl border border-dashed border-white/12 py-4">
      <SEIContainer
        size={variant as React.ComponentProps<typeof SEIContainer>["size"]}
        padding="md"
        className="rounded-xl border border-[rgba(0,122,255,0.24)] bg-[rgba(0,122,255,0.08)] py-5 text-center text-sm text-[var(--sh-color-cloud)]"
      >
        {variant} container
      </SEIContainer>
    </div>
  );
}

export function AppShellPreview({ variant }: ComponentPreviewProps) {
  const withSidebar = variant !== "no-sidebar";
  return (
    <SEIAppShell
      className="min-h-[20rem] overflow-hidden rounded-2xl border border-white/10"
      header={
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold text-white">SEA Console</span>
          <SEIBadge variant="soft" size="sm">
            Mock
          </SEIBadge>
        </div>
      }
      sidebar={
        withSidebar ? (
          <div className="space-y-2 p-3 text-xs text-[var(--sh-color-cloud)]">
            <div className="rounded-lg bg-white/[0.05] px-2 py-1.5">Vault</div>
            <div className="rounded-lg px-2 py-1.5">Registry</div>
          </div>
        ) : undefined
      }
    >
      <div className="grid min-h-48 place-items-center p-5 text-sm text-[var(--sh-color-mist)]">
        App content region
      </div>
    </SEIAppShell>
  );
}

export function PageHeaderPreview({ variant }: ComponentPreviewProps) {
  return (
    <SEIPageHeader
      eyebrow={variant === "plain" ? undefined : "Vault"}
      title="Recovered fragments"
      description={
        variant === "plain" ? undefined : "Review ideas, notes, stems, and registry readiness."
      }
      breadcrumb={
        variant === "breadcrumb" ? (
          <span className="text-xs text-[var(--sh-color-mist)]">SEA / Vault</span>
        ) : undefined
      }
      actions={
        variant === "actions" ? (
          <>
            <SEIButton variant="ghost" size="sm">
              Export
            </SEIButton>
            <SEIButton variant="solid" size="sm" icon={Archive}>
              Add
            </SEIButton>
          </>
        ) : undefined
      }
      className="w-full max-w-2xl"
    />
  );
}

export function ToolbarPreview({ variant }: ComponentPreviewProps) {
  return (
    <SEIToolbar
      aria-label="Vault toolbar"
      sticky={variant === "sticky"}
      start={
        <SEIButton variant="ghost" size="sm" icon={Filter}>
          Filter
        </SEIButton>
      }
      end={
        <SEIButton variant="solid" size="sm" icon={Save}>
          Save
        </SEIButton>
      }
      className="w-full max-w-xl"
    >
      <SEIButton variant="ghost" size="sm" icon={Download}>
        Export
      </SEIButton>
      <SEIButton variant="ghost" size="sm" icon={Settings}>
        Settings
      </SEIButton>
    </SEIToolbar>
  );
}

export function ActionBarPreview({ variant }: ComponentPreviewProps) {
  return (
    <SEIActionBar
      align={variant as React.ComponentProps<typeof SEIActionBar>["align"]}
      className="w-full max-w-xl"
    >
      <SEIButton variant="ghost">Cancel</SEIButton>
      <SEIButton variant="solid">Save changes</SEIButton>
    </SEIActionBar>
  );
}

export function FilterBarPreview({ variant }: ComponentPreviewProps) {
  return (
    <SEIFilterBar
      aria-label="Filter vault fragments"
      resultCount={variant === "single" ? 1 : 24}
      onClear={variant === "clearable" ? () => undefined : undefined}
      className="w-full max-w-xl"
    >
      <SEIBadge variant="soft">Vocals</SEIBadge>
      <SEIBadge variant="outline">Needs review</SEIBadge>
      <SEIButton variant="ghost" size="sm" icon={ListFilter}>
        More filters
      </SEIButton>
    </SEIFilterBar>
  );
}

export function SplitPanePreview({ variant }: ComponentPreviewProps) {
  return (
    <SEISplitPane
      startWidth={variant === "wide" ? "360px" : "260px"}
      gap={variant as React.ComponentProps<typeof SEISplitPane>["gap"]}
      className="w-full max-w-3xl"
      start={
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-white">
          Fragment list
        </div>
      }
      end={
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-[var(--sh-color-cloud)]">
          Detail panel
        </div>
      }
    />
  );
}

export function StickyFooterPreview({ variant }: ComponentPreviewProps) {
  return (
    <div className="h-56 w-full max-w-md overflow-y-auto rounded-2xl border border-white/10">
      <div className="space-y-3 p-4 text-sm text-[var(--sh-color-cloud)]">
        {Array.from({ length: 6 }).map((_, index) => (
          <p key={index}>Scrollable mock content row {index + 1}</p>
        ))}
      </div>
      <SEIStickyFooter as={variant === "div" ? "div" : "footer"}>
        <div className="flex justify-end gap-2">
          <SEIButton variant="ghost" size="sm">
            Cancel
          </SEIButton>
          <SEIButton variant="solid" size="sm">
            Apply
          </SEIButton>
        </div>
      </SEIStickyFooter>
    </div>
  );
}

export function SafeAreaPreview({ variant }: ComponentPreviewProps) {
  const edges =
    variant === "bottom"
      ? (["bottom"] as const)
      : variant === "top"
        ? (["top"] as const)
        : undefined;
  return (
    <SEISafeArea
      edges={edges}
      className="rounded-2xl border border-dashed border-white/12 bg-white/[0.03] p-5 text-sm text-[var(--sh-color-cloud)]"
    >
      Safe-area padding wrapper
    </SEISafeArea>
  );
}

export function BottomNavigationPreview({ variant }: ComponentPreviewProps) {
  const [activeId, setActiveId] = useState("vault");
  const destinations = [
    { id: "home", label: "Home", icon: <Home className="size-5" /> },
    { id: "vault", label: "Vault", icon: <ListMusic className="size-5" /> },
    { id: "registry", label: "Registry", icon: <ShieldCheck className="size-5" /> },
    { id: "dojo", label: "Dojo", icon: <Sparkles className="size-5" /> },
    { id: "profile", label: "Profile", icon: <UserRound className="size-5" /> },
  ];
  const itemCount = variant === "three-items" ? 3 : variant === "five-items" ? 5 : 4;

  return (
    <div className="h-72 w-full max-w-sm overflow-y-auto rounded-2xl border border-white/10 bg-black/20">
      <div className="space-y-3 p-4 text-sm text-[var(--sh-color-cloud)]">
        {Array.from({ length: 6 }).map((_, index) => (
          <p key={index}>Scrollable mock content row {index + 1}</p>
        ))}
      </div>
      <SEIBottomNavigation
        aria-label="Demo app"
        items={destinations.slice(0, itemCount).map((destination) => ({
          ...destination,
          active: destination.id === activeId,
          onSelect: setActiveId,
        }))}
      />
    </div>
  );
}

export function NavigationDrawerPreview({ variant }: ComponentPreviewProps) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("vault");

  const destination = (id: string, label: string, icon: React.ReactNode) => ({
    id,
    label,
    icon,
    active: id === activeId,
    onSelect: (selectedId: string) => {
      setActiveId(selectedId);
      setOpen(false);
    },
  });

  const sections = [
    {
      id: "browse",
      label: "Browse",
      items: [
        destination("home", "Home", <Home className="size-5" />),
        destination("vault", "Vault", <ListMusic className="size-5" />),
        destination("registry", "Registry", <ShieldCheck className="size-5" />),
      ],
    },
    {
      id: "create",
      label: "Create",
      items: [
        destination("dojo", "Dojo", <Sparkles className="size-5" />),
        destination("profile", "Profile", <UserRound className="size-5" />),
      ],
    },
  ];

  return (
    <div className="flex items-center gap-3">
      <SEIButton variant="solid" icon={MenuIcon} onClick={() => setOpen(true)}>
        Open navigation
      </SEIButton>
      <SEINavigationDrawer
        open={open}
        onClose={() => setOpen(false)}
        aria-label="Demo app"
        side={variant === "right-side" ? "right" : "left"}
        account={
          variant === "sections-only"
            ? undefined
            : {
                name: "Sensei Dukes",
                detail: "sensei@seihouse.app",
                onSelect: () => setOpen(false),
              }
        }
        sections={sections}
        actions={[
          {
            id: "settings",
            label: "Settings",
            icon: <Settings className="size-5" />,
            onSelect: () => setOpen(false),
          },
          {
            id: "sign-out",
            label: "Sign out",
            icon: <LogOut className="size-5" />,
            onSelect: () => setOpen(false),
          },
        ]}
      />
    </div>
  );
}

export function ScrollAreaPreview({ variant }: ComponentPreviewProps) {
  return (
    <SEIScrollArea
      maxHeight={variant === "tall" ? "18rem" : "12rem"}
      label="Vault fragment scroll area"
      className="w-full max-w-md rounded-2xl border border-white/10"
    >
      <div className="space-y-2 p-3">
        {mockVaultFragments.concat(mockVaultFragments).map((fragment, index) => (
          <SEIMediaRow
            key={`${fragment.id}-${index}`}
            title={fragment.title}
            subtitle={fragment.type}
            meta={fragment.status}
          />
        ))}
      </div>
    </SEIScrollArea>
  );
}

export function ScrollLanePreview({ variant }: ComponentPreviewProps) {
  return (
    <SEIScrollLane
      gap={variant as React.ComponentProps<typeof SEIScrollLane>["gap"]}
      snap={variant === "snap"}
      label="Album lane"
      className="w-full max-w-2xl rounded-2xl border border-white/10 p-3"
    >
      {mockAlbums.map((album) => (
        <AlbumCard key={album.id} album={album} variant="compact" className="w-64 shrink-0" />
      ))}
    </SEIScrollLane>
  );
}

/* ---- Media ---- */

export function AspectRatioPreview({ variant }: ComponentPreviewProps) {
  const ratio = variant === "video" ? "16/9" : variant === "portrait" ? "3/4" : 1;
  return (
    <SEIAspectRatio
      ratio={ratio}
      className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.04]"
    >
      <div className="grid place-items-center text-sm text-[var(--sh-color-mist)]">
        {variant} frame
      </div>
    </SEIAspectRatio>
  );
}

export function ThumbnailPreview({ variant }: ComponentPreviewProps) {
  return (
    <SEIThumbnail
      alt="Mock album artwork"
      ratio={variant === "video" ? "16/9" : 1}
      radius={variant as React.ComponentProps<typeof SEIThumbnail>["radius"]}
      fallbackIcon={ImageIcon}
      className="w-full max-w-xs"
    />
  );
}

export function AvatarPreview({ variant }: ComponentPreviewProps) {
  return (
    <div className="flex items-center gap-3">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <SEIAvatar
          key={size}
          name={variant === "accent" ? "Vault Radio" : "Sensei Dukes"}
          size={size}
          tone={variant as React.ComponentProps<typeof SEIAvatar>["tone"]}
        />
      ))}
    </div>
  );
}

export function MediaRowPreview({ variant }: ComponentPreviewProps) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 p-2">
      <SEIMediaRow
        interactive={variant === "interactive"}
        onClick={variant === "interactive" ? () => undefined : undefined}
        thumbnail={<SEIThumbnail alt="Fragment art" fallbackIcon={Music} className="size-12" />}
        title="Late night bridge"
        subtitle="Voice note · 1:24"
        meta={
          <SEIBadge variant="outline" size="sm">
            Draft
          </SEIBadge>
        }
      />
    </div>
  );
}

/* ---- Data ---- */

const tablePreviewRows = [
  { id: "north", title: "North Room", status: "Ready", plays: 1840, owner: "DUKES" },
  { id: "after", title: "after hours", status: "Draft", plays: 620, owner: "Mira" },
  { id: "cycle", title: "Cycle 77", status: "Review", plays: 980, owner: "Jules" },
  { id: "zero", title: "Zero Pass", status: "Archived", plays: null, owner: "SEA" },
] as const;

export function DataTablePreview({ variant }: ComponentPreviewProps) {
  const [sortKey, setSortKey] = useState<"title" | "plays">("title");
  const [sortDirection, setSortDirection] = useState<SEISortDirection>("asc");
  const [selected, setSelected] = useState<Set<string>>(() => new Set(["north"]));
  const rows = sortRows(tablePreviewRows, sortKey, sortDirection);

  const toggleSort = (key: "title" | "plays") => {
    if (sortKey === key) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const toggleRow = (id: string, checked: boolean) => {
    setSelected((current) => {
      const next = new Set(current);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
      <SEIScrollArea maxHeight="17rem" label="Registry table">
        <SEITable density={variant as React.ComponentProps<typeof SEITable>["density"]}>
          <SEITableHeader>
            <SEITableRow hover={false}>
              <SEITableHead sticky className="w-10">
                <span className="sr-only">Select</span>
              </SEITableHead>
              <SEITableHead
                sticky
                sortable
                sortDirection={sortKey === "title" ? sortDirection : false}
                onSort={() => toggleSort("title")}
              >
                Title
              </SEITableHead>
              <SEITableHead sticky>Status</SEITableHead>
              <SEITableHead
                sticky
                align="right"
                sortable
                sortDirection={sortKey === "plays" ? sortDirection : false}
                onSort={() => toggleSort("plays")}
              >
                Plays
              </SEITableHead>
              <SEITableHead sticky>Owner</SEITableHead>
            </SEITableRow>
          </SEITableHeader>
          <SEITableBody>
            {rows.map((row) => (
              <SEITableRow key={row.id} selected={selected.has(row.id)} zebra>
                <SEITableSelectionCell
                  label={`Select ${row.title}`}
                  checked={selected.has(row.id)}
                  onCheckedChange={(checked) => toggleRow(row.id, checked)}
                />
                <SEITableCell className="font-semibold text-white">{row.title}</SEITableCell>
                <SEITableCell>{row.status}</SEITableCell>
                <SEITableCell align="right" className="tabular-nums">
                  {row.plays == null ? "-" : row.plays.toLocaleString()}
                </SEITableCell>
                <SEITableCell>{row.owner}</SEITableCell>
              </SEITableRow>
            ))}
          </SEITableBody>
        </SEITable>
      </SEIScrollArea>
    </div>
  );
}

export function ShowcaseHeroWorkbenchPreview({ variant, mockIndex }: ComponentPreviewProps) {
  return (
    <ShowcaseHero
      entry={pick(mockShowcaseEntries, mockIndex)}
      variant={variant as React.ComponentProps<typeof ShowcaseHero>["variant"]}
      headingLevel={1}
      className="w-full"
    />
  );
}

export function ShowcaseBlockWorkbenchPreview({ variant }: ComponentPreviewProps) {
  return (
    <ShowcaseBlock
      variant={variant as React.ComponentProps<typeof ShowcaseBlock>["variant"]}
      title="Showcase block"
      description="A titled panel wrapper for framing grouped examples."
      className="w-full max-w-md"
    >
      <div className="flex flex-wrap gap-2">
        <SEIBadge variant="soft">Composable</SEIBadge>
        <SEIBadge variant="outline">Calm</SEIBadge>
      </div>
    </ShowcaseBlock>
  );
}
