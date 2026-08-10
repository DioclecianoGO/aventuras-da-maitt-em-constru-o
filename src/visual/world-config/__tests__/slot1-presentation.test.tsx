/**
 * Science Slot 1 correction guards.
 * Spec: docs/pedagogy/SCIENCE-SLICE-A-BUILD-GATE.md, docs/ux/CHALLENGE-STAGE.md
 */
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { getChallengeNarration, getObservationLine } from "@/visual/world-config/narration";
import { getItemPresentation } from "@/visual/world-config/item-presentation";
import { SceneInvestigateTemplate } from "@/game/templates/SceneInvestigateTemplate";
import { GroupSortTemplate } from "@/game/templates/PlacementTemplate";
import { CompositionTemplate } from "@/game/templates/CompositionTemplate";
import { getActivityContent } from "@/game/content";

describe("Slot 1 narration criterion", () => {
  const narration = getChallengeNarration("sci-slot-1", "activity-sci-s1-practice");

  it("no longer describes a natural × artificial criterion", () => {
    const text = `${narration.instruction.captionText} ${narration.instruction.spokenText}`;
    expect(text).not.toMatch(/constru[íi]d/i);
    expect(text).not.toMatch(/natural/i);
    expect(text).not.toMatch(/pessoas/i);
  });

  it("expresses the authored living / non-living criterion", () => {
    expect(narration.instruction.captionText).toMatch(/vida/i);
    const targets = getActivityContent("activity-sci-s1-practice")!.item.targets.map((t) => t.label);
    expect(targets).toEqual(["Seres vivos", "Não vivos"]);
  });

  it("gives an object-specific observation reaction in Discover", () => {
    const discover = getChallengeNarration("sci-slot-1", "activity-sci-s1-discover");
    const line = getObservationLine(discover, "obs-agua");
    expect(line?.captionText).toMatch(/água/i);
    expect(line?.captionText).not.toMatch(/^correto/i);
  });
});

describe("Slot 1 presentation", () => {
  it("maps every Discover option to a scene hotspot", () => {
    const item = getActivityContent("activity-sci-s1-discover")!.item;
    const scene = getItemPresentation(item.id)!.scene!;
    expect(scene.hotspots.map((h) => h.optionId).sort()).toEqual(
      item.options.map((o) => o.id).sort(),
    );
  });

  it("keeps the environment visible as evidence in stage 3", () => {
    expect(getItemPresentation("item-sci-s1-c1")?.scene?.interactive).toBe(false);
  });
});

const view = (id: string) => {
  const { item } = getActivityContent(id)!;
  return { id: item.id, prompt: item.prompt, options: item.options, targets: item.targets, parts: item.parts };
};

describe("template response contract stays generic", () => {
  it("scene hotspot selection emits raw selection with the authored option id", () => {
    const onRespond = vi.fn();
    const onObserve = vi.fn();
    const item = view("activity-sci-s1-discover");
    render(
      <SceneInvestigateTemplate
        item={item}
        onRespond={onRespond}
        onObserve={onObserve}
        presentation={getItemPresentation(item.id)!}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "a água" }));
    expect(onObserve).toHaveBeenCalledWith(["obs-agua"]);
    fireEvent.click(screen.getByRole("button", { name: "Mostrar" }));
    expect(onRespond).toHaveBeenCalledWith({ kind: "selection", optionIds: ["obs-agua"] });
  });

  it("placement still emits generic placement", () => {
    const onRespond = vi.fn();
    const item = view("activity-sci-s1-practice");
    render(
      <GroupSortTemplate item={item} onRespond={onRespond} presentation={getItemPresentation(item.id)!} />,
    );
    for (const option of item.options) {
      fireEvent.click(screen.getByRole("button", { name: option.label }));
      fireEvent.click(screen.getByRole("button", { name: /Colocar aqui: Seres vivos/ }));
    }
    fireEvent.click(screen.getByRole("button", { name: "Mostrar" }));
    expect(onRespond.mock.calls[0][0].kind).toBe("placement");
  });

  it("composition still emits generic composition", () => {
    const onRespond = vi.fn();
    const item = view("activity-sci-s1-challenge");
    render(
      <CompositionTemplate item={item} onRespond={onRespond} presentation={getItemPresentation(item.id)!} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /muitos elementos/ }));
    fireEvent.click(screen.getByRole("button", { name: /plantas, animais e água/ }));
    fireEvent.click(screen.getByRole("button", { name: "Mostrar" }));
    expect(onRespond.mock.calls[0][0].kind).toBe("composition");
  });
});
