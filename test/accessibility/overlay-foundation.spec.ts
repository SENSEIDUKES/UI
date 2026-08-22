import { expect, test, type Locator, type Page } from "@playwright/test";

async function expectLayer(locator: Locator, expected: string) {
  await expect(locator).toBeVisible();
  const layers = await locator.evaluate((element) => {
    const values: string[] = [];
    for (let current: Element | null = element; current; current = current.parentElement) {
      values.push(getComputedStyle(current).zIndex);
    }
    return values;
  });

  expect(layers).toContain(expected);
}

async function expectModalFoundation(page: Page, surface: Locator) {
  await expectLayer(surface, "50");

  const overlay = page.locator('[class~="z-40"]').last();
  await expect(overlay).toBeVisible();
  await expect(overlay).toHaveCSS("z-index", "40");
}

test.describe("shared floating-interface foundation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/lab/raw");
  });

  test("modal dialogs, drawers, and the command palette sit above the shared scrim", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Confirm action" }).click();
    await expectModalFoundation(page, page.getByRole("dialog", { name: /Register this work/i }));
    await page.keyboard.press("Escape");

    await page.getByRole("button", { name: "Open vault details" }).click();
    await expectModalFoundation(page, page.getByRole("dialog", { name: /Vault fragment/i }));
    await page.keyboard.press("Escape");

    await page.getByRole("button", { name: "Player queue", exact: true }).click();
    await expectModalFoundation(page, page.getByRole("dialog", { name: /Up next/i }));
    await page.keyboard.press("Escape");

    await page.keyboard.press("Control+k");
    await expectModalFoundation(page, page.getByRole("dialog", { name: "Command palette" }));
  });

  test("anchored floating interfaces use their semantic popover and dropdown layers", async ({
    page,
  }) => {
    const popoverTrigger = page.getByRole("button", { name: "Metadata info" });
    await popoverTrigger.click();
    await expectLayer(page.getByText("Quick actions", { exact: true }), "60");
    await page.keyboard.press("Escape");

    const tooltipTrigger = page.getByRole("button", { name: "About this metric" });
    await tooltipTrigger.hover();
    await expectLayer(page.getByTestId("metric-tooltip"), "60");
    await page.mouse.move(0, 0);

    const combobox = page.getByRole("combobox", { name: "Search artists" });
    await combobox.click();
    await expectLayer(page.getByRole("option").first(), "30");
    await page.keyboard.press("Escape");

    const multiSelect = page.getByRole("combobox", { name: "Registry label picker" });
    await multiSelect.click();
    await expect(multiSelect).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expectLayer(page.getByRole("option").first(), "30");
  });

  test("menus retain the dropdown layer", async ({ page }) => {
    await page.goto("/workbench/preview/menu?canvas=dark&mockIndex=0&previewId=overlay-foundation");
    await page.getByRole("button", { name: /Open menu/i }).click();
    await expectLayer(page.getByRole("menu"), "30");
  });
});
