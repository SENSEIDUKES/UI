"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Library, Search, SlidersHorizontal } from "lucide-react";

import {
  componentRegistry,
  layerMeta,
  orderedLayers,
  statusMeta,
  type ReviewNotes,
  type WorkbenchComponentEntry,
} from "@/registry/component-registry";
import { getContextById } from "@/registry/context-registry";
import {
  SEIBadge,
  SEIDrawer,
  SEIDrawerBody,
  SEIDrawerContent,
  SEIDrawerDescription,
  SEIDrawerHeader,
  SEIDrawerTitle,
  SEIDrawerTrigger,
  cn,
} from "@seihouse/ui";

import { WorkbenchNav } from "./workbench-nav";
import {
  canvasOptions,
  viewportPresets,
  widthOptions,
  type CanvasOption,
  type ModeOption,
  type WidthOption,
} from "./preview-config";

/* ------------------------------------------------------------------ */
/* Workbench shell                                                      */
/* Left: searchable grouped component list.                             */
/* Center: one preview at a time on a controllable canvas.              */
/* Right: variant / mock data / canvas / width / mode / status / notes. */
/* ------------------------------------------------------------------ */

const noteFields: { key: keyof ReviewNotes; label: string; placeholder: string }[] = [
  { key: "whatWorks", label: "What works", placeholder: "What already feels right…" },
  { key: "whatFeelsWrong", label: "What feels wrong", placeholder: "What's off about it…" },
  { key: "changeRequest", label: "Change request", placeholder: "Change this: …" },
  { key: "founderVerdict", label: "Founder verdict", placeholder: "Keep / rework / kill…" },
];

const emptyNotes: ReviewNotes = {
  whatWorks: "",
  whatFeelsWrong: "",
  changeRequest: "",
  founderVerdict: "",
};

function notesStorageKey(slug: string) {
  return `sei-workbench-notes:${slug}`;
}

function ControlLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]">
      {children}
    </p>
  );
}

function SegButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)]",
        active
          ? "border-[rgba(0,122,255,0.45)] bg-[rgba(0,122,255,0.14)] text-white"
          : "border-white/10 bg-white/[0.03] text-[var(--sh-color-cloud)] hover:border-white/20 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

function DesignNotes({ slug }: { slug: string }) {
  const [notes, setNotes] = useState<ReviewNotes>(emptyNotes);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    try {
      const raw = window.localStorage.getItem(notesStorageKey(slug));
      setNotes(raw ? { ...emptyNotes, ...JSON.parse(raw) } : emptyNotes);
    } catch {
      setNotes(emptyNotes);
    }
    setLoaded(true);
  }, [slug]);

  const update = (key: keyof ReviewNotes, value: string) => {
    const next = { ...notes, [key]: value };
    setNotes(next);
    try {
      window.localStorage.setItem(notesStorageKey(slug), JSON.stringify(next));
    } catch {
      // localStorage unavailable — notes stay in-memory for the session.
    }
  };

  return (
    <div className="space-y-3">
      {noteFields.map((field) => (
        <div key={field.key}>
          <label
            htmlFor={`note-${slug}-${field.key}`}
            className="mb-1 block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]"
          >
            {field.label}
          </label>
          <textarea
            id={`note-${slug}-${field.key}`}
            rows={2}
            value={loaded ? notes[field.key] : ""}
            disabled={!loaded}
            onChange={(event) => update(field.key, event.target.value)}
            placeholder={field.placeholder}
            className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs leading-relaxed text-[var(--sh-color-ivory)] placeholder:text-[var(--sh-color-mist)]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)] disabled:opacity-50"
          />
        </div>
      ))}
      <p className="text-[0.62rem] text-[var(--sh-color-mist)]">Saved locally in this browser.</p>
    </div>
  );
}

