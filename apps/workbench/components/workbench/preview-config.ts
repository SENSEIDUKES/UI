export const canvasOptions = ["dark", "light", "plain", "glass"] as const;
export type CanvasOption = (typeof canvasOptions)[number];

export const widthOptions = ["mobile", "tablet", "desktop"] as const;
export type WidthOption = (typeof widthOptions)[number];

export type ModeOption = "solo" | "variants" | "context";

export const canvasStyles: Record<CanvasOption, string> = {
  dark: "bg-[radial-gradient(circle_at_30%_15%,rgba(0,122,255,0.07),transparent_24rem),#0b0c10]",
  light: "bg-[#f7f6f1]",
  plain: "bg-[#15161a]",
  glass: "bg-[linear-gradient(135deg,rgba(0,122,255,0.16),rgba(255,107,53,0.10)),#0d0f14]",
};

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
