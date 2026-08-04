"use client";

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, Search, X } from "lucide-react";
import {
  Button,
  ComboBox,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  type Key,
} from "react-aria-components";

import { cn } from "../styles/cn";
import { focusRing, seiInteractiveItemVariants } from "../styles/variants";
import type { MultiSelectOption } from "../types/behavior";

/**
 * SEIMultiSelectCombobox — searchable multi-select with removable chips.
 *
 * Composes a React Aria `ComboBox` (search + add, listbox semantics, keyboard
 * navigation, empty state, disabled options) with SEIHouse-styled selected
 * chips. Chips are removable by click or by Backspace when the input is empty.
 * React Aria handles the combobox a11y; SEIHouse owns styling. Consumers provide option data.
 *
 * Note: selected chips are rendered as a styled list rather than React Aria's
 * `TagGroup` to avoid a collection-context crash in the current RAC version;
 * each remove control is a real focusable button with an accessible label.
 */

export interface SEIMultiSelectComboboxProps {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  options?: MultiSelectOption[];
  /** Controlled selected ids. */
  value?: string[];
  defaultValue?: string[];
  onChange?: (ids: string[]) => void;
  className?: string;
}

export function SEIMultiSelectCombobox({
  label = "Select tags",
  description,
  errorMessage,
  placeholder = "Search…",
  options = [],
  value,
  defaultValue = [],
  onChange,
  className,
}: SEIMultiSelectComboboxProps) {
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = useState("");

  const selected = value ?? internal;
  const setSelected = (next: string[]) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const byId = useMemo(() => new Map(options.map((o) => [o.id, o])), [options]);
  const selectedOptions = selected.map((id) => byId.get(id)).filter(Boolean) as MultiSelectOption[];

  const lowerQuery = inputValue.trim().toLowerCase();

  // Cache lowercased labels to avoid allocating strings inside the filter loop.
  const lowerLabels = useMemo(() => {
    const map = new Map<string, string>();
    for (const o of options) {
      map.set(o.id, o.label.toLowerCase());
    }
    return map;
  }, [options]);

  // Available = not-yet-selected options matching the current query.
  const available = useMemo(() => {
    // Use a Set for O(1) lookups instead of Array.includes(id) in the filter loop
    const selectedSet = new Set(selected);
    return options.filter(
      (o) =>
        !selectedSet.has(o.id) &&
        (lowerQuery === "" || (lowerLabels.get(o.id) || "").includes(lowerQuery)),
    );
  }, [options, selected, lowerQuery, lowerLabels]);

  const addKey = (key: Key | null) => {
    if (key == null) return;
    const id = String(key);
    if (!selected.includes(id)) setSelected([...selected, id]);
    setInputValue("");
  };

  const removeId = (id: string) => setSelected(selected.filter((s) => s !== id));

  const hasError = Boolean(errorMessage);

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <ComboBox
        items={available}
        selectedKey={null}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSelectionChange={addKey}
        allowsEmptyCollection
        menuTrigger="focus"
        className="flex flex-col gap-2"
      >
        <Label className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]">
          {label}
        </Label>

        {/* Selected chips */}
        {selectedOptions.length > 0 ? (
          <ul aria-label={`Selected ${label}`} className="flex flex-wrap gap-2">
            {selectedOptions.map((item) => (
              <li
                key={item.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,122,255,0.28)] bg-[var(--sh-color-sea-subtle)] py-1 pl-3 pr-1.5 text-xs font-semibold text-[#8fc8ff]"
              >
                {item.label}
                <button
                  type="button"
                  aria-label={`Remove ${item.label}`}
                  onClick={() => removeId(item.id)}
                  className={cn(
                    "grid size-4 place-items-center rounded-full text-[#8fc8ff] hover:bg-white/10 hover:text-white",
                    focusRing,
                  )}
                >
                  <X aria-hidden="true" className="size-3" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {/* Search input */}
        <div
          className={cn(
            "group flex items-center gap-2 rounded-full border bg-white/[0.04] px-3.5",
            "transition-colors focus-within:border-[rgba(0,122,255,0.45)] focus-within:bg-white/[0.06]",
            hasError ? "border-[rgba(255,69,58,0.5)]" : "border-white/12",
          )}
        >
          <Search aria-hidden="true" className="size-4 shrink-0 text-[var(--sh-color-mist)]" />
          <Input
            placeholder={placeholder}
            onKeyDown={(e) => {
              // Backspace on an empty field removes the most recent chip.
              if (e.key === "Backspace" && inputValue === "" && selected.length > 0) {
                removeId(selected[selected.length - 1]);
              }
            }}
            className="h-10 w-full bg-transparent text-sm text-[var(--sh-color-ivory)] placeholder:text-[var(--sh-color-mist)] focus:outline-none"
          />
          {selected.length > 0 ? (
            <button
              type="button"
              onClick={() => setSelected([])}
              className={cn(
                "whitespace-nowrap rounded-full px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--sh-color-mist)] hover:text-white",
                focusRing,
              )}
            >
              Clear all
            </button>
          ) : null}
          <ChevronsUpDown
            aria-hidden="true"
            className="size-4 shrink-0 text-[var(--sh-color-mist)]"
          />
        </div>

        <Popover className="w-[var(--trigger-width)] rounded-2xl border border-white/12 bg-[rgba(18,20,26,0.98)] p-1.5 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <ListBox
            className="max-h-56 overflow-y-auto outline-none"
            renderEmptyState={() => (
              <div className="px-3 py-5 text-center text-sm text-[var(--sh-color-mist)]">
                {inputValue ? "No matches." : "All options selected."}
              </div>
            )}
          >
            {(item: MultiSelectOption) => (
              <ListBoxItem
                id={item.id}
                textValue={item.label}
                isDisabled={item.disabled}
                className={cn(seiInteractiveItemVariants(), "justify-between")}
              >
                <span className="flex flex-col">
                  <span className="font-medium">{item.label}</span>
                  {item.hint ? (
                    <span className="text-xs text-[var(--sh-color-mist)]">{item.hint}</span>
                  ) : null}
                </span>
                <Check
                  aria-hidden="true"
                  className="size-4 shrink-0 opacity-0 data-[selected]:opacity-100"
                />
              </ListBoxItem>
            )}
          </ListBox>
        </Popover>
      </ComboBox>

      {hasError ? (
        <p className="text-xs font-medium text-[#ff9b94]">{errorMessage}</p>
      ) : description ? (
        <p className="text-xs text-[var(--sh-color-mist)]">{description}</p>
      ) : null}
    </div>
  );
}
