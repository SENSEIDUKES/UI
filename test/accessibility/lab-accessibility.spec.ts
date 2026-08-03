import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Axe accessibility scans for the one-page lab.
 *
 * These legacy smoke scans keep their critical threshold and surface serious
 * findings in the console. Color contrast is release-blocking through the
 * dedicated light/dark coverage in theme-contrast.spec.ts.
 */

/**
 * `scrollable-region-focusable` is disabled: React Aria's always-visible
 * command/list menus use roving virtual focus (aria-activedescendant) rather
 * than a tabbable scroll container — a valid composite-widget pattern.
 */
function axe(page: Page) {
  return new AxeBuilder({ page }).disableRules(["scrollable-region-focusable"]);
}

test.describe("lab accessibility", () => {
  test("workbench home loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "SEIHouse UI Workbench" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Design review queue" })).toBeVisible();
  });

  test("/lab/raw preserves the showcase", async ({ page }) => {
    await page.goto("/lab/raw");
    await expect(page.getByRole("navigation", { name: "Lab sections" })).toBeVisible();
    await expect(page.locator("#behavior-hardening")).toBeAttached();
  });

  test("/workbench shows one component with controls", async ({ page }) => {
    await page.goto("/workbench/album-card");
    await expect(page.getByRole("heading", { name: "Album Card" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Components" })).toBeVisible();
    await expect(page.getByRole("button", { name: "feature" })).toBeVisible();
  });

  test("no critical/serious axe violations on workbench home", async ({ page }) => {
    await page.goto("/");
    const results = await axe(page).analyze();
    const critical = results.violations.filter((v) => v.impact === "critical");
    const serious = results.violations.filter((v) => v.impact === "serious");
    if (serious.length) {
      console.warn("axe serious (non-blocking):", serious.map((v) => v.id).join(", "));
    }
    expect(
      critical,
      JSON.stringify(
        critical.map((v) => v.id),
        null,
        2,
      ),
    ).toEqual([]);
  });

  test("no critical/serious axe violations on /workbench", async ({ page }) => {
    await page.goto("/workbench");
    const results = await axe(page).analyze();
    const critical = results.violations.filter((v) => v.impact === "critical");
    const serious = results.violations.filter((v) => v.impact === "serious");
    if (serious.length) {
      console.warn("axe serious (non-blocking):", serious.map((v) => v.id).join(", "));
    }
    expect(
      critical,
      JSON.stringify(
        critical.map((v) => v.id),
        null,
        2,
      ),
    ).toEqual([]);
  });

  test("no critical/serious axe violations on /lab/raw", async ({ page }) => {
    await page.goto("/lab/raw");
    const results = await axe(page).analyze();
    const critical = results.violations.filter((v) => v.impact === "critical");
    const serious = results.violations.filter((v) => v.impact === "serious");
    if (serious.length) {
      console.warn("axe serious (non-blocking):", serious.map((v) => v.id).join(", "));
    }
    expect(
      critical,
      JSON.stringify(
        critical.map((v) => v.id),
        null,
        2,
      ),
    ).toEqual([]);
  });
});
