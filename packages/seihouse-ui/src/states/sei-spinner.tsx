import type { HTMLAttributes } from "react";

import { cn } from "../styles/cn";

const sizeMap = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-8 border-[3px]",
} as const;

export interface SEISpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg";
  /** Accessible label announced by assistive tech. */
  label?: string;
}

export function SEISpinner({
  className,
  size = "md",
  label = "Loading",
  ...props
}: SEISpinnerProps) {
  return (
    <span
      role="status"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-block shrink-0 rounded-full border-current border-t-transparent text-[var(--sh-interactive-text)]",
          "motion-safe:animate-spin",
          sizeMap[size],
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
