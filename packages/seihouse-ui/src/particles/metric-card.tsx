import { ArrowUpRight, Minus, TrendingUp } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import { memo } from "react";

import { SEIBadge } from "../primitives/sei-badge";
import { SEICard } from "../primitives/sei-card";
import { cn } from "../styles/cn";

const metricCardStyles = tv({
  slots: {
    value: "text-3xl font-black tracking-[-0.06em]",
    helper: "text-sm leading-relaxed text-[var(--sh-text-muted)]",
  },
  variants: {
    variant: {
      default: {},
      soft: { value: "text-[var(--sh-interactive-text)]" },
      dark: { value: "text-[var(--sh-text-primary)]" },
      light: { value: "text-[var(--sh-text-primary)]", helper: "text-[var(--sh-text-muted)]" },
      outline: { value: "text-[var(--sh-text-primary)]" },
    },
  },
  defaultVariants: { variant: "default" },
});

const metricSurface = {
  default: "default",
  soft: "soft",
  dark: "dark",
  light: "light",
  outline: "outline",
} as const;

export interface MetricCardProps extends VariantProps<typeof metricCardStyles> {
  label: string;
  value: string;
  helper?: string;
  trend?: string;
  status?: string;
  className?: string;
}

export function MetricCard({
  label,
  value,
  helper,
  trend,
  status,
  variant = "default",
  className,
}: MetricCardProps) {
  const styles = metricCardStyles({ variant });
  const TrendIcon = trend?.startsWith("+") ? TrendingUp : trend ? ArrowUpRight : Minus;

  return (
    <SEICard
      variant={metricSurface[variant ?? "default"]}
      padding="md"
      className={cn("h-full", className)}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-text-subtle)]">
              {label}
            </p>
            <p className={styles.value()}>{value}</p>
          </div>
          {status ? (
            <SEIBadge variant={variant === "light" ? "light" : "registry"} size="sm">
              {status}
            </SEIBadge>
          ) : null}
        </div>
        {helper ? <p className={styles.helper()}>{helper}</p> : null}
        {trend ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--sh-border)] bg-[var(--sh-interactive-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--sh-text-muted)]">
            <TrendIcon aria-hidden="true" className="size-3.5 text-[var(--sh-interactive-text)]" />
            {trend}
          </div>
        ) : null}
      </div>
    </SEICard>
  );
}

export default memo(MetricCard, (prevProps, nextProps) => {
  // Simple prop comparison for scalar values
  return (
    prevProps.label === nextProps.label &&
    prevProps.value === nextProps.value &&
    prevProps.helper === nextProps.helper &&
    prevProps.trend === nextProps.trend &&
    prevProps.status === nextProps.status &&
    prevProps.variant === nextProps.variant &&
    prevProps.className === nextProps.className
  );
});
