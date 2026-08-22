"use client";

import type { ReactNode } from "react";
import { Tooltip } from "@base-ui/react/tooltip";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "../styles/cn";
import { seiLayer } from "../styles/layering";
import { seiPopupSurfaceVariants } from "../styles/variants";

/**
 * SEITooltip — accessible tooltip powered by Base UI Tooltip.
 *
 * Base UI handles hover + focus triggering (keyboard accessible), open delay,
 * positioning, and ARIA description wiring. SEIHouse styles the bubble. Wrap an
 * app in `SEITooltipProvider` once to share a hover delay across tooltips.
 * Parts accept `className`.
 */

export const seiTooltipStyles = tv({
  slots: {
    positioner: seiLayer.popover,
    popup: [
      "max-w-xs rounded-lg px-2.5 py-1.5 text-xs font-medium leading-snug",
      "origin-[var(--transform-origin)] transition-[opacity,transform] duration-150 ease-out",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    ],
  },
  variants: {
    variant: {
      default: { popup: seiPopupSurfaceVariants({ tone: "default" }) },
      dark: { popup: seiPopupSurfaceVariants({ tone: "dark" }) },
      light: { popup: seiPopupSurfaceVariants({ tone: "light" }) },
    },
  },
  defaultVariants: { variant: "default" },
});

type SEITooltipVariant = NonNullable<VariantProps<typeof seiTooltipStyles>["variant"]>;

export interface SEITooltipProviderProps extends React.ComponentProps<typeof Tooltip.Provider> {}

export function SEITooltipProvider({
  delay = 250,
  closeDelay = 0,
  ...props
}: SEITooltipProviderProps) {
  return <Tooltip.Provider delay={delay} closeDelay={closeDelay} {...props} />;
}

export type SEITooltipProps = React.ComponentProps<typeof Tooltip.Root>;

export function SEITooltip(props: SEITooltipProps) {
  return <Tooltip.Root {...props} />;
}

export interface SEITooltipTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Tooltip.Trigger>,
  "className"
> {
  className?: string;
}

export function SEITooltipTrigger({ className, ...props }: SEITooltipTriggerProps) {
  return <Tooltip.Trigger className={className} {...props} />;
}

type TooltipPositionerProps = React.ComponentPropsWithoutRef<typeof Tooltip.Positioner>;

export interface SEITooltipContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Tooltip.Popup>,
  "className"
> {
  variant?: SEITooltipVariant;
  className?: string;
  side?: TooltipPositionerProps["side"];
  align?: TooltipPositionerProps["align"];
  sideOffset?: TooltipPositionerProps["sideOffset"];
  /** Padding kept between the tooltip and the viewport edge during collision handling. */
  collisionPadding?: TooltipPositionerProps["collisionPadding"];
  children?: ReactNode;
}

export function SEITooltipContent({
  variant = "default",
  className,
  side = "top",
  align = "center",
  sideOffset = 6,
  collisionPadding = 8,
  children,
  ...props
}: SEITooltipContentProps) {
  const styles = seiTooltipStyles({ variant });
  return (
    <Tooltip.Portal>
      <Tooltip.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={styles.positioner()}
      >
        <Tooltip.Popup className={cn(styles.popup(), className)} {...props}>
          {children}
        </Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  );
}
