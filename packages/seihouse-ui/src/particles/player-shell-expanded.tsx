import {
  ListMusic,
  Pause,
  Play,
  Radio,
  SkipBack,
  SkipForward,
  SlidersHorizontal,
  Volume2,
} from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import { memo } from "react";

import type { PlayerTrack } from "../types/music";
import { SEIBadge } from "../primitives/sei-badge";
import { SEIButton } from "../primitives/sei-button";
import { SEIPanel } from "../primitives/sei-panel";
import { cn } from "../styles/cn";

const playerShellExpandedStyles = tv({
  slots: {
    panel: "relative overflow-hidden",
    layout: "grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start",
    artwork:
      "relative aspect-square overflow-hidden rounded-[1.5rem] border border-white/12 bg-[radial-gradient(circle_at_34%_24%,rgba(0,122,255,0.45),transparent_34%),radial-gradient(circle_at_78%_74%,rgba(255,107,53,0.32),transparent_34%),rgba(255,255,255,0.055)]",
    controls: "flex flex-wrap items-center justify-center gap-2",
    side: "grid gap-4 md:grid-cols-2",
  },
  variants: {
    variant: {
      compact: {
        layout: "grid gap-5 md:grid-cols-[8rem_1fr] md:items-center",
        artwork: "rounded-[1.1rem]",
        side: "hidden",
      },
      expanded: {},
      docked: {
        panel: "rounded-full",
        layout: "grid gap-4 md:grid-cols-[5rem_1fr_auto] md:items-center",
        artwork: "rounded-full",
        side: "hidden",
        controls: "justify-end",
      },
      dark: {
        artwork:
          "bg-[radial-gradient(circle_at_36%_26%,rgba(0,122,255,0.28),transparent_34%),#050609]",
      },
      light: {
        artwork:
          "border-black/10 bg-[radial-gradient(circle_at_34%_24%,rgba(0,122,255,0.22),transparent_34%),white]",
      },
    },
  },
  defaultVariants: { variant: "expanded" },
});

const playerSurface = {
  compact: "glass-test",
  expanded: "media-test",
  docked: "glass-test",
  dark: "dark",
  light: "light",
} as const;

export interface PlayerShellExpandedProps extends VariantProps<typeof playerShellExpandedStyles> {
  track: PlayerTrack;
  className?: string;
}

export function PlayerShellExpanded({
  track,
  variant = "expanded",
  className,
}: PlayerShellExpandedProps) {
  const styles = playerShellExpandedStyles({ variant });
  const safeProgress = Math.min(100, Math.max(0, track.progress));

  return (
    <SEIPanel
      variant={playerSurface[variant ?? "expanded"]}
      padding={variant === "docked" ? "sm" : "md"}
      className={cn(styles.panel(), className)}
    >
      <div className={styles.layout()}>
        <div className={styles.artwork()}>
          <div className="absolute inset-6 rounded-full border border-dashed border-white/22" />
          <div className="absolute left-1/2 top-1/2 size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-white/80" />
          <SEIBadge className="absolute left-4 top-4" variant="glass-test" size="sm" icon={Radio}>
            SAP preview
          </SEIBadge>
        </div>

        <div className="min-w-0 space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]">
                {track.project}
              </p>
              <h3 className="truncate text-2xl font-semibold tracking-[-0.05em]">{track.title}</h3>
              <p className="mt-1 text-sm text-[var(--sh-color-cloud)]">{track.artist}</p>
            </div>
            <SEIBadge variant="warning" size="sm">
              no audio logic
            </SEIBadge>
          </div>

          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--sh-color-sea),var(--sh-color-accent))]"
                style={{ width: `${safeProgress}%` }}
              />
            </div>
            <div className="flex justify-between font-mono text-[0.68rem] text-[var(--sh-color-mist)]">
              <span>01:{String(safeProgress).padStart(2, "0")}</span>
              <span>{track.duration}</span>
            </div>
          </div>

          <div className={styles.controls()}>
            <SEIButton
              variant="ghost"
              size="sm"
              icon={SkipBack}
              aria-label="Previous track visual"
            />
            <SEIButton variant="solid" size="md" icon={Play} aria-label="Play visual" />
            <SEIButton variant="ghost" size="sm" icon={Pause} aria-label="Pause visual" />
            <SEIButton
              variant="ghost"
              size="sm"
              icon={SkipForward}
              aria-label="Next track visual"
            />
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-[var(--sh-color-mist)]">
              <Volume2 aria-hidden="true" className="size-4" />
              <span className="h-1.5 w-16 rounded-full bg-white/15">
                <span className="block h-full w-2/3 rounded-full bg-white/45" />
              </span>
            </div>
          </div>
        </div>

        {variant !== "compact" && variant !== "docked" ? (
          <div className={styles.side()}>
            <div className="rounded-[1.1rem] border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <ListMusic aria-hidden="true" className="size-4 text-[var(--sh-color-sea)]" />
                Queue
              </div>
              <div className="space-y-2 text-sm text-[var(--sh-color-cloud)]">
                {track.queue.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/8 bg-white/[0.035] px-3 py-2"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.1rem] border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <SlidersHorizontal
                  aria-hidden="true"
                  className="size-4 text-[var(--sh-color-accent)]"
                />
                Environment
              </div>
              <div className="grid gap-2 text-sm text-[var(--sh-color-cloud)]">
                {Object.entries(track.metadata).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between gap-3 rounded-xl bg-white/[0.035] px-3 py-2"
                  >
                    <span className="text-[var(--sh-color-mist)]">{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </SEIPanel>
  );
}

export default memo(PlayerShellExpanded, (prevProps, nextProps) => {
  // Custom comparison for PlayerTrack object
  if (prevProps.track !== nextProps.track) {
    // Deep compare track properties that affect rendering
    return (
      prevProps.track.title === nextProps.track.title &&
      prevProps.track.artist === nextProps.track.artist &&
      prevProps.track.project === nextProps.track.project &&
      prevProps.track.progress === nextProps.track.progress &&
      prevProps.track.duration === nextProps.track.duration &&
      JSON.stringify(prevProps.track.queue) === JSON.stringify(nextProps.track.queue) &&
      JSON.stringify(prevProps.track.metadata) === JSON.stringify(nextProps.track.metadata)
    );
  }
  return (
    prevProps.variant === nextProps.variant &&
    prevProps.className === nextProps.className
  );
});
