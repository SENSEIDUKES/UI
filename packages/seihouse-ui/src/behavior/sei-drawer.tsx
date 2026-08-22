"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Dialog } from "@base-ui/react/dialog";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "../styles/cn";
import { seiLayer } from "../styles/layering";
import {
  focusRing,
  mobileTouchTarget,
  seiOverlayVariants,
  seiPopupSurfaceVariants,
  transitionSurface,
} from "../styles/variants";

/**
 * SEIDrawer — accessible side / bottom panel.
 *
 * Built on the Base UI Dialog primitive (focus trap, Escape, scroll lock,
 * click-outside, focus return) rather than the newer Base UI Drawer primitive:
 * the Dialog popup is a plain portalled element, which lets SEIHouse fully own
 * the side/bottom positioning, sizing, and slide transition via Tailwind. The
 * native Drawer (swipe gestures + snap points) is documented as a Phase 4
 * upgrade in LAB-NOTES.md.
 *
 * All transitions are CSS only (no Motion). Every part accepts `className`.
 */

export const seiDrawerStyles = tv({
  slots: {
    backdrop: seiOverlayVariants(),
    popup: [
      "fixed flex flex-col",
      seiLayer.modal,
      "transition-transform duration-250 ease-out",
      focusRing,
    ],
    header: "flex items-start justify-between gap-4 border-b border-[var(--sh-border)] px-5 py-4",
    body: "min-h-0 flex-1 overflow-y-auto px-5 py-4 text-sm leading-relaxed text-[var(--sh-text-muted)]",
    footer:
      "flex flex-wrap items-center justify-end gap-2 border-t border-[var(--sh-border)] px-5 py-4 pb-[max(1rem,var(--sh-safe-bottom))]",
    title: "text-base font-semibold tracking-[-0.02em] text-[var(--sh-text-primary)]",
    description: "mt-1 text-sm leading-relaxed text-[var(--sh-text-muted)]",
    close: [
      "grid size-8 shrink-0 place-items-center rounded-full border border-[var(--sh-border)] bg-[var(--sh-interactive-surface)]",
      mobileTouchTarget,
      "cursor-pointer text-current/70 hover:bg-[var(--sh-interactive-surface-hover)] hover:text-current",
      focusRing,
      transitionSurface,
    ],
  },
  variants: {
    side: {
      right: {
        popup:
          "inset-y-0 right-0 h-full w-full rounded-l-[1.35rem] border-l data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full",
      },
      left: {
        popup:
          "inset-y-0 left-0 h-full w-full rounded-r-[1.35rem] border-r data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full",
      },
      bottom: {
        popup:
          "inset-x-0 bottom-0 max-h-[85vh] w-full rounded-t-[1.35rem] border-t data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full",
      },
    },
    size: {
      compact: {},
      default: {},
      wide: {},
    },
    tone: {
      dark: {
        popup: seiPopupSurfaceVariants({ tone: "dark" }),
      },
      light: {
        popup: seiPopupSurfaceVariants({ tone: "light" }),
      },
    },
  },
  compoundVariants: [
    // Side drawers: width controlled by size. Bottom drawers stay full-width.
    { side: ["right", "left"], size: "compact", class: { popup: "sm:max-w-xs" } },
    { side: ["right", "left"], size: "default", class: { popup: "sm:max-w-md" } },
    { side: ["right", "left"], size: "wide", class: { popup: "sm:max-w-xl" } },
  ],
  defaultVariants: { side: "right", size: "default", tone: "dark" },
});

type SEIDrawerVariantProps = VariantProps<typeof seiDrawerStyles>;
type SEIDrawerTone = NonNullable<SEIDrawerVariantProps["tone"]>;

const SEIDrawerContext = createContext<SEIDrawerTone>("dark");

export type SEIDrawerProps = React.ComponentProps<typeof Dialog.Root>;

export function SEIDrawer(props: SEIDrawerProps) {
  return <Dialog.Root {...props} />;
}

export interface SEIDrawerTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Dialog.Trigger>,
  "className"
> {
  className?: string;
}

export function SEIDrawerTrigger({ className, ...props }: SEIDrawerTriggerProps) {
  return <Dialog.Trigger className={className} {...props} />;
}

export interface SEIDrawerContentProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof Dialog.Popup>, "className">,
    SEIDrawerVariantProps {
  className?: string;
  backdropClassName?: string;
  children?: ReactNode;
}

export function SEIDrawerContent({
  side = "right",
  size = "default",
  tone = "dark",
  className,
  backdropClassName,
  children,
  ...props
}: SEIDrawerContentProps) {
  const styles = seiDrawerStyles({ side, size, tone });
  return (
    <SEIDrawerContext.Provider value={tone ?? "dark"}>
      <Dialog.Portal>
        <Dialog.Backdrop className={cn(styles.backdrop(), backdropClassName)} />
        <Dialog.Popup className={cn(styles.popup(), className)} {...props}>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </SEIDrawerContext.Provider>
  );
}

function useDrawerStyles() {
  const tone = useContext(SEIDrawerContext);
  return seiDrawerStyles({ tone });
}

export interface SEIDrawerHeaderProps {
  className?: string;
  children?: ReactNode;
  /** Show the built-in close button on the right (default true). */
  showClose?: boolean;
}

export function SEIDrawerHeader({ className, children, showClose = true }: SEIDrawerHeaderProps) {
  const styles = useDrawerStyles();
  return (
    <div className={cn(styles.header(), className)}>
      <div className="min-w-0">{children}</div>
      {showClose ? (
        <Dialog.Close className={styles.close()} aria-label="Close drawer">
          <X aria-hidden="true" className="size-4" />
        </Dialog.Close>
      ) : null}
    </div>
  );
}

export interface SEIDrawerBodyProps {
  className?: string;
  children?: ReactNode;
}

export function SEIDrawerBody({ className, children }: SEIDrawerBodyProps) {
  const styles = useDrawerStyles();
  return <div className={cn(styles.body(), className)}>{children}</div>;
}

export interface SEIDrawerFooterProps {
  className?: string;
  children?: ReactNode;
}

export function SEIDrawerFooter({ className, children }: SEIDrawerFooterProps) {
  const styles = useDrawerStyles();
  return <div className={cn(styles.footer(), className)}>{children}</div>;
}

export interface SEIDrawerTitleProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Dialog.Title>,
  "className"
> {
  className?: string;
}

export function SEIDrawerTitle({ className, ...props }: SEIDrawerTitleProps) {
  const styles = useDrawerStyles();
  return <Dialog.Title className={cn(styles.title(), className)} {...props} />;
}

export interface SEIDrawerDescriptionProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Dialog.Description>,
  "className"
> {
  className?: string;
}

export function SEIDrawerDescription({ className, ...props }: SEIDrawerDescriptionProps) {
  const styles = useDrawerStyles();
  return <Dialog.Description className={cn(styles.description(), className)} {...props} />;
}

export type SEIDrawerCloseProps = React.ComponentProps<typeof Dialog.Close>;

export function SEIDrawerClose(props: SEIDrawerCloseProps) {
  return <Dialog.Close {...props} />;
}
