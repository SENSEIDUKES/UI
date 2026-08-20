import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../styles/cn";

export interface SEIFilterBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Filter chips / controls. */
  children: ReactNode;
  /** When provided, renders a "Clear" control invoking this handler. */
  onClear?: () => void;
  /** Result count rendered as "N results". */
  resultCount?: number;
  /** Accessible label — when set, the bar becomes a `role="search"` region. */
  "aria-label"?: string;
}

/** Formats the count of matching items with singular or plural suffix. */
function formatResults(count: number): string {
  return `${count} ${count === 1 ? "result" : "results"}`;
}

/** Responsive horizontal row of filter controls. */
export function SEIFilterBar({
  children,
  onClear,
  resultCount,
  "aria-label": ariaLabel,
  className,
  ...props
}: SEIFilterBarProps) {
  return (
    <div
      role={ariaLabel ? "search" : undefined}
      aria-label={ariaLabel}
      className={cn("flex w-full flex-wrap items-center gap-2", className)}
      {...props}
    >
      <div className="flex min-w-0 flex-wrap items-center gap-2">{children}</div>
      <div className="ml-auto flex items-center gap-3">
        {typeof resultCount === "number" ? (
          <span className="text-xs text-[var(--sh-color-mist)]" aria-live="polite">
            {formatResults(resultCount)}
          </span>
        ) : null}
        {onClear ? (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-semibold text-[var(--sh-color-cloud)] underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:underline focus-visible:outline-none"
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
