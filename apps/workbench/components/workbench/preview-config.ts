export const canvasOptions = ["dark", "light", "plain", "glass"] as const;
export type CanvasOption = (typeof canvasOptions)[number];

export const widthOptions = ["mobile", "tablet", "desktop"] as const;
export type WidthOption = (typeof widthOptions)[number];

export type ModeOption = "solo" | "variants" | "context";

export const canvasStyles: Record<CanvasOption, string> = {
  dark: "bg-[radial-gradient(circle_at_30%_15%,rgba(0,104,209,0.09),transparent_24rem),var(--sh-page-background)]",
  light: "bg-[var(--sh-page-background)]",
  plain: "bg-[var(--sh-surface)]",
  glass:
    "bg-[linear-gradient(135deg,rgba(0,104,209,0.18),rgba(255,107,53,0.12)),var(--sh-page-background)]",
};

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
