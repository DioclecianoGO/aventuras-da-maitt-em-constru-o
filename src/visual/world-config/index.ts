/**
 * Concrete visual/scenery configuration.
 * Spec: docs/worlds/OVERWORLD.md (preferred provisional geography),
 *       docs/worlds/MATHEMATICS-WORLD.md (opening Zone "Dunas Douradas"),
 *       docs/gameplay/ACTIVITY-SLOTS.md.
 *
 * Every value here is PROVISIONAL concept configuration and is replaceable
 * without touching src/game/**.
 */
import { PLACEHOLDER_WORLD_ID } from "@/game/content/placeholder-fixture";
import { SCIENCE_WORLD_ID } from "@/game/content/science/slice-a";
import type {
  CharacterVisualConfig,
  RegionVisual,
  SlotVisual,
  StageSkinId,
  WorldVisual,
} from "@/visual/world-config/types";

export const OVERWORLD_SCENE = { width: 1536, height: 1024 } as const;

/**
 * Preferred provisional geography (docs/worlds/OVERWORLD.md):
 * Portuguese NW/W · History N · Geography NE/E · English E/SE ·
 * Mathematics SW · Science S/coast · Base da Esperança approximately central.
 */
export const overworldRegions: RegionVisual[] = [
  {
    id: "region-portuguese",
    displayName: "Floresta das Letras",
    centroid: { x: 300, y: 250 },
    bloomRadius: 300,
    hit: "80,60 520,60 560,330 470,470 140,470 70,300",
    label: { x: 335, y: 100 },
  },
  {
    id: "region-history",
    displayName: "Reino do Tempo",
    centroid: { x: 790, y: 200 },
    bloomRadius: 290,
    hit: "600,50 1020,50 1050,300 900,380 660,370 580,240",
    label: { x: 778, y: 92 },
  },
  {
    id: "region-geography",
    displayName: "Vale dos Exploradores",
    centroid: { x: 1240, y: 250 },
    bloomRadius: 300,
    hit: "1060,50 1480,50 1480,400 1300,470 1100,420 1050,240",
    label: { x: 1235, y: 96 },
  },
  {
    id: "region-english",
    displayName: "Cidade das Vozes",
    centroid: { x: 1270, y: 730 },
    bloomRadius: 300,
    hit: "1080,540 1490,540 1490,940 1250,960 1080,860",
    label: { x: 1272, y: 544 },
  },
  {
    id: "region-mathematics",
    displayName: "Deserto dos Números",
    worldId: PLACEHOLDER_WORLD_ID,
    centroid: { x: 280, y: 720 },
    bloomRadius: 310,
    hit: "70,520 500,520 520,760 440,940 130,940 60,760",
    label: { x: 292, y: 524 },
  },
  {
    id: "region-science",
    displayName: "Oceano das Descobertas",
    worldId: SCIENCE_WORLD_ID,
    centroid: { x: 800, y: 790 },
    bloomRadius: 310,
    hit: "560,660 1060,660 1060,940 580,940",
    label: { x: 813, y: 900 },
  },
];

export const baseVisual = {
  id: "base-da-esperanca",
  displayName: "Base da Esperança",
  centroid: { x: 790, y: 470 },
} as const;

/** Board / zone configuration, keyed by stable world id. */
export const worldVisuals: Record<string, WorldVisual> = {
  [PLACEHOLDER_WORLD_ID]: {
    displayName: "Deserto dos Números",
    zoneName: "Dunas Douradas",
    nextZonePreview: "Oásis dos Enigmas",
    sceneAssetKey: "board.dunas-douradas",
    scene: { width: 1600, height: 900 },
    routePath:
      "M 40 700 C 150 662, 240 604, 288 566 C 420 502, 560 486, 704 500 C 860 516, 1000 548, 1152 562 C 1300 576, 1430 560, 1572 526",
    landmarks: [
      {
        id: "landmark-arco",
        assetKey: "landmark.rock-arch",
        anchor: { x: 918, y: 512 },
        scale: 1,
        label: "Arco de pedra esculpido pelo vento",
      },
    ],
    stageSkin: "desert",
  },
  [SCIENCE_WORLD_ID]: {
    displayName: "Oceano das Descobertas",
    zoneName: "Praia das Conchas",
    nextZonePreview: "Recife das Correntes",
    sceneAssetKey: "board.praia-das-conchas",
    scene: { width: 1600, height: 900 },
    routePath:
      "M 40 760 C 200 736, 330 700, 452 706 C 610 714, 720 664, 872 660 C 1010 656, 1130 692, 1252 676 C 1390 658, 1480 620, 1572 596",
    landmarks: [
      {
        id: "landmark-ilha",
        assetKey: "landmark.rock-arch",
        anchor: { x: 1196, y: 250 },
        scale: 0.7,
        label: "Ilha distante, próxima etapa da expedição",
      },
    ],
    stageSkin: "coast",
  },
};

