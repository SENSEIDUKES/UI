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
    icon: "grid size-12 shrink-0 place-items-center rounded-2xl border border-[var(--sh-border)] bg-[var(--sh-interactive-surface)] text-[var(--sh-text-primary)]",
    context: "text-sm leading-relaxed text-[var(--sh-text-muted)]",
  },
  variants: {
    variant: {
      default: {},
      recovery: {
        icon: "border-[var(--sh-status-success-border)] bg-[var(--sh-status-success-bg)] text-[var(--sh-status-success-text)]",
      },
      archive: {
        icon: "border-[var(--sh-border)] bg-[var(--sh-surface-elevated)] text-[var(--sh-text-muted)]",
      },
      compact: {
        header: "items-center",
        icon: "size-10 rounded-xl",
        context: "line-clamp-2",
      },
      dark: {
        icon: "border-[var(--sh-border)] bg-[#050609] text-[var(--sh-text-primary)]",
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
      elevateOnHover
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

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--sh-border)] pt-4 text-sm text-[var(--sh-text-subtle)]">
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
    const fragmentEqual =
      prevProps.fragment.title === nextProps.fragment.title &&
      prevProps.fragment.context === nextProps.fragment.context &&
      prevProps.fragment.date === nextProps.fragment.date &&
      prevProps.fragment.duration === nextProps.fragment.duration &&
      prevProps.fragment.type === nextProps.fragment.type &&
      prevProps.fragment.status === nextProps.fragment.status &&
      JSON.stringify(prevProps.fragment.tags) === JSON.stringify(nextProps.fragment.tags);
    // Even if fragment content is the same, check variant and className
    return (
      fragmentEqual &&
      prevProps.variant === nextProps.variant &&
      prevProps.className === nextProps.className
    );
  }
  // Fragment reference is same, check variant and className
  return prevProps.variant === nextProps.variant && prevProps.className === nextProps.className;
});
