"use client";

import { Checkbox, type CheckboxProps } from "react-aria-components";
import { Check, Minus } from "lucide-react";

import { cn } from "../styles/cn";
import { mobileTouchTarget, transitionSurface } from "../styles/variants";

export interface SEICheckboxProps extends Omit<CheckboxProps, "className" | "children"> {
  /** Label rendered next to the box. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * SEICheckbox — accessible checkbox built on React Aria `Checkbox`.
 *
 * RAC owns role, keyboard, selection, and the indeterminate state (pass
 * `isIndeterminate`); SEIHouse styles the box and swaps a Check / Minus glyph.
 */
export function SEICheckbox({ children, className, ...props }: SEICheckboxProps) {
  return (
    <Checkbox
      className={cn(
        "group inline-flex items-center gap-2.5 text-sm text-[var(--sh-color-ivory)]",
        mobileTouchTarget,
        children == null && "justify-center",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-45",
        className,
      )}
      {...props}
    >
      {({ isSelected, isIndeterminate }) => (
        <>
          <span
            className={cn(
              "grid size-5 shrink-0 place-items-center rounded-[var(--sh-radius-sm)] border bg-white/[0.04] text-white",
              transitionSurface,
              "group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-[var(--sh-color-sea)] group-data-[focus-visible]:ring-offset-2 group-data-[focus-visible]:ring-offset-[var(--sh-color-black)]",
              isSelected || isIndeterminate
                ? "border-[rgba(0,122,255,0.45)] bg-[var(--sh-color-sea)]"
                : "border-white/16 group-data-[hovered]:border-white/28",
              "group-data-[invalid]:border-[rgba(255,69,58,0.6)]",
            )}
          >
            {isIndeterminate ? (
              <Minus aria-hidden="true" className="size-3.5" strokeWidth={3} />
            ) : isSelected ? (
              <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
            ) : null}
          </span>
          {children != null ? <span>{children}</span> : null}
        </>
      )}
    </Checkbox>
  );
}
