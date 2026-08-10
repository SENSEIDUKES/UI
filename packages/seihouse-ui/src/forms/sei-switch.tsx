"use client";

import { Children } from "react";
import { Switch, type SwitchProps } from "react-aria-components";

import { cn } from "../styles/cn";
import { focusRing, mobileTouchTarget, transitionSurface } from "../styles/variants";

export type SEISwitchSize = "compact" | "comfortable";

export interface SEISwitchProps extends Omit<SwitchProps, "className" | "children"> {
  /** Label rendered next to the toggle. */
  children?: React.ReactNode;
  size?: SEISwitchSize;
  className?: string;
}

const TRACK_SIZE: Record<SEISwitchSize, string> = {
  compact: "h-5 w-9",
  comfortable: "h-6 w-11",
};

const THUMB_SIZE: Record<SEISwitchSize, string> = {
  compact: "size-4 group-data-[selected]:translate-x-4",
  comfortable: "size-5 group-data-[selected]:translate-x-5",
};

/**
 * SEISwitch — accessible toggle built on React Aria `Switch`.
 *
 * RAC owns the role, keyboard, and selection state; SEIHouse styles the track
 * and a motion-safe thumb. `children` becomes the label.
 */
export function SEISwitch({ children, size = "comfortable", className, ...props }: SEISwitchProps) {
  const hasLabel = Children.toArray(children).length > 0;

  return (
    <Switch
      className={cn(
        "group inline-flex items-center gap-3 text-sm text-[var(--sh-color-ivory)]",
        mobileTouchTarget,
        !hasLabel && "justify-center",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-45",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center rounded-full border border-white/12 bg-white/[0.08] p-0.5",
          TRACK_SIZE[size],
          transitionSurface,
          focusRing,
          "group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-[var(--sh-color-sea)] group-data-[focus-visible]:ring-offset-2 group-data-[focus-visible]:ring-offset-[var(--sh-color-black)]",
          "group-data-[selected]:border-[rgba(0,122,255,0.45)] group-data-[selected]:bg-[var(--sh-color-sea)]",
        )}
      >
        <span
          className={cn(
            "rounded-full bg-white shadow-sm",
            "motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out",
            THUMB_SIZE[size],
          )}
        />
      </span>
      {hasLabel ? <span>{children}</span> : null}
    </Switch>
  );
}
