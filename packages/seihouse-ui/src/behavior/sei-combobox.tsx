"use client";

import type { ReactNode } from "react";
import { ChevronsUpDown, Search } from "lucide-react";
import {
  Button,
  ComboBox,
  type ComboBoxProps,
  Input,
  Label,
  type LabelProps,
  ListBox,
  type ListBoxProps,
  ListBoxItem,
  type ListBoxItemProps,
  Popover,
  type PopoverProps,
} from "react-aria-components";

import { cn } from "../styles/cn";
import { seiLayer, seiLayerImportant } from "../styles/layering";
import {
  focusRing,
  mobileTouchTarget,
  seiInteractiveItemVariants,
  seiPopupSurfaceVariants,
} from "../styles/variants";

/**
 * SEICombobox — searchable, accessible combobox composed from React Aria
 * Components. This is the canonical, compositional wrapper: like SEIDialog /
 * SEIDrawer / SEIPopover, behavior comes from the headless library (type-to-
 * filter, arrow / Enter / Escape navigation, listbox semantics, label wiring)
 * while SEIHouse owns the visual surface. Each part accepts `className`.
 *
 * Compose it as:
 *   <SEICombobox>
 *     <SEIComboboxLabel>…</SEIComboboxLabel>
 *     <SEIComboboxControl placeholder="…" />
 *     <SEIComboboxPopover>
 *       <SEIComboboxList items={items}>{(item) => <SEIComboboxItem … />}</SEIComboboxList>
 *     </SEIComboboxPopover>
 *   </SEICombobox>
 *
 * For a quick data-driven combobox, prefer the SEIComboboxPreview convenience.
 */

export interface SEIComboboxProps<T extends object> extends Omit<ComboBoxProps<T>, "className"> {
  className?: string;
}

export function SEICombobox<T extends object>({ className, ...props }: SEIComboboxProps<T>) {
  return <ComboBox className={cn("flex w-full flex-col gap-2", className)} {...props} />;
}

export interface SEIComboboxLabelProps extends Omit<LabelProps, "className"> {
  className?: string;
}

export function SEIComboboxLabel({ className, ...props }: SEIComboboxLabelProps) {
  return (
    <Label
      className={cn(
        "text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]",
        className,
      )}
      {...props}
    />
  );
}

export interface SEIComboboxControlProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  /** Replace the leading search icon (defaults to a Search glyph). */
  icon?: ReactNode;
  /** Hide the trailing open/close toggle button. */
  hideTrigger?: boolean;
  /** Forwarded to the underlying input (e.g. onKeyDown for backspace handling). */
  onInputKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

export function SEIComboboxControl({
  placeholder,
  className,
  inputClassName,
  icon,
  hideTrigger = false,
  onInputKeyDown,
}: SEIComboboxControlProps) {
  return (
    <div
      className={cn(
        "group flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5",
        "transition-colors focus-within:border-[rgba(0,122,255,0.45)] focus-within:bg-white/[0.06]",
        className,
      )}
    >
      {icon ?? (
        <Search aria-hidden="true" className="size-4 shrink-0 text-[var(--sh-color-mist)]" />
      )}
      <Input
        placeholder={placeholder}
        onKeyDown={onInputKeyDown}
        className={cn(
          "h-11 w-full bg-transparent text-base text-[var(--sh-color-ivory)] placeholder:text-[var(--sh-color-mist)] focus:outline-none sm:h-10 sm:text-sm",
          inputClassName,
        )}
      />
      {hideTrigger ? null : (
        <Button
          className={cn(
            "grid size-7 shrink-0 place-items-center rounded-full text-[var(--sh-color-mist)] hover:text-white",
            mobileTouchTarget,
            focusRing,
          )}
        >
          <ChevronsUpDown aria-hidden="true" className="size-4" />
        </Button>
      )}
    </div>
  );
}

export interface SEIComboboxPopoverProps extends Omit<PopoverProps, "className"> {
  className?: string;
}

export function SEIComboboxPopover({ className, ...props }: SEIComboboxPopoverProps) {
  return (
    <Popover
      placement="bottom"
      offset={6}
      className={cn(
        seiPopupSurfaceVariants({ tone: "default" }),
        seiLayer.dropdown,
        // React Aria's default inline z-index is intentionally very high; keep
        // this popup in the shared dropdown layer instead.
        seiLayerImportant.dropdown,
        "w-[var(--trigger-width)] origin-top rounded-2xl p-1.5",
        "data-[entering]:animate-in data-[entering]:fade-in-0 data-[exiting]:animate-out data-[exiting]:fade-out-0",
        className,
      )}
      {...props}
    />
  );
}

export interface SEIComboboxListProps<T extends object> extends Omit<ListBoxProps<T>, "className"> {
  className?: string;
  emptyMessage?: ReactNode;
}

export function SEIComboboxList<T extends object>({
  className,
  emptyMessage = "No matches.",
  renderEmptyState,
  ...props
}: SEIComboboxListProps<T>) {
  return (
    <ListBox
      className={cn("max-h-64 overflow-y-auto outline-none", className)}
      renderEmptyState={
        renderEmptyState ??
        (() => (
          <div className="px-3 py-6 text-center text-sm text-[var(--sh-color-mist)]">
            {emptyMessage}
          </div>
        ))
      }
      {...props}
    />
  );
}

export interface SEIComboboxItemProps extends Omit<ListBoxItemProps, "className"> {
  className?: string;
}

export function SEIComboboxItem({ className, ...props }: SEIComboboxItemProps) {
  return (
    <ListBoxItem
      className={cn(seiInteractiveItemVariants(), "cursor-pointer justify-between", className)}
      {...props}
    />
  );
}
