import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../styles/cn";
import { seiSectionVariants, type SEISectionVariantProps } from "../styles/variants";

export interface SEISectionProps
  extends Omit<HTMLAttributes<HTMLElement>, "title">, SEISectionVariantProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  contentClassName?: string;
}

export function SEISection({
  className,
  contentClassName,
  spacing,
  eyebrow,
  title,
  description,
  aside,
  children,
  ...props
}: SEISectionProps) {
  return (
    <section className={cn(seiSectionVariants({ spacing }), className)} {...props}>
      {(eyebrow || title || description || aside) && (
        <div className="mb-6 flex flex-col gap-4 border-b border-[var(--sh-border)] pb-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl space-y-3">
            {eyebrow ? (
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--sh-interactive-text)]">
                {eyebrow}
              </div>
            ) : null}
            {title ? (
              <h2 className="text-2xl font-semibold tracking-[-0.055em] text-[var(--sh-text-primary)] sm:text-4xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="max-w-2xl text-sm leading-relaxed text-[var(--sh-text-muted)] sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
          {aside ? <div className="shrink-0">{aside}</div> : null}
        </div>
      )}
      <div className={contentClassName}>{children}</div>
    </section>
  );
}
