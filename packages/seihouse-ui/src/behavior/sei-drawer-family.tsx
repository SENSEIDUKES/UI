import type { ReactNode } from "react";
import { X } from "lucide-react";

import { seiLayer } from "../styles/layering";
import {
  focusRing,
  mobileTouchTarget,
  seiOverlayVariants,
  seiPopupSurfaceVariants,
  transitionSurface,
} from "../styles/variants";

export const drawerFamilySlots = {
  overlay: seiOverlayVariants(),
  surface: ["fixed flex flex-col", seiLayer.modal, focusRing],
  header: [
    "flex items-start justify-between gap-4 border-b border-[var(--sh-border)]",
    "pr-[max(1.25rem,var(--sh-safe-right))] pb-4 pl-[max(1.25rem,var(--sh-safe-left))]",
  ],
  body: [
    "min-h-0 flex-1 overflow-y-auto text-sm leading-relaxed text-[var(--sh-text-muted)]",
    "pr-[max(1.25rem,var(--sh-safe-right))] pt-4 pb-4 pl-[max(1.25rem,var(--sh-safe-left))]",
    "last:pb-[max(1rem,var(--sh-safe-bottom))]",
  ],
  footer: [
    "flex flex-wrap items-center justify-end gap-2 border-t border-[var(--sh-border)]",
    "pr-[max(1.25rem,var(--sh-safe-right))] pt-4 pb-[max(1rem,var(--sh-safe-bottom))] pl-[max(1.25rem,var(--sh-safe-left))]",
  ],
  title: "text-base font-semibold tracking-[-0.02em] text-[var(--sh-text-primary)]",
  description: "mt-1 text-sm leading-relaxed text-[var(--sh-text-muted)]",
  close: [
    "grid size-8 shrink-0 place-items-center rounded-full border border-[var(--sh-border)] bg-[var(--sh-interactive-surface)]",
    mobileTouchTarget,
    "cursor-pointer text-current/70 hover:bg-[var(--sh-interactive-surface-hover)] hover:text-current",
    focusRing,
    transitionSurface,
  ],
} as const;

export const drawerFamilyToneClasses = {
  default: seiPopupSurfaceVariants({ tone: "default" }),
  soft: seiPopupSurfaceVariants({ tone: "soft" }),
  dark: seiPopupSurfaceVariants({ tone: "dark" }),
  light: seiPopupSurfaceVariants({ tone: "light" }),
  "glass-test": seiPopupSurfaceVariants({ tone: "glass-test" }),
} as const;

export const drawerFamilySideClasses = {
  right: {
    surface: "inset-y-0 right-0 h-full w-full rounded-l-[1.35rem]",
    header: "pt-[max(1rem,var(--sh-safe-top))]",
    body: "first:pt-[max(1rem,var(--sh-safe-top))]",
  },
  left: {
    surface: "inset-y-0 left-0 h-full w-full rounded-r-[1.35rem]",
    header: "pt-[max(1rem,var(--sh-safe-top))]",
    body: "first:pt-[max(1rem,var(--sh-safe-top))]",
  },
  bottom: {
    surface: "inset-x-0 bottom-0 w-full rounded-t-[1.35rem]",
    header: "pt-4",
    body: "",
  },
} as const;

export const drawerFamilySizeClasses = {
  compact: "sm:max-w-xs",
  default: "sm:max-w-md",
  wide: "sm:max-w-xl",
} as const;

interface DrawerFamilyHeaderFrameProps {
  className?: string;
  children?: ReactNode;
  closeControl?: ReactNode;
}

export function DrawerFamilyHeaderFrame({
  className,
  children,
  closeControl,
}: DrawerFamilyHeaderFrameProps) {
  return (
    <div className={className}>
      <div className="min-w-0">{children}</div>
      {closeControl}
    </div>
  );
}

interface DrawerFamilySectionFrameProps {
  className?: string;
  children?: ReactNode;
}

export function DrawerFamilyBodyFrame({ className, children }: DrawerFamilySectionFrameProps) {
  return <div className={className}>{children}</div>;
}

export function DrawerFamilyFooterFrame({ className, children }: DrawerFamilySectionFrameProps) {
  return <div className={className}>{children}</div>;
}

export function DrawerFamilyCloseIcon() {
  return <X aria-hidden="true" className="size-4" />;
}
