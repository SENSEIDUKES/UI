import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  SEINavigationDrawerPanel,
  type SEINavigationDrawerPanelProps,
  type SEINavigationDrawerSection,
} from "../sei-navigation-drawer";

const baseSections = [
  {
    id: "browse",
    label: "Browse",
    items: [
      { id: "home", label: "Home", icon: createElement("span") },
      { id: "vault", label: "Vault", icon: createElement("span"), active: true },
    ],
  },
  {
    id: "create",
    items: [{ id: "dojo", label: "Dojo", onSelect: () => undefined }],
  },
] satisfies SEINavigationDrawerSection[];

function renderPanel(props?: Partial<SEINavigationDrawerPanelProps>) {
  return renderToStaticMarkup(
    createElement(SEINavigationDrawerPanel, {
      "aria-label": "Demo app",
      sections: baseSections,
      ...props,
    }),
  );
}

describe("SEINavigationDrawerPanel contract", () => {
  it("renders a labelled navigation landmark with grouped sections", () => {
    const markup = renderPanel();

    expect(markup).toContain("<nav");
    expect(markup).toContain('aria-label="Demo app"');
    expect(markup).toContain("Browse");
    expect(markup).toContain('role="group"');
  });

  it("marks only the active item as the current page", () => {
    const markup = renderPanel();

    expect(markup.match(/aria-current="page"/g)).toHaveLength(1);
    const activeButton = markup.split("<button").find((button) => button.includes("Vault"));
    const inactiveButton = markup.split("<button").find((button) => button.includes("Home"));
    expect(activeButton).toContain('aria-current="page"');
    expect(activeButton).toContain('data-selected="true"');
    expect(inactiveButton).not.toContain("aria-current");
    expect(inactiveButton).not.toContain("data-selected");
  });

  it("renders every destination as a real button with its label", () => {
    const markup = renderPanel();

    expect(markup.match(/<button/g)).toHaveLength(3);
    expect(markup).toContain('type="button"');
    for (const section of baseSections) {
      for (const item of section.items) {
        expect(markup).toContain(item.label);
      }
    }
  });

  it("renders account details in the header when provided", () => {
    const markup = renderPanel({
      account: { name: "Sensei Dukes", detail: "sensei@seihouse.app" },
    });

    expect(markup).toContain("Sensei Dukes");
    expect(markup).toContain("sensei@seihouse.app");
    // Initials avatar fallback.
    expect(markup).toContain("SD");
  });

  it("renders a close button only when onClose is provided", () => {
    expect(renderPanel()).not.toContain("Close navigation");
    expect(renderPanel({ onClose: () => undefined })).toContain('aria-label="Close navigation"');
  });

  it("pins settings actions to a footer with bottom safe-area padding", () => {
    const markup = renderPanel({
      actions: [
        { id: "settings", label: "Settings" },
        { id: "sign-out", label: "Sign out" },
      ],
    });

    expect(markup).toContain("Settings");
    expect(markup).toContain("Sign out");
    expect(markup).toContain("pb-[calc(0.75rem+var(--sh-safe-bottom))]");
    expect(renderPanel()).not.toContain("--sh-safe-bottom");
  });
});