/**
 * Slot scenery, keyed by stable slot id. A missing entry degrades to
 * `fallbackSlotVisual` instead of crashing.
 */
export const slotVisuals: Record<string, SlotVisual> = {
  "slot-1": { objectKind: "carved-stone", bloomRadius: 300, label: "pedra esculpida" },
  "slot-2": {
    objectKind: "footprints",
    offset: { x: 0, y: 140 },
    bloomRadius: 300,
    label: "pegadas na areia",
  },
  "slot-3": {
    objectKind: "weathered-marker",
    offset: { x: 0, y: 40 },
    bloomRadius: 320,
    label: "marco gasto pelo vento",
  },

  /* Praia das Conchas — expedition stations along the tide line. */
  "sci-slot-1": { objectKind: "observation-point", bloomRadius: 300, label: "ponto de observação" },
  "sci-slot-2": {
    objectKind: "map-table",
    offset: { x: 0, y: 20 },
    bloomRadius: 300,
    label: "mesa de mapas dos ambientes",
  },
  "sci-slot-3": { objectKind: "field-stand", bloomRadius: 300, label: "posto de campo" },
  "sci-slot-4": {
    objectKind: "tide-pool",
    offset: { x: 0, y: 30 },
    bloomRadius: 300,
    label: "poça de maré",
  },
  "sci-slot-5": { objectKind: "specimen-panel", bloomRadius: 310, label: "painel de observações" },
  "sci-slot-6": { objectKind: "lookout-scope", bloomRadius: 320, label: "luneta da praia" },
};

export const fallbackSlotVisual: SlotVisual = {
  objectKind: "carved-stone",
  bloomRadius: 280,
  label: "ponto da trilha",
};

export function getSlotVisual(slotId: string): SlotVisual {
  return slotVisuals[slotId] ?? fallbackSlotVisual;
}

export const fallbackWorldVisual: WorldVisual = {
  displayName: "Mundo",
  zoneName: "Trilha",
  sceneAssetKey: "board.dunas-douradas",
  scene: { width: 1600, height: 900 },
  routePath: "M 60 700 C 400 560, 900 520, 1540 600",
  landmarks: [],
  stageSkin: "default",
};

export function getWorldVisual(worldId: string): WorldVisual {
  return worldVisuals[worldId] ?? fallbackWorldVisual;
}

export function getStageSkin(worldId: string): StageSkinId {
  return getWorldVisual(worldId).stageSkin;
}

export function getRegionForWorld(worldId: string): RegionVisual | undefined {
  return overworldRegions.find((region) => region.worldId === worldId);
}

/**
 * Maittê's colour regions. The heart is saturated from the opening and is not
 * part of any progression mapping. `provisionalSequence` demonstrates one
 * partial state; it is configuration, not a milestone rule
 * (docs/narrative/MAITTE.md).
 */
export const characterVisual: CharacterVisualConfig = {
  regions: ["heart", "glasses", "hairStreak", "hair", "shirt", "skirt", "socks", "shoes"],
  alwaysRestored: ["heart"],
  provisionalSequence: ["socks", "glasses", "shirt", "hairStreak", "skirt", "shoes", "hair"],
};

/**
 * Companion shown in the Challenge Stage shell. Configuration-driven: no pet
 * is bound to Mathematics or to any skill (docs/narrative/PET-COMPANIONS.md).
 *
 * Changing `petId` to "pipoca", "will" or "lyra" changes the rendered
 * companion with NO change to educational, evaluation or domain code. Pet ids
 * without a finished asset degrade to the neutral concept creature.
 */
export type CompanionVisualConfig = {
  petId: string;
  displayName: string;
};

export const companionVisual: CompanionVisualConfig = {
  petId: "burpee",
  displayName: "Burpee",
};