"use client";

import type { ReactNode } from "react";
import { Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Autocomplete,
  type AutocompleteProps,
  Header,
  Input,
  Menu,
  type MenuProps,
  MenuItem,
  type MenuItemProps,
  MenuSection,
  type MenuSectionProps,
  SearchField,
} from "react-aria-components";

import { cn } from "../styles/cn";
import { seiCommandGroupHeader, seiInteractiveItemVariants } from "../styles/variants";
import { fuzzyMatch } from "./fuzzy";

/**
 * SEICommand — canonical, compositional command menu composed from React Aria
 * `Autocomplete` + `Menu`. `Autocomplete` wires the search field to the menu:
 * it filters as you type and forwards arrow / Enter / Escape navigation into the
 * menu while focus stays in the input (accessible virtual focus via
 * aria-activedescendant). SEIHouse styles the surface.
 *
 * The default filter is a fuzzy subsequence match (see `fuzzy.ts`); pass a
 * custom `filter` to override. The same parts power the modal SEICommandPalette.
 *
 * Compose it as:
 *   <SEICommand>
 *     <SEICommandInput placeholder="…" />
 *     <SEICommandList onAction={…}>
 *       <SEICommandGroup label="Albums" icon={Disc3}>
 *         <SEICommandItem id="…">…</SEICommandItem>
 *       </SEICommandGroup>
 *     </SEICommandList>
 *   </SEICommand>
 *
 * For a quick data-driven menu, prefer the SEICommandPreview convenience.
 */

/** Default filter: case-insensitive fuzzy subsequence match. */
export const fuzzyFilter = (textValue: string, inputValue: string): boolean =>
  fuzzyMatch(textValue, inputValue).matched;

export interface SEICommandProps extends Omit<AutocompleteProps, "filter" | "children"> {
  filter?: (textValue: string, inputValue: string) => boolean;
  /** Render the bordered SEIHouse container (default true). Off when embedded in a modal. */
  surface?: boolean;
  className?: string;
  children?: ReactNode;
}

export function SEICommand({
  filter = fuzzyFilter,
  surface = true,
  className,
  children,
  ...props
}: SEICommandProps) {
  const autocomplete = (
    <Autocomplete filter={filter} {...props}>
      {children}
    </Autocomplete>
  );

  if (!surface) return autocomplete;

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-white/12 bg-[rgba(14,16,22,0.96)] shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl",
        className,
      )}
    >
      {autocomplete}
    </div>
  );
}

export interface SEICommandInputProps {
  placeholder?: string;
  /** Accessible label for the search field. */
  "aria-label"?: string;
  className?: string;
  inputClassName?: string;
  autoFocus?: boolean;
  /** Trailing content rendered after the input (e.g. an ESC hint badge). */
  children?: ReactNode;
}

export function SEICommandInput({
  placeholder = "Type a command or search…",
  "aria-label": ariaLabel = "Command search",
  className,
  inputClassName,
  autoFocus,
  children,
}: SEICommandInputProps) {
  return (
    <SearchField
      aria-label={ariaLabel}
      className={cn("flex items-center gap-2.5 border-b border-white/10 px-4", className)}
    >
      <Search aria-hidden="true" className="size-4 shrink-0 text-[var(--sh-color-mist)]" />
      <Input
        autoFocus={autoFocus}
        placeholder={placeholder}
        className={cn(
          "h-12 w-full bg-transparent text-base text-[var(--sh-color-ivory)] placeholder:text-[var(--sh-color-mist)] focus:outline-none sm:text-sm [&::-webkit-search-cancel-button]:appearance-none",
          inputClassName,
        )}
      />
      {children}
    </SearchField>
  );
}

export interface SEICommandListProps extends Omit<MenuProps<object>, "className"> {
  className?: string;
  emptyMessage?: ReactNode;
}

export function SEICommandList({
  className,
  emptyMessage = "No commands match.",
  renderEmptyState,
  "aria-label": ariaLabel = "Commands",
  ...props
}: SEICommandListProps) {
  return (
    <Menu
      aria-label={ariaLabel}
      className={cn("max-h-72 overflow-y-auto p-1.5 outline-none", className)}
      renderEmptyState={
        renderEmptyState ??
        (() => (
          <div className="px-3 py-8 text-center text-sm text-[var(--sh-color-mist)]">
            {emptyMessage}
          </div>
        ))
      }
      {...props}
    />
  );
}

export interface SEICommandGroupProps extends Omit<
  MenuSectionProps<object>,
  "className" | "children"
> {
  label: string;
  icon?: LucideIcon;
  className?: string;
  children?: ReactNode;
}

export function SEICommandGroup({
  label,
  icon: Icon,
  className,
  children,
  ...props
}: SEICommandGroupProps) {
  return (
    <MenuSection className={cn("mb-1 last:mb-0", className)} {...props}>
      <Header className={seiCommandGroupHeader}>
        {Icon ? <Icon aria-hidden="true" className="size-3.5" /> : null}
        {label}
      </Header>
      {children}
    </MenuSection>
  );
}

export interface SEICommandItemProps extends Omit<MenuItemProps, "className"> {
  className?: string;
}

export function SEICommandItem({ className, ...props }: SEICommandItemProps) {
  return <MenuItem className={cn(seiInteractiveItemVariants(), className)} {...props} />;
}

export interface SEICommandShortcutProps {
  className?: string;
  children?: ReactNode;
}

export function SEICommandShortcut({ className, children }: SEICommandShortcutProps) {
  return (
    <kbd
      className={cn(
        "rounded-md border border-white/12 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[0.65rem] text-[var(--sh-color-mist)]",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
