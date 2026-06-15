// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";

export default [{
  ignores: [
    "**/.next/**",
    "**/node_modules/**",
    "**/out/**",
    "**/dist/**",
    "**/coverage/**",
    "**/playwright-report/**",
    "**/test-results/**",
    "archive/**",
    "**/next-env.d.ts",
    "*.tsbuildinfo",
  ],
}, ...nextCoreWebVitals, ...tseslint.configs.recommended, {
  rules: {
    "@next/next/no-img-element": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "import/no-anonymous-default-export": "off",
    "react-hooks/set-state-in-effect": "off",
    "react/no-unescaped-entities": "off",
  },
}, ...storybook.configs["flat/recommended"]];
