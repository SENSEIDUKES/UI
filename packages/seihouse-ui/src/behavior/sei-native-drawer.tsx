"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { Drawer } from "vaul";
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
 * SEINativeDrawer — native-feeling drawer powered by `vaul`.
 *
 * vaul adds drag-to-dismiss swipe gestures and optional snap points on top of a
 * Radix Dialog (focus trap, Escape, scroll lock, ARIA, focus return). SEIHouse
 * owns all visual styling via tailwind-variants + `--sh-*` tokens. This is the
 * mobile-first / gesture-friendly counterpart to the Phase 3 `SEIDrawer`
 * (which stays as a lighter Base-UI-Dialog modal drawer).
 *
 * All movement is vaul's CSS transforms — no Motion/Framer. Parts accept
 * `className`.
 */

export const seiNativeDrawerStyles = tv({
  slots: {
    overlay: drawerFamilySlots.overlay,
    content: [...drawerFamilySlots.surface, "outline-none"],
    handle: "mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-[var(--sh-border-strong)]",
    header: drawerFamilySlots.header,
    body: drawerFamilySlots.body,
    footer: drawerFamilySlots.footer,
    title: drawerFamilySlots.title,
    description: drawerFamilySlots.description,
    close: drawerFamilySlots.close,
  },
  variants: {
    side: {
      bottom: {
        content: [drawerFamilySideClasses.bottom.surface, "mt-24 max-h-[92vh]"],
        header: drawerFamilySideClasses.bottom.header,
        body: drawerFamilySideClasses.bottom.body,
      },
      left: {
        content: drawerFamilySideClasses.left.surface,
        header: drawerFamilySideClasses.left.header,
        body: drawerFamilySideClasses.left.body,
      },
      right: {
        content: drawerFamilySideClasses.right.surface,
        header: drawerFamilySideClasses.right.header,
        body: drawerFamilySideClasses.right.body,
      },
    },
    tone: {
      default: {
        content: drawerFamilyToneClasses.default,
      },
      soft: {
        content: drawerFamilyToneClasses.soft,
      },
      dark: {
        content: drawerFamilyToneClasses.dark,
      },
      light: {
        content: drawerFamilyToneClasses.light,
      },
      "glass-test": {
        content: drawerFamilyToneClasses["glass-test"],
      },
    },
    size: {
      compact: {},
      default: {},
      wide: {},
    },
  },
  compoundVariants: [
    {
      side: ["left", "right"],
      size: "compact",
      class: { content: drawerFamilySizeClasses.compact },
    },
    {
      side: ["left", "right"],
      size: "default",
      class: { content: drawerFamilySizeClasses.default },
    },
    {
      side: ["left", "right"],
      size: "wide",
      class: { content: drawerFamilySizeClasses.wide },
    },
  ],
  defaultVariants: { side: "bottom", tone: "default", size: "default" },
});

type SEINativeDrawerVariantProps = VariantProps<typeof seiNativeDrawerStyles>;
type SEINativeDrawerTone = NonNullable<SEINativeDrawerVariantProps["tone"]>;
type SEINativeDrawerSide = NonNullable<SEINativeDrawerVariantProps["side"]>;

interface DrawerContextValue {
  tone: SEINativeDrawerTone;
  side: SEINativeDrawerSide;
}
const SEINativeDrawerContext = createContext<DrawerContextValue>({
  tone: "default",
  side: "bottom",
});

export interface SEINativeDrawerProps {
  /** Maps to vaul's `direction`. */
  side?: SEINativeDrawerSide;
  snapPoints?: (number | string)[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  dismissible?: boolean;
  handleOnly?: boolean;
  children?: ReactNode;
}

export function SEINativeDrawer({ side = "bottom", ...props }: SEINativeDrawerProps) {
  return (
    <SEINativeDrawerContext.Provider value={{ tone: "default", side }}>
      <Drawer.Root direction={side} {...props} />
    </SEINativeDrawerContext.Provider>
  );
}

export interface SEINativeDrawerTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Drawer.Trigger>,
  "className"
> {
  className?: string;
}

export function SEINativeDrawerTrigger({ className, ...props }: SEINativeDrawerTriggerProps) {
  return <Drawer.Trigger className={className} {...props} />;
}

export interface SEINativeDrawerContentProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof Drawer.Content>, "className">,
    SEINativeDrawerVariantProps {
  className?: string;
  overlayClassName?: string;
  /** Show the drag handle (defaults to true for bottom drawers). */
  showHandle?: boolean;
  children?: ReactNode;
}

export function SEINativeDrawerContent({
  side,
  tone = "default",
  size = "default",
  className,
  overlayClassName,
  showHandle,
  children,
  ...props
}: SEINativeDrawerContentProps) {
  const context = useContext(SEINativeDrawerContext);
  const resolvedSide = side ?? context.side;
  const styles = seiNativeDrawerStyles({ side: resolvedSide, tone, size });
  const handleVisible = showHandle ?? resolvedSide === "bottom";
  return (
    <SEINativeDrawerContext.Provider value={{ tone: tone ?? "default", side: resolvedSide }}>
      <Drawer.Portal>
        <Drawer.Overlay className={cn(styles.overlay(), overlayClassName)} />
        <Drawer.Content className={cn(styles.content(), className)} {...props}>
          {handleVisible ? <Drawer.Handle className={styles.handle()} /> : null}
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </SEINativeDrawerContext.Provider>
  );
}

function useNativeDrawerStyles() {
  const { tone, side } = useContext(SEINativeDrawerContext);
  return seiNativeDrawerStyles({ tone, side });
}

export interface SEINativeDrawerHeaderProps {
  className?: string;
  children?: ReactNode;
  showClose?: boolean;
}

export function SEINativeDrawerHeader({
  className,
  children,
  showClose = true,
}: SEINativeDrawerHeaderProps) {
  const styles = useNativeDrawerStyles();
  return (
    <DrawerFamilyHeaderFrame
      className={cn(styles.header(), className)}
      closeControl={
        showClose ? (
          <Drawer.Close className={styles.close()} aria-label="Close drawer">
            <DrawerFamilyCloseIcon />
          </Drawer.Close>
        ) : null
      }
    >
      {children}
    </DrawerFamilyHeaderFrame>
  );
}

export function SEINativeDrawerBody({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const styles = useNativeDrawerStyles();
  return (
    <DrawerFamilyBodyFrame className={cn(styles.body(), className)}>
      {children}
    </DrawerFamilyBodyFrame>
  );
}

export function SEINativeDrawerFooter({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const styles = useNativeDrawerStyles();
  return (
    <DrawerFamilyFooterFrame className={cn(styles.footer(), className)}>
      {children}
    </DrawerFamilyFooterFrame>
  );
}

export interface SEINativeDrawerTitleProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Drawer.Title>,
  "className"
> {
  className?: string;
}

export function SEINativeDrawerTitle({ className, ...props }: SEINativeDrawerTitleProps) {
  const styles = useNativeDrawerStyles();
  return <Drawer.Title className={cn(styles.title(), className)} {...props} />;
}

export interface SEINativeDrawerDescriptionProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Drawer.Description>,
  "className"
> {
  className?: string;
}

export function SEINativeDrawerDescription({
  className,
  ...props
}: SEINativeDrawerDescriptionProps) {
  const styles = useNativeDrawerStyles();
  return <Drawer.Description className={cn(styles.description(), className)} {...props} />;
}

export type SEINativeDrawerCloseProps = React.ComponentProps<typeof Drawer.Close>;

export function SEINativeDrawerClose(props: SEINativeDrawerCloseProps) {
  return <Drawer.Close {...props} />;
}
