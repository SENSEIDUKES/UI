"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { Tabs } from "@base-ui/react/tabs";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "../styles/cn";
import { focusRing, mobileTouchTarget, transitionSurface } from "../styles/variants";

/**
 * SEITabs — accessible tab navigation powered by Base UI Tabs.
 *
 * Base UI provides roving-tabindex keyboard navigation, ARIA wiring, and the
 * active/disabled state machine. SEIHouse provides all visual styling through
 * tailwind-variants and `--sh-*` design tokens. Every part accepts `className`.
 */

export const seiTabsStyles = tv({
  slots: {
    list: "relative flex flex-wrap items-center gap-1",
    trigger: [
      "relative z-10 inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2",
      mobileTouchTarget,
      "text-sm font-semibold text-[var(--sh-color-cloud)]",
      "cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-40",
      focusRing,
      transitionSurface,
    ],
    indicator: "pointer-events-none absolute z-0",
    panel: "mt-4 text-sm leading-relaxed text-[var(--sh-color-cloud)] focus-visible:outline-none",
  },
  variants: {
    variant: {
      default: {
        list: "rounded-full border border-white/10 bg-white/[0.04] p-1",
        trigger: "data-[selected]:bg-white/10 data-[selected]:text-white hover:text-white",
      },
      underline: {
        list: "gap-4 border-b border-white/10 pb-0",
        trigger: "rounded-none px-1 pb-3 data-[selected]:text-white hover:text-white",
        indicator:
          "bottom-0 left-0 h-0.5 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] rounded-full bg-[var(--sh-color-sea)] transition-all duration-200 ease-out",
      },
      pill: {
        list: "rounded-full border border-white/10 bg-white/[0.04] p-1",
        trigger: "data-[selected]:text-white hover:text-white",
        indicator:
          "left-0 top-0 h-[var(--active-tab-height)] w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] translate-y-[var(--active-tab-top)] rounded-full bg-[rgba(0,122,255,0.18)] shadow-[inset_0_0_0_1px_rgba(0,122,255,0.4)] transition-all duration-200 ease-out",
      },
      panel: {
        list: "rounded-2xl border border-white/10 bg-[rgba(18,20,26,0.7)] p-1.5",
        trigger:
          "rounded-xl data-[selected]:bg-[rgba(0,122,255,0.14)] data-[selected]:text-white hover:text-white",
      },
      dark: {
        list: "rounded-full border border-white/10 bg-[#07080c] p-1",
        trigger: "data-[selected]:bg-white/12 data-[selected]:text-white hover:text-white",
      },
      light: {
        list: "rounded-full border border-black/10 bg-white p-1",
        trigger:
          "text-[#5b5f68] data-[selected]:bg-[#111318] data-[selected]:text-white hover:text-[#111318]",
      },
    },
  },
  defaultVariants: { variant: "default" },
});

type SEITabsVariant = NonNullable<VariantProps<typeof seiTabsStyles>["variant"]>;

const SEITabsContext = createContext<SEITabsVariant>("default");

export interface SEITabsProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Tabs.Root>,
  "className"
> {
  variant?: SEITabsVariant;
  className?: string;
}

export function SEITabs({ variant = "default", className, ...props }: SEITabsProps) {
  return (
    <SEITabsContext.Provider value={variant}>
      <Tabs.Root className={cn("w-full", className)} {...props} />
    </SEITabsContext.Provider>
  );
}

export interface SEITabsListProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Tabs.List>,
  "className"
> {
  className?: string;
  children?: ReactNode;
}

export function SEITabsList({ className, children, ...props }: SEITabsListProps) {
  const variant = useContext(SEITabsContext);
  const styles = seiTabsStyles({ variant });
  const showIndicator = variant === "underline" || variant === "pill";

  return (
    <Tabs.List className={cn(styles.list(), className)} {...props}>
      {children}
      {showIndicator ? <Tabs.Indicator className={styles.indicator()} /> : null}
    </Tabs.List>
  );
}

export interface SEITabsTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Tabs.Tab>,
  "className"
> {
  className?: string;
}

export function SEITabsTrigger({ className, ...props }: SEITabsTriggerProps) {
  const variant = useContext(SEITabsContext);
  const styles = seiTabsStyles({ variant });
  return <Tabs.Tab className={cn(styles.trigger(), className)} {...props} />;
}

export interface SEITabsPanelProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Tabs.Panel>,
  "className"
> {
  className?: string;
}

export function SEITabsPanel({ className, ...props }: SEITabsPanelProps) {
  const variant = useContext(SEITabsContext);
  const styles = seiTabsStyles({ variant });
  return <Tabs.Panel className={cn(styles.panel(), className)} {...props} />;
}
