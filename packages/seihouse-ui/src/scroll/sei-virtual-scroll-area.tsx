"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type UIEvent,
} from "react";

import { cn } from "../styles/cn";
import { getScrollShadows } from "./sei-scroll-area";

const thinScrollbar = cn(
  "[scrollbar-width:thin]",
  "[&::-webkit-scrollbar]:w-2",
  "[&::-webkit-scrollbar-track]:bg-transparent",
  "[&::-webkit-scrollbar-thumb]:rounded-full",
  "[&::-webkit-scrollbar-thumb]:bg-white/15",
  "[&::-webkit-scrollbar-thumb:hover]:bg-white/25",
);

export interface VirtualRange {
  startIndex: number;
  endIndex: number;
  offsetTop: number;
  totalHeight: number;
}

/** Pure fixed-height virtual range resolver for tests and consumers. */
export function getVirtualRange(args: {
  itemCount: number;
  itemHeight: number;
  viewportHeight: number;
  scrollTop: number;
  overscan?: number;
}): VirtualRange {
  const { itemCount, itemHeight, viewportHeight, scrollTop, overscan = 4 } = args;
  const safeCount = Math.max(0, itemCount);
  const safeHeight = Math.max(1, itemHeight);
  const safeOverscan = Math.max(0, overscan);
  const totalHeight = safeCount * safeHeight;

  if (safeCount === 0) {
    return { startIndex: 0, endIndex: -1, offsetTop: 0, totalHeight: 0 };
  }

  const visibleStart = Math.floor(Math.max(0, scrollTop) / safeHeight);
  const visibleEnd = Math.ceil((Math.max(0, scrollTop) + Math.max(0, viewportHeight)) / safeHeight) - 1;
  const startIndex = Math.max(0, visibleStart - safeOverscan);
  const endIndex = Math.min(safeCount - 1, visibleEnd + safeOverscan);

  return {
    startIndex,
    endIndex,
    offsetTop: startIndex * safeHeight,
    totalHeight,
  };
}

export interface SEIVirtualScrollAreaProps<T>
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Items to virtualize. */
  items: readonly T[];
  /** Fixed row height in pixels. Keep this close to rendered item height. */
  itemHeight: number;
  /** Max height before the region scrolls (e.g. "24rem", "60vh"). */
  maxHeight?: string;
  /** Extra rows to render before and after the viewport. */
  overscan?: number;
  /** Accessible label for the scroll region. */
  label?: string;
  /** Alias for `label`. */
  "aria-label"?: string;
  /** Stable key resolver for each item. */
  getItemKey?: (item: T, index: number) => string | number;
  /** Render a single row. Rows are wrapped in a fixed-height container. */
  renderItem: (item: T, index: number) => ReactNode;
  /** Class applied to each fixed-height row wrapper. */
  itemClassName?: string;
}

/**
 * Virtualized vertical scroll region for long, fixed-height lists.
 *
 * `SEIScrollArea` remains the default general-purpose scroll container. Use
 * this component when large lists would otherwise render many offscreen rows.
 */
export function SEIVirtualScrollArea<T>({
  items,
  itemHeight,
  maxHeight = "20rem",
  overscan = 4,
  label,
  "aria-label": ariaLabel,
  getItemKey,
  renderItem,
  itemClassName,
  className,
  style,
  onScroll,
  ...props
}: SEIVirtualScrollAreaProps<T>) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [shadows, setShadows] = useState({ top: false, bottom: false });

  const range = useMemo(
    () => getVirtualRange({ itemCount: items.length, itemHeight, viewportHeight, scrollTop, overscan }),
    [items.length, itemHeight, overscan, scrollTop, viewportHeight],
  );

  const visibleItems = useMemo(
    () => items.slice(range.startIndex, range.endIndex + 1),
    [items, range.endIndex, range.startIndex],
  );

  const recomputeShadows = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    setShadows(
      getScrollShadows({
        scrollTop: el.scrollTop,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
      }),
    );
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const updateSize = () => {
      setViewportHeight(el.clientHeight);
      recomputeShadows();
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [recomputeShadows]);

  useEffect(() => {
    recomputeShadows();
  }, [range.totalHeight, recomputeShadows]);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    // Clamp scrollTop to valid range to handle dynamic list shrinking and fast scrolling
    const maxScrollTop = Math.max(0, el.scrollHeight - el.clientHeight);
    const clampedScrollTop = Math.min(Math.max(0, el.scrollTop), maxScrollTop);
    setScrollTop(clampedScrollTop);
    recomputeShadows();
    onScroll?.(event);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        data-visible={shadows.top || undefined}
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[var(--sh-scroll-shadow-size)] bg-[var(--sh-scroll-shadow-top)] opacity-0 transition-opacity duration-200 data-[visible]:opacity-100"
      />
      <div
        ref={viewportRef}
        role="region"
        aria-label={ariaLabel ?? label ?? "Virtualized scrollable content"}
        tabIndex={0}
        onScroll={handleScroll}
        className={cn(
          "overflow-y-auto overscroll-y-contain",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sh-color-black)]",
          thinScrollbar,
        )}
        style={{ maxHeight, ...style }}
        {...props}
      >
        <div style={{ height: range.totalHeight, position: "relative" }}>
          <div
            style={{
              left: 0,
              position: "absolute",
              right: 0,
              top: 0,
              transform: `translateY(${range.offsetTop}px)`,
            }}
          >
            {visibleItems.map((item, visibleIndex) => {
              const index = range.startIndex + visibleIndex;
              const key = getItemKey?.(item, index) ?? index;

              return (
                <div key={key} className={itemClassName} style={{ height: itemHeight }}>
                  {renderItem(item, index)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        data-visible={shadows.bottom || undefined}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[var(--sh-scroll-shadow-size)] bg-[var(--sh-scroll-shadow-bottom)] opacity-0 transition-opacity duration-200 data-[visible]:opacity-100"
      />
    </div>
  );
}
