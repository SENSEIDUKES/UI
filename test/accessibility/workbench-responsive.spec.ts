import { expect, test } from "@playwright/test";

async function selectPreviewWidth(
  page: import("@playwright/test").Page,
  label: "Mobile" | "Tablet" | "Desktop",
  expectedWidth: number,
) {
  await page
    .getByTestId("desktop-component-controls")
    .getByRole("button", { name: label, exact: true })
    .click();

  const frameBody = page.getByTestId("component-preview-frame").contentFrame().locator("body");
  await expect
    .poll(() => frameBody.evaluate((body) => body.ownerDocument.defaultView?.innerWidth ?? 0))
    .toBe(expectedWidth);
}

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

test("workbench presets drive sm, md, and lg component breakpoints", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/workbench/showcase-hero");

  const preview = page.getByTestId("component-preview-frame").contentFrame();
  const heroHeading = preview.getByRole("heading", { level: 1 });

  const readHeroStyles = () =>
    heroHeading.evaluate((heading) => {
      const grid = heading.parentElement?.parentElement?.parentElement;
      if (!grid) throw new Error("Showcase Hero grid was not found");
      return {
        fontSize: getComputedStyle(heading).fontSize,
        gridColumns: getComputedStyle(grid).gridTemplateColumns.split(" ").length,
      };
    });

  await selectPreviewWidth(page, "Mobile", 375);
  await expect(heroHeading).toBeVisible();
  expect(await readHeroStyles()).toEqual({ fontSize: "36px", gridColumns: 1 });

  await selectPreviewWidth(page, "Tablet", 768);
  expect(await readHeroStyles()).toEqual({ fontSize: "60px", gridColumns: 1 });

  await selectPreviewWidth(page, "Desktop", 1280);
  expect(await readHeroStyles()).toEqual({ fontSize: "60px", gridColumns: 2 });

  await page.goto("/workbench/skeleton");
  await page
    .getByTestId("desktop-component-controls")
    .getByRole("button", { name: "context", exact: true })
    .click();

  const contextPreview = page.getByTestId("component-preview-frame").contentFrame();
  const releaseTitle = contextPreview.locator("#context-release-title");
  const readFormColumns = () =>
    releaseTitle.evaluate((input) => {
      let candidate = input.parentElement;
      while (candidate && !candidate.className.includes("md:grid-cols-2")) {
        candidate = candidate.parentElement;
      }
      if (!candidate) throw new Error("Responsive form grid was not found");
      return getComputedStyle(candidate).gridTemplateColumns.split(" ").length;
    });

  await selectPreviewWidth(page, "Mobile", 375);
  await expect(releaseTitle).toBeVisible();
  expect(await readFormColumns()).toBe(1);

  await selectPreviewWidth(page, "Tablet", 768);
  expect(await readFormColumns()).toBe(2);
});

test("overlay portals stay interactive and contained in the isolated preview", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/workbench/dialog");
  await selectPreviewWidth(page, "Mobile", 375);

  const preview = page.getByTestId("component-preview-frame").contentFrame();
  const trigger = preview.getByRole("button", { name: "Register this work" });
  await trigger.click();

  const dialog = preview.getByRole("dialog", { name: "Register this work?" });
  await expect(dialog).toBeVisible();
  expect(
    await dialog.evaluate((element) => ({
      insideIframe: element.ownerDocument.defaultView?.frameElement?.getAttribute("data-testid"),
      bounds: (() => {
        const rect = element.getBoundingClientRect();
        return {
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
        };
      })(),
    })),
  ).toMatchObject({
    insideIframe: "component-preview-frame",
    bounds: {
      left: expect.any(Number),
      right: expect.any(Number),
      top: expect.any(Number),
      bottom: expect.any(Number),
      viewportWidth: 375,
    },
  });

  const bounds = await dialog.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
      viewportHeight: window.innerHeight,
    };
  });
  expect(bounds.left).toBeGreaterThanOrEqual(0);
  expect(bounds.right).toBeLessThanOrEqual(375);
  expect(bounds.top).toBeGreaterThanOrEqual(0);
  expect(bounds.bottom).toBeLessThanOrEqual(bounds.viewportHeight);

  await preview.locator("body").press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("preview frames expand for component overflow instead of clipping it", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/workbench/showcase-hero");
  await selectPreviewWidth(page, "Mobile", 375);

  const iframe = page.getByTestId("component-preview-frame");
  const previewBody = iframe.contentFrame().locator("body");

  await expect
    .poll(() =>
      previewBody.evaluate((body) => {
        const view = body.ownerDocument.defaultView;
        return view
          ? body.ownerDocument.documentElement.scrollHeight <= view.innerHeight + 1
          : false;
      }),
    )
    .toBe(true);

  expect(await iframe.evaluate((frame) => frame.clientHeight)).toBeGreaterThanOrEqual(667);
  expect(
    await previewBody.evaluate(
      (body) => getComputedStyle(body.ownerDocument.documentElement).overflowY,
    ),
  ).not.toBe("hidden");
});
