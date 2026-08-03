import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../styles/cn";

export interface SEIPageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Small uppercase label above the title. */
  eyebrow?: ReactNode;
  /** Page title (required). */
  title: ReactNode;
  /** Supporting description below the title. */
  description?: ReactNode;
  /** Right-aligned action slot — wraps under the title on mobile. */
  actions?: ReactNode;
  /** Breadcrumb slot rendered above the eyebrow/title. */
  breadcrumb?: ReactNode;
}

export function SEIPageHeader({
  eyebrow,
  title,
  description,
  actions,
  breadcrumb,
  className,
  ...props
}: SEIPageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {breadcrumb ? <div className="min-w-0">{breadcrumb}</div> : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 max-w-3xl space-y-2">
          {eyebrow ? (
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--sh-interactive-text)]">
              {eyebrow}
            </div>
          ) : null}
          <h1 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--sh-text-primary)] sm:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--sh-color-cloud)]">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
        ) : null}
      </div>
    </div>
  );
}
