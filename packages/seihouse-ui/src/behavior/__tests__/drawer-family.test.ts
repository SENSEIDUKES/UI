import { describe, expect, it } from "vitest";

import {
  drawerFamilySideClasses,
  drawerFamilySizeClasses,
  drawerFamilySlots,
  drawerFamilyToneClasses,
} from "../sei-drawer-family";
import { seiDrawerStyles } from "../sei-drawer";
import { seiNativeDrawerStyles } from "../sei-native-drawer";

function classNames(value: string | readonly string[]) {
  return (typeof value === "string" ? value : value.join(" ")).split(/\s+/).filter(Boolean);
}

function expectSharedClasses(actual: string, shared: string | readonly string[]) {
  const actualClasses = classNames(actual);
  for (const className of classNames(shared)) {
    expect(actualClasses).toContain(className);
  }
}

describe("drawer family style contracts", () => {
  it("shares the overlay and structural slots across both behavior engines", () => {
    const drawer = seiDrawerStyles({ side: "right", tone: "dark" });
    const nativeDrawer = seiNativeDrawerStyles({ side: "right", tone: "dark" });

    expectSharedClasses(drawer.backdrop(), drawerFamilySlots.overlay);
    expectSharedClasses(nativeDrawer.overlay(), drawerFamilySlots.overlay);
    expect(classNames(drawer.header())).toEqual(classNames(nativeDrawer.header()));
    expect(classNames(drawer.body())).toEqual(classNames(nativeDrawer.body()));
    expect(classNames(drawer.footer())).toEqual(classNames(nativeDrawer.footer()));
    expect(classNames(drawer.title())).toEqual(classNames(nativeDrawer.title()));
    expect(classNames(drawer.description())).toEqual(classNames(nativeDrawer.description()));
    expect(classNames(drawer.close())).toEqual(classNames(nativeDrawer.close()));
  });

  it("maps every supported tone through the canonical drawer surface classes", () => {
    for (const tone of ["dark", "light"] as const) {
      expectSharedClasses(seiDrawerStyles({ tone }).popup(), drawerFamilyToneClasses[tone]);
    }

    for (const tone of ["default", "soft", "dark", "light", "glass-test"] as const) {
      expectSharedClasses(seiNativeDrawerStyles({ tone }).content(), drawerFamilyToneClasses[tone]);
    }
  });

  it("shares side anchors, radii, and responsive side widths", () => {
    for (const side of ["right", "left", "bottom"] as const) {
      expectSharedClasses(
        seiDrawerStyles({ side, tone: "dark" }).popup(),
        drawerFamilySideClasses[side].surface,
      );
      expectSharedClasses(
        seiNativeDrawerStyles({ side, tone: "dark" }).content(),
        drawerFamilySideClasses[side].surface,
      );
    }

    for (const side of ["right", "left"] as const) {
      for (const size of ["compact", "default", "wide"] as const) {
        expectSharedClasses(seiDrawerStyles({ side, size }).popup(), drawerFamilySizeClasses[size]);
        expectSharedClasses(
          seiNativeDrawerStyles({ side, size }).content(),
          drawerFamilySizeClasses[size],
        );
      }
    }

    for (const sizeClass of Object.values(drawerFamilySizeClasses)) {
      expect(classNames(seiDrawerStyles({ side: "bottom" }).popup())).not.toContain(sizeClass);
      expect(classNames(seiNativeDrawerStyles({ side: "bottom" }).content())).not.toContain(
        sizeClass,
      );
    }
  });

  it("centralizes all four safe-area edges in structural sections", () => {
    const right = seiDrawerStyles({ side: "right" });
    const bottom = seiNativeDrawerStyles({ side: "bottom" });

    expect(right.header()).toContain("pt-[max(1rem,var(--sh-safe-top))]");
    expect(right.body()).toContain("first:pt-[max(1rem,var(--sh-safe-top))]");
    expect(bottom.header()).not.toContain("--sh-safe-top");

    for (const section of [right.header(), right.body(), right.footer()]) {
      expect(section).toContain("pr-[max(1.25rem,var(--sh-safe-right))]");
      expect(section).toContain("pl-[max(1.25rem,var(--sh-safe-left))]");
    }

    expect(right.footer()).toContain("pb-[max(1rem,var(--sh-safe-bottom))]");
    expect(right.body()).toContain("last:pb-[max(1rem,var(--sh-safe-bottom))]");
  });

  it("retains engine-specific movement and public defaults", () => {
    expect(seiDrawerStyles({ side: "right" }).popup()).toContain(
      "data-[starting-style]:translate-x-full",
    );
    expect(seiDrawerStyles({ side: "bottom" }).popup()).toContain("max-h-[85vh]");
    expect(seiNativeDrawerStyles({ side: "bottom" }).content()).toContain("max-h-[92vh]");
    expect(seiNativeDrawerStyles({ side: "bottom" }).content()).toContain("mt-24");

    expect(seiDrawerStyles().popup()).toBe(
      seiDrawerStyles({ side: "right", size: "default", tone: "dark" }).popup(),
    );
    expect(seiNativeDrawerStyles().content()).toBe(
      seiNativeDrawerStyles({ side: "bottom", size: "default", tone: "default" }).content(),
    );
  });
});
