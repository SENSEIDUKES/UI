import type { ReactNode } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import { memo } from "react";

import type { ShowcaseEntry } from "../types/music";
import { SEIBadge } from "../primitives/sei-badge";
import { SEIButton } from "../primitives/sei-button";
import { SEIPanel } from "../primitives/sei-panel";
import { cn } from "../styles/cn";

const showcaseHeroStyles = tv({
  slots: {
    panel: "relative overflow-hidden",
    grid: "relative z-10 grid gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-center",
    headline: "max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.075em] sm:text-6xl",
    preview:
      "min-h-64 overflow-hidden rounded-[1.35rem] border border-[var(--sh-border)] bg-[var(--sh-interactive-surface)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
  },
  variants: {
    variant: {
      clean: {},
      soft: {
        panel: "bg-[rgba(0,122,255,0.065)]",
      },
      dark: {
        panel: "bg-[#07080c]",
      },
      light: {
        preview: "border-black/10 bg-white text-[#111318]",
      },
      media: {
        headline: "text-white",
        preview:
          "border-white/12 bg-[radial-gradient(circle_at_20%_10%,rgba(0,122,255,0.28),transparent_26rem),radial-gradient(circle_at_86%_24%,rgba(255,107,53,0.18),transparent_22rem),rgba(255,255,255,0.06)]",
      },
      experimental: {
        panel:
          "bg-[radial-gradient(circle_at_14%_0%,rgba(255,107,53,0.20),transparent_24rem),radial-gradient(circle_at_90%_20%,rgba(0,122,255,0.20),transparent_26rem)]",
      },
    },
  },
  defaultVariants: { variant: "clean" },
});

const heroSurface = {
  clean: "default",
  soft: "soft",
  dark: "dark",
  light: "light",
  media: "media-test",
  experimental: "glass-test",
} as const;

export interface ShowcaseHeroProps extends VariantProps<typeof showcaseHeroStyles> {
  entry?: ShowcaseEntry;
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  badges?: string[];
  primaryAction?: string;
  secondaryAction?: string;
  preview?: ReactNode;
  className?: string;
}

export function ShowcaseHero({
  entry,
  eyebrow,
  headline,
  subheadline,
  badges,
  primaryAction = "Explore lab",
  secondaryAction = "Compare variants",
  preview,
  variant = "clean",
  className,
}: ShowcaseHeroProps) {
  const styles = showcaseHeroStyles({ variant });
  const heroEyebrow = eyebrow ?? entry?.eyebrow ?? "SEIHouse lab";
  const heroHeadline = headline ?? entry?.headline ?? "Reusable music-business UI particles.";
  const heroSubheadline =
    subheadline ??
    entry?.subheadline ??
    "Mocked, reusable interface blocks for future product concepts.";
  const heroBadges = badges ?? entry?.badges ?? ["Mock data", "UI only", "Reusable"];

  return (
    <SEIPanel
      as="section"
      variant={heroSurface[variant ?? "clean"]}
      padding="lg"
      className={cn(styles.panel(), className)}
    >
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 size-72 rounded-full bg-[var(--sh-color-sea)]/10 blur-3xl"
      />
      <div className={styles.grid()}>
        <div className="space-y-7">
          <SEIBadge variant={variant === "light" ? "light" : "glass-test"} icon={Sparkles}>
            {heroEyebrow}
          </SEIBadge>
          <div className="space-y-5">
            <h1 className={styles.headline()}>{heroHeadline}</h1>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--sh-text-muted)] sm:text-xl">
              {heroSubheadline}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {heroBadges.map((badge) => (
              <SEIBadge key={badge} variant="registry">
                {badge}
              </SEIBadge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <SEIButton size="lg" variant="solid" iconRight={<ArrowRight className="size-4" />}>
              {primaryAction}
            </SEIButton>
            <SEIButton size="lg" variant={variant === "light" ? "light" : "outline"}>
              {secondaryAction}
            </SEIButton>
          </div>
        </div>

        <div className={styles.preview()}>
          {preview ?? (
            <div className="flex h-full min-h-52 flex-col justify-between gap-8">
              <div className="flex items-center justify-between gap-3">
                <SEIBadge variant="media-test" size="sm">
                  {entry?.previewLabel ?? "Preview area"}
                </SEIBadge>
                <span className="font-mono text-xs text-[var(--sh-text-subtle)]">visual only</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[72, 44, 88, 56, 66, 38].map((height, index) => (
                  <span
                    key={index}
                    className="rounded-2xl border border-[var(--sh-border)] bg-[var(--sh-interactive-surface)]"
                    style={{ height }}
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-[var(--sh-text-muted)]">
                Optional preview slot for album worlds, dashboard summaries, registry states, or
                creator-tool mockups.
              </p>
            </div>
          )}
        </div>
      </div>
    </SEIPanel>
  );
}

export default memo(ShowcaseHero, (prevProps, nextProps) => {
  // Custom comparison for complex props
  const entryEqual =
    (!prevProps.entry && !nextProps.entry) ||
    Boolean(
      prevProps.entry &&
      nextProps.entry &&
      prevProps.entry.eyebrow === nextProps.entry.eyebrow &&
      prevProps.entry.headline === nextProps.entry.headline &&
      prevProps.entry.subheadline === nextProps.entry.subheadline &&
      prevProps.entry.previewLabel === nextProps.entry.previewLabel &&
      JSON.stringify(prevProps.entry.badges) === JSON.stringify(nextProps.entry.badges),
    );

  const badgesEqual = JSON.stringify(prevProps.badges) === JSON.stringify(nextProps.badges);

  return (
    entryEqual &&
    prevProps.eyebrow === nextProps.eyebrow &&
    prevProps.headline === nextProps.headline &&
    prevProps.subheadline === nextProps.subheadline &&
    badgesEqual &&
    prevProps.primaryAction === nextProps.primaryAction &&
    prevProps.secondaryAction === nextProps.secondaryAction &&
    prevProps.preview === nextProps.preview &&
    prevProps.variant === nextProps.variant &&
    prevProps.className === nextProps.className
  );
});
