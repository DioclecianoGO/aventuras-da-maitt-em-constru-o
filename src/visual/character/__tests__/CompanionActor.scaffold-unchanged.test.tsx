/**
 * CompanionActor — fallback/Burpee equivalence (Step 2B-M2), REAL registry,
 * REAL CompanionArt/BurpeeArt. No mocking in this file on purpose: proves the
 * migration from a direct <CompanionArt> render to <CompanionActor> did not
 * change what either path renders.
 */
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

import { CompanionActor } from "@/visual/character/CompanionActor";
import { CompanionArt } from "@/assets/game/characters/CompanionArt";
import { BurpeeArt } from "@/assets/game/characters/pets/BurpeeArt";
import { PipocaArt } from "@/assets/game/characters/pets/PipocaArt";
import { WillArt } from "@/assets/game/characters/pets/WillArt";
import { LyraArt } from "@/assets/game/characters/pets/LyraArt";

describe("CompanionActor scaffold passthrough (unmocked)", () => {
  it("Burpee path renders identically to calling BurpeeArt directly", () => {
    const { container: viaActor } = render(
      <svg>
        <CompanionActor petId="burpee" state="success-reaction" animated={false} />
      </svg>,
    );
    const { container: direct } = render(
      <svg>
        <BurpeeArt state="success-reaction" animated={false} />
      </svg>,
    );
    expect(viaActor.querySelector("svg")?.innerHTML).toBe(direct.querySelector("svg")?.innerHTML);
  });

  it("Pipoca path renders identically to calling PipocaArt directly", () => {
    const { container: viaActor } = render(
      <svg>
        <CompanionActor petId="pipoca" state="success-reaction" animated={false} />
      </svg>,
    );
    const { container: direct } = render(
      <svg>
        <PipocaArt state="success-reaction" animated={false} />
      </svg>,
    );
    expect(viaActor.querySelector("svg")?.innerHTML).toBe(direct.querySelector("svg")?.innerHTML);
  });

  it("Will path renders identically to calling WillArt directly", () => {
    const { container: viaActor } = render(
      <svg>
        <CompanionActor petId="will" state="success-reaction" animated={false} />
      </svg>,
    );
    const { container: direct } = render(
      <svg>
        <WillArt state="success-reaction" animated={false} />
      </svg>,
    );
    expect(viaActor.querySelector("svg")?.innerHTML).toBe(direct.querySelector("svg")?.innerHTML);
  });

  it("Lyra path renders identically to calling LyraArt directly", () => {
    const { container: viaActor } = render(
      <svg>
        <CompanionActor petId="lyra" state="success-reaction" animated={false} />
      </svg>,
    );
    const { container: direct } = render(
      <svg>
        <LyraArt state="success-reaction" animated={false} />
      </svg>,
    );
    expect(viaActor.querySelector("svg")?.innerHTML).toBe(direct.querySelector("svg")?.innerHTML);
  });

  it("fallback path renders identically to calling CompanionArt directly for a deliberately-unconfigured pet", () => {
    const { container: viaActor } = render(
      <svg>
        <CompanionActor petId="unconfigured-pet" state="idle" animated={false} />
      </svg>,
    );
    const { container: direct } = render(
      <svg>
        <CompanionArt petId="unconfigured-pet" state="idle" animated={false} />
      </svg>,
    );
    expect(viaActor.querySelector("svg")?.innerHTML).toBe(direct.querySelector("svg")?.innerHTML);
  });

  it("fallback path still renders identically when petId is absent (unconfigured companion)", () => {
    const { container: viaActor } = render(
      <svg>
        <CompanionActor state="idle" animated={false} />
      </svg>,
    );
    const { container: direct } = render(
      <svg>
        <CompanionArt state="idle" animated={false} />
      </svg>,
    );
    expect(viaActor.querySelector("svg")?.innerHTML).toBe(direct.querySelector("svg")?.innerHTML);
  });
});
