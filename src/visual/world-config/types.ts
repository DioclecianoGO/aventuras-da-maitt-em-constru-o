/**
 * Visual/scenery configuration contracts.
 * Spec: docs/gameplay/ACTIVITY-SLOTS.md ("Presentation separation"),
 *       docs/design/VISUAL-IMPLEMENTATION.md §5,
 *       docs/worlds/MATHEMATICS-WORLD.md ("Visual configuration boundary").
 *
 * NOTHING here belongs to the educational domain. The domain schema stays
 * visually agnostic: no asset URLs, no scenery kinds, no landmark types.
 * This layer is keyed by stable world / zone / slot ids and may consume the
 * neutral spatial anchor the domain already exposes.
 */

export type SlotObjectKind =
  | "carved-stone"
  | "footprints"
  | "weathered-marker"
  | "dry-wash";

export type StageSkinId = "desert" | "default";

/** An Overworld destination. Only one is enterable in Phase 1A. */
export type RegionVisual = {
  id: string;
  /** Child-facing name. Never read from the domain fixture. */
  displayName: string;
  /** Present only when the region is a functional world in this phase. */
  worldId?: string;
  /** Scene-space centroid used for zoom focus and colour bloom. */
  centroid: { x: number; y: number };
  /** Radius of the colour bloom at full restoration, in scene units. */
  bloomRadius: number;
  /** Accessible hit polygon, scene-space points. */
  hit: string;
  /** Label anchor, scene-space. */
  label: { x: number; y: number };
};

export type SlotVisual = {
  objectKind: SlotObjectKind;
  /** Fine placement nudge on top of the domain anchor, in scene units. */
  offset?: { x: number; y: number };
  /** Local bloom radius for restoration around this object. */
  bloomRadius?: number;
  /** Short diegetic name used only for accessible labels. */
  label: string;
};

export type LandmarkVisual = {
  id: string;
  assetKey: string;
  anchor: { x: number; y: number };
  scale?: number;
  /** Accessible description; landmarks never own curriculum. */
  label: string;
};

export type WorldVisual = {
  /** Child-facing world name. */
  displayName: string;
  /** Opening zone name (PROVISIONAL). */
  zoneName: string;
  /** Distant next-zone preview only. Not enterable. */
  nextZonePreview?: string;
  sceneAssetKey: string;
  /** Scene coordinate space of the board illustration. */
  scene: { width: number; height: number };
  /** Illustrated route through the zone. */
  routePath: string;
  landmarks: LandmarkVisual[];
  stageSkin: StageSkinId;
};

/**
 * Independently addressable colour regions of the protagonist.
 * Spec: docs/narrative/MAITTE.md — the restoration ORDER is deliberately not
 * encoded. `alwaysRestored` is the hope anchor; `demoPartial` exists only to
 * demonstrate a partial state and is not a milestone rule.
 */
export type CharacterRegionId =
  | "heart"
  | "glasses"
  | "hairStreak"
  | "hair"
  | "shirt"
  | "skirt"
  | "socks"
  | "shoes";

export type CharacterVisualConfig = {
  regions: CharacterRegionId[];
  alwaysRestored: CharacterRegionId[];
  /** Demonstration only — configurable, never a permanent reward order. */
  demoPartial: CharacterRegionId[];
};