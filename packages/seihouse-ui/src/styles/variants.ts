import { tv, type VariantProps } from "tailwind-variants";

import { seiLayer } from "./layering";

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-transparent focus-visible:ring-2 focus-visible:ring-[var(--sh-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sh-focus-offset)]";

export const transitionSurface =
  "transition-[background,border-color,box-shadow,color,opacity,transform] duration-200 ease-out";

/**
 * Shared interaction-state class set (Phase 6).
 *
 * One consistent expression of the standard interaction states so every
 * interactive surface (buttons, list items, toggles, cards) reads the same:
 * hover lift / glow, pressed settle, focus-visible ring, disabled dim, and a
 * busy/loading affordance. Compose with `cn(...)`; pair with `transitionSurface`.
 */
export const interactionStates = [
  focusRing,
  "hover:border-[var(--sh-interactive-selected-border)] hover:bg-[var(--sh-interactive-surface-hover)]",
  "active:translate-y-px active:bg-[var(--sh-interactive-surface-active)]",
  "disabled:pointer-events-none disabled:opacity-45",
  "aria-disabled:pointer-events-none aria-disabled:opacity-45",
  "data-[selected=true]:border-[var(--sh-interactive-selected-border)] data-[selected=true]:bg-[var(--sh-interactive-selected)] data-[selected=true]:text-[var(--sh-interactive-selected-text)]",
  "aria-busy:cursor-progress",
].join(" ");

