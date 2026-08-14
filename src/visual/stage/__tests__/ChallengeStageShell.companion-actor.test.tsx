/**
 * ChallengeStageShell — companion rendering flows through CompanionActor and
 * stays petId-agnostic (Step 2B-M2, extended Step 2B-M4). Real, unmocked
 * registry — proves the migration away from a direct <CompanionArt> render
 * preserved this call site's own pre-existing state-selection logic (the
 * `speaking` override) and did not hardcode Burpee into the shell itself,
 * and (Step 2B-M4) proves the ambient companion viewBox is resolved per
 * pet instead of hardcoded to Burpee's own box.
 */
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

import { ChallengeStageShell } from "@/visual/stage/ChallengeStageShell";
import { BURPEE_BOX } from "@/assets/game/characters/pets/BurpeeArt";
import { PIPOCA_BOX } from "@/assets/game/characters/pets/PipocaArt";
import { WILL_BOX } from "@/assets/game/characters/pets/WillArt";
import { FALLBACK_PET_VIEWBOX } from "@/assets/game/characters/CompanionArt";

/** Unique to BurpeeArt's "speak" pose (open-mouth path). */
const BURPEE_SPEAK_MARKER = 'path[d^="M-92 -70 C -84 -56, -66 -54, -58 -64"]';
/** Unique to FallbackCompanionArt's silhouette (any non-Burpee/Pipoca/Will pet). */
const FALLBACK_COMPANION_MARKER =
  'path[d="M-26 44 C -34 18, -28 -6, -8 -12 C 10 -18, 30 -4, 32 20 C 33 34, 24 44, 12 44 Z"]';

/** The ambient <svg> wrapping the companion is the second <svg role="img"> (Maittê's is the other). */
function companionSvg(container: HTMLElement): SVGSVGElement | null {
  return container.querySelector('svg[aria-label]:not([aria-label="Maittê"])');
}

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

  it("stays petId-agnostic: a still-unconfigured petId (lyra) renders the generic fallback companion, not Burpee art", () => {
    const { container } = render(
      <ChallengeStageShell
        worldId="world-unknown-for-test"
        title="Desafio"
        onClose={() => {}}
        petId="lyra"
        narrationStatus="idle"
      >
        <p>conteúdo</p>
      </ChallengeStageShell>,
    );
    expect(container.querySelector(FALLBACK_COMPANION_MARKER)).toBeTruthy();
    expect(container.querySelector(BURPEE_SPEAK_MARKER)).toBeNull();
  });

  it("renders Will (not the generic fallback) when petId is will", () => {
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
    expect(container.querySelector(FALLBACK_COMPANION_MARKER)).toBeNull();
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

  it("frames Burpee in BURPEE_BOX.viewBox, not a generic/hardcoded box", () => {
    const { container } = render(
      <ChallengeStageShell
        worldId="world-unknown-for-test"
        title="Desafio"
        onClose={() => {}}
        petId="burpee"
      >
        <p>conteúdo</p>
      </ChallengeStageShell>,
    );
    expect(companionSvg(container)?.getAttribute("viewBox")).toBe(BURPEE_BOX.viewBox);
  });

  it("frames Pipoca in PIPOCA_BOX.viewBox, not Burpee's box", () => {
    const { container } = render(
      <ChallengeStageShell
        worldId="world-unknown-for-test"
        title="Desafio"
        onClose={() => {}}
        petId="pipoca"
      >
        <p>conteúdo</p>
      </ChallengeStageShell>,
    );
    const viewBox = companionSvg(container)?.getAttribute("viewBox");
    expect(viewBox).toBe(PIPOCA_BOX.viewBox);
    expect(viewBox).not.toBe(BURPEE_BOX.viewBox);
  });

  it("frames Will in WILL_BOX.viewBox, not Burpee's box", () => {
    const { container } = render(
      <ChallengeStageShell
        worldId="world-unknown-for-test"
        title="Desafio"
        onClose={() => {}}
        petId="will"
      >
        <p>conteúdo</p>
      </ChallengeStageShell>,
    );
    const viewBox = companionSvg(container)?.getAttribute("viewBox");
    expect(viewBox).toBe(WILL_BOX.viewBox);
    expect(viewBox).not.toBe(BURPEE_BOX.viewBox);
  });

  it("frames an unconfigured/unknown companion in the generic fallback viewport, not Burpee's box", () => {
    const { container } = render(
      <ChallengeStageShell worldId="world-unknown-for-test" title="Desafio" onClose={() => {}}>
        <p>conteúdo</p>
      </ChallengeStageShell>,
    );
    const viewBox = companionSvg(container)?.getAttribute("viewBox");
    expect(viewBox).toBe(FALLBACK_PET_VIEWBOX);
    expect(viewBox).not.toBe(BURPEE_BOX.viewBox);
  });
});
