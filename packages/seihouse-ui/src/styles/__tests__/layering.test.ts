import { describe, expect, it } from "vitest";

import { SEI_Z_INDEX, seiLayer, seiLayerImportant, type SEILayer } from "../layering";

const ORDER: SEILayer[] = [
  "base",
  "raised",
  "sticky",
  "dropdown",
  "overlay",
  "modal",
  "popover",
  "toast",
];

describe("layering scale", () => {
  it("exposes a class string for every numeric layer", () => {
    expect(Object.keys(seiLayer).sort()).toEqual(Object.keys(SEI_Z_INDEX).sort());
  });

  it("is strictly increasing from base to toast", () => {
    const values = ORDER.map((layer) => SEI_Z_INDEX[layer]);
    const sorted = [...values].sort((a, b) => a - b);
    expect(values).toEqual(sorted);
    // no duplicate stacking levels
    expect(new Set(values).size).toBe(values.length);
  });

  it("keeps overlays below modals below popovers below toasts", () => {
    expect(SEI_Z_INDEX.overlay).toBeLessThan(SEI_Z_INDEX.modal);
    expect(SEI_Z_INDEX.modal).toBeLessThan(SEI_Z_INDEX.popover);
    expect(SEI_Z_INDEX.popover).toBeLessThan(SEI_Z_INDEX.toast);
  });

  it("maps overlay to the z-40 class used by the shared scrim", () => {
    expect(seiLayer.overlay).toBe("z-40");
    expect(seiLayerImportant.dropdown).toBe("!z-30");
  });
});
