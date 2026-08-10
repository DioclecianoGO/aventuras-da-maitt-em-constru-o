# Phase 1B.1 — Visual Polish & Restoration Semantics (corrective plan)

Scope: only the six corrections in `docs/design/PHASE-1B-1-VISUAL-POLISH.md`. No curriculum, no Slice A, no new subjects, no backend/auth, no ASR, no XP, no Overworld geography or route redesign, no architecture replacement.

## 0. Preserved without change

Narration service + replay, TTS fallback behind the audio-key seam, SFX, drag + tap-to-place, `Mostrar para Burpee` diegetic confirmation, Maittê/Burpee acting states, non-punitive retry, `Template -> UserResponse -> Evaluator` boundary (ADR-009), persistence adapter, derived-from-facts restoration, routes, board route path, Overworld geography.

No file under `src/game/domain`, `src/game/evaluation`, `src/game/persistence` or `src/game/state/reducer.ts` is edited by this increment.

## 1. Burpee reads unmistakably as a blue-merle Border Collie

**Files:** `src/assets/game/characters/pets/BurpeeArt.tsx` (redraw), `src/assets/game/characters/CompanionArt.tsx` (viewBox/scale pass only if the new silhouette requires it).

Change: redraw the body from a compact, seated, feline-ish mass into collie anatomy — deeper narrow chest, visible foreleg/hind-leg separation with a hock, longer wedge muzzle with the dog nose at the tip and a defined stop, semi-prick ears with folded tips set wide, pronounced white ruff/chest bib plus rear-leg feathering, low-set feathered tail with a canine sweep. Merle becomes a designed patch structure (irregular torn-edge patches, small speckle marks, value banding) so it reads without saturation; blue eyes remain as an identity detail where the color state allows.

Reused: the existing `POSES` record keyed by `CompanionActingState`, the transform-group structure, the `pet-breathe` / `pet-hop` / `pet-tail-wag` / `pet-blink` classes and the ink/paper tokens. The five acting states keep their names and semantics; only the path data behind them changes.

## 2. Speaker-anchored speech bubble for short companion lines

**New file:** `src/visual/stage/SpeechBubble.tsx` — hand-drawn illustrated bubble (wobbly contour, ink line, paper fill) with a tail whose direction is a prop, plus the replay affordance attached to it.

**Edited:** `src/visual/stage/ChallengeStageShell.tsx`, `src/routes/mundo.$worldId.desafio.$slotId.tsx` (props wiring only).

Change: the shell gains a caption-placement decision. Short companion-attributed lines (instruction, retry, success) render in the bubble anchored above Burpee with the tail pointing at his head; the detached `CaptionPlateArt` panel stays in the codebase and is used for long copy, narration with no visible speaker and as the layout/accessibility fallback. The same sentence never renders in both at once.

Narration integration: no change to `narrationService` / `useNarration`. The bubble receives the same `caption`, `narrationStatus` and `onReplay` that the plate receives today, so text and audio stay synchronized and `blocked` / `unsupported` still surfaces the replay shell and the "sem som" hint. `role="status"` moves with the text so assistive tech announces exactly once.

Layout: the bubble sits in the lower-left staging column above the pet, clamped so it never overlaps the manipulables or Maittê; on narrow/short viewports it repositions to a band under the header while keeping a tail pointing toward the pet.

## 3. Handcrafted, stable-identity puzzle stones

**Files:** `src/assets/game/objects/DesertPuzzleArt.tsx`, `src/game/templates/PlaceholderOrderTemplate.tsx`.

Current defect: `OrderStoneArt variant={index}` and `SandSocketArt index={index}` key the art off the current position, so a stone morphs when reordered.

Change:
- expand `TABLET_SHAPES` into a richer set of asymmetric silhouettes with chipped corners, and add per-variant detail overlays (cracks, pecked marks, chip notches) plus a small settling tilt;
- `OrderStoneArt` takes explicit `variant` and `tilt` props, both purely decorative;
- the template derives a **stable presentation key from the option id** (a small deterministic hash of `option.id`, memoized from `item.options`) and passes that variant, never `index`. Sockets stay keyed by position, since a socket is a place in the sand, not the object being moved.

Fairness guard: variants come from an id hash uncorrelated with the authored answer order; every stone keeps the same bounding box, label font size and button hit area; no variant differentiates by color or mass. A unit test asserts that the variant for a given option id is identical across two different `order` arrays.

Preserved: drag, tap-select / tap-place, deliberate confirmation, one `UserResponse` per confirmation.

