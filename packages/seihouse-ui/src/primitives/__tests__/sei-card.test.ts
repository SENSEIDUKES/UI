import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  SEICard,
  SEICardActions,
  SEICardBody,
  SEICardContent,
  SEICardDescription,
  SEICardFooter,
  SEICardHeader,
  SEICardMedia,
  SEICardMetadata,
  type SEICardHeaderProps,
  type SEICardProps,
} from "../sei-card";

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

// @ts-expect-error SEICardHeader uses explicit regions instead of arbitrary children.
const unsupportedHeaderChildren = { children: "Unexpected" } satisfies SEICardHeaderProps;
void unsupportedHeaderChildren;

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

  it("removes disabled link destinations", () => {
    const markup = renderCard({
      interactive: true,
      disabled: true,
      href: "/library",
      title: "Unavailable library",
    });

    expect(markup).toContain("<a");
    expect(markup).not.toContain('href="/library"');
    expect(markup).toContain('aria-disabled="true"');
    expect(markup).toContain('tabindex="-1"');
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

  it("keeps the convenience API while exposing identity, media, and accent regions", () => {
    const markup = renderCard({
      accentColor: "#f59e0b",
      padding: "lg",
      eyebrow: "Legendary relic",
      icon: createElement("span", null, "✦"),
      title: "Compass of Returning Stars",
      titleAs: "h2",
      description: "A relic that remembers every road home.",
      metadata: "+120 Qi",
      media: createElement("div", { "data-state": "sigil" }, "Relic sigil"),
      actions: createElement("button", { type: "button" }, "Reveal"),
      footer: "First claim reward",
    });

    expect(markup).toContain('data-accent="true"');
    expect(markup).toContain("--sh-card-accent:#f59e0b");
    expect(markup).toContain('data-slot="card-media"');
    expect(markup).toContain("-m-6");
    expect(markup).toContain('data-slot="card-icon"');
    expect(markup).toContain('<h2 data-slot="card-title"');
    expect(markup).toContain('data-slot="card-metadata"');
    expect(markup).toContain('data-slot="card-actions"');
    expect(markup).toContain('data-slot="card-footer"');
  });

  it("supports product-specific composition without forcing one content order", () => {
    const markup = renderToStaticMarkup(
      createElement(
        SEICard,
        { padding: "none", accentColor: "#04acff" },
        createElement(SEICardMedia, { as: "figure" }, "Generated image placeholder"),
        createElement(
          SEICardContent,
          { padding: "md" },
          createElement(SEICardHeader, {
            eyebrow: "Reveal · Location",
            title: "The Ninth Archive",
            titleAs: "h4",
          }),
          createElement(
            SEICardBody,
            null,
            createElement(
              SEICardDescription,
              { as: "blockquote" },
              "Its doors only open for names the Library remembers.",
            ),
          ),
          createElement(SEICardMetadata, null, "3 known encounters", "Codex linked"),
          createElement(
            SEICardActions,
            null,
            createElement("button", { type: "button" }, "Listen"),
            createElement("button", { type: "button" }, "Open Codex"),
          ),
          createElement(SEICardFooter, null, "Last revealed in Chapter 12"),
        ),
      ),
    );

    expect(markup).toContain('<figure data-slot="card-media"');
    expect(markup).toContain('data-slot="card-content"');
    expect(markup).toContain('<h4 data-slot="card-title"');
    expect(markup).toContain('<blockquote data-slot="card-description"');
    expect(markup).toContain('data-slot="card-body"');
    expect(markup).toContain('data-slot="card-metadata"');
    expect(markup).toContain('data-slot="card-actions"');
    expect(markup).toContain('data-slot="card-footer"');
  });

  it("does not create empty regions for conditionally absent React content", () => {
    const markup = renderCard({
      eyebrow: [false, null, "", "   "],
      title: [undefined, "", "\n\t"],
      actions: [false, null],
      footer: ["", "  "],
    });

    expect(markup).not.toContain('data-slot="card-header"');
    expect(markup).not.toContain('data-slot="card-footer"');
  });
});
