/**
 * Stable stone identity — the Phase 1B.1 regression guard.
 * Spec: docs/design/PHASE-1B-1-VISUAL-POLISH.md (Correction 3).
 */
import { describe, expect, it } from "vitest";

import { buildStoneIdentities, getStoneIdentity } from "@/visual/puzzle/stoneIdentity";

const AUTHORED = ["opt-3", "opt-1", "opt-4", "opt-2"];

describe("stone visual identity", () => {
  it("keeps the same silhouette for a stone regardless of its current position", () => {
    const identities = buildStoneIdentities(AUTHORED);

    // The child drags "opt-4" from position 2 to position 0, twice over.
    const arrangements = [
      ["opt-3", "opt-1", "opt-4", "opt-2"],
      ["opt-4", "opt-3", "opt-1", "opt-2"],
      ["opt-2", "opt-1", "opt-3", "opt-4"],
    ];

    for (const id of AUTHORED) {
      const seen = arrangements.map(() => getStoneIdentity(identities, id));
      for (const identity of seen) {
        expect(identity).toEqual(seen[0]);
      }
    }
  });

  it("gives the four demonstrated stones visibly different art", () => {
    const identities = buildStoneIdentities(AUTHORED);
    const signatures = AUTHORED.map((id) => {
      const identity = getStoneIdentity(identities, id);
      return `${identity.shape}/${identity.detail}/${identity.tilt}`;
    });
    expect(new Set(signatures).size).toBe(AUTHORED.length);
  });

  it("does not derive the art from the label, the value or the accepted order", () => {
    // Same authored positions, completely different ids/labels => same art.
    const a = buildStoneIdentities(["opt-3", "opt-1", "opt-4", "opt-2"]);
    const b = buildStoneIdentities(["alpha", "beta", "gamma", "delta"]);
    expect(Object.values(a)).toEqual(Object.values(b));

    // The ascending accepted order does not produce ascending shape indices.
    const ascending = ["opt-1", "opt-2", "opt-3", "opt-4"].map(
      (id) => getStoneIdentity(a, id).shape,
    );
    expect(ascending).not.toEqual([...ascending].sort((x, y) => x - y));
  });

  it("degrades to a neutral stone for an unknown option id", () => {
    expect(getStoneIdentity({}, "missing")).toEqual({ shape: 0, detail: 0, tilt: 0 });
  });
});
