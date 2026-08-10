import { expect, test, type Locator, type Page } from "@playwright/test";

const MOBILE_VIEWPORT = { width: 390, height: 844 };
const MINIMUM_TOUCH_TARGET = 43.5;

async function expectMobileTarget(locator: Locator) {
  await expect(locator).toBeVisible();
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width).toBeGreaterThanOrEqual(MINIMUM_TOUCH_TARGET);
  expect(box!.height).toBeGreaterThanOrEqual(MINIMUM_TOUCH_TARGET);
}

async function expectNoTargetOverlap(locator: Locator) {
  const rectangles = await locator.evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
    }),
  );

  for (let leftIndex = 0; leftIndex < rectangles.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < rectangles.length; rightIndex += 1) {
      const left = rectangles[leftIndex];
      const right = rectangles[rightIndex];
      const overlapWidth = Math.min(left.right, right.right) - Math.max(left.left, right.left);
      const overlapHeight = Math.min(left.bottom, right.bottom) - Math.max(left.top, right.top);
      expect(overlapWidth > 0 && overlapHeight > 0).toBe(false);
    }
  }
}

async function expectFontSize(page: Page, path: string, locator: Locator, expected: string) {
  await page.goto(path);
  await expect(locator).toBeVisible();
  await expect
    .poll(() => locator.evaluate((element) => getComputedStyle(element).fontSize))
    .toBe(expected);
}

test.describe("mobile interaction sizing", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
  });

  test("buttons keep compact glyphs inside 44px mobile targets", async ({ page }) => {
    await page.goto("/workbench/preview/button");

    await expectMobileTarget(page.getByRole("button", { name: "Small" }));
    const iconButton = page.getByRole("button", { name: "Add item" });
    await expectMobileTarget(iconButton);
    await expect(iconButton.locator("svg")).toHaveCSS("width", "16px");
    await expect(iconButton.locator("svg")).toHaveCSS("height", "16px");

    await expect(page.getByRole("button", { name: "Saving" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Saving" })).toHaveAttribute("aria-busy", "true");
    await expect(page.getByRole("button", { name: "Unavailable" })).toBeDisabled();

    await page.setViewportSize({ width: 1024, height: 768 });
    expect((await page.getByRole("button", { name: "Small" }).boundingBox())?.height).toBe(32);
    expect((await iconButton.boundingBox())?.height).toBe(40);
  });

  test("native and searchable form fields use 16px mobile text", async ({ page }) => {
    await expectFontSize(
      page,
      "/workbench/preview/input?variant=compact",
      page.getByRole("textbox"),
      "16px",
    );
    await expectMobileTarget(page.getByRole("textbox"));

    await expectFontSize(
      page,
      "/workbench/preview/textarea?variant=compact",
      page.getByRole("textbox"),
      "16px",
    );
    await expectFontSize(
      page,
      "/workbench/preview/select?variant=compact",
      page.getByRole("combobox"),
      "16px",
    );
    await expectMobileTarget(page.getByRole("combobox"));

    await expectFontSize(page, "/workbench/preview/combobox", page.getByRole("combobox"), "16px");
    await expectFontSize(
      page,
      "/workbench/preview/multi-select-combobox",
      page.getByRole("combobox"),
      "16px",
    );

    await page.goto("/workbench/preview/command-palette");
    await page.getByRole("button", { name: "Open command palette" }).click();
    await expect(page.getByRole("searchbox", { name: "Command search" })).toHaveCSS(
      "font-size",
      "16px",
    );

    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto("/workbench/preview/input?variant=compact");
    await expect(page.getByRole("textbox")).toHaveCSS("font-size", "14px");
    await expect(page.getByRole("textbox")).toHaveCSS("height", "36px");
  });

  test("sliders, switches, and adjacent tabs expose distinct 44px targets", async ({ page }) => {
    await page.goto("/workbench/preview/slider");
    const slider = page.getByRole("slider", { name: "Preview volume" });
    const sliderThumb = slider.locator("xpath=../..");
    await expectMobileTarget(sliderThumb);
    await expect(sliderThumb.locator(":scope > span")).toHaveCSS("width", "16px");

    await page.goto("/workbench/preview/switch?variant=compact");
    const switchControl = page.getByRole("switch", { name: "Vault Radio eligible" });
    await expectMobileTarget(switchControl.locator("xpath=../.."));

    await page.goto("/workbench/preview/tabs");
    const tabs = page.getByRole("tab");
    await expect(tabs).toHaveCount(4);
    for (let index = 0; index < 4; index += 1) {
      await expectMobileTarget(tabs.nth(index));
    }
    await expectNoTargetOverlap(tabs);
    await expect(page.getByRole("tab", { name: "Archived" })).toBeDisabled();
  });

  test("modal close controls and bottom drawers respect touch and safe-area sizing", async ({
    page,
  }) => {
    await page.goto("/workbench/preview/dialog");
    await page.getByRole("button", { name: "Register this work" }).click();
    const dialogClose = page.getByRole("button", { name: "Close dialog" });
    await expectMobileTarget(dialogClose);
    await expect(dialogClose.locator("svg")).toHaveCSS("width", "16px");

    await page.goto("/workbench/preview/drawer?variant=bottom");
    await page.evaluate(() =>
      document.documentElement.style.setProperty("--sh-safe-bottom", "24px"),
    );
    await page.getByRole("button", { name: "Open vault details" }).click();

    await expectMobileTarget(page.getByRole("button", { name: "Close drawer" }));
    const footer = page.getByRole("button", { name: "Tag fragment" }).locator("..");
    await expect(footer).toHaveCSS("padding-bottom", "24px");
    const footerButtons = footer.getByRole("button");
    await expectNoTargetOverlap(footerButtons);
  });

  test("toast dismissal stays above the safe area with a compact glyph", async ({ page }) => {
    await page.goto("/workbench/preview/toast");
    await page.evaluate(() =>
      document.documentElement.style.setProperty("--sh-safe-bottom", "24px"),
    );
    await page.getByRole("button", { name: "Fire success toast" }).click();

    const dismiss = page.getByRole("button", { name: "Dismiss notification" });
    await expectMobileTarget(dismiss);
    await expect(dismiss.locator("svg")).toHaveCSS("width", "14px");

    const bottomGap = await dismiss.evaluate((button) => {
      let viewport = button.parentElement;
      while (viewport && getComputedStyle(viewport).position !== "fixed") {
        viewport = viewport.parentElement;
      }
      if (!viewport) throw new Error("Toast viewport was not found");
      const toast = button.closest('[role="status"], [role="alert"]');
      if (!toast) throw new Error("Toast item was not found");
      return window.innerHeight - toast.getBoundingClientRect().bottom;
    });
    expect(bottomGap).toBeGreaterThanOrEqual(40);
  });
});
