import { expect, test } from "@playwright/test";

const mobileViewports = [
  { name: "320px phone", width: 320, height: 568 },
  { name: "390px phone", width: 390, height: 844 },
  { name: "768px tablet", width: 768, height: 1024 },
] as const;

for (const viewport of mobileViewports) {
  test(`${viewport.name} puts the selected component before the catalog`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/workbench");

    const heading = page.getByRole("heading", { level: 1 });
    const preview = page.getByTestId("component-preview-canvas");
    await expect(heading).toBeVisible();
    await expect(preview).toBeVisible();
    await expect(page.getByRole("button", { name: "Components" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Controls" })).toBeVisible();
    await expect(page.getByTestId("desktop-component-catalog")).toBeHidden();
    await expect(page.getByTestId("desktop-component-controls")).toBeHidden();

    const previewBox = await preview.boundingBox();
    expect(previewBox).not.toBeNull();
    expect(previewBox!.y).toBeLessThan(viewport.height);

    const hasDocumentOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasDocumentOverflow).toBe(false);
  });
}

test("mobile catalog is searchable, keyboard-dismissible, and changes the component", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/workbench");

  const trigger = page.getByRole("button", { name: "Components" });
  await trigger.click();
  const catalog = page.getByRole("dialog", { name: "Browse components" });
  await expect(catalog).toBeVisible();
  await expect(catalog.getByRole("searchbox", { name: "Search components" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(catalog).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await catalog.getByRole("searchbox", { name: "Search components" }).fill("Panel");
  await catalog.getByRole("link", { name: "Panel", exact: true }).click();
  await expect(page).toHaveURL(/\/workbench\/panel$/);
  await expect(page.getByRole("heading", { level: 1, name: "Panel" })).toBeVisible();
});

test("mobile controls preserve preview options and restore focus", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/workbench");

  const trigger = page.getByRole("button", { name: "Controls" });
  await trigger.click();
  const controls = page.getByRole("dialog", { name: "Component controls" });
  await expect(controls).toBeVisible();
  await expect(controls.getByText("Variant", { exact: true })).toBeVisible();
  await expect(controls.getByText("Canvas", { exact: true })).toBeVisible();
  await expect(controls.getByText("Width", { exact: true })).toBeVisible();
  await expect(controls.getByText("Status", { exact: true })).toBeVisible();
  await expect(controls.getByText("Design notes", { exact: true })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(controls).toBeHidden();
  await expect(trigger).toBeFocused();
});

for (const width of [1024, 1440]) {
  test(`${width}px keeps the desktop three-column workbench`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/workbench");

    const catalog = page.getByTestId("desktop-component-catalog");
    const preview = page.getByTestId("workbench-preview");
    const controls = page.getByTestId("desktop-component-controls");
    await expect(catalog).toBeVisible();
    await expect(preview).toBeVisible();
    await expect(controls).toBeVisible();
    await expect(page.getByRole("button", { name: "Components" })).toBeHidden();
    await expect(page.getByRole("button", { name: "Controls" })).toBeHidden();

    const [catalogBox, previewBox, controlsBox] = await Promise.all([
      catalog.boundingBox(),
      preview.boundingBox(),
      controls.boundingBox(),
    ]);
    expect(catalogBox && previewBox && controlsBox).toBeTruthy();
    expect(catalogBox!.x).toBeLessThan(previewBox!.x);
    expect(previewBox!.x).toBeLessThan(controlsBox!.x);

    const hasDocumentOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasDocumentOverflow).toBe(false);
  });
}
