import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

function contrastResults(page: Page) {
  return new AxeBuilder({ page }).withRules(["color-contrast"]).analyze();
}

async function expectNoContrastViolations(page: Page, path: string) {
  await page.goto(path);
  const results = await contrastResults(page);

  expect(
    results.violations,
    JSON.stringify(
      results.violations.flatMap((violation) =>
        violation.nodes.map((node) => ({
          id: violation.id,
          target: node.target,
          summary: node.failureSummary,
        })),
      ),
      null,
      2,
    ),
  ).toEqual([]);
}

function previewPath(slug: string, variant: string, canvas: "dark" | "light") {
  const query = new URLSearchParams({
    canvas,
    mockIndex: "0",
    previewId: `contrast-${slug}-${variant}-${canvas}`,
    variant,
  });

  return `/workbench/preview/${slug}?${query.toString()}`;
}

test.describe("semantic theme contrast", () => {
  for (const path of ["/", "/workbench", "/contexts", "/lab/raw"]) {
    test(`${path} has no color contrast violations`, async ({ page }) => {
      await expectNoContrastViolations(page, path);
    });
  }

  const lightVariants = [
    ["card", "light"],
    ["panel", "light"],
    ["album-card", "light"],
    ["artist-card", "light"],
    ["dojo-module-card", "light"],
    ["metric-card", "light"],
    ["player-shell", "light"],
    ["page-header", "default"],
    ["showcase-hero", "light"],
    ["showcase-block", "light"],
  ] as const;

  for (const [slug, variant] of lightVariants) {
    test(`${slug} ${variant} is readable on the light canvas`, async ({ page }) => {
      await expectNoContrastViolations(page, previewPath(slug, variant, "light"));
      await expect(page.getByTestId("isolated-preview-document")).toHaveAttribute(
        "data-theme",
        "light",
      );
    });
  }

  const darkCharacterVariants = [
    ["card", "dark"],
    ["card", "glass-test"],
    ["panel", "dark"],
    ["panel", "glass-test"],
    ["album-card", "media-test"],
    ["player-shell", "expanded"],
    ["showcase-hero", "media"],
    ["showcase-block", "glass-test"],
  ] as const;

  for (const [slug, variant] of darkCharacterVariants) {
    test(`${slug} ${variant} keeps accessible dark contrast`, async ({ page }) => {
      await expectNoContrastViolations(page, previewPath(slug, variant, "dark"));
    });
  }

  for (const canvas of ["dark", "light"] as const) {
    test(`default card and panel inherit the ${canvas} canvas theme`, async ({ page }) => {
      await expectNoContrastViolations(page, previewPath("card", "default", canvas));
      await expectNoContrastViolations(page, previewPath("panel", "default", canvas));
    });

    test(`soft button hover keeps accessible ${canvas} contrast`, async ({ page }) => {
      await page.goto(previewPath("button", "soft", canvas));
      const button = page.getByRole("button").first();
      await button.hover();
      await expect(button).toHaveCSS(
        "background-color",
        canvas === "dark" ? "rgb(22, 70, 117)" : "rgb(198, 224, 255)",
      );

      const results = await contrastResults(page);
      expect(results.violations).toEqual([]);
    });
  }

  test("theme scopes expose matching color-scheme and focus offsets", async ({ page }) => {
    for (const canvas of ["dark", "light"] as const) {
      await page.goto(previewPath("button", "solid", canvas));
      const theme = page.getByTestId("isolated-preview-document");
      const semantics = await theme.evaluate((element) => {
        const styles = getComputedStyle(element);
        return {
          colorScheme: styles.colorScheme,
          documentTheme: document.documentElement.dataset.theme,
          focusOffset: styles.getPropertyValue("--sh-focus-offset").trim(),
        };
      });

      expect(semantics).toEqual({
        colorScheme: canvas,
        documentTheme: canvas,
        focusOffset: canvas === "light" ? "#fff" : "#0a0a0c",
      });
    }
  });

  test("light theme reaches portaled interactive surfaces", async ({ page }) => {
    await page.goto(previewPath("menu", "default", "light"));
    await page.getByRole("button", { name: /Open menu/i }).click();
    const menu = page.getByRole("menu");
    await expect(menu).toBeVisible();
    await expect(menu).toHaveCSS("color-scheme", "light");
    await expect(menu).not.toHaveAttribute("data-starting-style");
    await expect(menu).toHaveCSS("opacity", "1");

    const destructiveItem = menu.getByRole("menuitem", { name: "Archive fragment" });
    await destructiveItem.hover();
    await expect(destructiveItem).toHaveCSS("color", "rgb(138, 36, 29)");
    await expect(destructiveItem).toHaveCSS("background-color", "rgb(255, 229, 226)");

    const results = await contrastResults(page);
    expect(results.violations).toEqual([]);
  });
});
