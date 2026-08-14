/**
 * PipocaActor — key-resolution guard (Step 2B-M3), mocked registry.
 * Spec: docs/design/VISUAL-ASSET-CONTRACT.md, docs/design/CHARACTER-ART.md.
 *
 * `vi.mock` hoists to the top of the WHOLE file, not to a describe block, so
 * this file is dedicated to the mocked-registry assertions only. The real,
 * unmocked-registry passthrough assertions live in the sibling file
 * `PipocaActor.scaffold-unchanged.test.tsx` on purpose (same split already
 * used by BurpeeActor's tests).
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

vi.mock("@/visual/assetRegistry", () => ({
  getAsset: (key: string) => ({
    kind: "vector-component" as const,
    Component: () => <g data-testid={`resolved-${key}`} />,
  }),
}));

import { PipocaActor } from "@/visual/character/PipocaActor";
import type { CompanionActingState } from "@/visual/character/acting";

const STATES: CompanionActingState[] = [
  "idle",
  "speak",
  "watch",
  "success-reaction",
  "retry-reaction",
];

describe("PipocaActor key resolution", () => {
  it("resolves exactly one character.pipoca.<state> key per acting state", () => {
    for (const state of STATES) {
      const { container, unmount } = render(<PipocaActor state={state} />);
      expect(
        container.querySelector(`[data-testid="resolved-character.pipoca.${state}"]`),
      ).toBeTruthy();
      unmount();
    }
  });

  it("derives the key from state alone — unrelated props never change which key is requested", () => {
    const { container: a, unmount: unmountA } = render(
      <PipocaActor state="speak" animated={false} />,
    );
    expect(a.querySelector('[data-testid="resolved-character.pipoca.speak"]')).toBeTruthy();
    unmountA();

    const { container: b } = render(<PipocaActor state="speak" animated={true} />);
    expect(b.querySelector('[data-testid="resolved-character.pipoca.speak"]')).toBeTruthy();
  });

  // PipocaActorProps has no key/assetKey/petId field at all — a caller
  // cannot represent a mismatch between Pipoca identity, logical key and
  // acting state even at compile time, only `state` is accepted.
});
