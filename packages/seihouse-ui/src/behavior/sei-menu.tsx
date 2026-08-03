"use client";

import { Menu } from "@base-ui/react/menu";
import { Check, Circle } from "lucide-react";

import { cn } from "../styles/cn";
import { seiLayer } from "../styles/layering";
import {
  focusRing,
  seiCommandGroupHeader,
  seiInteractiveItemVariants,
  seiPopupSurfaceVariants,
  transitionSurface,
  type SEIPopupSurfaceVariantProps,
} from "../styles/variants";

type SEIMenuTone = NonNullable<SEIPopupSurfaceVariantProps["tone"]>;
type PositionerProps = React.ComponentPropsWithoutRef<typeof Menu.Positioner>;

const menuItemClass = cn(
  seiInteractiveItemVariants(),
  "relative min-h-9 select-none justify-between",
  "data-[highlighted]:bg-white/[0.07] data-[highlighted]:text-white",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
  focusRing,
);

export type SEIMenuProps = React.ComponentProps<typeof Menu.Root>;

export function SEIMenu(props: SEIMenuProps) {
  return <Menu.Root {...props} />;
}

export interface SEIMenuTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Menu.Trigger>,
  "className"
> {
  className?: string;
}

export function SEIMenuTrigger({ className, ...props }: SEIMenuTriggerProps) {
  return <Menu.Trigger className={className} {...props} />;
}

export interface SEIMenuContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Menu.Popup>,
  "className"
> {
  tone?: SEIMenuTone;
  className?: string;
  side?: PositionerProps["side"];
  align?: PositionerProps["align"];
  sideOffset?: PositionerProps["sideOffset"];
  collisionPadding?: PositionerProps["collisionPadding"];
  collisionAvoidance?: PositionerProps["collisionAvoidance"];
}

export function SEIMenuContent({
  tone = "default",
  className,
  side = "bottom",
  align = "end",
  sideOffset = 8,
  collisionPadding = 8,
  collisionAvoidance,
  children,
  ...props
}: SEIMenuContentProps) {
  return (
    <Menu.Portal>
      <Menu.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        collisionAvoidance={collisionAvoidance}
        className={seiLayer.dropdown}
      >
        <Menu.Popup
          className={cn(
            seiPopupSurfaceVariants({ tone }),
            "min-w-52 max-w-[min(18rem,var(--available-width))] rounded-2xl p-1",
            "origin-[var(--transform-origin)] outline-none",
            "transition-[opacity,transform] duration-150 ease-out",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            className,
          )}
          {...props}
        >
          {children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
}

export interface SEIMenuItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Menu.Item>,
  "className"
> {
  className?: string;
  destructive?: boolean;
}

export function SEIMenuItem({ className, destructive = false, ...props }: SEIMenuItemProps) {
  return (
    <Menu.Item
      className={cn(
        menuItemClass,
        destructive &&
          "text-[var(--sh-status-danger-text)] data-[highlighted]:bg-[var(--sh-status-danger-bg)]",
        className,
      )}
      {...props}
    />
  );
}

export interface SEIMenuCheckboxItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Menu.CheckboxItem>,
  "className"
> {
  className?: string;
}

export function SEIMenuCheckboxItem({ className, children, ...props }: SEIMenuCheckboxItemProps) {
  return (
    <Menu.CheckboxItem className={cn(menuItemClass, "pl-9", className)} {...props}>
      <Menu.CheckboxItemIndicator className="absolute left-3 inline-flex text-[var(--sh-interactive-text)]">
        <Check aria-hidden="true" className="size-4" strokeWidth={3} />
      </Menu.CheckboxItemIndicator>
      <span className="min-w-0 flex-1">{children}</span>
    </Menu.CheckboxItem>
  );
}

export type SEIMenuRadioGroupProps = React.ComponentProps<typeof Menu.RadioGroup>;

export function SEIMenuRadioGroup(props: SEIMenuRadioGroupProps) {
  return <Menu.RadioGroup {...props} />;
}

export interface SEIMenuRadioItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Menu.RadioItem>,
  "className"
> {
  className?: string;
}

export function SEIMenuRadioItem({ className, children, ...props }: SEIMenuRadioItemProps) {
  return (
    <Menu.RadioItem className={cn(menuItemClass, "pl-9", className)} {...props}>
      <Menu.RadioItemIndicator className="absolute left-3 inline-flex text-[var(--sh-interactive-text)]">
        <Circle aria-hidden="true" className="size-2.5 fill-current" />
      </Menu.RadioItemIndicator>
      <span className="min-w-0 flex-1">{children}</span>
    </Menu.RadioItem>
  );
}

export interface SEIMenuGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Menu.Group>,
  "className"
> {
  className?: string;
}

export function SEIMenuGroup({ className, ...props }: SEIMenuGroupProps) {
  return <Menu.Group className={cn("py-1", className)} {...props} />;
}

export interface SEIMenuLabelProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Menu.GroupLabel>,
  "className"
> {
  className?: string;
}

export function SEIMenuLabel({ className, ...props }: SEIMenuLabelProps) {
  return <Menu.GroupLabel className={cn(seiCommandGroupHeader, className)} {...props} />;
}

export interface SEIMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SEIMenuSeparator({ className, ...props }: SEIMenuSeparatorProps) {
  return (
    <div
      role="separator"
      className={cn("my-1 h-px bg-white/10", transitionSurface, className)}
      {...props}
    />
  );
}
