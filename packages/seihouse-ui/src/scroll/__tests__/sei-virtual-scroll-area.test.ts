import { describe, expect, it } from "vitest";

import { getVirtualRange } from "../sei-virtual-scroll-area";

describe("getVirtualRange", () => {
  it("calculates basic range with defaults", () => {
    // 100 items, 20px height = 2000px total height
    // viewport 200px = 10 visible items (200 / 20)
    // scrolled to top
    // default overscan is 4
    const result = getVirtualRange({
      itemCount: 100,
      itemHeight: 20,
      viewportHeight: 200,
      scrollTop: 0,
    });

    expect(result).toEqual({
      startIndex: 0, // Math.max(0, 0 - 4) = 0
      endIndex: 13, // Math.min(99, 9 + 4) = 13 (visibleEnd is 9 since 200/20 = 10 items, minus 1 = 9)
      offsetTop: 0, // startIndex(0) * itemHeight(20)
      totalHeight: 2000,
    });
  });

  it("calculates correct range when scrolled to middle", () => {
    // viewport 200px, 10 visible items
    // scrolled 400px (20 items down)
    const result = getVirtualRange({
      itemCount: 100,
      itemHeight: 20,
      viewportHeight: 200,
      scrollTop: 400,
    });

    // visible start = 400 / 20 = 20
    // visible end = ceil( (400 + 200)/20 ) - 1 = 30 - 1 = 29
    // overscan = 4
    // startIndex = 20 - 4 = 16
    // endIndex = 29 + 4 = 33
    expect(result).toEqual({
      startIndex: 16,
      endIndex: 33,
      offsetTop: 320, // 16 * 20
      totalHeight: 2000,
    });
  });

  it("clamps at the end of the list", () => {
    // 100 items, 20px each = 2000px
    // viewport 200px
    // scrolled to 1800px (bottom)
    const result = getVirtualRange({
      itemCount: 100,
      itemHeight: 20,
      viewportHeight: 200,
      scrollTop: 1800,
    });

    // visible start = 1800 / 20 = 90
    // visible end = ceil((1800 + 200)/20) - 1 = 100 - 1 = 99
    // overscan = 4
    // startIndex = max(0, 90 - 4) = 86
    // endIndex = min(99, 99 + 4) = 99
    expect(result).toEqual({
      startIndex: 86,
      endIndex: 99,
      offsetTop: 1720, // 86 * 20
      totalHeight: 2000,
    });
  });

  it("handles zero items gracefully", () => {
    const result = getVirtualRange({
      itemCount: 0,
      itemHeight: 20,
      viewportHeight: 200,
      scrollTop: 0,
    });

    expect(result).toEqual({
      startIndex: 0,
      endIndex: -1,
      offsetTop: 0,
      totalHeight: 0,
    });
  });

  it("handles custom overscan", () => {
    const result = getVirtualRange({
      itemCount: 100,
      itemHeight: 20,
      viewportHeight: 200,
      scrollTop: 400,
      overscan: 2, // reduced overscan
    });

    // visible start = 20
    // visible end = 29
    // startIndex = 20 - 2 = 18
    // endIndex = 29 + 2 = 31
    expect(result).toEqual({
      startIndex: 18,
      endIndex: 31,
      offsetTop: 360,
      totalHeight: 2000,
    });
  });

  it("handles negative values defensively", () => {
    const result = getVirtualRange({
      itemCount: -5,
      itemHeight: -10,
      viewportHeight: -200,
      scrollTop: -400,
      overscan: -2,
    });

    // safeCount = max(0, -5) = 0
    // returns empty list state for 0 items
    expect(result).toEqual({
      startIndex: 0,
      endIndex: -1,
      offsetTop: 0,
      totalHeight: 0,
    });
  });

  it("handles negative constraints with positive items defensively", () => {
    const result = getVirtualRange({
      itemCount: 100, // safeCount = 100
      itemHeight: -10, // safeHeight = max(1, -10) = 1
      viewportHeight: -200, // max(0, -200) = 0
      scrollTop: -400, // max(0, -400) = 0
      overscan: -2, // safeOverscan = max(0, -2) = 0
    });

    // totalHeight = 100 * 1 = 100
    // visibleStart = floor(0 / 1) = 0
    // visibleEnd = ceil((0 + 0) / 1) - 1 = -1
    // startIndex = max(0, 0 - 0) = 0
    // endIndex = min(99, -1 + 0) = -1
    expect(result).toEqual({
      startIndex: 0,
      endIndex: -1,
      offsetTop: 0,
      totalHeight: 100, // 100 items * safe height 1
    });
  });

  it("handles scrolled past end defensively", () => {
    const result = getVirtualRange({
      itemCount: 100,
      itemHeight: 20,
      viewportHeight: 200,
      scrollTop: 5000, // WAY past end
    });

    // totalHeight = 2000
    // visibleStart = 5000 / 20 = 250
    // visibleEnd = ceil((5000 + 200)/20) - 1 = 260 - 1 = 259
    // overscan = 4
    // startIndex = max(0, 250 - 4) = 246
    // endIndex = min(99, 259 + 4) = 99
    expect(result).toEqual({
      startIndex: 246,
      endIndex: 99,
      offsetTop: 4920,
      totalHeight: 2000,
    });
  });
});
