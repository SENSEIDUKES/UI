"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "../styles/cn";
import {
  drawerFamilySideClasses,
  drawerFamilySizeClasses,
  drawerFamilySlots,
  drawerFamilyToneClasses,
  DrawerFamilyBodyFrame,
  DrawerFamilyCloseIcon,
  DrawerFamilyFooterFrame,
  DrawerFamilyHeaderFrame,
} from "./sei-drawer-family";

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
    backdrop: drawerFamilySlots.overlay,
    popup: [...drawerFamilySlots.surface, "transition-transform duration-250 ease-out"],
    header: drawerFamilySlots.header,
    body: drawerFamilySlots.body,
    footer: drawerFamilySlots.footer,
    title: drawerFamilySlots.title,
    description: drawerFamilySlots.description,
    close: drawerFamilySlots.close,
  },
  variants: {
    side: {
      right: {
        popup: [
          drawerFamilySideClasses.right.surface,
          "data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full",
        ],
        header: drawerFamilySideClasses.right.header,
        body: drawerFamilySideClasses.right.body,
      },
      left: {
        popup: [
          drawerFamilySideClasses.left.surface,
          "data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full",
        ],
        header: drawerFamilySideClasses.left.header,
        body: drawerFamilySideClasses.left.body,
      },
      bottom: {
        popup: [
          drawerFamilySideClasses.bottom.surface,
          "max-h-[85vh] data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full",
        ],
        header: drawerFamilySideClasses.bottom.header,
        body: drawerFamilySideClasses.bottom.body,
      },
    },
    size: {
      compact: {},
      default: {},
      wide: {},
    },
    tone: {
      dark: {
        popup: drawerFamilyToneClasses.dark,
      },
      light: {
        popup: drawerFamilyToneClasses.light,
      },
    },
  },
  compoundVariants: [
    // Side drawers: width controlled by size. Bottom drawers stay full-width.
    {
      side: ["right", "left"],
      size: "compact",
      class: { popup: drawerFamilySizeClasses.compact },
    },
    {
      side: ["right", "left"],
      size: "default",
      class: { popup: drawerFamilySizeClasses.default },
    },
    {
      side: ["right", "left"],
      size: "wide",
      class: { popup: drawerFamilySizeClasses.wide },
    },
  ],
  defaultVariants: { side: "right", size: "default", tone: "dark" },
});

type SEIDrawerVariantProps = VariantProps<typeof seiDrawerStyles>;
type SEIDrawerTone = NonNullable<SEIDrawerVariantProps["tone"]>;
type SEIDrawerSide = NonNullable<SEIDrawerVariantProps["side"]>;

interface SEIDrawerContextValue {
  tone: SEIDrawerTone;
  side: SEIDrawerSide;
}

const SEIDrawerContext = createContext<SEIDrawerContextValue>({ tone: "dark", side: "right" });

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
    <SEIDrawerContext.Provider value={{ tone, side }}>
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
  const { tone, side } = useContext(SEIDrawerContext);
  return seiDrawerStyles({ tone, side });
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
    <DrawerFamilyHeaderFrame
      className={cn(styles.header(), className)}
      closeControl={
        showClose ? (
          <Dialog.Close className={styles.close()} aria-label="Close drawer">
            <DrawerFamilyCloseIcon />
          </Dialog.Close>
        ) : null
      }
    >
      {children}
    </DrawerFamilyHeaderFrame>
  );
}

export interface SEIDrawerBodyProps {
  className?: string;
  children?: ReactNode;
}

export function SEIDrawerBody({ className, children }: SEIDrawerBodyProps) {
  const styles = useDrawerStyles();
  return (
    <DrawerFamilyBodyFrame className={cn(styles.body(), className)}>
      {children}
    </DrawerFamilyBodyFrame>
  );
}

export interface SEIDrawerFooterProps {
  className?: string;
  children?: ReactNode;
}

export function SEIDrawerFooter({ className, children }: SEIDrawerFooterProps) {
  const styles = useDrawerStyles();
  return (
    <DrawerFamilyFooterFrame className={cn(styles.footer(), className)}>
      {children}
    </DrawerFamilyFooterFrame>
  );
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
