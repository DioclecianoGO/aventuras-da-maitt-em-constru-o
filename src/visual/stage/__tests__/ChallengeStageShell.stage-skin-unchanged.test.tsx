/**
 * ChallengeStageShell — existing vector-component stage skins stay unchanged.
 * Spec: docs/design/ASSET-PRODUCTION-PIPELINE.md.
 *
 * Companion to ChallengeStageShell.test.tsx. That file mocks the registry to
 * prove a PROMOTED raster stage-skin embeds correctly; this file uses the
 * REAL, unmocked registry to prove today's vector-component skins (every
 * current entry) still render exactly as before the `as="html"` fix —
 * the fix only changes which host element a future RASTER asset gets.
 *
 * The dialog renders several unrelated <svg> elements of its own (the folded
 * map, the companion, Maittê), so these tests target the background
 * specifically: it is always the first element inside `[role="dialog"]`.
 */
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

import { ChallengeStageShell } from "@/visual/stage/ChallengeStageShell";
import { PLACEHOLDER_WORLD_ID } from "@/game/content/placeholder-fixture";
import { SCIENCE_WORLD_ID } from "@/game/content/science/slice-a";

function backgroundOf(container: HTMLElement) {
  return container.querySelector('[role="dialog"]')?.firstElementChild ?? null;
}

describe("ChallengeStageShell vector-component stage skins (regression)", () => {
  it("still renders the real desert SVG skin (world-placeholder) as an <svg>, not an <img>", () => {
    const { container } = render(
      <ChallengeStageShell worldId={PLACEHOLDER_WORLD_ID} title="Desafio" onClose={() => {}}>
        <p>conteúdo</p>
      </ChallengeStageShell>,
    );
    const background = backgroundOf(container);
    expect(background?.tagName.toLowerCase()).toBe("svg");
    // DesertStageSkinArt's own viewBox — unique to that component's markup.
    expect(background?.getAttribute("viewBox")).toBe("0 0 1200 700");
  });

  it("still renders the real coast SVG skin (world-science-oceano) as an <svg>, not an <img>", () => {
    const { container } = render(
      <ChallengeStageShell worldId={SCIENCE_WORLD_ID} title="Desafio" onClose={() => {}}>
        <p>conteúdo</p>
      </ChallengeStageShell>,
    );
    const background = backgroundOf(container);
    expect(background?.tagName.toLowerCase()).toBe("svg");
    // CoastStageSkinArt's own viewBox — unique to that component's markup.
    expect(background?.getAttribute("viewBox")).toBe("0 0 1200 720");
  });

  it("still renders the real default skin for an unregistered world as a plain <div>, not an <img>", () => {
    const { container } = render(
      <ChallengeStageShell worldId="world-truly-unknown" title="Desafio" onClose={() => {}}>
        <p>conteúdo</p>
      </ChallengeStageShell>,
    );
    const background = backgroundOf(container);
    // DefaultStageSkinArt is a plain paper-colour div, not an svg or an img.
    expect(background?.tagName.toLowerCase()).toBe("div");
    expect(background?.className).toContain("bg-[var(--paper)]");
  });
});
