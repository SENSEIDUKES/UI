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
 * SEIDialog — accessible modal dialog powered by Base UI Dialog.
 *
 * Base UI handles the focus trap, Escape-to-close, click-outside dismissal,
 * scroll lock, focus return to the trigger, and ARIA labelling (via Title /
 * Description). SEIHouse owns every pixel of the visual surface through
 * tailwind-variants and `--sh-*` tokens. All parts accept `className`.
 */

export const seiDialogStyles = tv({
  slots: {
    backdrop: seiOverlayVariants(),
    popup: [
      "fixed left-1/2 top-1/2 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2",
      seiLayer.modal,
      "max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[1.35rem] p-6 pr-16 sm:pr-6",
      "transition-[opacity,transform] duration-200 ease-out",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      focusRing,
    ],
    title: "text-lg font-semibold tracking-[-0.02em] text-[var(--sh-text-primary)]",
    description: "mt-1.5 text-sm leading-relaxed text-[var(--sh-text-muted)]",
    close: [
      "absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-[var(--sh-border)] bg-[var(--sh-interactive-surface)]",
      mobileTouchTarget,
      "cursor-pointer text-current/70 hover:bg-[var(--sh-interactive-surface-hover)] hover:text-current",
      focusRing,
      transitionSurface,
    ],
  },
  variants: {
    variant: {
      default: {
        popup: seiPopupSurfaceVariants({ tone: "default" }),
      },
      soft: {
        popup: seiPopupSurfaceVariants({ tone: "soft" }),
      },
      dark: {
        popup: seiPopupSurfaceVariants({ tone: "dark" }),
      },
      light: {
        popup: seiPopupSurfaceVariants({ tone: "light" }),
      },
      "glass-test": {
        popup: seiPopupSurfaceVariants({ tone: "glass-test" }),
      },
    },
  },
  defaultVariants: { variant: "default" },
});

type SEIDialogVariant = NonNullable<VariantProps<typeof seiDialogStyles>["variant"]>;

const SEIDialogContext = createContext<SEIDialogVariant>("default");

export type SEIDialogProps = React.ComponentProps<typeof Dialog.Root>;

export function SEIDialog(props: SEIDialogProps) {
  return <Dialog.Root {...props} />;
}

export interface SEIDialogTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Dialog.Trigger>,
  "className"
> {
  className?: string;
}

export function SEIDialogTrigger({ className, ...props }: SEIDialogTriggerProps) {
  return <Dialog.Trigger className={className} {...props} />;
}

export interface SEIDialogContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Dialog.Popup>,
  "className"
> {
  variant?: SEIDialogVariant;
  className?: string;
  backdropClassName?: string;
  /** Hide the built-in close button (default shows it). */
  hideClose?: boolean;
  children?: ReactNode;
}

export function SEIDialogContent({
  variant = "default",
  className,
  backdropClassName,
  hideClose = false,
  children,
  ...props
}: SEIDialogContentProps) {
  const styles = seiDialogStyles({ variant });
  return (
    <SEIDialogContext.Provider value={variant}>
      <Dialog.Portal>
        <Dialog.Backdrop className={cn(styles.backdrop(), backdropClassName)} />
        <Dialog.Popup className={cn(styles.popup(), className)} {...props}>
          {children}
          {!hideClose ? (
            <Dialog.Close className={styles.close()} aria-label="Close dialog">
              <X aria-hidden="true" className="size-4" />
            </Dialog.Close>
          ) : null}
        </Dialog.Popup>
      </Dialog.Portal>
    </SEIDialogContext.Provider>
  );
}

export interface SEIDialogTitleProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Dialog.Title>,
  "className"
> {
  className?: string;
}

export function SEIDialogTitle({ className, ...props }: SEIDialogTitleProps) {
  const variant = useContext(SEIDialogContext);
  const styles = seiDialogStyles({ variant });
  return <Dialog.Title className={cn(styles.title(), className)} {...props} />;
}

export interface SEIDialogDescriptionProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Dialog.Description>,
  "className"
> {
  className?: string;
}

export function SEIDialogDescription({ className, ...props }: SEIDialogDescriptionProps) {
  const variant = useContext(SEIDialogContext);
  const styles = seiDialogStyles({ variant });
  return <Dialog.Description className={cn(styles.description(), className)} {...props} />;
}

export type SEIDialogCloseProps = React.ComponentProps<typeof Dialog.Close>;

export function SEIDialogClose(props: SEIDialogCloseProps) {
  return <Dialog.Close {...props} />;
}
