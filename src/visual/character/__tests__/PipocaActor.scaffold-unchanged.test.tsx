/**
 * PipocaActor — current vector scaffold passthrough (Step 2B-M3), REAL
 * registry, REAL PipocaArt. No mocking in this file on purpose: proves
 * PipocaActor's `state`/`animated` still reach PipocaArt's own POSES table
 * unchanged.
 */
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

import { PipocaActor } from "@/visual/character/PipocaActor";

describe("PipocaActor scaffold passthrough (unmocked)", () => {
  it("forwards state to the underlying figure so the correct pose renders", () => {
    const { container } = render(
      <svg>
        <PipocaActor state="speak" animated={false} />
      </svg>,
    );
    // "speak" pose's open-mouth path is unique to that state (only "speak"
    // uses mouth kind "open").
    expect(container.querySelector('path[d^="M-38 -52 C -34 -44, -24 -43, -19 -49"]')).toBeTruthy();
  });

  it("renders a different pose for a different state", () => {
    const { container } = render(
      <svg>
        <PipocaActor state="idle" animated={false} />
      </svg>,
    );
    // "idle" has a closed mouth — the "speak" open-mouth marker must be absent.
    expect(container.querySelector('path[d^="M-38 -52 C -34 -44, -24 -43, -19 -49"]')).toBeNull();
  });
});
