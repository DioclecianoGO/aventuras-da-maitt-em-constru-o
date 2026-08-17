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