## 4. Concrete restoration units (not only a gradient)

**New file:** `src/visual/world-config/restoration-units.ts` — presentation-only catalog of `RestorableUnit { id, sceneKey, assetKey, anchor, requires: { slotId } | { regionMilestone } }` for Dunas Douradas and for the Mathematics Overworld region.

**New file:** `src/visual/RestoredUnit.tsx` — renders one unit in `stolen | restored` state (color plus a non-color cue: added detail, clarity, small life), with the existing mask flow still animating the transition.

**Edited:** `src/visual/scenes/WorldBoardScene.tsx`, `src/visual/scenes/OverworldScene.tsx`, `src/assets/game/board/DunasDouradasArt.tsx`, `src/assets/game/overworld/OverworldArt.tsx` — adding the unit artwork: a plant cluster, a rock group, a route marker and an arch/ruin detail on the board; a specific landmark/detail cluster inside the Mathematics region on the map.

Derivation: units resolve from props the scenes already receive — completed slot ids and derived world/region progress from `src/game/state/selectors.ts`. No new persisted field, no unit color state stored anywhere, no second source of truth. Reload replays the same selector output and therefore restores the same units. `RestoreGroup` keeps its role as transition choreography over the base scene.

Result: completing `slot-1` leaves at least one identifiable Dunas Douradas object/cluster permanently colored near that route stretch, and lights at least one specific detail inside the Mathematics region on the Overworld.

## 5. Coloring-book richness (composition, not notebook chrome)

**Files:** `src/assets/game/board/DunasDouradasArt.tsx`, `src/assets/game/overworld/OverworldArt.tsx`, `src/assets/game/ink.tsx` (extra texture/value defs if needed).

Change: replace remaining primitive / near-symmetric constructions with varied contours and line weight, add foreground framing elements, more enclosed colorable shapes, denser small discoveries (grass tufts, pebbles, tracks, distant birds) and value/texture depth that survives stolen-color mode. Negative space around slot objects and the challenge interaction area is preserved. No spiral binding, page frame or dashboard chrome.

## 6. Voice seam

Untouched: `audioRegistry`, `narrationService`, `narration.ts` keys. The bubble consumes the same keys, so recorded voices can later replace synthesis without touching stage layout, pet, template, evaluator or domain.

## Technical risks

- **Bubble overlap on landscape tablet** — the stage is dense (pet, Maittê, stones, seal). Mitigation: fixed staging column, clamped width, responsive reposition, Playwright screenshots at tablet and desktop sizes.
- **Duplicate announcements** — bubble and plate must never render the same line simultaneously; enforced by a single placement decision inside the shell.
- **SVG cost** — more scenery paths on tablet. Mitigation: static paths, no per-frame JS, ambient animation still gated by `prefers-reduced-motion` and `useHydrated`.
- **Hash collisions in stone variants** — with four options collisions are possible but harmless; mitigated by combining a shape index with an independent detail/tilt index.
- **Test drift** — evaluator/persistence tests are untouched, but E2E selectors may need updating if the caption node moves.

## Verification / acceptance criteria

1. Burpee at stage scale, label hidden, reads as a Border Collie-type dog (screenshot review).
2. Instruction, retry and success short lines appear in a bubble whose tail points at Burpee; the detached plate is not showing the same line.
3. Replay remains visible and operable; with audio blocked, caption plus replay recovery still works.
4. The four stones have visibly different silhouettes/details with equal bounding box and hit area.
5. Dragging a stone to another position does not change its silhouette (unit test plus before/after screenshots).
6. Completing the slot leaves a specific board object restored; the Mathematics region shows a specific restored detail.
7. After a full reload, the same units are still restored.
8. Typecheck, lint, Vitest and the reduced-motion path all pass.

## Explicitly out of this increment

Real Number Sense curriculum and Slice A; other subjects; production assets for the other three pets; recorded voices and the final music/SFX library; Overworld geography or Dunas route changes; backend, auth, microphone/ASR, XP economy; the final illustration pass for all six worlds.

## GAP register

- `GAP-1B1-A` — the object catalog of restorable units (which specific plant/rock/marker, and how many per completed slot) is not enumerated in the Specs. The plan proposes one unit per completed slot on the board and one per region milestone on the Overworld as PROVISIONAL visual configuration, pending confirmation.
- `GAP-1B1-B` — whether the success line should also use the anchored bubble is implied but not stated as DECIDED; the plan assumes yes for companion-attributed short lines.
- `GAP-1B1-C` — no Spec defines retry/support escalation copy beyond the single retry line, so no new support tier is added.