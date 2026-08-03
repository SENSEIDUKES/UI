import * as React from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "../styles/cn";
import { seiButtonVariants, type SEIButtonVariantProps } from "../styles/variants";

interface SEIButtonOwnProps extends SEIButtonVariantProps {
  /** Lucide icon rendered before the visible label. Decorative by default. */
  icon?: LucideIcon;
  /** Custom decorative content rendered before the visible label. */
  iconLeft?: ReactNode;
  /** Custom decorative content rendered after the visible label. */
  iconRight?: ReactNode;
  /** Marks the button busy and prevents repeat activation until work finishes. */
  loading?: boolean;
}

type TextButtonContent = {
  children: ReactNode;
};

type NamedIconButtonContent = {
  children?: null;
} & (
  | { "aria-label": string; "aria-labelledby"?: string }
  | { "aria-label"?: string; "aria-labelledby": string }
);

/**
 * Native button props plus SEIHouse presentation and loading behavior.
 *
 * Icon-only buttons require an accessible name at compile time. Use a native
 * anchor styled with `seiButtonVariants` for navigation rather than changing
 * button semantics with click handlers.
 */
export type SEIButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> &
  SEIButtonOwnProps &
  (TextButtonContent | NamedIconButtonContent);

function hasRenderableContent(node: ReactNode): boolean {
  return React.Children.toArray(node).some((child) => child !== "");
}

/**
 * SEIButton — styled native `<button>` with safe form, loading, focus, and
 * accessible-name defaults. Native button attributes and the DOM ref are
 * forwarded so it composes with forms and focus-managed behavior primitives.
 */
export const SEIButton = React.forwardRef<HTMLButtonElement, SEIButtonProps>(function SEIButton(
  {
    className,
    variant,
    size,
    fullWidth,
    icon: Icon,
    iconLeft,
    iconRight,
    loading = false,
    disabled,
    children,
    type = "button",
    "aria-busy": ariaBusy,
    ...props
  },
  ref,
) {
  const hasLeadingIcon = Icon != null || hasRenderableContent(iconLeft);
  const hasTrailingIcon = hasRenderableContent(iconRight);
  const iconOnly = !hasRenderableContent(children) && (hasLeadingIcon || hasTrailingIcon);

  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={cn(seiButtonVariants({ variant, size, fullWidth }), className)}
      disabled={disabled || loading}
      aria-busy={loading ? true : ariaBusy}
      data-icon-only={iconOnly ? "true" : undefined}
      data-loading={loading ? "true" : undefined}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : hasRenderableContent(iconLeft) ? (
        <span aria-hidden="true" className="inline-flex shrink-0 items-center justify-center">
          {iconLeft}
        </span>
      ) : null}
      {!loading && Icon ? (
        <Icon aria-hidden="true" focusable="false" className="size-4 shrink-0" />
      ) : null}
      {children}
      {hasRenderableContent(iconRight) ? (
        <span aria-hidden="true" className="inline-flex shrink-0 items-center justify-center">
          {iconRight}
        </span>
      ) : null}
    </button>
  );
});
