/**
 * Dependency-direction guard — Maittê Production Proof 01.
 * Spec: docs/design/MAITTE-PRODUCTION-PROOF-01.md.
 *
 * Static source-text check, same technique as
 * `src/visual/character/__tests__/dependency-direction.test.ts`: the new
 * restoration-raster presentation code must never import from any protected
 * layer, so a future edit can't silently smuggle domain/evaluation/
 * persistence/state/content coupling into presentation-only code.
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const here = dirname(fileURLToPath(import.meta.url));

function read(relativePath: string): string {
  return readFileSync(resolve(here, relativePath), "utf8");
}

const FORBIDDEN_IMPORTS = [
  "@/game/domain",
  "@/game/evaluation",
  "@/game/persistence",
  "@/game/state",
  "@/game/content",
];

describe("illustration.tsx stays presentation-only", () => {
  const source = read("../illustration.tsx");

  it.each(FORBIDDEN_IMPORTS)("does not import %s", (forbidden) => {
    expect(source).not.toContain(forbidden);
  });
});

describe("maitteListenThinkProductionProof.ts stays presentation-only", () => {
  const source = read("../../assets/game/characters/maitteListenThinkProductionProof.ts");

  it.each(FORBIDDEN_IMPORTS)("does not import %s", (forbidden) => {
    expect(source).not.toContain(forbidden);
  });
});

describe("maitteIdleCuriousProductionProof.ts stays presentation-only (Step 2C-M1)", () => {
  const source = read("../../assets/game/characters/maitteIdleCuriousProductionProof.ts");

  it.each(FORBIDDEN_IMPORTS)("does not import %s", (forbidden) => {
    expect(source).not.toContain(forbidden);
  });

  it("does not persist motion state — no imports from game/state selectors/facts", () => {
    expect(source).not.toContain("@/game/state");
  });
});

describe("idle-curious motion reuses classes already covered by the reduced-motion override (Step 2C-M1)", () => {
  const css = read("../../styles.css");
  const reducedMotionBlock = css.slice(
    css.indexOf("@media (prefers-reduced-motion: reduce)"),
    css.indexOf("@media (prefers-reduced-motion: reduce)") + 800,
  );

  it.each(["maitte-breathe", "maitte-blink", "heart-pulse"])(
    "the %s class (reused by RestorationRasterIllustration's motion overlays) is listed in the reduced-motion override block",
    (className) => {
      expect(reducedMotionBlock).toContain(className);
    },
  );
});
