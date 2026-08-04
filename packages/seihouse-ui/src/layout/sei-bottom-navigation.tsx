"use client";

import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../styles/cn";
import { seiLayer } from "../styles/layering";
import { seiGlass } from "../styles/surfaces";
import { focusRing, transitionSurface } from "../styles/variants";

export interface SEIBottomNavigationItem {
  /** Stable id used as the React key and passed to `onSelect`. */
  id: string;
  /** Visible label rendered under the icon. */
  label: string;
  /** Decorative icon node (e.g. a Lucide icon), hidden from assistive tech. */
  icon: ReactNode;
  /** Marks the item as the current destination (`aria-current="page"`). */
  active?: boolean;
  /** Called with the item `id` when the item is selected. */
  onSelect?: (id: string) => void;
}

export interface SEIBottomNavigationProps extends HTMLAttributes<HTMLElement> {
  /** Accessible label for the navigation landmark (required for a11y). */
  "aria-label": string;
  /** Destinations rendered as icon + label tab buttons (3–5 works best). */
  items: SEIBottomNavigationItem[];
}

/**
 * Mobile bottom navigation bar with a frosted-glass surface.
 *
 * Sticks to the bottom of its scroll container and pads for the device bottom
 * safe-area inset so tabs clear the home indicator. Presentational by design:
 * the parent owns routing/state and reacts through each item's `onSelect`.
 */
export function SEIBottomNavigation({ items, className, ...props }: SEIBottomNavigationProps) {
  return (
    <nav
      className={cn(
        "sticky bottom-0 w-full",
        seiLayer.sticky,
        // Shared glass surface; only the top edge keeps its border.
        seiGlass,
        "border-x-0 border-b-0",
        "px-2 pt-2",
        "pb-[calc(0.5rem+var(--sh-safe-bottom))]",
        className,
      )}
      {...props}
    >
      <div className="flex items-stretch justify-center gap-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-current={item.active ? "page" : undefined}
            data-selected={item.active ? "true" : undefined}
            onClick={() => item.onSelect?.(item.id)}
            className={cn(
              // `max-w-40` keeps tabs from stretching apart on tablet/desktop;
              // below the cap they still share the full width via `flex-1`.
              "flex min-w-0 max-w-40 flex-1 touch-manipulation flex-col items-center justify-center gap-1 rounded-xl px-2 py-1.5",
              "text-xs font-medium text-[var(--sh-color-cloud)]",
              "hover:bg-[var(--sh-interactive-surface-hover)] hover:text-[var(--sh-color-ivory)]",
              "active:bg-[var(--sh-interactive-surface-active)]",
              "data-[selected=true]:text-[var(--sh-interactive-text)]",
              focusRing,
              transitionSurface,
            )}
          >
            <span aria-hidden="true" className="inline-flex shrink-0 items-center justify-center">
              {item.icon}
            </span>
            <span className="max-w-full truncate">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