function Sidebar({ activeSlug, onSelect }: { activeSlug: string; onSelect?: () => void }) {
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filteredEntries = q
      ? componentRegistry.filter(
          (entry) =>
            entry.name.toLowerCase().includes(q) ||
            entry.category.toLowerCase().includes(q) ||
            entry.slug.includes(q),
        )
      : componentRegistry;

    return orderedLayers
      .map((layer) => ({
        layer,
        entries: filteredEntries.filter((entry) => entry.layer === layer),
      }))
      .filter((group) => group.entries.length > 0);
  }, [query]);

  return (
    <nav aria-label="Components" className="flex h-full flex-col gap-4">
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[var(--sh-color-mist)]"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search components…"
          aria-label="Search components"
          className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-xs text-[var(--sh-color-ivory)] placeholder:text-[var(--sh-color-mist)]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)]"
        />
      </div>

      <div className="space-y-5 overflow-y-auto pb-6">
        {grouped.length === 0 ? (
          <p className="px-1 text-xs text-[var(--sh-color-mist)]">No components match.</p>
        ) : null}
        {grouped.map((group) => (
          <div key={group.layer}>
            <p className="mb-1.5 px-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]">
              {layerMeta[group.layer].label}
            </p>
            <ul className="space-y-0.5">
              {group.entries.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={`/workbench/${entry.slug}`}
                    onClick={onSelect}
                    aria-current={entry.slug === activeSlug ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors",
                      entry.slug === activeSlug
                        ? "bg-white/[0.07] font-semibold text-white"
                        : "text-[var(--sh-color-cloud)] hover:bg-white/[0.04] hover:text-white",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn("size-1.5 shrink-0 rounded-full", statusMeta[entry.status].dot)}
                    />
                    <span className="truncate">{entry.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

interface ControlsProps {
  entry: WorkbenchComponentEntry;
  status: (typeof statusMeta)[WorkbenchComponentEntry["status"]];
  variant: string;
  mockIndex: number;
  canvas: CanvasOption;
  width: WidthOption;
  mode: ModeOption;
  setVariant: (value: string) => void;
  setMockIndex: (value: number) => void;
  setCanvas: (value: CanvasOption) => void;
  setWidth: (value: WidthOption) => void;
  setMode: (value: ModeOption) => void;
}

function Controls({
  entry,
  status,
  variant,
  mockIndex,
  canvas,
  width,
  mode,
  setVariant,
  setMockIndex,
  setCanvas,
  setWidth,
  setMode,
}: ControlsProps) {
  return (
    <div className="space-y-5">
      <div>
        <ControlLabel>Mode</ControlLabel>
        <div className="flex flex-wrap gap-1.5">
          {(["solo", "variants", "context"] as const).map((option) => (
            <SegButton key={option} active={mode === option} onClick={() => setMode(option)}>
              {option}
            </SegButton>
          ))}
        </div>
      </div>

      <div>
        <ControlLabel>Variant</ControlLabel>
        <div className="flex flex-wrap gap-1.5">
          {entry.variants.map((option) => (
            <SegButton key={option} active={variant === option} onClick={() => setVariant(option)}>
              {option}
            </SegButton>
          ))}
        </div>
      </div>

      {entry.mockDataOptions?.length ? (
        <div>
          <ControlLabel>Mock data</ControlLabel>
          <div className="flex flex-wrap gap-1.5">
            {entry.mockDataOptions.map((option, index) => (
              <SegButton
                key={option.id}
                active={mockIndex === index}
                onClick={() => setMockIndex(index)}
              >
                {option.label}
              </SegButton>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <ControlLabel>Canvas</ControlLabel>
        <div className="flex flex-wrap gap-1.5">
          {canvasOptions.map((option) => (
            <SegButton key={option} active={canvas === option} onClick={() => setCanvas(option)}>
              {option}
            </SegButton>
          ))}
        </div>
      </div>

      <div>
        <ControlLabel>Width</ControlLabel>
        <div className="flex flex-wrap gap-1.5">
          {widthOptions.map((option) => (
            <SegButton key={option} active={width === option} onClick={() => setWidth(option)}>
              {viewportPresets[option].label}
            </SegButton>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 pt-4">
        <ControlLabel>Status</ControlLabel>
        <SEIBadge variant={status.badge} size="sm">
          {status.label}
        </SEIBadge>
      </div>

      <div className="border-t border-white/10 pt-4">
        <ControlLabel>Design notes</ControlLabel>
        <DesignNotes slug={entry.slug} />
      </div>
    </div>
  );
}

interface PreviewFrameProps {
  entry: WorkbenchComponentEntry;
  variant: string;
  mockIndex: number;
  canvas: CanvasOption;
  width: WidthOption;
  contextId?: string;
  title?: string;
}

function PreviewFrame({
  entry,
  variant,
  mockIndex,
  canvas,
  width,
  contextId,
  title,
}: PreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previewId = useId().replaceAll(":", "");
  const preset = viewportPresets[width];
  const [height, setHeight] = useState(preset.minimumHeight);

  const src = useMemo(() => {
    const query = new URLSearchParams({
      canvas,
      mockIndex: String(mockIndex),
      previewId,
      variant,
    });
    if (contextId) query.set("contextId", contextId);
    return `/workbench/preview/${entry.slug}?${query.toString()}`;
  }, [canvas, contextId, entry.slug, mockIndex, previewId, variant]);

  useEffect(() => {
    setHeight(preset.minimumHeight);
  }, [preset.minimumHeight, src]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== iframeRef.current?.contentWindow
      ) {
        return;
      }

      const message = event.data as {
        source?: string;
        previewId?: string;
        height?: unknown;
      };
      if (
        message.source !== "sei-workbench-preview" ||
        message.previewId !== previewId ||
        typeof message.height !== "number"
      ) {
        return;
      }

      setHeight(Math.max(preset.minimumHeight, Math.ceil(message.height)));
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [preset.minimumHeight, previewId]);

  return (
    <div className="w-max max-w-none">
      <div className="mb-2 flex items-baseline justify-between gap-3 px-1">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--sh-color-mist)]">
          {title ?? preset.label}
        </span>
        <span className="font-mono text-[0.65rem] text-[var(--sh-color-mist)]">
          {preset.width}px viewport
        </span>
      </div>
      <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0b0c10] shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
        <iframe
          ref={iframeRef}
          data-testid="component-preview-frame"
          title={`${entry.name} — ${title ?? preset.label} preview`}
          src={src}
          className="block max-w-none bg-transparent"
          style={{ width: preset.width, height }}
        />
      </div>
    </div>
  );
}

function PreviewArea({
  entry,
  variant,
  mockIndex,
  canvas,
  width,
  mode,
}: {
  entry: WorkbenchComponentEntry;
  variant: string;
  mockIndex: number;
  canvas: CanvasOption;
  width: WidthOption;
  mode: ModeOption;
}) {
  if (mode === "context") {
    const contexts = entry.contextExamples
      .map((id) => getContextById(id))
      .filter((ctx): ctx is NonNullable<typeof ctx> => Boolean(ctx));

    if (contexts.length === 0) {
      return (
        <div className="grid min-h-48 place-items-center rounded-[1.35rem] border border-dashed border-white/12 text-sm text-[var(--sh-color-mist)]">
          No context examples yet for this component.
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {contexts.map((ctx) => {
          return (
            <section key={ctx.id}>
              <div className="mb-2 flex flex-wrap items-baseline gap-2">
                <h3 className="text-sm font-semibold text-white">{ctx.name}</h3>
                <p className="text-xs text-[var(--sh-color-mist)]">{ctx.description}</p>
              </div>
              <PreviewFrame
                entry={entry}
                variant={variant}
                mockIndex={mockIndex}
                canvas={canvas}
                width={width}
                contextId={ctx.id}
                title={ctx.name}
              />
            </section>
          );
        })}
      </div>
    );
  }

  if (mode === "variants") {
    return (
      <div className="space-y-4">
        {entry.variants.map((v) => (
          <section key={v}>
            <PreviewFrame
              entry={entry}
              variant={v}
              mockIndex={mockIndex}
              canvas={canvas}
              width={width}
              title={v}
            />
          </section>
        ))}
      </div>
    );
  }

  return (
    <PreviewFrame
      entry={entry}
      variant={variant}
      mockIndex={mockIndex}
      canvas={canvas}
      width={width}
    />
  );
}

export function WorkbenchShell({ activeSlug }: { activeSlug?: string }) {
  const entry =
    componentRegistry.find((candidate) => candidate.slug === activeSlug) ?? componentRegistry[0];

  const [variant, setVariant] = useState(entry.defaultVariant);
  const [mockIndex, setMockIndex] = useState(0);
  const [canvas, setCanvas] = useState<CanvasOption>("dark");
  const [width, setWidth] = useState<WidthOption>("desktop");
  const [mode, setMode] = useState<ModeOption>("solo");
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false);

  // Reset per-component controls when navigating between components.
  useEffect(() => {
    setVariant(entry.defaultVariant);
    setMockIndex(0);
    setMode("solo");
  }, [entry.slug, entry.defaultVariant]);

  const status = statusMeta[entry.status];

  return (
    <div
      data-theme="dark"
      className="min-h-screen overflow-x-hidden bg-[var(--sh-page-background)] text-[var(--sh-text-primary)]"
    >
      <WorkbenchNav current="/workbench" />
      <div className="mx-auto grid w-full max-w-[100rem] gap-6 px-5 py-6 lg:grid-cols-[14rem_minmax(0,1fr)_16rem]">
        <aside
          data-testid="desktop-component-catalog"
          className="hidden lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-5rem)]"
        >
          <Sidebar activeSlug={entry.slug} />
        </aside>

        <main data-testid="workbench-preview" className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-semibold tracking-[-0.03em] text-white">{entry.name}</h1>
            <SEIBadge variant={status.badge} size="sm">
              {status.label}
            </SEIBadge>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--sh-color-mist)]">
              {layerMeta[entry.layer].label} · {entry.category}
            </span>
          </div>
          <p className="mb-5 max-w-2xl text-sm leading-relaxed text-[var(--sh-color-cloud)]">
            {entry.description}
          </p>

          <div className="mb-4 grid grid-cols-2 gap-2 lg:hidden">
            <SEIDrawer open={catalogOpen} onOpenChange={setCatalogOpen}>
              <SEIDrawerTrigger className="flex min-w-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)]">
                <Library aria-hidden="true" className="size-4 shrink-0" />
                <span className="truncate">Components</span>
              </SEIDrawerTrigger>
              <SEIDrawerContent side="left" size="compact" tone="dark">
                <SEIDrawerHeader>
                  <SEIDrawerTitle>Browse components</SEIDrawerTitle>
                  <SEIDrawerDescription>
                    Search the catalog and choose a component to preview.
                  </SEIDrawerDescription>
                </SEIDrawerHeader>
                <SEIDrawerBody className="min-h-0">
                  <Sidebar activeSlug={entry.slug} onSelect={() => setCatalogOpen(false)} />
                </SEIDrawerBody>
              </SEIDrawerContent>
            </SEIDrawer>

            <SEIDrawer open={controlsOpen} onOpenChange={setControlsOpen}>
              <SEIDrawerTrigger className="flex min-w-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)]">
                <SlidersHorizontal aria-hidden="true" className="size-4 shrink-0" />
                <span className="truncate">Controls</span>
              </SEIDrawerTrigger>
              <SEIDrawerContent side="bottom" tone="dark">
                <SEIDrawerHeader>
                  <SEIDrawerTitle>Component controls</SEIDrawerTitle>
                  <SEIDrawerDescription>
                    Adjust the preview and save design notes for {entry.name}.
                  </SEIDrawerDescription>
                </SEIDrawerHeader>
                <SEIDrawerBody>
                  <Controls
                    entry={entry}
                    status={status}
                    variant={variant}
                    mockIndex={mockIndex}
                    canvas={canvas}
                    width={width}
                    mode={mode}
                    setVariant={setVariant}
                    setMockIndex={setMockIndex}
                    setCanvas={setCanvas}
                    setWidth={setWidth}
                    setMode={setMode}
                  />
                </SEIDrawerBody>
              </SEIDrawerContent>
            </SEIDrawer>
          </div>

          <div data-testid="component-preview-canvas" className="min-w-0 overflow-x-auto">
            <PreviewArea
              entry={entry}
              variant={variant}
              mockIndex={mockIndex}
              canvas={canvas}
              width={width}
              mode={mode}
            />
          </div>
        </main>

        <aside
          data-testid="desktop-component-controls"
          className="hidden lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-5rem)] lg:overflow-y-auto lg:pb-10"
        >
          <Controls
            entry={entry}
            status={status}
            variant={variant}
            mockIndex={mockIndex}
            canvas={canvas}
            width={width}
            mode={mode}
            setVariant={setVariant}
            setMockIndex={setMockIndex}
            setCanvas={setCanvas}
            setWidth={setWidth}
            setMode={setMode}
          />
        </aside>
      </div>
    </div>
  );
}
