/**
 * Science Slot 1 correction guards.
 * Spec: docs/pedagogy/SCIENCE-SLICE-A-BUILD-GATE.md, docs/ux/CHALLENGE-STAGE.md
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";

// vitest runs with globals:false, so RTL auto-cleanup is not registered.
afterEach(cleanup);

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
    const targets = getActivityContent("activity-sci-s1-practice")!.item.targets.map(
      (t) => t.label,
    );
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
  return {
    id: item.id,
    prompt: item.prompt,
    options: item.options,
    targets: item.targets,
    parts: item.parts,
    selection:
      item.answerRules.kind === "selection" && item.answerRules.constraints
        ? {
            minDistinct: item.answerRules.constraints.minDistinct,
            maxSelections: item.answerRules.constraints.maxSelections,
          }
        : undefined,
  };
};

/** The choice button, not the attached "Ouvir: ..." speaker control. */
const choice = (name: RegExp | string) =>
  screen
    .getAllByRole("button", { name })
    .find((element) => element.getAttribute("data-read-aloud") !== "true")!;

describe("template response contract stays generic", () => {
  it("scene investigation requires two distinct observations before confirming", () => {
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
    // One observation is not enough yet.
    expect(screen.getByRole("button", { name: "Mostrar" })).toBeDisabled();
    // Touching the SAME object again is not a second distinct observation.
    fireEvent.click(screen.getByRole("button", { name: "a água" }));
    fireEvent.click(screen.getByRole("button", { name: "a água" }));
    expect(screen.getByRole("button", { name: "Mostrar" })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "uma pedra" }));
    fireEvent.click(screen.getByRole("button", { name: "Mostrar" }));
    expect(onRespond).toHaveBeenCalledWith({
      kind: "selection",
      optionIds: ["obs-agua", "obs-pedra"],
    });
  });

  it("placement still emits generic placement", () => {
    const onRespond = vi.fn();
    const item = view("activity-sci-s1-practice");
    render(
      <GroupSortTemplate
        item={item}
        onRespond={onRespond}
        presentation={getItemPresentation(item.id)!}
      />,
    );
    for (const option of item.options) {
      fireEvent.click(choice(option.label));
      fireEvent.click(choice(/Colocar aqui: Seres vivos/));
    }
    fireEvent.click(choice("Mostrar"));
    expect(onRespond.mock.calls[0]?.[0].kind).toBe("placement");
  });

  it("every category target offers a read-aloud control", () => {
    const item = view("activity-sci-s1-practice");
    render(
      <GroupSortTemplate
        item={item}
        onRespond={vi.fn()}
        presentation={getItemPresentation(item.id)!}
      />,
    );
    for (const target of item.targets) {
      expect(screen.getByRole("button", { name: `Ouvir: ${target.label}` })).toBeTruthy();
    }
  });

  it("composition still emits generic composition", () => {
    const onRespond = vi.fn();
    const item = view("activity-sci-s1-challenge");
    render(
      <CompositionTemplate
        item={item}
        onRespond={onRespond}
        presentation={getItemPresentation(item.id)!}
      />,
    );
    fireEvent.click(choice(/muitos elementos/));
    // Selecting a written option speaks it but must NOT submit the attempt.
    expect(onRespond).not.toHaveBeenCalled();
    fireEvent.click(choice(/plantas, animais e água/));
    expect(onRespond).not.toHaveBeenCalled();
    fireEvent.click(choice("Mostrar"));
    expect(onRespond.mock.calls[0]?.[0].kind).toBe("composition");
  });

  it("every written composition option can be heard on demand", () => {
    const item = view("activity-sci-s1-challenge");
    render(
      <CompositionTemplate
        item={item}
        onRespond={vi.fn()}
        presentation={getItemPresentation(item.id)!}
      />,
    );
    for (const option of item.options) {
      expect(screen.getByRole("button", { name: `Ouvir: ${option.label}` })).toBeTruthy();
    }
  });
});
