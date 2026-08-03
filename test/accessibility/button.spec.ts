import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const buttonPreview =
  "/workbench/preview/button?canvas=dark&mockIndex=0&previewId=button-contract&variant=solid";

function seriousOrCritical(page: Page) {
  return new AxeBuilder({ page })
    .disableRules(["scrollable-region-focusable"])
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
}

test.describe("SEIButton accessibility contract", () => {
  test("exposes named native buttons and honest loading states", async ({ page }) => {
    await page.goto(buttonPreview);

    const small = page.getByRole("button", { name: "Small" });
    const loading = page.getByRole("button", { name: "Saving" });
    const unavailable = page.getByRole("button", { name: "Unavailable" });
    const iconOnly = page.getByRole("button", { name: "Add item" });

    await expect(small).toHaveAttribute("type", "button");
    await expect(loading).toBeDisabled();
    await expect(loading).toHaveAttribute("aria-busy", "true");
    await expect(unavailable).toBeDisabled();
    await expect(iconOnly).toHaveAttribute("data-icon-only", "true");

    const targetSizes = await page.getByRole("button").evaluateAll((buttons) =>
      buttons.map((button) => {
        const { width, height } = button.getBoundingClientRect();
        return { width, height };
      }),
    );
    expect(targetSizes.every(({ width, height }) => width >= 24 && height >= 24)).toBe(true);

    const results = await seriousOrCritical(page);
    const blocking = results.violations.filter(
      (violation) => violation.impact === "serious" || violation.impact === "critical",
    );
    expect(
      blocking,
      JSON.stringify(
        blocking.flatMap((violation) =>
          violation.nodes.map((node) => ({ id: violation.id, target: node.target })),
        ),
        null,
        2,
      ),
    ).toEqual([]);
  });

  test("keeps a visible keyboard outline in forced-colors mode", async ({ page }) => {
    await page.emulateMedia({ forcedColors: "active" });
    await page.goto(buttonPreview);

    await expect
      .poll(() => page.evaluate(() => matchMedia("(forced-colors: active)").matches))
      .toBe(true);

    const button = page.getByRole("button", { name: "Small" });
    await button.focus();
    await expect(button).toBeFocused();
    await expect(button).toHaveCSS("outline-style", "solid");
    await expect(button).toHaveCSS("outline-width", "2px");
    await expect(button).toHaveCSS("outline-offset", "2px");
  });
});
