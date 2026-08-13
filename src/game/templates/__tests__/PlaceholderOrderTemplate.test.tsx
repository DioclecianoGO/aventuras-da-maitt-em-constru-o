/**
 * PlaceholderOrderTemplate — presentation-seam normalization guard (Step 1).
 * Spec: docs/design/ASSET-PRODUCTION-PIPELINE.md, docs/game/templates/contract.ts.
 *
 * No current content registers `presentation.optionArt` for this template's
 * item, so the first test is the actual regression guard: today's runtime
 * output must be unaffected. The second test proves the seam is really wired,
 * not merely declared in the prop type.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

import { PlaceholderOrderTemplate } from "@/game/templates/PlaceholderOrderTemplate";
import type { TemplateItemView } from "@/game/templates/contract";

const item: TemplateItemView = {
  id: "item-order-test",
  prompt: "Ordene as pedras.",
  options: [
    { id: "a", label: "Um" },
    { id: "b", label: "Dois" },
  ],
  targets: [],
  parts: [],
};

describe("PlaceholderOrderTemplate presentation seam", () => {
  it("renders the existing handcrafted stone when no presentation is supplied", () => {
    const { container } = render(
      <PlaceholderOrderTemplate item={item} onRespond={vi.fn()} />,
    );
    expect(container.querySelector('[data-testid="custom-stone-a"]')).toBeNull();
    // OrderStoneArt draws the option label as SVG <text>.
    expect(container.textContent).toContain("Um");
    expect(container.textContent).toContain("Dois");
  });

  it("renders presentation.optionArt in place of the handcrafted stone when supplied", () => {
    const { container } = render(
      <PlaceholderOrderTemplate
        item={item}
        onRespond={vi.fn()}
        presentation={{
          optionArt: {
            a: () => <g data-testid="custom-stone-a">Custom A</g>,
          },
        }}
      />,
    );
    expect(container.querySelector('[data-testid="custom-stone-a"]')).toBeTruthy();
    // The option WITHOUT a presentation entry still falls back correctly.
    expect(container.textContent).toContain("Dois");
  });

  it("still emits a generic ordering UserResponse regardless of which art rendered", () => {
    // A move() schedules a real `window.setTimeout` settle callback. Fake
    // timers keep it from firing after this test's jsdom environment is torn
    // down (it would otherwise leak into a later test file's run window).
    vi.useFakeTimers();
    try {
      const onRespond = vi.fn();
      const { getByRole } = render(
        <PlaceholderOrderTemplate
          item={item}
          onRespond={onRespond}
          presentation={{ optionArt: { a: () => <g data-testid="custom-stone-a" /> } }}
        />,
      );
      fireEvent.click(getByRole("button", { name: /Pedra Um/ }));
      fireEvent.click(getByRole("button", { name: /Pedra Dois/ }));
      fireEvent.click(getByRole("button", { name: "Confirmar" }));
      expect(onRespond).toHaveBeenCalledWith({ kind: "ordering", orderedIds: ["b", "a"] });
      vi.runOnlyPendingTimers();
    } finally {
      vi.useRealTimers();
    }
  });
});
