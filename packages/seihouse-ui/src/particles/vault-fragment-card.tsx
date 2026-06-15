import { Archive, ArrowRight, Clock3, FileArchive, Sparkles } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import { memo } from "react";

import type { VaultFragment } from "../types/music";
import { SEIBadge } from "../primitives/sei-badge";
import { SEIButton } from "../primitives/sei-button";
import { SEICard } from "../primitives/sei-card";
import { cn } from "../styles/cn";

const vaultFragmentCardStyles = tv({
  slots: {
    card: "h-full",
    header: "flex items-start gap-4",
    icon: "grid size-12 shrink-0 place-items-center rounded-2xl border border-white/12 bg-white/[0.055] text-white",
    context: "text-sm leading-relaxed text-[var(--sh-color-cloud)]",
  },
  variants: {
    variant: {
      default: {},
      recovery: {
        icon: "border-[rgba(52,199,89,0.28)] bg-[rgba(52,199,89,0.10)] text-[#8ff0aa]",
      },
      archive: {
        icon: "border-white/10 bg-[#08090d] text-[var(--sh-color-cloud)]",
      },
      compact: {
        header: "items-center",
        icon: "size-10 rounded-xl",
        context: "line-clamp-2",
      },
      dark: {
        icon: "border-white/10 bg-[#050609] text-white",
      },
    },
  },
  defaultVariants: { variant: "default" },
});

const vaultSurface = {
  default: "default",
  recovery: "soft",
  archive: "outline",
  compact: "default",
  dark: "dark",
} as const;

export interface VaultFragmentCardProps extends VariantProps<typeof vaultFragmentCardStyles> {
  fragment: VaultFragment;
  className?: string;
}

export function VaultFragmentCard({
  fragment,
  variant = "default",
  className,
}: VaultFragmentCardProps) {
  const styles = vaultFragmentCardStyles({ variant });
  const isArchive = variant === "archive" || fragment.type === "Archive";

  return (
    <SEICard
      variant={vaultSurface[variant ?? "default"]}
      padding={variant === "compact" ? "sm" : "md"}
      interactive
      className={cn(styles.card(), className)}
    >
      <div className="space-y-4">
        <div className={styles.header()}>
          <div className={styles.icon()}>
            {isArchive ? (
              <Archive aria-hidden="true" className="size-5" />
            ) : (
              <FileArchive aria-hidden="true" className="size-5" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <SEIBadge variant={variant === "recovery" ? "success" : "media-test"} size="sm">
                {fragment.type}
              </SEIBadge>
              <SEIBadge variant="registry" size="sm">
                {fragment.status}
              </SEIBadge>
            </div>
            <h3 className="mt-3 text-lg font-semibold leading-tight tracking-[-0.04em]">
              {fragment.title}
            </h3>
          </div>
        </div>

        {variant !== "compact" ? <p className={styles.context()}>{fragment.context}</p> : null}

        <div className="flex flex-wrap gap-2">
          {fragment.tags.map((tag) => (
            <SEIBadge key={tag} variant="outline" size="sm" icon={Sparkles}>
              {tag}
            </SEIBadge>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm text-[var(--sh-color-mist)]">
          <div className="flex flex-wrap items-center gap-3">
            <span>{fragment.date}</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs">
              <Clock3 aria-hidden="true" className="size-3.5" />
              {fragment.duration}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <SEIButton size="sm" variant="ghost">
              Tag
            </SEIButton>
            <SEIButton size="sm" variant="outline" iconRight={<ArrowRight className="size-3.5" />}>
              Inspect
            </SEIButton>
          </div>
        </div>
      </div>
    </SEICard>
  );
}

export default memo(VaultFragmentCard, (prevProps, nextProps) => {
  // Custom comparison for VaultFragment object
  if (prevProps.fragment !== nextProps.fragment) {
    // Deep compare fragment properties that affect rendering
    const fragmentEqual = (
      prevProps.fragment.title === nextProps.fragment.title &&
      prevProps.fragment.context === nextProps.fragment.context &&
      prevProps.fragment.date === nextProps.fragment.date &&
      prevProps.fragment.duration === nextProps.fragment.duration &&
      prevProps.fragment.type === nextProps.fragment.type &&
      prevProps.fragment.status === nextProps.fragment.status &&
      JSON.stringify(prevProps.fragment.tags) === JSON.stringify(nextProps.fragment.tags)
    );
    // Even if fragment content is the same, check variant and className
    return fragmentEqual &&
      prevProps.variant === nextProps.variant &&
      prevProps.className === nextProps.className;
  }
  // Fragment reference is same, check variant and className
  return (
    prevProps.variant === nextProps.variant &&
    prevProps.className === nextProps.className
  );
});
