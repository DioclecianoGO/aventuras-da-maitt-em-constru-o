/**
 * ChallengeStageShell — stage-skin HTML embedding regression guard.
 * Spec: docs/design/ASSET-PRODUCTION-PIPELINE.md.
 *
 * External audit finding: the stage background sits directly in an HTML
 * container (the dialog div), never inside an ambient <svg>. A raster
 * stage-skin descriptor must therefore render as a standalone <img>, not an
 * SVG <image> — an <image> tag outside an <svg> is invalid/inert and would
 * silently fail to display the moment a stage skin is promoted to a
 * production raster asset. This test mocks the registry to simulate exactly
 * that promotion and proves the shell renders it correctly.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

vi.mock("@/visual/assetRegistry", () => ({
  getAsset: (key: string) =>
    key === "stage-skin.default"
      ? {
          kind: "raster" as const,
          srcSet: { default: "/art/stage-default.webp" },
          width: 1200,
          height: 700,
          alt: "Cenário do desafio",
        }
      : { kind: "vector-component" as const, Component: () => null },
}));

import { ChallengeStageShell } from "@/visual/stage/ChallengeStageShell";

describe("ChallengeStageShell stage-skin embedding", () => {
  it("renders a promoted raster stage-skin as an <img>, not an SVG <image>", () => {
    // An unregistered worldId resolves to the "default" stage skin via
    // fallbackWorldVisual — see src/visual/world-config/index.ts.
    const { container } = render(
      <ChallengeStageShell worldId="world-unknown-for-test" title="Desafio" onClose={() => {}}>
        <p>conteúdo</p>
      </ChallengeStageShell>,
    );

    // The bug this guards against: a raster descriptor must never fall into
    // the SVG-fragment <image> branch when rendered outside an <svg>.
    expect(container.querySelector("image")).toBeNull();

    const img = container.querySelector("img");
    expect(img).toBeTruthy();
    expect(img?.getAttribute("src")).toBe("/art/stage-default.webp");
  });

  it("gives the raster stage-skin full-bleed, decorative positioning", () => {
    const { container } = render(
      <ChallengeStageShell worldId="world-unknown-for-test" title="Desafio" onClose={() => {}}>
        <p>conteúdo</p>
      </ChallengeStageShell>,
    );

    const img = container.querySelector("img")!;
    for (const cls of ["absolute", "inset-0", "h-full", "w-full", "object-cover"]) {
      expect(img.className).toContain(cls);
    }
    // Decorative background: must not be announced to assistive technology.
    expect(img.getAttribute("aria-hidden")).toBe("true");
  });
});
