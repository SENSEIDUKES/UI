export const canvasOptions = ["dark", "light", "plain", "glass"] as const;
export type CanvasOption = (typeof canvasOptions)[number];

export const widthOptions = ["mobile", "tablet", "desktop"] as const;
export type WidthOption = (typeof widthOptions)[number];

export type ModeOption = "solo" | "variants" | "context";

export function canvasTheme(canvas: CanvasOption): "dark" | "light" {
  return canvas === "light" ? "light" : "dark";
}

export const viewportPresets: Record<
  WidthOption,
  { label: string; width: number; minimumHeight: number }
> = {
  mobile: { label: "Mobile", width: 375, minimumHeight: 667 },
  tablet: { label: "Tablet", width: 768, minimumHeight: 720 },
  desktop: { label: "Desktop", width: 1280, minimumHeight: 720 },
};

export function isCanvasOption(value: string | undefined): value is CanvasOption {
  return canvasOptions.some((option) => option === value);
}

/**
 * Canvas backgrounds read `--sh-atmosphere`, so the selected experience shapes
 * the ambient wash behind the component instead of a hard-coded gradient.
 */
export const canvasStyles: Record<CanvasOption, string> = {
  dark: "bg-[var(--sh-page-background)] [background-image:var(--sh-atmosphere)]",
  light: "bg-[var(--sh-page-background)]",
  plain: "bg-[var(--sh-surface)]",
  glass:
    "bg-[var(--sh-page-background)] [background-image:linear-gradient(135deg,var(--sh-color-sea-glow),var(--sh-color-accent-glow)),var(--sh-atmosphere)]",
};
