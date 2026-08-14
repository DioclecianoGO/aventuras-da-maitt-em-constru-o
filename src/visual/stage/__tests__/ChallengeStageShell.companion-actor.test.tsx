/**
 * ChallengeStageShell — companion rendering flows through CompanionActor and
 * stays petId-agnostic (Step 2B-M2). Real, unmocked registry — proves the
 * migration away from a direct <CompanionArt> render preserved this call
 * site's own pre-existing state-selection logic (the `speaking` override)
 * and did not hardcode Burpee into the shell itself.
 */
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

import { ChallengeStageShell } from "@/visual/stage/ChallengeStageShell";

/** Unique to BurpeeArt's "speak" pose (open-mouth path). */
const BURPEE_SPEAK_MARKER = 'path[d^="M-92 -70 C -84 -56, -66 -54, -58 -64"]';
/** Unique to FallbackCompanionArt's silhouette (any non-Burpee pet). */
const FALLBACK_COMPANION_MARKER =
  'path[d="M-26 44 C -34 18, -28 -6, -8 -12 C 10 -18, 30 -4, 32 20 C 33 34, 24 44, 12 44 Z"]';

describe("ChallengeStageShell companion rendering (CompanionActor migration)", () => {
  it("renders the companionState pose for Burpee when narration is not speaking", () => {
    const { container } = render(
      <ChallengeStageShell
        worldId="world-unknown-for-test"
        title="Desafio"
        onClose={() => {}}
        petId="burpee"
        companionState="watch"
        narrationStatus="idle"
      >
        <p>conteúdo</p>
      </ChallengeStageShell>,
    );
    expect(container.querySelector(BURPEE_SPEAK_MARKER)).toBeNull();
  });

  it('still overrides to Burpee "speak" while narration is speaking, regardless of companionState', () => {
    const { container } = render(
      <ChallengeStageShell
        worldId="world-unknown-for-test"
        title="Desafio"
        onClose={() => {}}
        petId="burpee"
        companionState="idle"
        narrationStatus="speaking"
      >
        <p>conteúdo</p>
      </ChallengeStageShell>,
    );
    expect(container.querySelector(BURPEE_SPEAK_MARKER)).toBeTruthy();
  });

  it("stays petId-agnostic: a non-Burpee petId renders the generic fallback companion, not Burpee art", () => {
    const { container } = render(
      <ChallengeStageShell
        worldId="world-unknown-for-test"
        title="Desafio"
        onClose={() => {}}
        petId="will"
        narrationStatus="idle"
      >
        <p>conteúdo</p>
      </ChallengeStageShell>,
    );
    expect(container.querySelector(FALLBACK_COMPANION_MARKER)).toBeTruthy();
    expect(container.querySelector(BURPEE_SPEAK_MARKER)).toBeNull();
  });

  it("does not crash and stays agnostic with no petId configured at all", () => {
    const { container } = render(
      <ChallengeStageShell worldId="world-unknown-for-test" title="Desafio" onClose={() => {}}>
        <p>conteúdo</p>
      </ChallengeStageShell>,
    );
    expect(container.querySelector(FALLBACK_COMPANION_MARKER)).toBeTruthy();
  });
});
