import { createElement, type ComponentProps } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ShowcaseHero } from "../showcase-hero";

function renderHero(props: ComponentProps<typeof ShowcaseHero> = {}) {
  return renderToStaticMarkup(
    createElement(
      "main",
      null,
      createElement("h1", null, "Host page title"),
      createElement(ShowcaseHero, { headline: "Embedded hero", ...props }),
    ),
  );
}

describe("ShowcaseHero heading contract", () => {
  it("defaults to h2 when embedded beneath a page heading", () => {
    const markup = renderHero();

    expect(markup).toContain("<h1>Host page title</h1>");
    expect(markup).toMatch(/<h2[^>]*>Embedded hero<\/h2>/);
  });

  it("allows a true page hero to opt into h1", () => {
    const markup = renderHero({ headingLevel: 1 });

    expect(markup.match(/<h1[^>]*>Embedded hero<\/h1>/g)).toHaveLength(1);
  });

  it("supports an explicit heading element alias", () => {
    const markup = renderHero({ headingAs: "h3", headingLevel: 1 });

    expect(markup).toMatch(/<h3[^>]*>Embedded hero<\/h3>/);
    expect(markup).not.toMatch(/<h1[^>]*>Embedded hero<\/h1>/);
  });
});
