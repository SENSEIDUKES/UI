import type { HTMLAttributes, ReactNode } from "react";
import { X } from "lucide-react";

import { SEIDrawer, SEIDrawerContent } from "../behavior/sei-drawer";
import { SEIAvatar } from "../media/sei-avatar";
import { cn } from "../styles/cn";
import { focusRing, seiCommandGroupHeader, transitionSurface } from "../styles/variants";

export interface SEINavigationDrawerItem {
  /** Stable id used as the React key and passed to `onSelect`. */
  id: string;
  /** Visible label rendered next to the icon. */
  label: string;
  /** Decorative icon node (e.g. a Lucide icon), hidden from assistive tech. */
  icon?: ReactNode;
  /** Marks the item as the current destination (`aria-current="page"`). */
  active?: boolean;
  /** Called with the item `id` when the item is selected. */
  onSelect?: (id: string) => void;
}

export interface SEINavigationDrawerSection {
  /** Stable id used as the React key. */
  id: string;
  /** Optional heading rendered above the section's items. */
  label?: string;
  /** Destinations grouped under this section. */
  items: SEINavigationDrawerItem[];
}

export interface SEINavigationDrawerAccount {
  /** Display name shown in the header and used for avatar initials. */
  name: string;
  /** Secondary line under the name (email, handle, plan, …). */
  detail?: string;
  /** Custom avatar node. Defaults to an initials `SEIAvatar`. */
  avatar?: ReactNode;
  /** When provided, the account header renders as a button. */
  onSelect?: () => void;
}

export interface SEINavigationDrawerPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible label for the navigation landmark (required for a11y). */
  "aria-label": string;
  /** Grouped destinations rendered as icon + label buttons. */
  sections: SEINavigationDrawerSection[];
  /** Optional account block pinned to the header. */
  account?: SEINavigationDrawerAccount;
  /** Optional secondary actions (settings, sign out, …) pinned to the footer. */
  actions?: SEINavigationDrawerItem[];
  /** When provided, a close button renders in the header. */
  onClose?: () => void;
}

const itemClasses = cn(
  "flex w-full touch-manipulation items-center gap-3 rounded-xl px-3 py-2.5 text-left",
  "text-sm font-medium text-[var(--sh-color-cloud)]",
  "hover:bg-[var(--sh-interactive-surface-hover)] hover:text-[var(--sh-color-ivory)]",
  "active:bg-[var(--sh-interactive-surface-active)]",
  "data-[selected=true]:bg-[var(--sh-interactive-selected)] data-[selected=true]:text-[var(--sh-interactive-selected-text)]",
  focusRing,
  transitionSurface,
);

function NavigationItem({ item }: { item: SEINavigationDrawerItem }) {
  return (
    <button
      type="button"
      aria-current={item.active ? "page" : undefined}
      data-selected={item.active ? "true" : undefined}
      onClick={() => item.onSelect?.(item.id)}
      className={itemClasses}
    >
      {item.icon ? (
        <span aria-hidden="true" className="inline-flex shrink-0 items-center justify-center">
          {item.icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
    </button>
  );
}

/**
 * Presentational navigation content of `SEINavigationDrawer`: an optional
 * account header, grouped icon + label destinations, and optional footer
 * actions with bottom safe-area padding. Rendered inside the drawer on mobile;
 * also usable standalone (e.g. as a static desktop sidebar).
 */
export function SEINavigationDrawerPanel({
  sections,
  account,
  actions,
  onClose,
  className,
  "aria-label": ariaLabel,
  ...props
}: SEINavigationDrawerPanelProps) {
  const showHeader = Boolean(account) || Boolean(onClose);

  const accountAvatar = account
    ? (account.avatar ?? (
        // Decorative next to the visible name — hide the initials fallback
        // (and its sr-only name) so the account button isn't named twice.
        <span aria-hidden="true" className="inline-flex shrink-0">
          <SEIAvatar name={account.name} size="md" />
        </span>
      ))
    : null;
  const accountBody = account ? (
    <>
      {accountAvatar}
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-sm font-semibold text-[var(--sh-color-ivory)]">
          {account.name}
        </span>
        {account.detail ? (
          <span className="block truncate text-xs text-[var(--sh-color-mist)]">
            {account.detail}
          </span>
        ) : null}
      </span>
    </>
  ) : null;

  return (
    <div className={cn("flex h-full min-h-0 flex-col", className)} {...props}>
      {showHeader ? (
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
          {account ? (
            account.onSelect ? (
              <button
                type="button"
                onClick={account.onSelect}
                className={cn(
                  "flex min-w-0 flex-1 items-center gap-3 rounded-xl p-1",
                  "hover:bg-[var(--sh-interactive-surface-hover)]",
                  focusRing,
                  transitionSurface,
                )}
              >
                {accountBody}
              </button>
            ) : (
              <div className="flex min-w-0 flex-1 items-center gap-3 p-1">{accountBody}</div>
            )
          ) : (
            <span className="min-w-0 flex-1" />
          )}
          {onClose ? (
            <button
              type="button"
              aria-label="Close navigation"
              onClick={onClose}
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full border",
                "border-white/12 bg-white/[0.05] text-current/70 hover:bg-white/10 hover:text-current",
                focusRing,
                transitionSurface,
              )}
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          ) : null}
        </div>
      ) : null}

      <nav
        aria-label={ariaLabel}
        className="min-h-0 flex-1 overscroll-contain overflow-y-auto px-3 py-3"
      >
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              role={section.label ? "group" : undefined}
              aria-label={section.label}
            >
              {section.label ? <p className={seiCommandGroupHeader}>{section.label}</p> : null}
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <NavigationItem item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {actions && actions.length > 0 ? (
        <div className="border-t border-white/10 px-3 pt-3 pb-[calc(0.75rem+var(--sh-safe-bottom))]">
          <ul className="space-y-1">
            {actions.map((action) => (
              <li key={action.id}>
                <NavigationItem item={action} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export interface SEINavigationDrawerProps extends SEINavigationDrawerPanelProps {
  /** Controls visibility (controlled — the parent owns the state). */
  open: boolean;
  /** Called when the drawer asks to close (close button, Escape, scrim tap). */
  onClose: () => void;
  /** Edge the panel slides in from (default `"left"`). */
  side?: "left" | "right";
}

/**
 * Mobile navigation drawer that slides in from the side over a scrim.
 *
 * Built on `SEIDrawer` (Base UI Dialog), so focus trapping, Escape handling,
 * scroll lock, and the slide transition come from the shared behavior layer.
 * Presentational by design: the parent owns routing/state, reacts through each
 * item's `onSelect`, and closes via `onClose`.
 */
export function SEINavigationDrawer({
  open,
  onClose,
  side = "left",
  className,
  ...panelProps
}: SEINavigationDrawerProps) {
  const ariaLabel = panelProps["aria-label"];

  return (
    <SEIDrawer
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
    >
      <SEIDrawerContent
        side={side}
        size="compact"
        tone="dark"
        aria-label={ariaLabel}
        className={className}
      >
        <SEINavigationDrawerPanel onClose={onClose} {...panelProps} />
      </SEIDrawerContent>
    </SEIDrawer>
  );
}
