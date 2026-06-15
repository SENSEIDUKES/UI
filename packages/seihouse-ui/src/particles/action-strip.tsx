import type { ReactNode } from "react";
import { ArrowRight, MoreHorizontal } from "lucide-react";
import { memo } from "react";

import { SEIButton } from "../primitives/sei-button";
import { cn } from "../styles/cn";

export interface ActionStripAction {
  label: string;
  icon?: ReactNode;
  ariaLabel?: string;
}

export interface ActionStripProps {
  primary?: ActionStripAction;
  secondary?: ActionStripAction;
  iconActions?: ActionStripAction[];
  align?: "start" | "between" | "end";
  className?: string;
}

export function ActionStrip({
  primary = { label: "Open", icon: <ArrowRight className="size-3.5" /> },
  secondary,
  iconActions = [],
  align = "between",
  className,
}: ActionStripProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        align === "between" && "justify-between",
        align === "end" && "justify-end",
        align === "start" && "justify-start",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <SEIButton
          size="sm"
          variant="solid"
          iconRight={primary.icon}
          aria-label={primary.ariaLabel}
        >
          {primary.label}
        </SEIButton>
        {secondary ? (
          <SEIButton
            size="sm"
            variant="outline"
            iconRight={secondary.icon}
            aria-label={secondary.ariaLabel}
          >
            {secondary.label}
          </SEIButton>
        ) : null}
      </div>

      {iconActions.length ? (
        <div className="flex flex-wrap items-center gap-2">
          {iconActions.map((action) => (
            <SEIButton
              key={action.label}
              size="sm"
              variant="ghost"
              aria-label={action.ariaLabel ?? action.label}
            >
              {action.icon ?? <MoreHorizontal aria-hidden="true" className="size-4" />}
            </SEIButton>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default memo(ActionStrip, (prevProps, nextProps) => {
  // Custom comparison for complex props
  const primaryEqual = (!prevProps.primary && !nextProps.primary) ||
    Boolean(prevProps.primary && nextProps.primary &&
      prevProps.primary.label === nextProps.primary.label &&
      prevProps.primary.icon === nextProps.primary.icon &&
      prevProps.primary.ariaLabel === nextProps.primary.ariaLabel);
  
  const secondaryEqual = (!prevProps.secondary && !nextProps.secondary) ||
    Boolean(prevProps.secondary && nextProps.secondary &&
      prevProps.secondary.label === nextProps.secondary.label &&
      prevProps.secondary.icon === nextProps.secondary.icon &&
      prevProps.secondary.ariaLabel === nextProps.secondary.ariaLabel);
  
  // Compare iconActions by reference first, then by content if both exist
  const iconActionsEqual = prevProps.iconActions === nextProps.iconActions ||
    Boolean(prevProps.iconActions && nextProps.iconActions &&
      prevProps.iconActions.length === nextProps.iconActions.length &&
      prevProps.iconActions.every((action, index) => {
        const nextAction = nextProps.iconActions?.[index];
        return nextAction && action.label === nextAction.label &&
          action.icon === nextAction.icon &&
          action.ariaLabel === nextAction.ariaLabel;
      }));
  
  return (
    primaryEqual &&
    secondaryEqual &&
    iconActionsEqual &&
    prevProps.align === nextProps.align &&
    prevProps.className === nextProps.className
  );
});
