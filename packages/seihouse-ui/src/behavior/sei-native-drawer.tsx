"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Drawer } from "vaul";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "../styles/cn";
import { focusRing, mobileTouchTarget, transitionSurface } from "../styles/variants";

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
    overlay: "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm",
    content: [
      "fixed z-50 flex flex-col border outline-none",
      "shadow-[0_-20px_80px_rgba(0,0,0,0.55)]",
      focusRing,
    ],
    handle: "mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-white/20",
    header: "flex items-start justify-between gap-4 px-5 py-4",
    body: "flex-1 overflow-y-auto px-5 py-2 text-sm leading-relaxed",
    footer:
      "flex flex-wrap items-center justify-end gap-2 border-t px-5 py-4 pb-[max(1rem,var(--sh-safe-bottom))]",
    title: "text-base font-semibold tracking-[-0.02em]",
    description: "mt-1 text-sm leading-relaxed",
    close: [
      "grid size-8 shrink-0 place-items-center rounded-full border",
      mobileTouchTarget,
      "cursor-pointer text-current/70 hover:text-current",
      focusRing,
      transitionSurface,
    ],
  },
  variants: {
    side: {
      bottom: {
        content: "inset-x-0 bottom-0 mt-24 max-h-[92vh] rounded-t-[1.5rem] border-t",
      },
      left: {
        content: "inset-y-0 left-0 h-full w-full rounded-r-[1.35rem] border-r",
      },
      right: {
        content: "inset-y-0 right-0 h-full w-full rounded-l-[1.35rem] border-l",
      },
    },
    tone: {
      default: {
        content: "border-white/10 bg-[rgba(18,20,26,0.98)] text-[var(--sh-color-ivory)]",
        header: "border-white/10",
        footer: "border-white/10",
        title: "text-white",
        description: "text-[var(--sh-color-cloud)]",
        close: "border-white/12 bg-white/[0.05] hover:bg-white/10",
      },
      soft: {
        content:
          "border-[rgba(0,122,255,0.22)] bg-[rgba(8,16,30,0.98)] text-[var(--sh-color-ivory)]",
        title: "text-[#bcdcff]",
        description: "text-[var(--sh-color-cloud)]",
        close:
          "border-[rgba(0,122,255,0.28)] bg-[rgba(0,122,255,0.1)] hover:bg-[rgba(0,122,255,0.18)]",
        header: "border-[rgba(0,122,255,0.18)]",
        footer: "border-[rgba(0,122,255,0.18)]",
      },
      dark: {
        content: "border-white/10 bg-[#07080c] text-white",
        header: "border-white/10",
        footer: "border-white/10",
        title: "text-white",
        description: "text-[var(--sh-color-mist)]",
        close: "border-white/12 bg-white/[0.05] hover:bg-white/10",
      },
      light: {
        content: "border-black/10 bg-white text-[#111318]",
        header: "border-black/10",
        footer: "border-black/10",
        title: "text-[#111318]",
        description: "text-[#4b4f58]",
        close: "border-black/10 bg-black/[0.04] hover:bg-black/[0.08]",
        handle: "bg-black/15",
      },
      "glass-test": {
        content:
          "border-white/16 bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_-20px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl",
        header: "border-white/12",
        footer: "border-white/12",
        title: "text-white",
        description: "text-[var(--sh-color-cloud)]",
        close: "border-white/16 bg-white/[0.08] hover:bg-white/16",
      },
    },
    size: {
      compact: {},
      default: {},
      wide: {},
    },
  },
  compoundVariants: [
    { side: ["left", "right"], size: "compact", class: { content: "sm:max-w-xs" } },
    { side: ["left", "right"], size: "default", class: { content: "sm:max-w-md" } },
    { side: ["left", "right"], size: "wide", class: { content: "sm:max-w-xl" } },
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
    <div className={cn(styles.header(), className)}>
      <div className="min-w-0">{children}</div>
      {showClose ? (
        <Drawer.Close className={styles.close()} aria-label="Close drawer">
          <X aria-hidden="true" className="size-4" />
        </Drawer.Close>
      ) : null}
    </div>
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
  return <div className={cn(styles.body(), className)}>{children}</div>;
}

export function SEINativeDrawerFooter({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const styles = useNativeDrawerStyles();
  return <div className={cn(styles.footer(), className)}>{children}</div>;
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
