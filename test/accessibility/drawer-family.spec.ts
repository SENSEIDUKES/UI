import { expect, test, type Locator, type Page } from "@playwright/test";

const safeArea = { top: 26, right: 30, bottom: 34, left: 22 } as const;

async function setSafeAreaTokens(page: Page) {
  await page.evaluate((insets) => {
    for (const [edge, value] of Object.entries(insets)) {
      document.documentElement.style.setProperty(`--sh-safe-${edge}`, `${value}px`);
    }
  }, safeArea);
}

async function drawerMetrics(dialog: Locator, footerAction: string) {
  const close = dialog.getByRole("button", { name: "Close drawer" });
  const header = close.locator("xpath=..");
  const body = header.locator("xpath=following-sibling::*[1]");
  const footer = dialog.getByRole("button", { name: footerAction }).locator("xpath=..");

  await expect(close).toBeVisible();
  await expect
    .poll(async () => {
      const box = await dialog.boundingBox();
      const viewportWidth = await dialog.page().evaluate(() => window.innerWidth);
      return box ? Math.abs(box.x + box.width - viewportWidth) : Number.POSITIVE_INFINITY;
    })
    .toBeLessThan(0.5);

  return {
    surface: await dialog.evaluate((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        width: Math.round(rect.width),
        right: Math.round(rect.right),
        backgroundColor: style.backgroundColor,
        borderTopLeftRadius: style.borderTopLeftRadius,
        borderBottomLeftRadius: style.borderBottomLeftRadius,
      };
    }),
    header: await header.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        paddingTop: style.paddingTop,
        paddingRight: style.paddingRight,
        paddingLeft: style.paddingLeft,
      };
    }),
    body: await body.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        paddingTop: style.paddingTop,
        paddingRight: style.paddingRight,
        paddingLeft: style.paddingLeft,
      };
    }),
    footer: await footer.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        paddingRight: style.paddingRight,
        paddingBottom: style.paddingBottom,
        paddingLeft: style.paddingLeft,
      };
    }),
    close: await close.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    }),
  };
}

async function expectScrollLocked(page: Page) {
  expect(
    await page.evaluate(() =>
      [document.documentElement, document.body].some(
        (element) => getComputedStyle(element).overflow === "hidden",
      ),
    ),
  ).toBe(true);
}

test.describe("unified drawer family", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/lab/raw");
  });

  test("matching side drawers share their rendered surface, structure, and safe areas", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await setSafeAreaTokens(page);

    await page.getByRole("button", { name: "Open vault details" }).click();
    const drawer = page.getByRole("dialog", { name: "Vault fragment", exact: true });
    const drawerStyles = await drawerMetrics(drawer, "Tag fragment");
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();

    await page.getByRole("button", { name: "Vault fragment", exact: true }).click();
    const nativeDrawer = page.getByRole("dialog", { name: "Vault fragment detail" });
    const nativeStyles = await drawerMetrics(nativeDrawer, "Tag fragment");

    expect(nativeStyles).toEqual(drawerStyles);
    expect(drawerStyles.surface.width).toBe(390);
    expect(drawerStyles.surface.right).toBe(390);
    expect(drawerStyles.header).toEqual({
      paddingTop: `${safeArea.top}px`,
      paddingRight: `${safeArea.right}px`,
      paddingLeft: `${safeArea.left}px`,
    });
    expect(drawerStyles.body).toEqual({
      paddingTop: "16px",
      paddingRight: `${safeArea.right}px`,
      paddingLeft: `${safeArea.left}px`,
    });
    expect(drawerStyles.footer).toEqual({
      paddingRight: `${safeArea.right}px`,
      paddingBottom: `${safeArea.bottom}px`,
      paddingLeft: `${safeArea.left}px`,
    });
    expect(drawerStyles.close).toEqual({ width: 44, height: 44 });
  });

  test("both engines retain modal dismissal, focus return, scroll lock, and side sizing", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 900 });

    const drawerTrigger = page.getByRole("button", { name: "Open vault details" });
    await drawerTrigger.click();
    const drawer = page.getByRole("dialog", { name: "Vault fragment", exact: true });
    await expect(drawer).toBeVisible();
    await expectScrollLocked(page);
    await page.keyboard.press("Tab");
    expect(await drawer.evaluate((element) => element.contains(document.activeElement))).toBe(true);
    const drawerWidth = (await drawer.boundingBox())?.width;
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    await expect(drawerTrigger).toBeFocused();

    const nativeTrigger = page.getByRole("button", { name: "Vault fragment", exact: true });
    await nativeTrigger.click();
    const nativeDrawer = page.getByRole("dialog", { name: "Vault fragment detail" });
    await expect(nativeDrawer).toBeVisible();
    await expectScrollLocked(page);
    const nativeWidth = (await nativeDrawer.boundingBox())?.width;
    expect(nativeWidth).toBeCloseTo(drawerWidth ?? 0, 2);

    await page.mouse.click(10, 400);
    await expect(nativeDrawer).toBeHidden();
    await expect(nativeTrigger).toBeFocused();
  });

  test("the Native Drawer keeps its Vaul drag and snap contract", async ({ page }) => {
    await page.getByRole("button", { name: "Player queue", exact: true }).click();
    const drawer = page.getByRole("dialog", { name: /Up next · drag or snap/i });

    await expect(drawer).toHaveAttribute("data-vaul-drawer", "");
    await expect(drawer).toHaveAttribute("data-vaul-drawer-direction", "bottom");
    await expect(drawer).toHaveAttribute("data-vaul-snap-points", "true");
    await expect(drawer.locator("[data-vaul-handle]")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
  });
});
