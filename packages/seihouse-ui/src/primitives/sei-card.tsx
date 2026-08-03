import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "../styles/cn";
import { seiCardVariants, type SEICardVariantProps } from "../styles/variants";

type SEICardElement = "article" | "div" | "section";

export interface SEICardProps
  extends Omit<HTMLAttributes<HTMLElement>, "title">, SEICardVariantProps {
  as?: SEICardElement;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  metadata?: ReactNode;
  media?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  contentClassName?: string;
}

export function SEICard({
  as = "article",
  className,
  contentClassName,
  variant,
  padding,
  interactive,
  eyebrow,
  title,
  description,
  metadata,
  media,
  actions,
  footer,
  children,
  ...props
}: SEICardProps) {
  const Component = as as ElementType;

  return (
    <Component
      className={cn(seiCardVariants({ variant, padding, interactive }), className)}
      {...props}
    >
      {media ? <div className="-m-5 mb-5 overflow-hidden">{media}</div> : null}
      <div className={cn("space-y-4", contentClassName)}>
        {(eyebrow || metadata) && (
          <div className="flex flex-wrap items-center justify-between gap-2">
            {eyebrow ? (
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-text-subtle)]">
                {eyebrow}
              </div>
            ) : null}
            {metadata ? (
              <div className="text-sm text-[var(--sh-text-subtle)]">{metadata}</div>
            ) : null}
          </div>
        )}

        {(title || actions) && (
          <div className="flex items-start justify-between gap-4">
            {title ? (
              <h3 className="text-lg font-semibold leading-tight tracking-[-0.03em] text-current">
                {title}
              </h3>
            ) : null}
            {actions ? <div className="shrink-0">{actions}</div> : null}
          </div>
        )}

        {description ? (
          <p className="text-sm leading-relaxed text-[var(--sh-text-muted)]">{description}</p>
        ) : null}

        {children}

        {footer ? (
          <div className="border-t border-[var(--sh-border)] pt-4 text-sm text-[var(--sh-text-subtle)]">
            {footer}
          </div>
        ) : null}
      </div>
    </Component>
  );
}
