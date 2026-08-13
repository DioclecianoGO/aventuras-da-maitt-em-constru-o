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
  /**
   * Evaluators must stay pure: no React, no state, no content coupling, no
   * presentation/asset coupling (docs/design/ASSET-PRODUCTION-PIPELINE.md).
   *
   * The presentation-isolation patterns live in THIS SAME rule config, not a
   * later block matching the same files: ESLint flat config does not merge
   * a rule's options across separately-matching config objects — the last
   * config object to set `no-restricted-imports` for a given file wins
   * outright and replaces every earlier one's options for that file. A
   * later shared "domain + evaluation + persistence + state" block would
   * silently discard the restrictions below instead of adding to them.
   */
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
            {
              group: ["@/visual/**", "@/assets/**"],
              message:
                "Response Evaluators must not import presentation/asset code. Visual configuration depends on the domain, never the other way around.",
            },
          ],
        },
      ],
    },
  },
  /**
   * Domain schemas/types must not depend on UI, state, or presentation/asset
   * code. Same flat-config merge caveat as the evaluation block above: the
   * presentation-isolation patterns are added to this rule config directly.
   */
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
            {
              group: ["@/visual/**", "@/assets/**"],
              message:
                "The domain layer must not import presentation/asset code. Visual configuration depends on the domain, never the other way around.",
            },
          ],
        },
      ],
    },
  },
  /**
   * Presentation isolation (Step 1, production presentation seam):
   * docs/technical/ARCHITECTURE.md, docs/design/ASSET-PRODUCTION-PIPELINE.md.
   * Persistence and state must stay unaware of the concrete art/asset used to
   * render anything. Domain and evaluation carry the equivalent restriction
   * inside their own dedicated rule blocks above (see the merge caveat
   * there) rather than here, so this block intentionally does NOT list
   * "src/game/domain/**" or "src/game/evaluation/**".
   *
   * This is the first `no-restricted-imports` config Step 1 introduces for
   * persistence/state — unlike templates/evaluation/domain (which already
   * had their own config before Step 1 and, as pre-existing behaviour, are
   * out of scope here), persistence/state previously had none of their own
   * and so inherited the base config's `paths: ["server-only"]` restriction
   * by fall-through. Defining `no-restricted-imports` here without also
   * repeating that `paths` entry would replace it, not add to it (the same
   * flat-config merge behaviour noted above) — so it is repeated verbatim
   * below alongside the new presentation-isolation `patterns`.
   */
  {
    files: ["src/game/persistence/**/*.{ts,tsx}", "src/game/state/**/*.{ts,tsx}"],
    rules: {
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
          patterns: [
            {
              group: ["@/visual/**", "@/assets/**"],
              message:
                "Persistence and state must not import presentation/asset code. Visual configuration depends on the domain, never the other way around.",
            },
          ],
        },
      ],
    },
  },
  eslintPluginPrettier,
);
