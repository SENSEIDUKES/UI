import { ArrowRight, Radio, UserRound } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import { memo } from "react";

import type { Artist } from "../types/music";
import { SEIBadge } from "../primitives/sei-badge";
import { SEIButton } from "../primitives/sei-button";
import { SEICard } from "../primitives/sei-card";
import { cn } from "../styles/cn";

const artistCardStyles = tv({
  slots: {
    card: "h-full",
    layout: "flex gap-4",
    avatar:
      "relative grid shrink-0 place-items-center overflow-hidden rounded-full border border-white/12 bg-white/[0.055] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
    bio: "text-sm leading-relaxed text-[var(--sh-color-cloud)]",
  },
  variants: {
    variant: {
      default: { avatar: "size-20", layout: "items-start" },
      compact: { avatar: "size-14", layout: "items-center", bio: "line-clamp-2" },
      profile: {
        card: "md:col-span-2",
        avatar: "size-28",
        layout: "flex-col sm:flex-row sm:items-center",
      },
      dark: { avatar: "size-20 bg-[#07080c]" },
      light: { avatar: "size-20 border-black/10 bg-white text-[#111318]" },
    },
  },
  defaultVariants: { variant: "default" },
});

const artistSurface = {
  default: "default",
  compact: "soft",
  profile: "media-test",
  dark: "dark",
  light: "light",
} as const;

const toneRing = {
  sea: "from-[rgba(0,122,255,0.55)]",
  accent: "from-[rgba(255,107,53,0.55)]",
  violet: "from-[rgba(167,139,250,0.55)]",
  gold: "from-[rgba(251,191,36,0.55)]",
  mono: "from-white/35",
} as const;

export interface ArtistCardProps extends VariantProps<typeof artistCardStyles> {
  artist: Artist;
  className?: string;
}

export function ArtistCard({ artist, variant = "default", className }: ArtistCardProps) {
  const styles = artistCardStyles({ variant });

  return (
    <SEICard
      variant={artistSurface[variant ?? "default"]}
      padding={variant === "compact" ? "sm" : "md"}
      interactive
      className={cn(styles.card(), className)}
    >
      <div className={styles.layout()}>
        <div className={styles.avatar()}>
          <span
            className={cn(
              "absolute inset-0 bg-gradient-to-br to-transparent",
              toneRing[artist.avatarTone],
            )}
          />
          <UserRound aria-hidden="true" className="relative z-10 size-8" />
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]">
                {artist.role}
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-[-0.04em]">{artist.name}</h3>
            </div>
            <SEIBadge variant={artist.status === "Featured" ? "success" : "registry"} size="sm">
              {artist.status}
            </SEIBadge>
          </div>
          {variant !== "compact" ? <p className={styles.bio()}>{artist.bio}</p> : null}
          <div className="flex flex-wrap gap-2">
            {artist.tags.map((tag) => (
              <SEIBadge key={tag} variant="outline" size="sm">
                {tag}
              </SEIBadge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <SEIButton size="sm" variant="solid" iconRight={<ArrowRight className="size-3.5" />}>
              Open profile
            </SEIButton>
            <SEIButton size="sm" variant="ghost" icon={Radio}>
              Showcase
            </SEIButton>
          </div>
        </div>
      </div>
    </SEICard>
  );
}

export default memo(ArtistCard, (prevProps, nextProps) => {
  // Custom comparison for Artist object
  if (prevProps.artist !== nextProps.artist) {
    // Deep compare artist properties that affect rendering
    const artistEqual = (
      prevProps.artist.name === nextProps.artist.name &&
      prevProps.artist.role === nextProps.artist.role &&
      prevProps.artist.bio === nextProps.artist.bio &&
      prevProps.artist.status === nextProps.artist.status &&
      prevProps.artist.avatarTone === nextProps.artist.avatarTone &&
      JSON.stringify(prevProps.artist.tags) === JSON.stringify(nextProps.artist.tags)
    );
    // Even if artist content is the same, check variant and className
    return artistEqual &&
      prevProps.variant === nextProps.variant &&
      prevProps.className === nextProps.className;
  }
  // Artist reference is same, check variant and className
  return (
    prevProps.variant === nextProps.variant &&
    prevProps.className === nextProps.className
  );
});
