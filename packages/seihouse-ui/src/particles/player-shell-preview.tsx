import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { memo } from "react";

import { SEIBadge } from "../primitives/sei-badge";
import { SEIButton } from "../primitives/sei-button";
import { SEIPanel } from "../primitives/sei-panel";
import { cn } from "../styles/cn";
import type { SEIPanelVariantProps } from "../styles/variants";

export interface PlayerShellPreviewProps extends SEIPanelVariantProps {
  title?: string;
  artist?: string;
  progress?: number;
  className?: string;
}

export function PlayerShellPreview({
  title = "Midnight Registry Demo",
  artist = "SENSEIDUKES · lab preview",
  progress = 62,
  variant = "glass-test",
  padding = "md",
  className,
}: PlayerShellPreviewProps) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <SEIPanel variant={variant} padding={padding} className={cn("max-w-xl", className)}>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <SEIBadge variant="media-test" size="sm">
            Player shell · visual only
          </SEIBadge>
          <span className="font-mono text-xs text-[var(--sh-color-mist)]">00:{safeProgress}</span>
        </div>

        <div className="grid gap-5 sm:grid-cols-[6.5rem_1fr] sm:items-center">
          <div className="relative aspect-square overflow-hidden rounded-[1.2rem] border border-white/12 bg-[radial-gradient(circle_at_35%_25%,rgba(0,122,255,0.45),transparent_38%),radial-gradient(circle_at_78%_74%,rgba(255,107,53,0.32),transparent_36%),rgba(255,255,255,0.055)]">
            <div className="absolute inset-4 rounded-full border border-dashed border-white/22" />
            <div className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80" />
          </div>

          <div className="min-w-0 space-y-4">
            <div>
              <h3 className="truncate text-xl font-semibold tracking-[-0.04em] text-white">
                {title}
              </h3>
              <p className="mt-1 text-sm text-[var(--sh-color-cloud)]">{artist}</p>
            </div>

            <div className="space-y-2">
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,var(--sh-color-sea),var(--sh-color-accent))]"
                  style={{ width: `${safeProgress}%` }}
                />
              </div>
              <div className="flex justify-between font-mono text-[0.68rem] text-[var(--sh-color-mist)]">
                <span>01:24</span>
                <span>03:48</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <SEIButton variant="ghost" size="sm" icon={SkipBack} aria-label="Previous track preview" />
            <SEIButton variant="solid" size="md" icon={Play} aria-label="Play preview" />
            <SEIButton variant="ghost" size="sm" icon={SkipForward} aria-label="Next track preview" />
          </div>
          <div className="flex items-center gap-3 text-[var(--sh-color-mist)]">
            <Pause aria-hidden="true" className="size-4 opacity-60" />
            <Volume2 aria-hidden="true" className="size-4" />
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full bg-white/45" />
            </div>
          </div>
        </div>
      </div>
    </SEIPanel>
  );
}

export default memo(PlayerShellPreview, (prevProps, nextProps) => {
  // Simple prop comparison for scalar values
  return (
    prevProps.title === nextProps.title &&
    prevProps.artist === nextProps.artist &&
    prevProps.progress === nextProps.progress &&
    prevProps.variant === nextProps.variant &&
    prevProps.padding === nextProps.padding &&
    prevProps.className === nextProps.className
  );
});
