"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "../styles/cn";
import { seiFieldControlVariants, type SEIFieldControlVariantProps } from "./sei-field";

export interface SEITextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">, SEIFieldControlVariantProps {}

/**
 * SEITextarea — styled native `<textarea>` reusing the shared control surface.
 *
 * Drops the fixed control height in favour of a comfortable `min-height` and
 * vertical padding so the field can grow with its content.
 */
export const SEITextarea = forwardRef<HTMLTextAreaElement, SEITextareaProps>(function SEITextarea(
  { className, size, invalid, disabled, rows = 4, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      className={cn(
        seiFieldControlVariants({ size, invalid }),
        // Override the fixed control height with auto growth.
        "h-auto min-h-[5.5rem] resize-y py-2.5 leading-relaxed sm:h-auto",
        className,
      )}
      {...props}
    />
  );
});
