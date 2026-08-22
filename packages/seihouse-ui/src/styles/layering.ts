/**
 * SEIHOUSE-UI z-index layering scale (Phase 6).
 *
 * A single ordered stacking scale that every app, overlay, and portal shares,
 * so sticky regions, dropdowns, modals, popovers, and toasts never fight over
 * z-index. Mirrors the `--sh-z-*` custom properties in styles/tokens.css.
 *
 * - `SEI_Z_INDEX` — raw numeric values (for inline styles / portals).
 * - `seiLayer` — ready-to-use Tailwind class strings.
 */

export const SEI_Z_INDEX = {
  /** Default in-flow content. */
  base: 0,
  /** Slightly lifted content (hover cards, badges). */
  raised: 10,
  /** Sticky headers / toolbars within a scroll region. */
  sticky: 20,
  /** Anchored menus (combobox / select lists). */
  dropdown: 30,
  /** Full-screen scrims behind modal surfaces. */
  overlay: 40,
  /** Modal dialogs and drawers. */
  modal: 50,
  /** Popovers / tooltips that float above modals. */
  popover: 60,
  /** Transient toasts / notifications — always on top. */
  toast: 70,
} as const;

export type SEILayer = keyof typeof SEI_Z_INDEX;

/** Tailwind class for each layer (arbitrary values past the default scale). */
export const seiLayer = {
  base: "z-0",
  raised: "z-10",
  sticky: "z-20",
  dropdown: "z-30",
  overlay: "z-40",
  modal: "z-50",
  popover: "z-[60]",
  toast: "z-[70]",
} as const satisfies Record<SEILayer, string>;

/**
 * Semantic layers that must override a third-party inline z-index. Keep these
 * static so Tailwind emits the important utility in the production stylesheet.
 */
export const seiLayerImportant = {
  dropdown: "!z-30",
} as const;
