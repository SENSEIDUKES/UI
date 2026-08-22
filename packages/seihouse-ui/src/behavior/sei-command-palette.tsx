"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Clock, CornerDownLeft } from "lucide-react";
import { Dialog } from "@base-ui/react/dialog";

import { cn } from "../styles/cn";
import { seiLayer } from "../styles/layering";
import { seiOverlayVariants, seiPopupSurfaceVariants } from "../styles/variants";
import { type CommandGroup, type CommandItem } from "../types/behavior";
import { fuzzyMatch, highlightSegments } from "./fuzzy";
import { pushRecent } from "./recent";
import {
  fuzzyFilter,
  SEICommand,
  SEICommandGroup,
  SEICommandInput,
  SEICommandItem,
  SEICommandList,
  SEICommandShortcut,
} from "./sei-command";

/**
 * SEICommandPalette — global command palette preview.
 *
 * - Opens with Cmd+K (Mac) / Ctrl+K (Win/Linux) via a global key listener, or
 *   from any controlled trigger.
 * - Modal behavior (focus trap, Escape, outside-click, focus return) comes from
 *   Base UI Dialog. The search + grouped menu reuse the compositional SEICommand
 *   parts (React Aria `Autocomplete` + `Menu`), which provide keyboard
 *   navigation across groups via aria-activedescendant.
 * - Fuzzy subsequence search (see `fuzzy.ts`) with match highlighting; results
 *   are ranked by fuzzy score while you type.
 * - A "Recent Commands" section recalls recent selections (persisted to
 *   localStorage). Selecting a command only calls `onCommand`.
 */

const RECENT_KEY = "sei-lab:recent-commands";
const RECENT_CAP = 6;

/** The text React Aria filters/scores each item against. */
const itemText = (groupLabel: string, item: CommandItem) =>
  `${groupLabel} ${item.label} ${item.hint ?? ""}`;

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const { indices } = fuzzyMatch(text, query);
  if (indices.length === 0) return <>{text}</>;
  return (
    <>
      {highlightSegments(text, indices).map((seg, i) =>
        seg.highlight ? (
          <mark key={i} className="bg-transparent font-semibold text-[var(--sh-interactive-text)]">
            {seg.value}
          </mark>
        ) : (
          <span key={i}>{seg.value}</span>
        ),
      )}
    </>
  );
}

export interface SEICommandPaletteProps {
  groups?: CommandGroup[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  defaultRecentIds?: string[];
  /** Action handler — receives the selected command id. */
  onCommand?: (id: string) => void;
  className?: string;
}

export function SEICommandPalette({
  groups = [],
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  defaultRecentIds = [],
  onCommand,
  className,
}: SEICommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  const [query, setQuery] = useState("");
  const [recentIds, setRecentIds] = useState<string[]>(defaultRecentIds);

  const commandIndex = useMemo(
    () =>
      Object.fromEntries(
        groups.flatMap((group) =>
          group.items.map((item) => [item.id, { ...item, groupLabel: group.label }]),
        ),
      ) as Record<string, CommandItem & { groupLabel: string }>,
    [groups],
  );

  // Hydrate recent commands from localStorage (client-only).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(RECENT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        if (Array.isArray(parsed) && parsed.length) setRecentIds(parsed);
      }
    } catch {
      /* ignore storage errors */
    }
  }, []);

  // Global Cmd/Ctrl+K shortcut.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  const recentItems = useMemo(
    () => recentIds.map((id) => commandIndex[id]).filter(Boolean),
    [commandIndex, recentIds],
  );

  // Rank each group's items by fuzzy score while the user types. Scores are
  // precomputed once per item (O(N)) instead of recomputed inside the sort
  // comparator (O(N log N)) so typing stays responsive on large command sets.
  const rankedGroups = useMemo(() => {
    const q = query.trim();
    if (!q) return groups;
    return groups.map((group) => ({
      ...group,
      items: group.items
        .map((item) => ({ item, score: fuzzyMatch(itemText(group.label, item), q).score }))
        .sort((a, b) => b.score - a.score)
        .map(({ item }) => item),
    }));
  }, [groups, query]);

  const handleAction = useCallback(
    (id: string) => {
      const next = pushRecent(recentIds, id, RECENT_CAP);
      setRecentIds(next);
      try {
        window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      onCommand?.(id);
      setOpen(false);
    },
    [recentIds, onCommand, setOpen],
  );

  const showRecent = query.trim() === "" && recentItems.length > 0;

  const renderItem = (item: CommandItem, groupLabel: string) => (
    <SEICommandItem
      key={`${groupLabel}::${item.id}`}
      id={`${groupLabel}::${item.id}`}
      textValue={itemText(groupLabel, item)}
      className="group/cmd"
    >
      <item.icon aria-hidden="true" className="size-4 shrink-0 text-[var(--sh-color-mist)]" />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-medium">
          <HighlightedText text={item.label} query={query} />
        </span>
        {item.hint ? (
          <span className="truncate text-xs text-[var(--sh-color-mist)]">{item.hint}</span>
        ) : null}
      </span>
      {item.shortcut ? <SEICommandShortcut>{item.shortcut}</SEICommandShortcut> : null}
      <CornerDownLeft
        aria-hidden="true"
        className="size-3.5 shrink-0 text-[var(--sh-interactive-text)] opacity-0 group-data-[focused]/cmd:opacity-100"
      />
    </SEICommandItem>
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className={seiOverlayVariants({ tone: "heavy" })} />
        <Dialog.Popup
          className={cn(
            seiPopupSurfaceVariants({ tone: "default" }),
            "fixed left-1/2 top-[12vh] w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl",
            seiLayer.modal,
            "transition-[opacity,transform] duration-200 ease-out",
            "data-[starting-style]:-translate-y-2 data-[starting-style]:opacity-0",
            "data-[ending-style]:-translate-y-2 data-[ending-style]:opacity-0",
            "focus-visible:outline-none",
            className,
          )}
        >
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search and run mock commands. Use arrow keys to navigate, Enter to select, Escape to
            close.
          </Dialog.Description>

          <SEICommand
            surface={false}
            filter={fuzzyFilter}
            inputValue={query}
            onInputChange={setQuery}
          >
            <SEICommandInput autoFocus placeholder="Type a command or search…">
              <SEICommandShortcut className="hidden sm:block">ESC</SEICommandShortcut>
            </SEICommandInput>

            <SEICommandList
              className="max-h-[min(60vh,28rem)]"
              onAction={(key) => {
                const raw = String(key);
                handleAction(raw.includes("::") ? raw.slice(raw.indexOf("::") + 2) : raw);
              }}
              emptyMessage="No commands match. (Mock palette — nothing is executed.)"
            >
              {showRecent ? (
                <SEICommandGroup label="Recent Commands" icon={Clock}>
                  {recentItems.map((item) => renderItem(item, "Recent"))}
                </SEICommandGroup>
              ) : null}

              {rankedGroups.map((group) => (
                <SEICommandGroup key={group.id} label={group.label} icon={group.icon}>
                  {group.items.map((item) => renderItem(item, group.label))}
                </SEICommandGroup>
              ))}
            </SEICommandList>
          </SEICommand>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
