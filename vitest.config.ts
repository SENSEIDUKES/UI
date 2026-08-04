import { defineConfig } from "vitest/config";

/**
 * Unit tests for behavior/state helpers in @seihouse/ui (fuzzy match, recent
 * list, class merge). Scoped to package `*.test.ts` files so the Playwright
 * specs under `test/` are never picked up here.
 */
export default defineConfig({
  esbuild: {
    jsx: "automatic",
  },
  test: {
    include: ["packages/**/*.test.ts"],
    environment: "node",
  },
});
