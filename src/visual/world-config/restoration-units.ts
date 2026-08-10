/**
 * Concrete restorable visual units — PRESENTATION CONFIGURATION ONLY.
 * Spec: docs/design/COLOR-RESTORATION.md ("Concrete restoration units"),
 *       docs/design/PHASE-1B-1-VISUAL-POLISH.md (Correction 4).
 *
 * Restoration must leave identifiable THINGS behind, not only a gradient wash.
 * The causal chain is:
 *
 *   persisted progress fact -> existing derived selector -> this config -> unit
 *
 * Hard rules honoured here:
 *  - no new persisted field, milestone or progression policy is introduced.
 *    Board units read the completion fact of a slot that ALREADY exists; the
 *    Overworld units read the Mathematics restoration value the region already
 *    derives from those same facts;
 *  - a unit never stores its own colour state, so it cannot become a second
 *    source of progress truth. It is recomputed on every render and therefore
 *    survives reload for free;
 *  - nothing here is educational domain data. Slot ids are the neutral join
 *    key the domain already exposes.
 *
 * The catalog itself is concept-quality and replaceable.
 */

export type RestorableUnitKind =
  | "plant-cluster"
  | "rock-cluster"
  | "trail-marker"
  | "arch-detail"
  | "ruin-detail"
  | "shell-cluster"
  | "tidepool-life";

export type RestorableUnit = {
  id: string;
  kind: RestorableUnitKind;
  /** Scene-space anchor, ground contact at the anchor point. */
  anchor: { x: number; y: number };
  scale?: number;
  /** Accessible description. Units never carry curriculum. */
  label: string;
  /**
   * Driven by an EXISTING completion fact: the unit is restored when this slot
   * is completed. Board units use this.
   */
  requiresCompletedSlotId?: string;
  /**
   * Driven by EXISTING derived progress for the region/world (0..1). A visual
   * threshold over a value that is already computed — not a new milestone.
   */
  requiresProgressAtLeast?: number;
};

/** Dunas Douradas, keyed by world id. Scene space 1600x900. */
export const boardRestorationUnits: Record<string, RestorableUnit[]> = {
  "world-placeholder": [
    {
      id: "dunas-plant-cluster",
      kind: "plant-cluster",
      anchor: { x: 372, y: 566 },
      scale: 1.5,
      label: "Tufo de plantas do deserto que recuperou a cor",
      requiresCompletedSlotId: "slot-1",
    },
    {
      id: "dunas-trail-marker",
      kind: "trail-marker",
      anchor: { x: 488, y: 556 },
      scale: 1.3,
      label: "Marco da trilha que recuperou a cor",
      requiresCompletedSlotId: "slot-1",
    },
    {
      id: "dunas-rock-cluster",
      kind: "rock-cluster",
      anchor: { x: 862, y: 516 },
      scale: 1.35,
      label: "Grupo de pedras que recuperou a cor",
      requiresCompletedSlotId: "slot-2",
    },
    {
      id: "dunas-ruin-detail",
      kind: "ruin-detail",
      anchor: { x: 1306, y: 592 },
      scale: 1.3,
      label: "Detalhe da ruína que recuperou a cor",
      requiresCompletedSlotId: "slot-3",
    },
  ],
  "world-science-oceano": [
    {
      id: "praia-shells-1",
      kind: "shell-cluster",
      anchor: { x: 300, y: 742 },
      scale: 1.3,
      label: "Conchas da praia que recuperaram a cor",
      requiresCompletedSlotId: "sci-slot-1",
    },
    {
      id: "praia-tidepool-1",
      kind: "tidepool-life",
      anchor: { x: 560, y: 720 },
      scale: 1.25,
      label: "Poça de maré com vida de volta",
      requiresCompletedSlotId: "sci-slot-2",
    },
    {
      id: "praia-plants",
      kind: "plant-cluster",
      anchor: { x: 830, y: 700 },
      scale: 1.2,
      label: "Vegetação costeira que recuperou a cor",
      requiresCompletedSlotId: "sci-slot-3",
    },
    {
      id: "praia-rocks",
      kind: "rock-cluster",
      anchor: { x: 1090, y: 690 },
      scale: 1.25,
      label: "Rochas da costa que recuperaram a cor",
      requiresCompletedSlotId: "sci-slot-4",
    },
    {
      id: "praia-shells-2",
      kind: "shell-cluster",
      anchor: { x: 1290, y: 668 },
      scale: 1.1,
      label: "Mais conchas com a cor de volta",
      requiresCompletedSlotId: "sci-slot-5",
    },
    {
      id: "praia-marker",
      kind: "trail-marker",
      anchor: { x: 1470, y: 632 },
      scale: 1.2,
      label: "Marco da expedição na praia",
      requiresCompletedSlotId: "sci-slot-6",
    },
  ],
};

/** Overworld details, keyed by region id. Scene space 1600x1000. */
export const overworldRestorationUnits: Record<string, RestorableUnit[]> = {
  "region-mathematics": [
    {
      id: "ow-math-arch",
      kind: "arch-detail",
      anchor: { x: 288, y: 708 },
      scale: 1.02,
      label: "Arco do deserto com a cor de volta",
      requiresProgressAtLeast: 0.01,
    },
    {
      id: "ow-math-plants",
      kind: "plant-cluster",
      anchor: { x: 452, y: 744 },
      scale: 0.78,
      label: "Vegetação do deserto com a cor de volta",
      requiresProgressAtLeast: 0.6,
    },
  ],
  "region-science": [
    {
      id: "ow-sci-shells",
      kind: "shell-cluster",
      anchor: { x: 852, y: 872 },
      scale: 1,
      label: "Conchas da costa com a cor de volta",
      requiresProgressAtLeast: 0.01,
    },
    {
      id: "ow-sci-tidepool",
      kind: "tidepool-life",
      anchor: { x: 1010, y: 892 },
      scale: 0.85,
      label: "Poça de maré da costa com vida de volta",
      requiresProgressAtLeast: 0.6,
    },
  ],
};

export function getBoardRestorationUnits(worldId: string): RestorableUnit[] {
  return boardRestorationUnits[worldId] ?? [];
}

export function getOverworldRestorationUnits(regionId: string): RestorableUnit[] {
  return overworldRestorationUnits[regionId] ?? [];
}

/**
 * Resolve a unit against ALREADY DERIVED progress facts. Pure, so the same
 * inputs always rebuild the same restored set after a reload.
 */
export function isUnitRestored(
  unit: RestorableUnit,
  { completedSlotIds, progress }: { completedSlotIds: readonly string[]; progress: number },
): boolean {
  if (unit.requiresCompletedSlotId) {
    return completedSlotIds.includes(unit.requiresCompletedSlotId);
  }
  if (unit.requiresProgressAtLeast !== undefined) {
    return progress >= unit.requiresProgressAtLeast;
  }
  return false;
}
