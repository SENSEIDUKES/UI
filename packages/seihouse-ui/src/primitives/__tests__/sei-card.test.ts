import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SEICard, type SEICardProps } from "../sei-card";

const visualCardProps = {
  title: "Visual card",
  elevateOnHover: true,
} satisfies SEICardProps;

const actionCardProps = {
  interactive: true,
  title: "Action card",
  onClick: () => undefined,
} satisfies SEICardProps;

// @ts-expect-error Interactive cards need either an href or an onClick action.
const incompleteActionCardProps = { interactive: true, title: "Incomplete" } satisfies SEICardProps;
void incompleteActionCardProps;

function renderCard(props: SEICardProps) {
  return renderToStaticMarkup(createElement(SEICard, props));
}

describe("SEICard contract", () => {
  it("keeps visual hover elevation static and out of the tab order", () => {
    const markup = renderCard(visualCardProps);

    expect(markup).toContain("<article");
    expect(markup).toContain("hover:-translate-y-1");
    expect(markup).not.toContain('role="button"');
    expect(markup).not.toContain("tabindex");
  });

  it("renders actionable cards with a keyboard-operable button contract", () => {
    const markup = renderCard(actionCardProps);

    expect(markup).toContain('role="button"');
    expect(markup).toContain('tabindex="0"');
    expect(markup).toContain("focus-visible:ring-2");
    expect(markup).toContain("cursor-pointer");
  });

  it("uses native link semantics when an interactive card has an href", () => {
    const markup = renderCard({
      interactive: true,
      href: "/library",
      title: "Open library",
    });

    expect(markup).toContain('<a href="/library"');
    expect(markup).not.toContain('role="button"');
    expect(markup).toContain("focus-visible:ring-2");
  });

  it("removes disabled action cards from keyboard navigation", () => {
    const markup = renderCard({
      interactive: true,
      disabled: true,
      title: "Unavailable action",
      onClick: () => undefined,
    });

    expect(markup).toContain('tabindex="-1"');
    expect(markup).toContain('aria-disabled="true"');
    expect(markup).toContain("aria-disabled:pointer-events-none");
  });
});
