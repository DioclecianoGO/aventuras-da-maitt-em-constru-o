/**
 * Item PRESENTATION configuration.
 * Spec: docs/ux/CHALLENGE-STAGE.md, docs/design/VISUAL-IMPLEMENTATION.md
 *
 * Maps ALREADY AUTHORED ids (item / option / target) to illustrations and to
 * touch hotspots over an illustrated scene. This layer holds no curriculum, no
 * answer and no evaluation: removing it degrades Slot 1 to the plain text
 * presentation without changing a single pedagogical outcome.
 */
import {
  CoastalEnvironmentScene,
  CrabObjectArt,
  LivingZoneArt,
  NonLivingZoneArt,
  RockObjectArt,
  TreeObjectArt,
  WaterObjectArt,
} from "@/assets/game/scenes/CoastalEnvironmentScene";
import type { TemplatePresentation, TemplateScene } from "@/game/templates/contract";

/** Shared illustrated environment for the whole Slot 1 investigation. */
const coastalScene = (
  hotspots: TemplateScene["hotspots"],
  interactive: boolean,
): TemplateScene => ({
  width: 800,
  height: 450,
  render: () => <CoastalEnvironmentScene />,
  hotspots,
  interactive,
});

const SLOT1_HOTSPOTS: TemplateScene["hotspots"] = [
  { optionId: "obs-planta", label: "a planta", cx: 628, cy: 340, rx: 92, ry: 86 },
  { optionId: "obs-passaro", label: "o pássaro", cx: 350, cy: 118, rx: 84, ry: 66 },
  { optionId: "obs-pedra", label: "a pedra", cx: 172, cy: 380, rx: 96, ry: 62 },
  { optionId: "obs-agua", label: "a água", cx: 420, cy: 250, rx: 190, ry: 62 },
];

const byItem: Record<string, TemplatePresentation> = {
  /* Stage 1 — observe the environment and touch what belongs to it. */
  "item-sci-s1-d1": { scene: coastalScene(SLOT1_HOTSPOTS, true) },

  /* Stage 2 — the observed objects become manipulable. */
  "item-sci-s1-p1": {
    optionArt: {
      "el-arvore": () => <TreeObjectArt />,
      "el-caranguejo": () => <CrabObjectArt />,
      "el-pedra": () => <RockObjectArt />,
      "el-agua": () => <WaterObjectArt />,
    },
    targetArt: {
      "grp-vivo": () => <LivingZoneArt />,
      "grp-nao-vivo": () => <NonLivingZoneArt />,
    },
  },

  /* Stage 3 — the same environment stays visible as evidence. */
  "item-sci-s1-c1": { scene: coastalScene([], false) },
};

export function getItemPresentation(itemId: string): TemplatePresentation | undefined {
  return byItem[itemId];
}
