import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Disc3,
  LayoutDashboard,
  MousePointerClick,
  MoreHorizontal,
  Palette,
  Play,
  Radio,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

import { BehaviorShowcase } from "@/components/showcase/behavior-showcase";
import { BehaviorHardeningShowcase } from "@/components/showcase/behavior-hardening-showcase";
import {
  LazyAlbumCard,
  LazyArtistCard,
  LazyDojoModuleCard,
  LazyMetricCard,
  LazyPlayerShellExpanded,
  LazyPlayerShellPreview,
  LazyPluginSlotPreview,
  LazyRegistryPanel,
  LazyVaultFragmentCard,
} from "@/components/showcase/lazy-particles";

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
import { ActionStrip, RegistrySeal, ShowcaseBlock, ShowcaseHero } from "@seihouse/ui";
import { SEIBadge } from "@seihouse/ui";
import { SEIButton } from "@seihouse/ui";
import { SEICard } from "@seihouse/ui";
import { SEIPanel } from "@seihouse/ui";
import { SEISection } from "@seihouse/ui";

const styleLanes = [
  {
    name: "Clean",
    variant: "default",
    description: "Neutral lab surface for general product UI.",
  },
  {
    name: "Soft",
    variant: "soft",
    description: "Low-pressure blue tint for calm navigation and onboarding.",
  },
  {
    name: "Dark",
    variant: "dark",
    description: "Dense studio surface for media, dashboards, and focused tools.",
  },
  {
    name: "Light",
    variant: "light",
    description: "High-contrast neutral lane to test non-dark contexts.",
  },
  {
    name: "Media Test",
    variant: "media-test",
    description: "Music-forward gradients for cards, players, and campaign surfaces.",
  },
  {
    name: "Glass Test",
    variant: "glass-test",
    description: "Frosted overlay experiments inspired by player shells and panels.",
  },
] as const;

const buttonVariants = [
  "default",
  "soft",
  "outline",
  "ghost",
  "solid",
  "dark",
  "light",
  "glass-test",
  "media-test",
] as const;

const badgeVariants = [
  "default",
  "soft",
  "outline",
  "ghost",
  "solid",
  "dark",
  "light",
  "glass-test",
  "media-test",
  "success",
  "warning",
  "danger",
  "registry",
] as const;

const navItems = [
  "Mission",
  "Foundation",
  "Music Particles",
  "Behavior",
  "Behavior Hardening",
  "Experience Blocks",
  "Registry",
  "Dashboard",
  "Style Lanes",
] as const;

const pluginSlots = [
  {
    slotName: "SAP",
    description: "Visual placeholder for future song asset package controls and metadata surfaces.",
    status: "mocked",
  },
  {
    slotName: "Vault Radio",
    description: "A non-playing slot for future radio, queue, and fragment programming concepts.",
    status: "planned",
  },
  {
    slotName: "Environment Engine",
    description: "Mock controls for ambience, context, and adaptive player environments.",
    status: "experimental",
  },
  {
    slotName: "Registry Seal",
    description: "Placeholder area for future verification visuals without registry logic.",
    status: "mocked",
  },
  {
    slotName: "Creator Tools",
    description: "Future slot for rollout tasks, split reminders, templates, and internal actions.",
    status: "planned",
  },
] as const;

