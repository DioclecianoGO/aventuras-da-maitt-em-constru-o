/**
 * MaitteActor — key-resolution guard (Step 2B-M1), mocked registry.
 * Spec: docs/design/VISUAL-ASSET-CONTRACT.md, docs/design/CHARACTER-ART.md.
 *
 * `vi.mock` hoists to the top of the WHOLE file, not to a describe block, so
 * this file is dedicated to the mocked-registry assertions only. The real,
 * unmocked-registry passthrough assertions live in the sibling file
 * `MaitteActor.scaffold-unchanged.test.tsx` on purpose.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

vi.mock("@/visual/assetRegistry", () => ({
  // The mock's return value embeds the REQUESTED key in a data-testid, so a
  // render assertion doubles as proof of which key was actually resolved.
  getAsset: (key: string) => ({
    kind: "vector-component" as const,
    Component: () => <g data-testid={`resolved-${key}`} />,
  }),
}));

import { MaitteActor } from "@/visual/character/MaitteActor";
import type { MaitteActingState } from "@/visual/character/acting";

const STATES: MaitteActingState[] = [
  "idle-curious",
  "listen-think",
  "success",
  "retry-thinking",
  "move",
];

describe("MaitteActor key resolution", () => {
  it("resolves exactly one character.maitte.<state> key per acting state", () => {
    for (const state of STATES) {
      const { container, unmount } = render(
        <MaitteActor state={state} restored={new Set(["heart"])} />,
      );
      expect(
        container.querySelector(`[data-testid="resolved-character.maitte.${state}"]`),
      ).toBeTruthy();
      unmount();
    }
  });

  it("derives the key from state alone — unrelated props never change which key is requested", () => {
    const { container: a, unmount: unmountA } = render(
      <MaitteActor state="success" restored={new Set(["heart"])} animated={false} />,
    );
    expect(a.querySelector('[data-testid="resolved-character.maitte.success"]')).toBeTruthy();
    unmountA();

    const { container: b } = render(
      <MaitteActor
        state="success"
        restored={new Set(["heart", "glasses", "shirt"])}
        animated={true}
        title="algo diferente"
      />,
    );
    // Same state, wildly different other props -> same resolved key both times.
    // MaitteActorProps also has no key/assetKey prop at all: a caller cannot
    // supply one even at compile time, only `state`.
    expect(b.querySelector('[data-testid="resolved-character.maitte.success"]')).toBeTruthy();
  });
});
