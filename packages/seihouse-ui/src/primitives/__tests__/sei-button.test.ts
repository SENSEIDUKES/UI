import { createElement, createRef, type ComponentPropsWithRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Plus } from "lucide-react";
import { describe, expect, it } from "vitest";

import { SEIButton, type SEIButtonProps } from "../sei-button";

const namedIconButtonProps = { icon: Plus, "aria-label": "Add item" } satisfies SEIButtonProps;
// @ts-expect-error Icon-only buttons must provide aria-label or aria-labelledby.
const unnamedIconButtonProps = { icon: Plus } satisfies SEIButtonProps;
void unnamedIconButtonProps;

function renderButton(props: ComponentPropsWithRef<typeof SEIButton>) {
  return renderToStaticMarkup(createElement(SEIButton, props));
}

describe("SEIButton contract", () => {
  it("defaults to a non-submitting native button and forwards native attributes", () => {
    const markup = renderButton({
      children: "Save changes",
      name: "intent",
      value: "save",
    });

    expect(markup).toContain('type="button"');
    expect(markup).toContain('name="intent"');
    expect(markup).toContain('value="save"');
    expect(markup).toContain("Save changes");
  });

  it("owns the busy and disabled contract while loading", () => {
    const markup = renderButton({
      children: "Save changes",
      loading: true,
      "aria-busy": false,
    });

    expect(markup).toContain('disabled=""');
    expect(markup).toContain('aria-busy="true"');
    expect(markup).toContain('data-loading="true"');
    expect(markup).toContain("Save changes");
  });

  it("marks every icon API as decorative", () => {
    const markup = renderButton({
      children: "Continue",
      icon: Plus,
      iconRight: createElement("svg", { "aria-label": "Arrow artwork" }),
    });

    expect(markup.match(/aria-hidden="true"/g)).toHaveLength(2);
    expect(markup).toContain('focusable="false"');
  });

  it("does not render spacing wrappers for conditional icons that resolve to false", () => {
    const markup = renderButton({
      children: "Continue",
      iconLeft: false,
      iconRight: false,
    });

    expect(markup).not.toContain("inline-flex shrink-0");
  });

  it("retains icon-only sizing when a conditional label is empty", () => {
    const markup = renderButton({
      children: false,
      icon: Plus,
      "aria-label": "Add item",
    });

    expect(markup).toContain('data-icon-only="true"');
  });

  it("accepts a DOM ref and an explicitly named icon-only button", () => {
    const ref = createRef<HTMLButtonElement>();
    const markup = renderButton({ ref, ...namedIconButtonProps });

    expect(markup).toContain('aria-label="Add item"');
    expect(markup).toContain('data-icon-only="true"');
  });
});
