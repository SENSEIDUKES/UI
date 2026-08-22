import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SEICommand } from "../sei-command";
import { seiDialogStyles } from "../sei-dialog";
import { seiDrawerStyles } from "../sei-drawer";
import { seiNativeDrawerStyles } from "../sei-native-drawer";
import { seiPopoverStyles } from "../sei-popover";
import { seiTooltipStyles } from "../sei-tooltip";
import { seiLayer } from "../../styles/layering";
import { seiOverlayVariants, seiPopupSurfaceVariants } from "../../styles/variants";

type PopupTone = "default" | "soft" | "dark" | "light" | "glass-test";

function classNames(value: string) {
  return value.split(/\s+/).filter(Boolean);
}

function expectSharedClasses(actual: string, shared: string) {
  const actualClasses = classNames(actual);
  for (const className of classNames(shared)) {
    expect(actualClasses).toContain(className);
  }
}

function expectSharedSurface(actual: string, tone: PopupTone) {
  expectSharedClasses(actual, seiPopupSurfaceVariants({ tone }));
}

describe("floating surface style contracts", () => {
  it("shares the canonical scrim across modal primitives", () => {
    const sharedOverlay = seiOverlayVariants();

    expectSharedClasses(seiDialogStyles({ variant: "default" }).backdrop(), sharedOverlay);
    expectSharedClasses(seiDrawerStyles({ tone: "dark" }).backdrop(), sharedOverlay);
    expectSharedClasses(seiNativeDrawerStyles({ tone: "default" }).overlay(), sharedOverlay);
  });

  it("maps dialog, popover, drawer, native drawer, and tooltip tones to shared popup surfaces", () => {
    const dialogTones: PopupTone[] = ["default", "soft", "dark", "light", "glass-test"];
    for (const tone of dialogTones) {
      expectSharedSurface(seiDialogStyles({ variant: tone }).popup(), tone);
    }

    for (const tone of ["default", "soft", "dark", "light"] as const) {
      expectSharedSurface(seiPopoverStyles({ variant: tone }).popup(), tone);
    }

    for (const tone of ["dark", "light"] as const) {
      expectSharedSurface(seiDrawerStyles({ tone }).popup(), tone);
    }

    for (const tone of dialogTones) {
      expectSharedSurface(seiNativeDrawerStyles({ tone }).content(), tone);
    }

    for (const tone of ["default", "dark", "light"] as const) {
      expectSharedSurface(seiTooltipStyles({ variant: tone }).popup(), tone);
    }
  });

  it("keeps modal surfaces above scrims and anchored surfaces above modal content", () => {
    expect(classNames(seiDialogStyles({ variant: "default" }).popup())).toContain(seiLayer.modal);
    expect(classNames(seiDrawerStyles({ tone: "dark" }).popup())).toContain(seiLayer.modal);
    expect(classNames(seiNativeDrawerStyles({ tone: "default" }).content())).toContain(
      seiLayer.modal,
    );
    expect(classNames(seiPopoverStyles({ variant: "default" }).positioner())).toContain(
      seiLayer.popover,
    );
    expect(classNames(seiTooltipStyles({ variant: "default" }).positioner())).toContain(
      seiLayer.popover,
    );
  });

  it("uses the shared popup surface for the standalone command container", () => {
    const markup = renderToStaticMarkup(createElement(SEICommand, null));

    for (const className of classNames(seiPopupSurfaceVariants({ tone: "default" }))) {
      expect(markup).toContain(className);
    }
  });
});
