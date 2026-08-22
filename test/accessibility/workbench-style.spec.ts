import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * The Workbench Style control and the `data-experience` layer.
 *
 * Style is the reviewer's primary control: it must reach the isolated preview
 * document (not just the workbench shell), survive component navigation and
 * refreshes, and stay independent of Mode / Canvas / Width.
 */

const desktopViewport = { width: 1440, height: 900 };

function desktopControls(page: Page) {
  return page.getByTestId("desktop-component-controls");
}

/** The experience actually applied inside the isolated preview iframe. */
function previewExperience(page: Page) {
  // `.first()`: the variants and context modes render one frame per specimen.
  return page
    .getByTestId("component-preview-frame")
    .first()
    .contentFrame()
    .locator("body")
    .evaluate((body) => body.ownerDocument.documentElement.dataset.experience);
}

test("style control offers the three experiences and defaults to Default", async ({ page }) => {
  await page.setViewportSize(desktopViewport);
  await page.goto("/workbench");

  const control = desktopControls(page).getByTestId("workbench-style-control");
  await expect(control).toBeVisible();
  await expect(desktopControls(page).getByText("Style", { exact: true })).toBeVisible();

  await expect(control.getByRole("button", { name: "Default — Modern" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(control.getByRole("button", { name: "SEA — Music" })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await expect(control.getByRole("button", { name: "SEN — Narrative" })).toHaveAttribute(
    "aria-pressed",
    "false",
  );

  await expect.poll(() => previewExperience(page)).toBe("default");
});

test("selecting a style reaches the isolated preview document and the shell root", async ({
  page,
}) => {
  await page.setViewportSize(desktopViewport);
  await page.goto("/workbench");

  await desktopControls(page).getByRole("button", { name: "SEA — Music" }).click();

  await expect.poll(() => previewExperience(page)).toBe("sea");
  await expect
    .poll(() => page.evaluate(() => document.documentElement.dataset.experience))
    .toBe("sea");

  // The preview really re-tokenizes: the SEA page background differs from Default.
  const seaBackground = await page
    .getByTestId("component-preview-frame")
    .first()
    .contentFrame()
    .getByTestId("isolated-preview-document")
    .evaluate((node) => getComputedStyle(node).backgroundColor);

  await desktopControls(page).getByRole("button", { name: "Default — Modern" }).click();
  await expect.poll(() => previewExperience(page)).toBe("default");

  const defaultBackground = await page
    .getByTestId("component-preview-frame")
    .first()
    .contentFrame()
    .getByTestId("isolated-preview-document")
    .evaluate((node) => getComputedStyle(node).backgroundColor);

  expect(seaBackground).not.toBe(defaultBackground);
});

test("style persists across component navigation and reloads, while mode resets", async ({
  page,
}) => {
  await page.setViewportSize(desktopViewport);
  await page.goto("/workbench/panel");

  await desktopControls(page).getByRole("button", { name: "SEN — Narrative" }).click();
  await desktopControls(page).getByRole("button", { name: "variants", exact: true }).click();
  await expect.poll(() => previewExperience(page)).toBe("sen");

  // Navigating to another component resets Mode but not Style.
  await page.goto("/workbench/card");
  await expect(
    desktopControls(page).getByRole("button", { name: "solo", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    desktopControls(page).getByTestId("workbench-style-control").getByRole("button", {
      name: "SEN — Narrative",
    }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => previewExperience(page)).toBe("sen");

  await page.reload();
  await expect.poll(() => previewExperience(page)).toBe("sen");
});

test("style is independent of canvas and width, and reaches contextual previews", async ({
  page,
}) => {
  await page.setViewportSize(desktopViewport);
  await page.goto("/workbench/skeleton");

  await desktopControls(page).getByRole("button", { name: "SEA — Music" }).click();
  await desktopControls(page).getByRole("button", { name: "light", exact: true }).click();
  await desktopControls(page).getByRole("button", { name: "Mobile", exact: true }).click();

  const previewRoot = page
    .getByTestId("component-preview-frame")
    .first()
    .contentFrame()
    .getByTestId("isolated-preview-document");

  // Canvas still owns contrast; Style still owns personality.
  await expect(previewRoot).toHaveAttribute("data-theme", "light");
  await expect(previewRoot).toHaveAttribute("data-experience", "sea");
  await expect
    .poll(() =>
      page
        .getByTestId("component-preview-frame")
        .first()
        .contentFrame()
        .locator("body")
        .evaluate((body) => body.ownerDocument.defaultView?.innerWidth ?? 0),
    )
    .toBe(375);

  // Contextual previews render through the same iframe pipeline.
  await desktopControls(page).getByRole("button", { name: "context", exact: true }).click();
  await expect
    .poll(() =>
      page
        .getByTestId("component-preview-frame")
        .first()
        .contentFrame()
        .locator("body")
        .evaluate((body) => body.ownerDocument.documentElement.dataset.experience),
    )
    .toBe("sea");
});

test("style control is available in the mobile controls drawer", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/workbench");

  await page.getByRole("button", { name: "Controls" }).click();
  const controls = page.getByRole("dialog", { name: "Component controls" });
  await expect(controls).toBeVisible();
  await expect(controls.getByText("Style", { exact: true })).toBeVisible();

  const option = controls.getByRole("button", { name: "SEN — Narrative" });
  // Mobile-safe target: the control keeps a 44px hit area in the drawer.
  const box = await option.boundingBox();
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);

  await option.click();
  await page.keyboard.press("Escape");
  await expect(controls).toBeHidden();
  await expect.poll(() => previewExperience(page)).toBe("sen");
});

test("no critical axe violations with a non-default style selected", async ({ page }) => {
  await page.setViewportSize(desktopViewport);
  await page.goto("/workbench");
  await desktopControls(page).getByRole("button", { name: "SEN — Narrative" }).click();
  await expect.poll(() => previewExperience(page)).toBe("sen");

  const results = await new AxeBuilder({ page })
    .disableRules(["scrollable-region-focusable"])
    .analyze();
  const critical = results.violations.filter((violation) => violation.impact === "critical");
  expect(
    critical,
    JSON.stringify(
      critical.map((violation) => violation.id),
      null,
      2,
    ),
  ).toEqual([]);
});

test("the foundation experience proof renders all three expressions", async ({ page }) => {
  await page.setViewportSize(desktopViewport);
  await page.goto("/foundations");
  await page.getByRole("tab", { name: "Experience" }).click();

  for (const label of ["Default — Modern", "SEA — Music", "SEN — Narrative"]) {
    await expect(page.getByRole("region", { name: label })).toBeVisible();
  }

  // Each column is a real experience root, and theme still composes on top.
  await expect(page.getByRole("region", { name: "SEA — Music" })).toHaveAttribute(
    "data-experience",
    "sea",
  );
  await page
    .getByRole("group", { name: "Proof theme" })
    .getByRole("button", { name: "light" })
    .click();
  await expect(page.getByRole("region", { name: "SEA — Music" })).toHaveAttribute(
    "data-theme",
    "light",
  );

  const results = await new AxeBuilder({ page })
    .disableRules(["scrollable-region-focusable"])
    .analyze();
  const critical = results.violations.filter((violation) => violation.impact === "critical");
  expect(
    critical,
    JSON.stringify(
      critical.map((violation) => violation.id),
      null,
      2,
    ),
  ).toEqual([]);
});
