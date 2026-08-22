import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import {
  isSEIExperience,
  SEI_DEFAULT_EXPERIENCE,
  seiExperienceMeta,
  seiExperiences,
} from "../experience";

const tokens = readFileSync(fileURLToPath(new URL("../tokens.css", import.meta.url)), "utf8");

describe("experiences", () => {
  it("exposes the three expressions with Default first", () => {
    expect(seiExperiences).toEqual(["default", "sea", "sen"]);
    expect(SEI_DEFAULT_EXPERIENCE).toBe("default");
  });

  it("guards unknown values, including near-misses", () => {
    expect(isSEIExperience("sea")).toBe(true);
    expect(isSEIExperience("SEA")).toBe(false);
    expect(isSEIExperience("")).toBe(false);
    expect(isSEIExperience(undefined)).toBe(false);
    expect(isSEIExperience(null)).toBe(false);
  });

  it("describes every experience", () => {
    for (const experience of seiExperiences) {
      const meta = seiExperienceMeta[experience];
      expect(meta.name.length).toBeGreaterThan(0);
      expect(meta.register.length).toBeGreaterThan(0);
      expect(meta.description.length).toBeGreaterThan(0);
    }
  });
});

describe("experience tokens", () => {
  it("defines a seed block for every experience", () => {
    for (const experience of seiExperiences) {
      expect(tokens).toContain(`[data-experience="${experience}"] {`);
    }
  });

  it("keeps every experience self-contained across both theme contexts", () => {
    const blocks = Object.fromEntries(
      seiExperiences.map((experience) => {
        const start = tokens.indexOf(`[data-experience="${experience}"] {`);
        return [experience, tokens.slice(start, tokens.indexOf("\n}", start))];
      }),
    );

    // Seeds are read by shared mapping blocks, so a seed missing from one
    // experience would silently fall through to another experience's value.
    const seedNames = (block: string) => new Set(block.match(/--shx-[\w-]+/g) ?? []);
    const reference = seedNames(blocks.default);
    expect(reference.size).toBeGreaterThan(0);
    for (const experience of seiExperiences) {
      expect([...seedNames(blocks[experience])].sort()).toEqual([...reference].sort());
    }

    // Each seed exists in a dark and a light flavour.
    for (const seed of reference) {
      const twin = seed.endsWith("-dark")
        ? `${seed.slice(0, -"-dark".length)}-light`
        : `${seed.slice(0, -"-light".length)}-dark`;
      expect(reference.has(twin)).toBe(true);
    }
  });

  it("scopes the mapping so pages without an experience are untouched", () => {
    expect(tokens).toContain(
      '[data-experience]:not([data-theme="light"]):not(.sh-theme-light),\n[data-experience] :is([data-theme="dark"], .sh-theme-dark) {',
    );
    expect(tokens).toContain(
      '[data-experience]:is([data-theme="light"], .sh-theme-light),\n[data-experience] :is([data-theme="light"], .sh-theme-light) {',
    );
  });
});
