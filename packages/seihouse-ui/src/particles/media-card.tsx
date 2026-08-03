import type { ReactNode } from "react";
import { ArrowRight, Music2, type LucideIcon } from "lucide-react";
import { memo } from "react";

import { SEIBadge } from "../primitives/sei-badge";
import { SEIButton } from "../primitives/sei-button";
import { SEICard } from "../primitives/sei-card";
import { cn } from "../styles/cn";
import type { SEICardVariantProps } from "../styles/variants";

export interface MediaCardProps extends SEICardVariantProps {
  title: string;
  subtitle?: string;
  description?: string;
  category?: string;
  status?: string;
  meta?: string;
  accent?: "sea" | "accent" | "success" | "neutral";
  icon?: LucideIcon;
  actionLabel?: string;
  secondaryAction?: ReactNode;
  className?: string;
}

const accentStyles = {
  sea: "from-[rgba(0,122,255,0.42)] via-[rgba(0,122,255,0.14)] to-[rgba(255,255,255,0.04)]",
  accent: "from-[rgba(255,107,53,0.42)] via-[rgba(255,107,53,0.14)] to-[rgba(255,255,255,0.04)]",
  success: "from-[rgba(52,199,89,0.32)] via-[rgba(52,199,89,0.12)] to-[rgba(255,255,255,0.04)]",
  neutral:
    "from-[rgba(255,255,255,0.18)] via-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.025)]",
};

export function MediaCard({
  title,
  subtitle,
  description,
  category = "Fragment",
  status = "Mock",
  meta,
  accent = "sea",
  icon: Icon = Music2,
  actionLabel = "Inspect",
  secondaryAction,
  variant = "media-test",
  padding = "md",
  interactive = true,
  className,
}: MediaCardProps) {
  return (
    <SEICard
      variant={variant}
      padding={padding}
      interactive={interactive}
      className={className}
      media={
        <div
          className={cn(
            "relative min-h-40 overflow-hidden bg-gradient-to-br p-4",
            accentStyles[accent],
          )}
        >
          <div className="absolute right-5 top-5 size-24 rounded-full border border-[var(--sh-border-strong)] bg-[var(--sh-interactive-surface)]" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end gap-2">
            {[34, 58, 42, 76, 48, 64, 38].map((height, index) => (
              <span key={index} className="w-full rounded-full bg-white/20" style={{ height }} />
            ))}
          </div>
          <div className="relative z-10 flex size-12 items-center justify-center rounded-2xl border border-[var(--sh-border-strong)] bg-[var(--sh-overlay)] text-white backdrop-blur-xl">
            <Icon aria-hidden="true" className="size-5" />
          </div>
        </div>
      }
      eyebrow={
        <div className="flex flex-wrap gap-2">
          <SEIBadge variant="media-test" size="sm">
            {category}
          </SEIBadge>
          <SEIBadge variant="registry" size="sm">
            {status}
          </SEIBadge>
        </div>
      }
      title={title}
      description={description}
      metadata={meta}
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span>{subtitle}</span>
          <div className="flex items-center gap-2">
            {secondaryAction}
            <SEIButton size="sm" variant="ghost" iconRight={<ArrowRight className="size-3.5" />}>
              {actionLabel}
            </SEIButton>
          </div>
        </div>
      }
    />
  );
}

export default memo(MediaCard, (prevProps, nextProps) => {
  // Compare all props - most are scalars, objects are compared by reference
  return (
    prevProps.title === nextProps.title &&
    prevProps.subtitle === nextProps.subtitle &&
    prevProps.description === nextProps.description &&
    prevProps.category === nextProps.category &&
    prevProps.status === nextProps.status &&
    prevProps.meta === nextProps.meta &&
    prevProps.accent === nextProps.accent &&
    prevProps.icon === nextProps.icon &&
    prevProps.actionLabel === nextProps.actionLabel &&
    prevProps.secondaryAction === nextProps.secondaryAction &&
    prevProps.variant === nextProps.variant &&
    prevProps.padding === nextProps.padding &&
    prevProps.interactive === nextProps.interactive &&
    prevProps.className === nextProps.className
  );
});
