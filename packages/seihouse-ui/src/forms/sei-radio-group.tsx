"use client";

import {
  RadioGroup as AriaRadioGroup,
  type RadioGroupProps as AriaRadioGroupProps,
  Radio as AriaRadio,
  type RadioProps as AriaRadioProps,
  Label,
  Text,
} from "react-aria-components";

import { cn } from "../styles/cn";
import { mobileTouchTarget, transitionSurface } from "../styles/variants";

export interface SEIRadioGroupProps extends Omit<AriaRadioGroupProps, "className" | "children"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/**
 * SEIRadioGroup — accessible radio group built on React Aria `RadioGroup`.
 *
 * RAC handles roving focus, arrow-key navigation, and label / description /
 * error wiring. Compose {@link SEIRadio} children inside.
 */
export function SEIRadioGroup({
  label,
  description,
  errorMessage,
  orientation = "vertical",
  children,
  className,
  ...props
}: SEIRadioGroupProps) {
  const hasError = errorMessage != null;

  return (
    <AriaRadioGroup
      orientation={orientation}
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {label != null ? (
        <Label className="text-sm font-semibold leading-none text-[var(--sh-color-cloud)]">
          {label}
        </Label>
      ) : null}

      <div
        className={cn(
          "flex gap-3",
          orientation === "horizontal" ? "flex-row flex-wrap items-center" : "flex-col",
        )}
      >
        {children}
      </div>

      {hasError ? (
        <Text slot="errorMessage" className="text-xs font-medium text-[#ff9b94]">
          {errorMessage}
        </Text>
      ) : description != null ? (
        <Text slot="description" className="text-xs text-[var(--sh-color-mist)]">
          {description}
        </Text>
      ) : null}
    </AriaRadioGroup>
  );
}

export interface SEIRadioProps extends Omit<AriaRadioProps, "className" | "children"> {
  /** Label rendered next to the dot. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * SEIRadio — a single option for {@link SEIRadioGroup}, built on React Aria
 * `Radio`. Renders a ring that fills with a dot when selected.
 */
export function SEIRadio({ children, className, ...props }: SEIRadioProps) {
  return (
    <AriaRadio
      className={cn(
        "group inline-flex cursor-pointer items-center gap-2.5 text-sm text-[var(--sh-color-ivory)]",
        mobileTouchTarget,
        children == null && "justify-center",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-45",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "grid size-5 shrink-0 place-items-center rounded-full border bg-white/[0.04]",
          transitionSurface,
          "border-white/16 group-data-[hovered]:border-white/28",
          "group-data-[selected]:border-[rgba(0,122,255,0.55)]",
          "group-data-[invalid]:border-[rgba(255,69,58,0.6)]",
          "group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-[var(--sh-color-sea)] group-data-[focus-visible]:ring-offset-2 group-data-[focus-visible]:ring-offset-[var(--sh-color-black)]",
        )}
      >
        <span
          className={cn(
            "size-2.5 rounded-full bg-[var(--sh-color-sea)]",
            "scale-0 opacity-0 motion-safe:transition-transform motion-safe:duration-150",
            "group-data-[selected]:scale-100 group-data-[selected]:opacity-100",
          )}
        />
      </span>
      {children != null ? <span>{children}</span> : null}
    </AriaRadio>
  );
}
