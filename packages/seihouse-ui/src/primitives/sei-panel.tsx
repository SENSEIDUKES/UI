import type { ElementType, HTMLAttributes } from "react";

import { cn } from "../styles/cn";
import { seiPanelVariants, type SEIPanelVariantProps } from "../styles/variants";

type SEIPanelElement = "div" | "section" | "article" | "aside" | "header" | "footer";

export interface SEIPanelProps extends HTMLAttributes<HTMLElement>, SEIPanelVariantProps {
  as?: SEIPanelElement;
}

export function SEIPanel({
  as = "div",
  className,
  variant,
  padding,
  interactive,
  glow,
  ...props
}: SEIPanelProps) {
  const Component = as as ElementType;

  return (
    <Component
      className={cn(seiPanelVariants({ variant, padding, interactive, glow }), className)}
      {...props}
    />
  );
}