export function SEIComponentShowcase({ route = "/" }: { route?: string }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--sh-color-black)] text-[var(--sh-color-ivory)]">
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px),radial-gradient(circle_at_12%_8%,rgba(0,122,255,0.24),transparent_34rem),radial-gradient(circle_at_84%_12%,rgba(255,107,53,0.14),transparent_30rem),#050609] bg-[length:44px_44px,44px_44px,auto,auto,auto]"
      />
      <div
        aria-hidden="true"
        className="fixed inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050609] to-transparent"
      />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050609]/75 backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-4 lg:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full border border-dashed border-[rgba(0,122,255,0.62)] bg-[rgba(0,122,255,0.08)] text-xs font-black tracking-[0.14em] text-[var(--sh-color-sea)] shadow-[0_0_28px_rgba(0,122,255,0.16)]">
                SEI
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-white">
                  SEIHOUSE UI
                </p>
                <p className="font-mono text-xs text-[var(--sh-color-mist)]">
                  {route} · Phase 4 behavior hardening lab
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <SEIBadge variant="soft" icon={Sparkles}>
                Phase 4
              </SEIBadge>
              <SEIBadge variant="registry">Mock data only</SEIBadge>
              <SEIButton variant="ghost" size="sm" iconRight={<ArrowRight className="size-3.5" />}>
                One-page lab
              </SEIButton>
            </div>
          </div>
          <nav className="flex gap-2 overflow-x-auto pb-1 text-xs" aria-label="Lab sections">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-semibold text-[var(--sh-color-cloud)] transition-colors hover:border-white/20 hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 lg:px-6">
        <section
          id="mission"
          className="grid gap-6 py-10 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch"
        >
          <ShowcaseHero
            variant="media"
            entry={mockShowcaseEntries[0]}
            primaryAction="Explore Phase 2"
            secondaryAction="Keep it visual"
            preview={<LazyPlayerShellExpanded track={mockPlayerTracks[0]} variant="compact" />}
            className="min-h-[34rem]"
          />

          <div className="grid gap-6">
            <LazyPlayerShellPreview className="max-w-none" progress={52} />
            <ShowcaseBlock
              variant="glass-test"
              title="Phase 2 boundary"
              description="This lab evolves the Phase 1 component system into music-business particles. Everything is mocked: no playback, backend, auth, Supabase, registry database, or plugin runtime."
            >
              <div className="flex flex-wrap gap-2">
                <SEIBadge variant="success">Particles only</SEIBadge>
                <SEIBadge variant="warning">No audio playback</SEIBadge>
                <SEIBadge variant="outline">No backend</SEIBadge>
                <SEIBadge variant="soft">No brand lock</SEIBadge>
              </div>
            </ShowcaseBlock>
          </div>
        </section>

        <SEISection
          eyebrow="01 / Mission"
          title="Music-business UI particles built on the Phase 1 foundation."
          description="Phase 2 adds reusable blocks for albums, artists, vault fragments, Dojo modules, registry states, player shells, plugins, metrics, and actions — all visual-only and mock-driven."
          aside={
            <SEIBadge variant="registry" icon={Boxes}>
              Product-aware, logic-free
            </SEIBadge>
          }
        >
          <div className="grid gap-5 md:grid-cols-3">
            <ShowcaseBlock title="Reusable particles" variant="default">
              <p className="text-sm leading-relaxed text-[var(--sh-color-cloud)]">
                Each particle accepts className, composes Phase 1 primitives, and exposes local
                variants only where the particle needs product-specific styling.
              </p>
            </ShowcaseBlock>
            <ShowcaseBlock title="Music-business aware" variant="soft">
              <p className="text-sm leading-relaxed text-[var(--sh-color-cloud)]">
                Mock content covers release worlds, creators, registry panels, vault recovery,
                learning modules, and internal dashboard summaries.
              </p>
            </ShowcaseBlock>
            <ShowcaseBlock title="Deferred behavior" variant="outline">
              <p className="text-sm leading-relaxed text-[var(--sh-color-cloud)]">
                Audio playback, auth, APIs, registry databases, plugin execution, and final
                brand-system decisions remain out of scope.
              </p>
            </ShowcaseBlock>
          </div>
        </SEISection>

        <SEISection
          eyebrow="02 / Primitive Foundation"
          title="Phase 1 primitives remain visible and unchanged."
          description="Buttons, badges, panels, cards, and sections continue to provide the reusable foundation for every Phase 2 particle."
          aside={<SEIBadge variant="soft">Tailwind variants</SEIBadge>}
        >
          <div id="foundation" className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <ShowcaseBlock
              title="SEIButton variants"
              variant="glass-test"
              contentClassName="flex flex-wrap gap-3"
            >
              {buttonVariants.map((variant) => (
                <SEIButton key={variant} variant={variant} icon={Sparkles}>
                  {variant}
                </SEIButton>
              ))}
            </ShowcaseBlock>
            <ShowcaseBlock
              title="SEIBadge variants"
              variant="default"
              contentClassName="flex flex-wrap gap-3"
            >
              {badgeVariants.map((variant) => (
                <SEIBadge key={variant} variant={variant} icon={BadgeCheck}>
                  {variant}
                </SEIBadge>
              ))}
            </ShowcaseBlock>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <SEICard
              variant="default"
              interactive
              eyebrow="Project"
              title="SEA Portal shell"
              description="A reusable card for showing routes, tools, or projects without binding to app logic."
              metadata="UI mock"
              footer="metadata · actions · footer"
            />
            <SEICard
              variant="soft"
              interactive
              eyebrow="Content"
              title="Artist world block"
              description="Flexible layout for creator pages, album worlds, or collection previews."
              metadata="Content lane"
              footer={<SEIBadge variant="soft">Composable</SEIBadge>}
            />
            <SEICard
              variant="glass-test"
              interactive
              eyebrow="Experiment"
              title="Glass overlay card"
              description="A test surface for overlays, future player docks, and ambient panels."
              metadata="Visual lane"
              footer={<SEIBadge variant="glass-test">Exploratory</SEIBadge>}
            />
          </div>
        </SEISection>

        <SEISection
          eyebrow="03 / Music-Business Particles"
          title="Albums, artists, vault fragments, and Dojo modules."
          description="These components are reusable product-style particles, not app workflows. They use realistic fake data and stay flexible across style lanes."
          aside={
            <SEIBadge variant="media-test" icon={Disc3}>
              Particles
            </SEIBadge>
          }
        >
          <div id="music-particles" className="space-y-6">
            <div className="grid gap-5 lg:grid-cols-3">
              <LazyAlbumCard album={mockAlbums[0]} variant="feature" />
              <LazyAlbumCard album={mockAlbums[1]} variant="dark" />
              <LazyAlbumCard album={mockAlbums[2]} variant="light" />
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              <LazyArtistCard artist={mockArtists[0]} variant="profile" />
              <LazyArtistCard artist={mockArtists[1]} variant="default" />
              <LazyArtistCard artist={mockArtists[2]} variant="compact" />
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              <LazyVaultFragmentCard fragment={mockVaultFragments[0]} variant="recovery" />
              <LazyVaultFragmentCard fragment={mockVaultFragments[1]} variant="default" />
              <LazyVaultFragmentCard fragment={mockVaultFragments[2]} variant="archive" />
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              <LazyDojoModuleCard module={mockDojoModules[0]} variant="lesson" />
              <LazyDojoModuleCard module={mockDojoModules[1]} variant="template" />
              <LazyDojoModuleCard module={mockDojoModules[2]} variant="skill" />
            </div>
          </div>
        </SEISection>

        <SEISection
          eyebrow="04 / Behavior Primitives"
          title="Accessible interaction foundations powered by Base UI and React Aria."
          description="Phase 3 adds the first headless behavior libraries. Base UI and React Aria provide focus management, keyboard navigation, and ARIA wiring; SEIHouse keeps full visual control through Tailwind variants. Everything below is mocked — no audio, backend, auth, or registry runtime."
          aside={
            <SEIBadge variant="soft" icon={MousePointerClick}>
              Headless behavior
            </SEIBadge>
          }
        >
          <BehaviorShowcase />
        </SEISection>

        <SEISection
          eyebrow="05 / Behavior Hardening"
          title="Native drawer, multi-select tagging, a global command palette, tests, and reduced motion."
          description="Phase 4 hardens the behavior layer for real apps: a swipe/snap drawer (vaul), a multi-select metadata combobox, a ⌘K command palette with fuzzy search and recent commands, Playwright + axe tests, a reduced-motion strategy, and shared variants promoted into styles/variants.ts. Still mocked — no audio, backend, auth, or registry runtime."
          aside={
            <SEIBadge variant="soft" icon={Wrench}>
              Hardening
            </SEIBadge>
          }
        >
          <BehaviorHardeningShowcase />
        </SEISection>

        <SEISection
          eyebrow="06 / Experience Blocks"
          title="Hero, player shell, and future plugin placeholders."
          description="These particles preview higher-order product surfaces without adding runtime behavior."
          aside={
            <SEIBadge variant="warning" icon={Play}>
              Visual only
            </SEIBadge>
          }
        >
          <div id="experience-blocks" className="space-y-6">
            <ShowcaseHero
              variant="soft"
              entry={mockShowcaseEntries[1]}
              primaryAction="Preview portal"
              secondaryAction="Map modules"
            />
            <LazyPlayerShellExpanded track={mockPlayerTracks[1]} variant="expanded" />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {pluginSlots.map((slot) => (
                <LazyPluginSlotPreview key={slot.slotName} {...slot} />
              ))}
            </div>
          </div>
        </SEISection>

        <SEISection
          eyebrow="07 / Registry / Status"
          title="Registry panels and status seals for mocked verification states."
          description="RegistryPanel composes SEIPanel, RegistrySeal, badges, and buttons as a reusable product particle. No registry service or database is included."
          aside={
            <SEIBadge variant="registry" icon={ShieldCheck}>
              Status systems
            </SEIBadge>
          }
        >
          <div id="registry" className="space-y-6">
            <div className="grid gap-5 lg:grid-cols-3">
              {mockRegistryItems.map((item) => (
                <LazyRegistryPanel key={item.id} item={item} />
              ))}
            </div>
            <ShowcaseBlock
              variant="media-test"
              title="RegistrySeal state sweep"
              contentClassName="flex flex-wrap gap-3"
            >
              <RegistrySeal status="draft" registryId="D-001" />
              <RegistrySeal status="registered" registryId="SEI-042" />
              <RegistrySeal status="verified" registryId="V-777" />
              <RegistrySeal status="archived" registryId="A-009" />
              <RegistrySeal status="experimental" registryId="X-100" />
            </ShowcaseBlock>
          </div>
        </SEISection>

        <SEISection
          eyebrow="08 / Dashboard / Utility"
          title="Metrics and actions for internal dashboards and creator tools."
          description="MetricCard and ActionStrip support quick dashboard summaries, creator operations, and responsive action rows."
          aside={
            <SEIBadge variant="soft" icon={LayoutDashboard}>
              Utility
            </SEIBadge>
          }
        >
          <div id="dashboard" className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {mockMetrics.map((metric, index) => (
                <LazyMetricCard
                  key={metric.label}
                  {...metric}
                  variant={
                    index % 5 === 0
                      ? "soft"
                      : index % 5 === 1
                        ? "default"
                        : index % 5 === 2
                          ? "outline"
                          : index % 5 === 3
                            ? "dark"
                            : "light"
                  }
                />
              ))}
            </div>
            <ShowcaseBlock
              variant="glass-test"
              title="ActionStrip examples"
              description="Reusable responsive action row composed entirely from SEIButton."
            >
              <div className="space-y-4">
                <ActionStrip
                  primary={{ label: "Launch showcase", icon: <ArrowRight className="size-3.5" /> }}
                  secondary={{ label: "Save draft" }}
                  iconActions={[
                    { label: "Radio", icon: <Radio className="size-4" /> },
                    { label: "More", icon: <MoreHorizontal className="size-4" /> },
                  ]}
                />
                <ActionStrip
                  align="start"
                  primary={{ label: "Register work" }}
                  secondary={{ label: "Review splits" }}
                />
              </div>
            </ShowcaseBlock>
          </div>
        </SEISection>

        <SEISection
          eyebrow="09 / Style Lanes"
          title="Exploratory visual directions, not final identity decisions."
          description="Clean, soft, dark, light, media, and glass lanes expose a flexible palette for future testing across primitives and Phase 2 particles."
          aside={<SEIBadge variant="warning">Not final brand system</SEIBadge>}
        >
          <div id="style-lanes" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {styleLanes.map((lane) => (
              <ShowcaseBlock
                key={lane.name}
                variant={lane.variant}
                title={lane.name}
                description={lane.description}
                interactive
              >
                <div className="space-y-5">
                  <div className="grid grid-cols-4 gap-2">
                    <span className="h-12 rounded-2xl bg-[var(--sh-color-sea)]" />
                    <span className="h-12 rounded-2xl bg-[var(--sh-color-accent)]" />
                    <span className="h-12 rounded-2xl bg-white/20" />
                    <span className="h-12 rounded-2xl bg-black/30" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <SEIBadge variant={lane.variant === "light" ? "light" : "outline"}>
                      {lane.name}
                    </SEIBadge>
                    <SEIButton size="sm" variant={lane.variant} icon={Palette}>
                      Test
                    </SEIButton>
                  </div>
                </div>
              </ShowcaseBlock>
            ))}
          </div>
        </SEISection>

        <footer className="relative z-10 flex flex-col gap-3 border-t border-white/10 py-10 text-sm text-[var(--sh-color-mist)] sm:flex-row sm:items-center sm:justify-between">
          <span>SEIHOUSE-UI · Phase 4 behavior hardening lab</span>
          <span className="font-mono text-xs">
            @seihouse/ui · behavior · Base UI · React Aria · vaul · Playwright + axe
          </span>
        </footer>
      </div>
    </main>
  );
}