export const seiButtonVariants = tv({
  base: [
    "inline-flex touch-manipulation items-center justify-center gap-2 whitespace-nowrap rounded-full",
    "font-semibold leading-none tracking-[-0.01em]",
    "disabled:pointer-events-none disabled:opacity-45",
    "data-[icon-only=true]:aspect-square data-[icon-only=true]:px-0",
    "motion-reduce:hover:translate-y-0 motion-reduce:active:translate-y-0",
    focusRing,
    transitionSurface,
  ],
  variants: {
    variant: {
      default:
        "border border-[var(--sh-border)] bg-[var(--sh-text-primary)] text-[var(--sh-page-background)] shadow-[0_16px_40px_rgba(0,0,0,0.16)] hover:-translate-y-0.5 hover:opacity-90",
      soft: "border border-[var(--sh-interactive-selected-border)] bg-[var(--sh-interactive-selected)] text-[var(--sh-interactive-selected-text)] hover:-translate-y-0.5 hover:bg-[var(--sh-interactive-selected-hover)]",
      outline:
        "border border-[var(--sh-border-strong)] bg-transparent text-[var(--sh-text-primary)] hover:-translate-y-0.5 hover:bg-[var(--sh-interactive-surface-hover)]",
      ghost:
        "border border-transparent bg-transparent text-[var(--sh-text-muted)] hover:bg-[var(--sh-interactive-surface-hover)] hover:text-[var(--sh-text-primary)]",
      solid:
        "border border-[var(--sh-interactive-primary-hover)] bg-[var(--sh-interactive-primary)] text-[var(--sh-interactive-on-primary)] shadow-[0_16px_38px_rgba(0,104,209,0.24)] hover:-translate-y-0.5 hover:bg-[var(--sh-interactive-primary-hover)]",
      dark: "sh-theme-dark border border-[var(--sh-border)] bg-[#08090d] text-[var(--sh-text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-0.5 hover:border-[var(--sh-border-strong)] hover:bg-[#10131a]",
      light:
        "sh-theme-light border border-[var(--sh-border)] bg-[var(--sh-surface)] text-[var(--sh-text-primary)] shadow-[0_18px_42px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 hover:bg-[var(--sh-surface-elevated)]",
      "glass-test":
        "sh-theme-dark border border-[var(--sh-border-strong)] bg-white/[0.075] text-[var(--sh-text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.11)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-white/[0.12]",
      "media-test":
        "sh-theme-dark border border-[var(--sh-border)] bg-[linear-gradient(135deg,rgba(0,104,209,0.32),rgba(255,107,53,0.18)),#10131a] text-[var(--sh-text-primary)] shadow-[0_18px_50px_rgba(0,104,209,0.12)] hover:-translate-y-0.5 hover:border-[var(--sh-border-strong)]",
    },
    size: {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    fullWidth: false,
  },
});

export const seiBadgeVariants = tv({
  base: [
    "inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border",
    "font-bold uppercase tracking-[0.12em] leading-none",
    transitionSurface,
  ],
  variants: {
    variant: {
      default:
        "border-[var(--sh-border)] bg-[var(--sh-interactive-surface)] text-[var(--sh-text-muted)]",
      soft: "border-[var(--sh-interactive-selected-border)] bg-[var(--sh-interactive-selected)] text-[var(--sh-interactive-selected-text)]",
      outline: "border-[var(--sh-border-strong)] bg-transparent text-[var(--sh-text-muted)]",
      ghost: "border-transparent bg-transparent text-[var(--sh-text-subtle)]",
      solid:
        "border-[var(--sh-interactive-primary-hover)] bg-[var(--sh-interactive-primary)] text-[var(--sh-interactive-on-primary)]",
      dark: "sh-theme-dark border-[var(--sh-border)] bg-[#07080c] text-[var(--sh-text-primary)]",
      light:
        "sh-theme-light border-[var(--sh-border)] bg-[var(--sh-surface)] text-[var(--sh-text-primary)]",
      "glass-test":
        "sh-theme-dark border-[var(--sh-border)] bg-[rgba(18,20,26,0.88)] text-[var(--sh-text-primary)] backdrop-blur-xl",
      "media-test":
        "sh-theme-dark border-[var(--sh-status-accent-border)] bg-[var(--sh-status-accent-bg)] text-[var(--sh-status-accent-text)]",
      success:
        "border-[var(--sh-status-success-border)] bg-[var(--sh-status-success-bg)] text-[var(--sh-status-success-text)]",
      warning:
        "border-[var(--sh-status-warning-border)] bg-[var(--sh-status-warning-bg)] text-[var(--sh-status-warning-text)]",
      danger:
        "border-[var(--sh-status-danger-border)] bg-[var(--sh-status-danger-bg)] text-[var(--sh-status-danger-text)]",
      registry:
        "border-[var(--sh-border-strong)] bg-[var(--sh-interactive-surface)] text-[var(--sh-text-primary)]",
    },
    size: {
      sm: "min-h-6 px-2 text-[0.625rem]",
      md: "min-h-7 px-2.5 text-[0.6875rem]",
      lg: "min-h-8 px-3 text-xs",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export const seiPanelVariants = tv({
  base: [
    "relative overflow-hidden rounded-[1.35rem] border",
    "shadow-[0_24px_70px_rgba(0,0,0,0.22)]",
    transitionSurface,
  ],
  variants: {
    variant: {
      default: "border-[var(--sh-border)] bg-[var(--sh-surface)] text-[var(--sh-text-primary)]",
      soft: "border-[var(--sh-interactive-selected-border)] bg-[var(--sh-interactive-selected)] text-[var(--sh-interactive-selected-text)]",
      outline: "border-[var(--sh-border-strong)] bg-transparent text-[var(--sh-text-primary)]",
      ghost: "border-transparent bg-transparent shadow-none text-[var(--sh-text-primary)]",
      solid:
        "border-[var(--sh-interactive-selected-border)] bg-[var(--sh-interactive-selected)] text-[var(--sh-interactive-selected-text)]",
      dark: "sh-theme-dark border-[var(--sh-border)] bg-[#07080c] text-[var(--sh-text-primary)] shadow-[0_28px_80px_rgba(0,0,0,0.34)]",
      light:
        "sh-theme-light border-[var(--sh-border)] bg-[var(--sh-surface)] text-[var(--sh-text-primary)] shadow-[0_24px_70px_rgba(0,0,0,0.16)]",
      glass: [
        "sh-theme-dark border-[var(--sh-glass-border)] text-[var(--sh-text-primary)]",
        "bg-[linear-gradient(165deg,rgba(255,255,255,0.075),rgba(255,255,255,0.018)_42%),rgba(12,14,20,0.62)]",
        "backdrop-blur-[var(--sh-blur-md)] backdrop-saturate-150",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_0_0_1px_rgba(255,255,255,0.03),0_24px_70px_rgba(0,0,0,0.34)]",
      ].join(" "),
      "glass-test":
        "sh-theme-dark border-[var(--sh-border)] bg-[rgba(18,20,26,0.84)] text-[var(--sh-text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl",
      "media-test":
        "sh-theme-dark border-[var(--sh-border)] bg-[radial-gradient(circle_at_18%_0%,rgba(0,104,209,0.22),transparent_30rem),radial-gradient(circle_at_88%_18%,rgba(255,107,53,0.16),transparent_24rem),rgba(12,14,20,0.96)] text-[var(--sh-text-primary)]",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-5 sm:p-6",
      lg: "p-6 sm:p-8",
    },
    interactive: {
      true: "hover:-translate-y-1 hover:border-[rgba(0,122,255,0.32)] hover:shadow-[0_32px_90px_rgba(0,0,0,0.34),0_0_38px_rgba(0,122,255,0.08)]",
      false: "",
    },
    /** Optional gentle rim light — pairs with the glass variant. */
    glow: {
      true: "drop-shadow-[0_0_30px_rgba(0,122,255,0.12)]",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
    interactive: false,
    glow: false,
  },
});

export const seiCardVariants = tv({
  base: [
    "group relative overflow-hidden rounded-[1.35rem] border",
    "shadow-[0_22px_62px_rgba(0,0,0,0.24)]",
    transitionSurface,
  ],
  variants: {
    variant: {
      default: "border-[var(--sh-border)] bg-[var(--sh-surface)] text-[var(--sh-text-primary)]",
      soft: "border-[var(--sh-interactive-selected-border)] bg-[var(--sh-interactive-selected)] text-[var(--sh-interactive-selected-text)]",
      outline: "border-[var(--sh-border-strong)] bg-transparent text-[var(--sh-text-primary)]",
      ghost: "border-transparent bg-transparent shadow-none text-[var(--sh-text-primary)]",
      solid:
        "border-[var(--sh-interactive-selected-border)] bg-[var(--sh-interactive-selected)] text-[var(--sh-interactive-selected-text)]",
      dark: "sh-theme-dark border-[var(--sh-border)] bg-[#07080c] text-[var(--sh-text-primary)]",
      light:
        "sh-theme-light border-[var(--sh-border)] bg-[var(--sh-surface)] text-[var(--sh-text-primary)] shadow-[0_22px_62px_rgba(0,0,0,0.12)]",
      "glass-test":
        "sh-theme-dark border-[var(--sh-border)] bg-[rgba(18,20,26,0.84)] text-[var(--sh-text-primary)] backdrop-blur-2xl",
      "media-test":
        "sh-theme-dark border-[var(--sh-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025)),rgba(10,12,18,0.96)] text-[var(--sh-text-primary)]",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-5",
      lg: "p-6",
    },
    elevateOnHover: {
      true: "hover:-translate-y-1 hover:border-[rgba(0,122,255,0.3)] hover:shadow-[0_30px_84px_rgba(0,0,0,0.34)] motion-reduce:hover:translate-y-0",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
    elevateOnHover: false,
  },
});

export const seiSectionVariants = tv({
  base: "relative mx-auto w-full max-w-7xl",
  variants: {
    spacing: {
      sm: "py-8",
      md: "py-12",
      lg: "py-16 sm:py-20",
    },
  },
  defaultVariants: {
    spacing: "lg",
  },
});

export const registrySealVariants = tv({
  base: [
    "relative inline-flex items-center gap-3 rounded-full border px-3 py-2",
    "font-semibold leading-none",
    transitionSurface,
  ],
  variants: {
    status: {
      draft:
        "border-[var(--sh-border)] bg-[var(--sh-interactive-surface)] text-[var(--sh-text-muted)]",
      registered:
        "border-[var(--sh-interactive-selected-border)] bg-[var(--sh-interactive-selected)] text-[var(--sh-interactive-selected-text)]",
      verified:
        "border-[var(--sh-status-success-border)] bg-[var(--sh-status-success-bg)] text-[var(--sh-status-success-text)]",
      archived:
        "border-[var(--sh-border)] bg-[var(--sh-interactive-surface)] text-[var(--sh-text-muted)] opacity-85",
      experimental:
        "border-[var(--sh-status-accent-border)] bg-[var(--sh-status-accent-bg)] text-[var(--sh-status-accent-text)]",
    },
    compact: {
      true: "px-2.5 py-1.5 text-xs",
      false: "text-sm",
    },
  },
  defaultVariants: {
    status: "draft",
    compact: false,
  },
});

/* ------------------------------------------------------------------ */
/* Phase 4 — promoted shared behavior variants                         */
/* These patterns were stable across the Phase 3 behavior components    */
/* (dialog / drawer / popover / command) and are now shared. Component- */
/* specific styling (drawer side/size, tabs indicator) stays local.     */
/* ------------------------------------------------------------------ */

/** Modal/drawer scrim shared by dialog, drawer, and the command palette. */
export const seiOverlayVariants = tv({
  base: [
    `fixed inset-0 ${seiLayer.overlay} bg-[var(--sh-overlay)] backdrop-blur-sm`,
    "transition-opacity duration-200 ease-out",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
  ],
  variants: {
    tone: {
      default: "",
      heavy: "bg-[var(--sh-overlay-strong)]",
      soft: "bg-[var(--sh-overlay-soft)]",
    },
  },
  defaultVariants: { tone: "default" },
});

/** Floating surface tone map shared by dialog, popover, and palette popups. */
export const seiPopupSurfaceVariants = tv({
  base: "border shadow-[0_30px_90px_rgba(0,0,0,0.5)]",
  variants: {
    tone: {
      default:
        "border-[var(--sh-border)] bg-[var(--sh-surface-elevated)] text-[var(--sh-text-primary)] backdrop-blur-xl",
      soft: "border-[var(--sh-interactive-selected-border)] bg-[var(--sh-surface-elevated)] text-[var(--sh-text-primary)] backdrop-blur-xl",
      dark: "sh-theme-dark border-[var(--sh-border)] bg-[#07080c] text-[var(--sh-text-primary)]",
      light:
        "sh-theme-light border-[var(--sh-border)] bg-[var(--sh-surface)] text-[var(--sh-text-primary)]",
      "glass-test":
        "sh-theme-dark border-[var(--sh-border-strong)] bg-[rgba(18,20,26,0.9)] text-[var(--sh-text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl",
    },
  },
  defaultVariants: { tone: "default" },
});

/** Focused/selected item states shared by menus, comboboxes, and commands. */
export const seiInteractiveItemVariants = tv({
  base: [
    "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm outline-none",
    "text-[var(--sh-text-muted)]",
    "data-[focused]:bg-[var(--sh-interactive-surface-hover)] data-[focused]:text-[var(--sh-text-primary)]",
    "data-[hovered]:bg-[var(--sh-interactive-surface)]",
    "data-[selected]:text-[var(--sh-text-primary)]",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40",
  ],
});

/** Section header style for grouped menus / command palettes. */
export const seiCommandGroupHeader =
  "flex items-center gap-2 px-3 pb-1 pt-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--sh-text-subtle)]";

export type SEIButtonVariantProps = VariantProps<typeof seiButtonVariants>;
export type SEIBadgeVariantProps = VariantProps<typeof seiBadgeVariants>;
export type SEIPanelVariantProps = VariantProps<typeof seiPanelVariants>;
export type SEICardVariantProps = VariantProps<typeof seiCardVariants>;
export type SEISectionVariantProps = VariantProps<typeof seiSectionVariants>;
export type RegistrySealVariantProps = VariantProps<typeof registrySealVariants>;
export type SEIOverlayVariantProps = VariantProps<typeof seiOverlayVariants>;
export type SEIPopupSurfaceVariantProps = VariantProps<typeof seiPopupSurfaceVariants>;
