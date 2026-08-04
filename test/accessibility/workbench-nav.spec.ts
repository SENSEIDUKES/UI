import { expect, test } from "@playwright/test";

const routes = [
  { href: "/", label: "Home" },
  { href: "/workbench", label: "Workbench" },
  { href: "/foundations", label: "Foundations" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contexts", label: "Contexts" },
  { href: "/lab/raw", label: "Raw Lab" },
] as const;

const mobileViewports = [
  { name: "320px phone", width: 320, height: 568 },
  { name: "390px phone", width: 390, height: 844 },
] as const;

const desktopViewports = [
  { name: "768px tablet", width: 768, height: 1024 },
  { name: "1024px laptop", width: 1024, height: 900 },
] as const;

function routePattern(href: string) {
  return new RegExp(href === "/" ? "/$" : `${href}$`);
}

for (const viewport of mobileViewports) {
  test(`${viewport.name} keeps the full navigation in an accessible menu`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/gallery");

    const trigger = page.getByRole("button", { name: /Menu/ });
    await expect(trigger).toBeVisible();
    await expect(trigger).toContainText("Gallery");
    await expect(page.getByRole("navigation", { name: "Workbench" }).first()).toBeHidden();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      ),
    ).toBe(false);

    await trigger.focus();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog", { name: "Workbench navigation" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Gallery" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    const finalLink = dialog.getByRole("link", { name: "Raw Lab" });
    await finalLink.focus();
    await page.keyboard.press("Tab");
    await expect(dialog).toContainText("Home");
    await expect
      .poll(() => page.evaluate(() => document.activeElement?.closest('[role="dialog"]') !== null))
      .toBe(true);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test(`${viewport.name} supports keyboard navigation to every workbench route`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/gallery");

    for (const route of routes) {
      const trigger = page.getByRole("button", { name: /Menu/ });
      await trigger.focus();
      await page.keyboard.press("Enter");

      const dialog = page.getByRole("dialog", { name: "Workbench navigation" });
      await dialog.getByRole("link", { name: route.label, exact: true }).focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(routePattern(route.href));

      if (route.href !== "/lab/raw") {
        await trigger.click();
        await expect(dialog.getByRole("link", { name: route.label, exact: true })).toHaveAttribute(
          "aria-current",
          "page",
        );
        await page.keyboard.press("Escape");
      }
    }
  });

  for (const route of routes) {
    test(`${viewport.name} supports touch navigation to ${route.label}`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        isMobile: true,
        hasTouch: true,
      });
      const page = await context.newPage();

      try {
        await page.goto("/gallery");
        await page.getByRole("button", { name: /Menu/ }).tap();

        const dialog = page.getByRole("dialog", { name: "Workbench navigation" });
        await expect(dialog).toBeVisible();
        await dialog.getByRole("link", { name: route.label }).tap({ noWaitAfter: true });
        await expect(page).toHaveURL(routePattern(route.href));

        if (route.href !== "/lab/raw") {
          await page.getByRole("button", { name: /Menu/ }).tap();
          await expect(dialog.getByRole("link", { name: route.label })).toHaveAttribute(
            "aria-current",
            "page",
          );
        }
      } finally {
        await context.close();
      }
    });
  }
}

for (const viewport of desktopViewports) {
  test(`${viewport.name} keeps every workbench route keyboard accessible`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Workbench" });
    await expect(nav).toBeVisible();
    await expect(page.getByRole("button", { name: /Menu/ })).toBeHidden();

    for (const route of routes) {
      const link = nav.getByRole("link", { name: route.label });
      await link.focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(routePattern(route.href));
      if (route.href !== "/lab/raw") {
        await expect(nav.getByRole("link", { name: route.label })).toHaveAttribute(
          "aria-current",
          "page",
        );
      }
    }
  });

  test(`${viewport.name} keeps every workbench route touch accessible`, async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();

    try {
      for (const route of routes) {
        await page.goto("/");
        await page
          .getByRole("navigation", { name: "Workbench" })
          .getByRole("link", { name: route.label })
          .tap({ noWaitAfter: true });
        await expect(page).toHaveURL(routePattern(route.href));
      }
    } finally {
      await context.close();
    }
  });
}
