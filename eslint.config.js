import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".output", ".vinxi"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "server-only",
              message:
                "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  /**
   * Architectural boundary enforcement (docs/technical/ARCHITECTURE.md, ADR-009).
   * Puzzle Templates own interaction only: they must not evaluate correctness,
   * read curriculum, or reach into game state.
   */
  {
    files: ["src/game/templates/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/game/evaluation/*",
                "@/game/state/*",
                "@/game/content/*",
                "@/game/domain/schemas",
                "@/game/registries*",
              ],
              message:
                "Puzzle Templates own interaction only. They emit a UserResponse and must not import evaluation, curriculum, content or game state (ADR-009).",
            },
          ],
        },
      ],
    },
  },
  /** Evaluators must stay pure: no React, no state, no content coupling. */
  {
    files: ["src/game/evaluation/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["react", "react-dom", "@/game/state/*", "@/game/templates/*", "@/components/*"],
              message:
                "Response Evaluators must be pure and UI-independent so they can be unit tested without rendering.",
            },
          ],
        },
      ],
    },
  },
  /** Domain schemas/types must not depend on UI or state. */
  {
    files: ["src/game/domain/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["react", "react-dom", "@/components/*", "@/game/state/*", "@/routes/*"],
              message: "The domain layer must stay free of UI and state dependencies.",
            },
          ],
        },
      ],
    },
  },
  eslintPluginPrettier,
);
