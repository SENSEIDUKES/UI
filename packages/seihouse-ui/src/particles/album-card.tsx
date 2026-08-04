import { ArrowRight, Disc3, Library, Tag } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import { memo } from "react";

import type { Album } from "../types/music";
import { SEIBadge } from "../primitives/sei-badge";
import { SEIButton } from "../primitives/sei-button";
import { SEICard } from "../primitives/sei-card";
import { cn } from "../styles/cn";

const albumCardStyles = tv({
  slots: {
    card: "h-full",
    media:
      "relative overflow-hidden bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.24),transparent_18rem),linear-gradient(135deg,rgba(0,122,255,0.34),rgba(255,107,53,0.16))]",
    artwork:
      "relative flex aspect-square items-end justify-between overflow-hidden rounded-[1.15rem] border border-[var(--sh-border)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
    title: "tracking-[-0.04em]",
    tags: "flex flex-wrap gap-2",
  },
  variants: {
    variant: {
      default: {
        media: "min-h-44 p-5",
        artwork:
          "bg-[radial-gradient(circle_at_30%_20%,rgba(0,122,255,0.46),transparent_38%),rgba(255,255,255,0.06)]",
      },
      compact: {
        media: "min-h-28 p-4",
        artwork:
          "aspect-[16/9] bg-[radial-gradient(circle_at_30%_20%,rgba(0,122,255,0.36),transparent_40%),rgba(255,255,255,0.055)]",
      },
      feature: {
        card: "md:col-span-2",
        media: "min-h-56 p-6",
        artwork:
          "aspect-[16/10] bg-[radial-gradient(circle_at_24%_14%,rgba(0,122,255,0.55),transparent_42%),radial-gradient(circle_at_80%_76%,rgba(255,107,53,0.36),transparent_35%),rgba(255,255,255,0.07)]",
        title: "text-2xl",
      },
      dark: {
        media: "min-h-44 p-5 bg-[#050609]",
        artwork:
          "bg-[radial-gradient(circle_at_35%_25%,rgba(0,122,255,0.28),transparent_40%),#08090d]",
      },
      light: {
        media: "min-h-44 p-5 bg-[#f7f6f1]",
        artwork:
          "border-black/10 bg-[radial-gradient(circle_at_30%_20%,rgba(0,122,255,0.22),transparent_40%),white] text-[#111318]",
      },
      "media-test": {
        media:
          "min-h-44 p-5 bg-[radial-gradient(circle_at_18%_0%,rgba(0,122,255,0.32),transparent_30rem),radial-gradient(circle_at_92%_14%,rgba(255,107,53,0.24),transparent_25rem),rgba(10,12,18,0.94)]",
        artwork:
          "bg-[linear-gradient(135deg,rgba(0,122,255,0.38),rgba(255,107,53,0.20)),rgba(255,255,255,0.055)]",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const albumSurface = {
  default: "media-test",
  compact: "default",
  feature: "media-test",
  dark: "dark",
  light: "light",
  "media-test": "media-test",
} as const;

const toneGlow = {
  sea: "bg-[var(--sh-color-sea)]",
  accent: "bg-[var(--sh-color-accent)]",
  violet: "bg-violet-400",
  gold: "bg-amber-300",
  mono: "bg-white/70",
} as const;

export interface AlbumCardProps extends VariantProps<typeof albumCardStyles> {
  album: Album;
  className?: string;
}

export function AlbumCard({ album, variant = "default", className }: AlbumCardProps) {
  const styles = albumCardStyles({ variant });

  return (
    <SEICard
      variant={albumSurface[variant ?? "default"]}
      padding="md"
      elevateOnHover
      className={cn(styles.card(), className)}
      contentClassName={variant === "compact" ? "space-y-3" : undefined}
      media={
        <div className={styles.media()}>
          <div className={styles.artwork()}>
            <span
              className={cn(
                "absolute right-5 top-5 size-24 rounded-full blur-2xl",
                toneGlow[album.artworkTone],
              )}
            />
            <div className="relative z-10 grid size-12 place-items-center rounded-2xl border border-[var(--sh-border-strong)] bg-[var(--sh-overlay)] text-[var(--sh-text-primary)] backdrop-blur-xl">
              <Disc3 aria-hidden="true" className="size-5" />
            </div>
            <div className="relative z-10 text-right font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sh-text-primary)]">
              {album.releaseType}
            </div>
          </div>
        </div>
      }
      eyebrow={
        <div className="flex flex-wrap gap-2">
          <SEIBadge size="sm" variant="media-test" icon={Library}>
            {album.releaseType}
          </SEIBadge>
          <SEIBadge size="sm" variant={album.status === "Released" ? "success" : "registry"}>
            {album.status}
          </SEIBadge>
        </div>
      }
      title={<span className={styles.title()}>{album.title}</span>}
      metadata={album.year}
      description={variant === "compact" ? undefined : album.description}
      footer={
        <div className="space-y-4">
          <div className="text-sm font-medium text-[var(--sh-text-muted)]">{album.artist}</div>
          <div className={styles.tags()}>
            {album.tags.map((tag) => (
              <SEIBadge key={tag} size="sm" variant="outline" icon={Tag}>
                {tag}
              </SEIBadge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <SEIButton size="sm" variant="solid" iconRight={<ArrowRight className="size-3.5" />}>
              View release
            </SEIButton>
            <SEIButton size="sm" variant="ghost">
              Registry
            </SEIButton>
          </div>
        </div>
      }
    />
  );
}

export default memo(AlbumCard, (prevProps, nextProps) => {
  // Custom comparison for Album object
  if (prevProps.album !== nextProps.album) {
    // Deep compare album properties that affect rendering
    const albumEqual =
      prevProps.album.title === nextProps.album.title &&
      prevProps.album.artist === nextProps.album.artist &&
      prevProps.album.year === nextProps.album.year &&
      prevProps.album.description === nextProps.album.description &&
      prevProps.album.releaseType === nextProps.album.releaseType &&
      prevProps.album.status === nextProps.album.status &&
      JSON.stringify(prevProps.album.tags) === JSON.stringify(nextProps.album.tags);
    // Even if album content is the same, check variant and className
    return (
      albumEqual &&
      prevProps.variant === nextProps.variant &&
      prevProps.className === nextProps.className
    );
  }
  // Album reference is same, check variant and className
  return prevProps.variant === nextProps.variant && prevProps.className === nextProps.className;
});
