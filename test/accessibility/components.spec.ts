import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

function axe(page: Page) {
  return new AxeBuilder({ page }).disableRules(["scrollable-region-focusable"]);
}

function criticalOrSerious(results: Awaited<ReturnType<AxeBuilder["analyze"]>>) {
  return results.violations.filter(
    (violation) => violation.impact === "critical" || violation.impact === "serious",
  );
}

function previewPath(slug: string) {
  return `/workbench/preview/${slug}?canvas=dark&mockIndex=0&previewId=component-test`;
}

test.describe("component primitives", () => {
  test("opened menu has no critical/serious axe violations", async ({ page }) => {
    await page.goto(previewPath("menu"));
    await page.getByRole("button", { name: /Open menu/i }).click();
    await expect(page.getByRole("menu")).toBeVisible();

    const results = await axe(page).include('[role="menu"]').analyze();
    const blocking = criticalOrSerious(results);
    expect(
      blocking,
      JSON.stringify(
        blocking.map((violation) => violation.id),
        null,
        2,
      ),
    ).toEqual([]);
  });

  test("toast announces a fired notification", async ({ page }) => {
    await page.goto(previewPath("toast"));
    await page.getByRole("button", { name: /Fire success toast/i }).click();

    const toast = page.getByRole("status").filter({ hasText: "Vault update saved" });
    await expect(toast).toBeVisible();
    await expect(toast).toContainText("mock notification");
  });

  test("data table sortable headers toggle aria-sort by click and keyboard", async ({ page }) => {
    await page.goto(previewPath("data-table"));

    const titleHeader = page.getByRole("columnheader", { name: /Title/i });
    const titleButton = titleHeader.getByRole("button", { name: /Title/i });
    await expect(titleHeader).toHaveAttribute("aria-sort", "ascending");

    await titleButton.click();
    await expect(titleHeader).toHaveAttribute("aria-sort", "descending");

    const playsHeader = page.getByRole("columnheader", { name: /Plays/i });
    const playsButton = playsHeader.getByRole("button", { name: /Plays/i });
    await playsButton.focus();
    await page.keyboard.press("Enter");
    await expect(playsHeader).toHaveAttribute("aria-sort", "ascending");
  });
});
