import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  SEIBottomNavigation,
  type SEIBottomNavigationItem,
  type SEIBottomNavigationProps,
} from "../sei-bottom-navigation";

const baseItems = [
  { id: "home", label: "Home", icon: createElement("span") },
  { id: "vault", label: "Vault", icon: createElement("span"), active: true },
  { id: "dojo", label: "Dojo", icon: createElement("span"), onSelect: () => undefined },
] satisfies SEIBottomNavigationItem[];

function renderNavigation(props?: Partial<SEIBottomNavigationProps>) {
  return renderToStaticMarkup(
    createElement(SEIBottomNavigation, { "aria-label": "Demo app", items: baseItems, ...props }),
  );
}

describe("SEIBottomNavigation contract", () => {
  it("renders a labelled navigation landmark", () => {
    const markup = renderNavigation();

    expect(markup).toContain("<nav");
    expect(markup).toContain('aria-label="Demo app"');
  });

  it("marks only the active item as the current page", () => {
    const markup = renderNavigation();
    const buttons = markup.split("<button").slice(1);

    expect(markup.match(/aria-current="page"/g)).toHaveLength(1);
    expect(buttons).toHaveLength(baseItems.length);
    const activeButton = buttons.find((button) => button.includes("Vault"));
    const inactiveButton = buttons.find((button) => button.includes("Home"));
    expect(activeButton).toContain('aria-current="page"');
    expect(activeButton).toContain('data-selected="true"');
    expect(inactiveButton).not.toContain("aria-current");
    expect(inactiveButton).not.toContain("data-selected");
  });

  it("renders every destination as a real button with its label", () => {
    const markup = renderNavigation();

    expect(markup.match(/<button/g)).toHaveLength(baseItems.length);
    expect(markup).toContain('type="button"');
    for (const item of baseItems) {
      expect(markup).toContain(item.label);
    }
  });

  it("pads for the mobile bottom safe-area inset on a sticky glass surface", () => {
    const markup = renderNavigation();

    expect(markup).toContain("sticky bottom-0");
    expect(markup).toContain("pb-[calc(0.5rem+var(--sh-safe-bottom))]");
    expect(markup).toContain("backdrop-blur-[var(--sh-blur-md)]");
  });
});
