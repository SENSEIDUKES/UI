import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SEIFilterBar, type SEIFilterBarProps } from "../sei-filter-bar";

function renderFilterBar(
  props: Partial<SEIFilterBarProps> & Record<string, unknown> = {},
  children = createElement("span", null, "Filter 1"),
) {
  return renderToStaticMarkup(createElement(SEIFilterBar, props as SEIFilterBarProps, children));
}

describe("SEIFilterBar component", () => {
  it("renders children correctly", () => {
    const markup = renderFilterBar({}, createElement("span", null, "Active Filters"));
    expect(markup).toContain("Active Filters");
  });

  it("applies role='search' and aria-label when aria-label is provided", () => {
    const markup = renderFilterBar({ "aria-label": "Search filters" });
    expect(markup).toContain('role="search"');
    expect(markup).toContain('aria-label="Search filters"');
  });

  it("does not apply role='search' when aria-label is not provided", () => {
    const markup = renderFilterBar();
    expect(markup).not.toContain('role="search"');
    expect(markup).not.toContain("aria-label=");
  });

  it("renders result count formatted correctly for singular, plural, and zero", () => {
    const markup1 = renderFilterBar({ resultCount: 1 });
    expect(markup1).toContain("1 result");
    expect(markup1).not.toContain("1 results");

    const markupPlural = renderFilterBar({ resultCount: 5 });
    expect(markupPlural).toContain("5 results");

    const markupZero = renderFilterBar({ resultCount: 0 });
    expect(markupZero).toContain("0 results");
  });

  it("does not render result count element when resultCount is undefined", () => {
    const markup = renderFilterBar();
    expect(markup).not.toContain('aria-live="polite"');
    expect(markup).not.toContain("result");
  });

  it("renders Clear button when onClear handler is provided", () => {
    const onClear = () => {};
    const markup = renderFilterBar({ onClear });
    expect(markup).toContain("<button");
    expect(markup).toContain('type="button"');
    expect(markup).toContain("Clear");
  });

  it("does not render Clear button when onClear is not provided", () => {
    const markup = renderFilterBar();
    expect(markup).not.toContain("<button");
    expect(markup).not.toContain("Clear");
  });

  it("merges custom className and passes through HTML attributes", () => {
    const markup = renderFilterBar({
      className: "custom-class",
      "data-testid": "filter-bar-test",
    });
    expect(markup).toContain("custom-class");
    expect(markup).toContain('data-testid="filter-bar-test"');
  });
});
