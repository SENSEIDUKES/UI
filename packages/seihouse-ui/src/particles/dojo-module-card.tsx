import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, Layers3 } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import { memo } from "react";

import type { DojoModule } from "../types/music";
import { SEIBadge } from "../primitives/sei-badge";
import { SEIButton } from "../primitives/sei-button";
import { SEICard } from "../primitives/sei-card";
import { cn } from "../styles/cn";

const dojoModuleCardStyles = tv({
  slots: {
    card: "h-full",
    icon: "grid size-12 place-items-center rounded-2xl border border-[var(--sh-border)] bg-[var(--sh-interactive-surface)] text-[var(--sh-text-primary)]",
    progressTrack: "h-2 overflow-hidden rounded-full bg-[var(--sh-progress-track)]",
    progressFill: "h-full rounded-full bg-[var(--sh-interactive-primary)]",
  },
  variants: {
    variant: {
      default: {},
      lesson: {
        icon: "border-[var(--sh-interactive-selected-border)] bg-[var(--sh-interactive-selected)] text-[var(--sh-interactive-selected-text)]",
        progressFill: "bg-[var(--sh-interactive-primary)]",
      },
      template: {
        icon: "border-[var(--sh-status-warning-border)] bg-[var(--sh-status-warning-bg)] text-[var(--sh-status-warning-text)]",
        progressFill: "bg-[var(--sh-status-warning-text)]",
      },
      skill: {
        icon: "border-[var(--sh-status-success-border)] bg-[var(--sh-status-success-bg)] text-[var(--sh-status-success-text)]",
        progressFill: "bg-[var(--sh-status-success-text)]",
      },
      dark: {
        icon: "border-[var(--sh-border)] bg-[#050609] text-[var(--sh-text-primary)]",
      },
      light: {
        icon: "border-[var(--sh-border)] bg-[var(--sh-surface)] text-[var(--sh-text-primary)]",
      },
    },
  },
  defaultVariants: { variant: "default" },
});

const dojoSurface = {
  default: "default",
  lesson: "soft",
  template: "media-test",
  skill: "solid",
  dark: "dark",
  light: "light",
} as const;

export interface DojoModuleCardProps extends VariantProps<typeof dojoModuleCardStyles> {
  module: DojoModule;
  className?: string;
}

export function DojoModuleCard({ module, variant = "default", className }: DojoModuleCardProps) {
  const styles = dojoModuleCardStyles({ variant });
  const safeProgress = Math.min(100, Math.max(0, module.progress));
  const Icon =
    module.status === "Complete" ? CheckCircle2 : variant === "template" ? Layers3 : BookOpen;

  return (
    <SEICard
      variant={dojoSurface[variant ?? "default"]}
      padding="md"
      elevateOnHover
      className={cn(styles.card(), className)}
    >
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className={styles.icon()}>
            <Icon aria-hidden="true" className="size-5" />
          </div>
          <SEIBadge variant={module.status === "Complete" ? "success" : "registry"} size="sm">
            {module.status}
          </SEIBadge>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <SEIBadge variant="media-test" size="sm" icon={GraduationCap}>
              {module.difficulty}
            </SEIBadge>
            <SEIBadge variant="outline" size="sm">
              {module.category}
            </SEIBadge>
          </div>
          <h3 className="text-xl font-semibold tracking-[-0.04em]">{module.title}</h3>
          <p className="text-sm leading-relaxed text-[var(--sh-text-muted)]">
            {module.description}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-[0.12em] text-[var(--sh-text-subtle)]">
            <span>Progress</span>
            <span>{safeProgress}%</span>
          </div>
          <div className={styles.progressTrack()}>
            <div className={styles.progressFill()} style={{ width: `${safeProgress}%` }} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-[var(--sh-border)] pt-4">
          <SEIButton size="sm" variant="solid" iconRight={<ArrowRight className="size-3.5" />}>
            Start module
          </SEIButton>
          <SEIButton size="sm" variant="ghost">
            Details
          </SEIButton>
        </div>
      </div>
    </SEICard>
  );
}

export default memo(DojoModuleCard, (prevProps, nextProps) => {
  // Custom comparison for DojoModule object
  if (prevProps.module !== nextProps.module) {
    // Deep compare module properties that affect rendering
    const moduleEqual =
      prevProps.module.title === nextProps.module.title &&
      prevProps.module.description === nextProps.module.description &&
      prevProps.module.difficulty === nextProps.module.difficulty &&
      prevProps.module.category === nextProps.module.category &&
      prevProps.module.status === nextProps.module.status &&
      prevProps.module.progress === nextProps.module.progress;
    // Even if module content is the same, check variant and className
    return (
      moduleEqual &&
      prevProps.variant === nextProps.variant &&
      prevProps.className === nextProps.className
    );
  }
  // Module reference is same, check variant and className
  return prevProps.variant === nextProps.variant && prevProps.className === nextProps.className;
});
