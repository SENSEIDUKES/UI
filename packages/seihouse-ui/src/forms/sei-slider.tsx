"use client";

import {
  Slider as AriaSlider,
  type SliderProps as AriaSliderProps,
  SliderTrack,
  SliderThumb,
  SliderOutput,
  Label,
} from "react-aria-components";

import { cn } from "../styles/cn";
import { focusRing, mobileTouchTarget, transitionSurface } from "../styles/variants";

export interface SEISliderProps extends Omit<AriaSliderProps<number>, "className" | "children"> {
  label?: React.ReactNode;
  /** Render the current value next to the label. */
  showValue?: boolean;
  className?: string;
}

/**
 * SEISlider — single-thumb slider built on React Aria `Slider`.
 *
 * RAC owns the value math, keyboard stepping, and ARIA; SEIHouse styles the
 * track, the filled portion, and a focusable thumb. Kept to a single numeric
 * value (`number`), not a range.
 */
export function SEISlider({
  label,
  showValue = false,
  className,
  minValue = 0,
  maxValue = 100,
  ...props
}: SEISliderProps) {
  return (
    <AriaSlider
      minValue={minValue}
      maxValue={maxValue}
      className={cn(
        "flex w-full flex-col gap-2",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-45",
        className,
      )}
      {...props}
    >
      {label != null || showValue ? (
        <div className="flex items-center justify-between">
          {label != null ? (
            <Label className="text-sm font-semibold leading-none text-[var(--sh-color-cloud)]">
              {label}
            </Label>
          ) : (
            <span />
          )}
          {showValue ? (
            <SliderOutput className="text-sm tabular-nums text-[var(--sh-color-mist)]" />
          ) : null}
        </div>
      ) : null}

      <SliderTrack className="relative flex h-11 w-full items-center sm:h-6">
        {({ state }) => (
          <>
            <span className="absolute h-1.5 w-full rounded-full bg-white/12" />
            <span
              className="absolute h-1.5 rounded-full bg-[var(--sh-color-sea)]"
              style={{ width: `${state.getThumbPercent(0) * 100}%` }}
            />
            <SliderThumb
              className={cn(
                "top-1/2 grid place-items-center rounded-full",
                mobileTouchTarget,
                transitionSurface,
                focusRing,
                "data-[dragging]:scale-110",
              )}
            >
              <span className="pointer-events-none size-4 rounded-full border border-[rgba(0,122,255,0.55)] bg-white shadow-sm" />
            </SliderThumb>
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  );
}
