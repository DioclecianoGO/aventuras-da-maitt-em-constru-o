/**
 * CompanionActor — petId dispatch guard (Step 2B-M2), mocked registry.
 * Spec: docs/narrative/PET-COMPANIONS.md, docs/design/VISUAL-ASSET-CONTRACT.md.
 *
 * `vi.mock` hoists file-wide, so this file is dedicated to the mocked
 * assertions; the real, unmocked fallback-equivalence assertions live in
 * `CompanionActor.scaffold-unchanged.test.tsx`.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

vi.mock("@/visual/assetRegistry", () => ({
  getAsset: (key: string) => ({
    kind: "vector-component" as const,
    Component: (props: Record<string, unknown>) => (
      <g
        data-testid={`resolved-${key}`}
        data-petid={String(props["petId"] ?? "")}
        data-state={String(props["state"] ?? "")}
        data-animated={String(props["animated"] ?? "")}
      />
    ),
  }),
}));

import { CompanionActor } from "@/visual/character/CompanionActor";

describe("CompanionActor dispatch", () => {
  it('petId="burpee" takes the Burpee presentation seam (character.burpee.<state>)', () => {
    const { container } = render(<CompanionActor petId="burpee" state="speak" animated={false} />);
    expect(container.querySelector('[data-testid="resolved-character.burpee.speak"]')).toBeTruthy();
    // The generic fallback key must NOT be the one resolved for Burpee.
    expect(container.querySelector('[data-testid="resolved-character.companion"]')).toBeNull();
    // Nor the Pipoca key.
    expect(container.querySelector('[data-testid="resolved-character.pipoca.speak"]')).toBeNull();
  });

  it('petId="pipoca" takes the Pipoca presentation seam (character.pipoca.<state>)', () => {
    const { container } = render(<CompanionActor petId="pipoca" state="speak" animated={false} />);
    expect(container.querySelector('[data-testid="resolved-character.pipoca.speak"]')).toBeTruthy();
    // The generic fallback key must NOT be the one resolved for Pipoca.
    expect(container.querySelector('[data-testid="resolved-character.companion"]')).toBeNull();
    // Nor the Burpee key.
    expect(container.querySelector('[data-testid="resolved-character.burpee.speak"]')).toBeNull();
  });

  it('petId="will" takes the Will presentation seam (character.will.<state>)', () => {
    const { container } = render(<CompanionActor petId="will" state="speak" animated={false} />);
    expect(container.querySelector('[data-testid="resolved-character.will.speak"]')).toBeTruthy();
    // The generic fallback key must NOT be the one resolved for Will.
    expect(container.querySelector('[data-testid="resolved-character.companion"]')).toBeNull();
    // Nor the Burpee/Pipoca keys.
    expect(container.querySelector('[data-testid="resolved-character.burpee.speak"]')).toBeNull();
    expect(container.querySelector('[data-testid="resolved-character.pipoca.speak"]')).toBeNull();
  });

  it('petId="lyra" takes the Lyra presentation seam (character.lyra.<state>)', () => {
    const { container } = render(<CompanionActor petId="lyra" state="speak" animated={false} />);
    expect(container.querySelector('[data-testid="resolved-character.lyra.speak"]')).toBeTruthy();
    // The generic fallback key must NOT be the one resolved for Lyra.
    expect(container.querySelector('[data-testid="resolved-character.companion"]')).toBeNull();
    // Nor the Burpee/Pipoca/Will keys.
    expect(container.querySelector('[data-testid="resolved-character.burpee.speak"]')).toBeNull();
    expect(container.querySelector('[data-testid="resolved-character.pipoca.speak"]')).toBeNull();
    expect(container.querySelector('[data-testid="resolved-character.will.speak"]')).toBeNull();
  });

  it("no named/canonical pet (burpee, pipoca, will, lyra) resolves through the generic fallback", () => {
    for (const petId of ["burpee", "pipoca", "will", "lyra"]) {
      const { container, unmount } = render(<CompanionActor petId={petId} state="idle" />);
      expect(container.querySelector('[data-testid="resolved-character.companion"]')).toBeNull();
      unmount();
    }
  });

  it("a deliberately-unconfigured petId takes the generic character.companion fallback seam", () => {
    const { container } = render(
      <CompanionActor petId="unconfigured-pet" state="idle" animated={true} />,
    );
    const resolved = container.querySelector('[data-testid="resolved-character.companion"]');
    expect(resolved).toBeTruthy();
    // petId/state/animated still reach whatever the fallback key wraps.
    expect(resolved?.getAttribute("data-petid")).toBe("unconfigured-pet");
    expect(resolved?.getAttribute("data-state")).toBe("idle");
    expect(resolved?.getAttribute("data-animated")).toBe("true");
  });

  it("an unknown petId takes the generic character.companion fallback seam", () => {
    const { container } = render(<CompanionActor petId="totally-unknown-pet" state="idle" />);
    expect(container.querySelector('[data-testid="resolved-character.companion"]')).toBeTruthy();
  });

  it("an absent/unconfigured petId also takes the generic fallback seam", () => {
    const { container } = render(<CompanionActor state="watch" />);
    expect(container.querySelector('[data-testid="resolved-character.companion"]')).toBeTruthy();
  });
});
