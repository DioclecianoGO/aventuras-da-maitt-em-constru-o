# Implementation Plan — Aventuras da Maittê (Mathematics MVP)

This is a plan for human review. No code is written and no product decision is created here. Every proposal below is marked as PROPOSAL, ASSUMPTION, GAP or CONFLICT where it is not already covered by an approved spec.

## A — Reading confirmation

Specs read in full, in order:
AGENTS.md; docs/README.md; docs/WORKFLOW.md; docs/product/PRODUCT-VISION.md; docs/product/DESIGN-PRINCIPLES.md; docs/product/MVP-SCOPE.md; docs/narrative/UNIVERSE.md; docs/narrative/MAITTE.md; docs/narrative/VILLAIN.md; docs/worlds/OVERWORLD.md; docs/worlds/MATHEMATICS-WORLD.md; docs/ux/WORLD-BOARD.md; docs/ux/CHALLENGE-STAGE.md; docs/gameplay/PUZZLE-SYSTEM.md; docs/gameplay/PROGRESSION.md; docs/design/ART-DIRECTION.md; docs/pedagogy/LEARNING-MODEL.md; docs/pedagogy/CONTENT-PARAMETRIZATION.md; docs/pedagogy/MATHEMATICS-GRADE-2.md; docs/adr/README.md.

Absent but implementation-relevant (listed in docs/README.md, not present on disk). None of these may be inferred:
docs/product/GAME-LOOP.md; docs/narrative/STORY.md, PET-COMPANIONS.md, LACKEYS.md; docs/worlds/PORTUGUESE|SCIENCE|HISTORY|GEOGRAPHY|ENGLISH-WORLD.md; docs/ux/NAVIGATION.md, FEEDBACK.md, TRANSITIONS.md; docs/gameplay/ACTIVITY-SLOTS.md, SUPPORT-LEVELS.md, XP.md; docs/design/COLOR-RESTORATION.md, ANIMATION.md, AUDIO.md, RESPONSIVE.md; docs/pedagogy/CURRICULUM-SOURCES.md; docs/technical/ARCHITECTURE.md, CONFIG-SCHEMAS.md, STATE.md, PERSISTENCE.md; the whole ADR-001..008 set (inventory only, no rationale files).

Current repository state: bootstrap only — TanStack Start app with `__root.tsx` and `index.tsx` placeholder screen. No game code exists yet.

## B — Experience architecture

Four spatial layers, one route each, so each layer is independently addressable and testable:

```text
/                 Overworld        illustrated map, six regions, Mathematics playable
/mundo/$worldId   World Board      biome route, Activity Slots, Maittê token
  (stage overlay) Challenge Stage  focused interaction over the retained board
```

APPROVED REQUIREMENT: Challenge Stage preserves the World Board as spatial context; the board is never lost behind an unrelated page.

PROVISIONAL IMPLEMENTATION: a route-driven overlay (`/mundo/$worldId/desafio/$slotId`) rendered above the still-mounted board. The board stays mounted, so the stage can grow out of the selected slot's screen position and shrink back into it. This implementation may be replaced if another approach satisfies the same continuity requirement better.

Navigation states: `overworld` → `world-entering` (zoom) → `board-idle` → `slot-activated` → `stage-briefing` → `stage-active` → `stage-resolved` → `board-restoring` → `board-advancing` → `board-idle`.

- **Overworld**: single illustrated scene, six named regions inside one geography, each carrying its own restoration value. No dashboard cards, no persistent header.
- **Mathematics World**: subject container. Contains ordered Activity Slots grouped into *segments* (data-level grouping only). Slice A/B/C content is assigned to slots by data, never by scenery.
- **World Board**: the biome art is the board. Route path drawn as an SVG polyline through landmark anchors; Maittê is positioned at the current slot anchor. No grid, no dice.
- **Challenge Stage**: companion briefing, then puzzle template render, feedback, resolution.
- **Cross-layer restoration flow**: slot completion → mastery evidence recorded → restoration event → board segment value increases → world aggregate increases → Overworld region value increases → avatar restoration value increases. One event, four consumers, all derived from persisted state.

## C — Component inventory

| Component | Purpose | Spec reference | Status |
|---|---|---|---|
| OverworldMap | Illustrated geography, region selection | OVERWORLD | Functional |
| WorldRegion | One subject region + its restoration render | OVERWORLD, ART-DIRECTION | Functional |
| ZoomTransition | Spatial zoom overworld→world | OVERWORLD, ART-DIRECTION | Functional |
| WorldBoard | Biome scene + route + slots | WORLD-BOARD | Functional |
| BoardRoute | Path geometry between slot anchors | WORLD-BOARD | Functional |
| ActivitySlotMarker | Slot state (locked/available/done) | WORLD-BOARD | Functional |
| MaitteToken | Avatar on board + movement | MAITTE, WORLD-BOARD | Functional |
| RestorationLayer | Applies restoration value to art | ART-DIRECTION, PROGRESSION | Functional |
| ChallengeStage | Stage shell, lifecycle, feedback slots | CHALLENGE-STAGE | Functional |
| CompanionBriefing | Companion instruction, replayable | CHALLENGE-STAGE, UNIVERSE | Functional |
| InstructionPlayer | Text + icon + replay control | CHALLENGE-STAGE | Functional (audio: see GAP-AUDIO) |
| PuzzleTemplateHost | Resolves template id → component | PUZZLE-SYSTEM | Functional |
| CH-NUM-BUILD | Compose/decompose interaction | MATH-G2 §6 | Functional (Phase 1) |
| CH-NUM-PATH | Sequence/order/neighbor interaction | MATH-G2 §6 | Functional (Phase 1) |
| CH-OP-SOLVE | Column algorithm + regrouping | MATH-G2 §6 | Functional (Phase 2) |
| CH-OP-STORY | Choose relation, then compute | MATH-G2 §6 | Functional (Phase 2) |
| CH-GEO-SORT | Classify figures | MATH-G2 §6 | Functional (Phase 3) |
| CH-GEO-BUILD | Compose/decompose figures | MATH-G2 §6 | Functional (Phase 3) |
| FeedbackSurface | Correct / first-error / repeated-error | MATH-G2 §8 | Functional |
| DiegeticNav | In-world return/backpack affordance | OVERWORLD, DESIGN-PRINCIPLES §5 | Visual prototype (PROPOSAL) |
| PageTurnTransition | Major narrative context change | DESIGN-PRINCIPLES §14 | Visual prototype |
| SubjectRegistry | Subject → world config lookup | PRODUCT-VISION | Future-ready architectural element |
| ContentPackRegistry | Pack lookup by skill/slot | CONTENT-PARAMETRIZATION | Functional |
| MasteryStore | Per-skill evidence accumulation | MATH-G2 §9 | Functional (no thresholds — see GAP-MASTERY) |
| ResponseEvaluator | Evaluates UserResponse against pack rules | LEARNING-MODEL, PUZZLE-SYSTEM | Functional |
| PersistenceAdapter | Save/load interface | MVP-SCOPE | Functional (MVP infrastructure) |
| LocalStoragePersistence | Adapter implementation for the MVP | MVP-SCOPE (PROVISIONAL scope) | Functional (MVP) |
| RemotePersistence | Backend/account-backed save | — (not authorized) | Future |

No XP UI component is planned: the economy is undecided (GAP-XP). Only the evidence field is reserved.

## D — State model

ASSUMPTION (all of section D): docs/technical/STATE.md does not exist, so the shape below is an architectural proposal requiring approval before build.

1. **Overworld state** — `regions: { [subjectId]: { unlocked, restoration: 0..1, lastVisitedAt } }`. Derived, not authored: `restoration` is computed from world state, never written directly.
2. **World/Board state** — `worlds: { [worldId]: { currentSlotId, slots: { [slotId]: 'locked'|'available'|'completed' }, segmentRestoration: { [segmentId]: 0..1 } } }`.
3. **Challenge Stage state** — ephemeral, not persisted: `{ slotId, activityId, mode, attemptIndex, hintsUsed, errorCount, phase }`.
4. **Per-skill mastery evidence** — `skills: { [skillId]: { independentCorrect, incorrect, assistedCorrect, representationsSeen: string[], recentOutcomes: Outcome[] } }`. Stored as raw counters. The exposed label (`not_started|learning|practicing|proficient`) is computed by one pure function whose thresholds are a single named constant awaiting product decision (GAP-MASTERY).
5. **Color-restoration state** — derived selectors over slot completion; only completion facts are persisted, never the visual percentage. This keeps restoration re-derivable if granularity changes later.
6. **Milestone state** — `milestones: { [milestoneId]: { recoveredAt } }` for stolen coloring tools. The milestone catalogue itself is content data (GAP-MILESTONES: none authored).
7. **Persistence state** — `{ schemaVersion, savedAt, profileId? }` behind a `PersistenceAdapter` interface with a localStorage implementation for the MVP, per MVP-SCOPE PROVISIONAL. No backend, no accounts.

Runtime shape: a single typed store (React context + reducer, or Zustand) holding *facts*; every visual value is a selector. TanStack Query is used for loading content packs/world config, not for game state.

## E — Data model

All content lives in data files (TypeScript modules validated by Zod at load), not components. Adding a Content Pack is adding a file + registry entry. Adding a compatible Puzzle Template is adding a component + registry entry — neither touches world data.

```text
Subject      { id, name, worldId }
Curriculum   { id, subjectId, gradeLabel, source? }
Skill        { id: 'MAT-NUM-PLACE-01', curriculumId, group, name }
Objective    { id, skillId, statement }
ContentPack  { id, skillIds[], objectiveIds[], difficultyDims,
               eligibleTemplates: TemplateId[], representation,
               items: Item[] | generator: GeneratorSpec,
               feedback: { firstError, repeatedError, hint[] } }
Activity     { id, contentPackId, templateId, difficulty, supportLevel,
               mode: 'discover'|'practice'|'challenge', guidePetId?,
               masteryRules }            // location-agnostic: no slotId
Template     { id, accepts: representation[], render(props: TemplateProps) }
Difficulty   { level: 1..4, mathComplexity, representationalDistance,
               taskComplexity, assistance }   // per MATH-G2 §7
SupportLevel { id, hintsAllowed, revealAllowed, ... }  // GAP-SUPPORT
GuidePet     { id, name, tone }
ActivitySlot { id, worldId, segmentId, order, anchor: {x,y},
               restorationWeight,
               sequence: { discover?: ActivityId,
                           practice?: ActivityId[],
                           challenge: ActivityId[] } }
Evidence     { skillId, activityId, mode, correct, assisted,
               representation, at }
Restoration  { segmentId, worldId, value }   // derived
```

**Activity ↔ Activity Slot ownership (corrected).** The relationship is unidirectional: the **Activity Slot owns the assignment**. An Activity describes *what is practised and how*; it carries no board location and no `slotId`. A slot names the Activity sequence occupying that position, which is also how one slot can hold a Discover activity plus Practice and Challenge activities without any of them knowing where they live. Reassigning content to another slot edits one slot record, and the same Activity may be referenced by more than one slot.

**Puzzle Template contract (corrected — templates never evaluate).** A template collects and reports a *response*. It does not know what is correct.

```ts
// What the child did — structured, never judged
type UserResponse =
  | { kind: 'selection';    optionIds: string[] }
  | { kind: 'ordering';     orderedIds: string[] }
  | { kind: 'placement';    placements: { itemId: string; targetId: string; rotation?: number }[] }
  | { kind: 'composition';  parts: { partId: string; targetId: string; transform?: Transform }[] }
  | { kind: 'numeric';      value: number; byColumn?: Record<'u'|'d'|'c', number>; regroupings?: Regroup[] }
  | { kind: 'text';         value: string }
  | { kind: 'relation';     relationId: string }        // CH-OP-STORY phase 1
  | { kind: 'audio';        clipRef: string };          // FUTURE, not this MVP

type TemplateProps = {
  item: PackItem;            // content, opaque to the template
  mode: LearningMode;
  support: SupportLevel;
  onRespond(response: UserResponse): void;   // raw response only
  onSupportUsed(kind: SupportEventKind): void;
  feedback: FeedbackSignal | null;           // rendered, not decided, by the template
  onResolved(): void;
};
```

The Activity/Evaluation layer judges the response using the Content Pack's rules:

```ts
type EvaluationResult = {
  outcome: 'correct' | 'partially-correct' | 'incorrect';
  matchedAnswerId?: string;                     // supports multiple valid answers
  perTargetOutcome?: Record<string, boolean>;   // ordering/composition detail
  diagnosticCode?: string;                      // e.g. 'missed-regrouping'
};

type AttemptResult = EvaluationResult & {
  activityId: string; slotId: string; skillIds: string[];
  mode: LearningMode; assisted: boolean;        // from support events, not the template
  representation: string; at: string;
};

interface ResponseEvaluator<R extends UserResponse = UserResponse> {
  kind: R['kind'];
  evaluate(response: R, item: PackItem, rules: PackAnswerRules): EvaluationResult;
}
```

Evaluators are registered by response kind and are pure, unit-testable without any UI. Content Packs carry `answerRules` (single answer, answer set, accepted orderings, tolerance, per-part targets), so multiple valid answers, partial credit for ordering and composition, typed answers and — later — spoken answers are handled by adding an evaluator, not by changing templates. The evidence layer consumes `AttemptResult` only and never sees a raw response. A template never imports a skill id, never contains an answer, never sets `assisted`, and never decides mastery.

## F — Animation and transition plan

| # | Transition | Proposed implementation | Risk | Fallback |
|---|---|---|---|---|
| 1 | Overworld → World | CSS transform scale/translate on the map layer toward region centroid, 600–800ms | Layout thrash on large SVG | Cross-fade + short scale |
| 2 | Board entry | Board fades up as zoom settles; route draws in | Timing mismatch with #1 | Instant board, no draw-in |
| 3 | Maittê movement | Animate token along SVG path via `getPointAtLength` | Path math errors on responsive resize | Tween x/y between anchors |
| 4 | Stage entry | Slot marker expands into stage container (FLIP from marker rect) | FLIP fragility across breakpoints | Scale-from-center + dim board |
| 5 | Stage exit | Reverse FLIP into the marker | Same | Fade out |
| 6 | Local color restoration | Animate segment mask/opacity 0→1 | Mask performance on tablet | Snap to colored state |
| 7 | Overworld restoration | Region value animates from last-seen value on return | Missed if user never returns | Static correct value |
| 8 | Maittê restoration | Per-part color layers fade in at milestones | Asset layering complexity | Whole-avatar cross-fade |
| 9 | Companion entrance | Slide + squash-stretch in briefing | None material | Fade in |
| 10 | Success feedback | Companion reaction + color pulse toward board | None material | Static confirmation |
| 11 | First error | Gentle shake + "try again" cue, no answer shown | Must not read as punitive | Static non-punitive cue |
| 12 | Repeated error | Representation swap / hint surface animates in | Content must supply the hint | Text hint from pack |
| 13 | Page-turn | CSS 3D rotateY on a two-panel wrapper, only for narrative context changes | Perf + motion sensitivity | Cross-fade |

All animations respect `prefers-reduced-motion` and every one has a state-equivalent no-animation path, per DESIGN-PRINCIPLES §13.

## G — Challenge system by MVP slice

Common contract for every family: receives one pack item + mode + support level; emits a structured `UserResponse` and support events; performs no evaluation and owns no curriculum. Touch targets ≥ 44px minimum, ≥ 64px for primary manipulables (tablet-first).

**Touch interaction integrity (binding requirement).** Any core drag interaction that could produce a false educational error through touch imprecision must ship with a reliable alternative interaction — tap-to-select then tap-to-place — unless the drag gesture itself is part of the skill being assessed. This is an evidence-integrity requirement, not only an accessibility one: an attempt lost to a slipped finger would otherwise be recorded as a mathematical error. It applies to CH-NUM-BUILD, CH-OP-SOLVE regrouping, CH-GEO-SORT and CH-GEO-BUILD, and is an acceptance condition of every phase that ships them.

### Slice A

**CH-NUM-BUILD** (PLACE, COMP, DECOMP, REP). Interactions: drag hundreds/tens/units into place-value positions; select the numeral for a base-ten representation; build a requested numeral; repair a wrong decomposition. Discover: pre-filled worked example, one guided move, no mastery credit. Practice: full task, hint available, explanation after error. Challenge: no pre-attempt hint, representation varied from the practice item. First error: piece returns with a "look again" cue, answer not revealed. Repeated error: switch to a more concrete representation or reduce place-value count. Hint-assisted success: recorded as `assisted`, schedules an equivalent item later. Success: brief confirmation, restate the relation ("2 centenas e 3 unidades = 203"), resolve.

**CH-NUM-PATH** (SEQ, COMPARE, NEIGHBOR). Interactions: choose the missing stone, order stones, predecessor/successor, continue a rule. Spacing between stones is fixed and uniform regardless of value gaps so layout cannot reveal the answer. Same Discover/Practice/Challenge and error rules as above.

### Slice B

**CH-OP-SOLVE** (ADD/SUB CALC + PLACE). Vertical column layout with explicit units/tens/hundreds columns; regrouping is a manipulable action (drag ten units → one ten) with a visible carry mark, not an automatic result. Also supports "find the character's mistake" variants. Error escalation moves to concrete base-ten support rather than revealing the total.

**CH-OP-STORY** (ADD/SUB PROBLEM). Two explicit phases: (1) choose the relation the story describes (`relation` response), (2) compute (`numeric` response). Phase 1 outcome is recorded on the PROBLEM skill; phase 2 on the CALC skill. When the operation is given in advance, the item is flagged so it cannot yield full PROBLEM mastery. Pedagogical requirement: problems must require comprehension of the represented mathematical relationship and must not be reliably solvable through superficial keyword matching alone. The specific authoring strategies that achieve this belong to validated Content Packs and are not fixed by this plan.

### Slice C

**CH-GEO-SORT** (GEO2D RECOG/PROP). Drag figures into property buckets. Every figure appears at varied rotation, scale and color across items, and the pack declares that variation, so orientation-independence is enforced by content rather than by chance. Prompts address sides/vertices explicitly.

**CH-GEO-BUILD** (GEO2D COMP/DECOMP/MOSAIC). Drag/snap parts into a target silhouette; decompose a composite into parts; fill a mosaic region. Snap tolerance generous for touch; pieces rotatable where the objective requires it.

## H — Pedagogy enforcement architecture

Structural mechanisms, not conventions:

1. **Discover ≠ mastery** — `mode` is part of the Activity record and stamped on every Evidence row. The mastery selector reads only `mode === 'challenge'` rows for independent evidence, so it is structurally unable to count a Discover success.
2. **Hint ≠ Challenge mastery** — `assisted: true` is set the moment any hint/support is consumed and cannot be cleared for that attempt. Assisted rows accumulate in a separate counter.
3. **No curriculum in world components** — board/scenery components receive only `slotId`, `anchor`, `segmentId`, `state`. An ESLint `no-restricted-imports` boundary prevents them importing the content directory at build time.
4. **Templates own no skills, answers or verdicts** — templates emit a `UserResponse`; all evaluation happens in the Activity/Evaluation layer against the pack's `answerRules`. The lint boundary blocks templates importing skill, curriculum or evaluator modules, so a template cannot compute correctness even accidentally.
5. **No workbook photos as screens** — content packs carry structured items (numbers, figures, relations). The schema has no page-image field.
6. **Layout cannot reveal answers** — uniform spacing/size rules in CH-NUM-PATH; option ordering randomized per attempt; distractors required to match the correct answer in visual weight. A pack validation check rejects option sets where the correct item is the only one of its size/length class.
7. **One answer ≠ mastery** — mastery requires multiple independent correct attempts across ≥2 representations (`representationsSeen`). Exact counts are a product decision (GAP-MASTERY); until decided, the UI never claims "proficient".

## I — Color restoration architecture

- **State location (APPROVED DIRECTION)**: persisted state stores source facts only — slot completion, milestones and evidence. Restoration percentages are derived selectors, never persisted truth: `segment → completedSlots/totalSlots`, `world → aggregate`, `overworldRegion → world value`, `avatar → milestones + world value`. Changing granularity later changes selectors, not saved data.
- **Update events**: `SLOT_COMPLETED` and `MILESTONE_RECOVERED`. Nothing else writes restoration.
- **Board-area restoration**: each Activity Slot declares `segmentId` and `restorationWeight`; the segment's art layer receives the computed value.
- **Overworld restoration**: the Mathematics region reads the world aggregate on mount and animates from its previously-seen value.
- **Maittê restoration**: avatar art split into parts with a declared restoration order; the green heart is always colored (UNIVERSE: hope survives).
- **Persistence**: `PersistenceAdapter` + `schemaVersion`, localStorage for MVP, swappable later without touching game logic.
- **Extensibility**: restoration is keyed by `worldId`/`segmentId`; a new subject world adds config only.
- **Proposed visual technique** (PROPOSAL): two stacked art layers per segment — grayscale/line-art beneath, full-colour above — with the coloured layer revealed by a CSS `mask-image` driven by a custom property. Broadly supported, animatable, no per-asset scripting.
- **Fallback**: coloured-layer `opacity` cross-fade per segment, or a discrete asset swap at completion.
- **Uncertainty flagged**: the exact visual restoration technique remains a Phase 0 spike. Partial *within-segment* restoration and mask performance with many simultaneous segments on tablet are unverified.

## J — Delivery phasing

Approval of one phase does not authorize the next. Each phase ends in a reviewable artifact.

**Phase 0 — Foundation / architecture.** Deliverables: route skeleton for the spatial layers; typed state store + selectors; Zod schemas for all Section E entities; PersistenceAdapter + localStorage implementation (MVP infrastructure — reload survival is a Phase 0 acceptance condition, not a future concern); PuzzleTemplateHost + the response/evaluation contract with at least two evaluators (`selection`, `ordering`); content/world/template/evaluator registries; the lint boundary rules from Section H; a restoration-technique spike (mask vs. opacity) on a placeholder asset; one throwaway template proving the full loop with placeholder content and both drag and tap-to-place input paths. Dependencies: approval of Sections D, E, I as corrected. Acceptance: a placeholder slot can be completed, evaluation happens outside the template, state persists across reload, a segment visibly restores, and no world component or template can import content or evaluators. Reviewable: architecture + working technical loop with placeholder art.

**Phase 1 — Slice A Number Sense.** Deliverables: CH-NUM-BUILD, CH-NUM-PATH; Mathematics world config with Slice A slots; content packs for the seven NUM skills across Discover/Practice/Challenge; companion briefing; feedback rules; board + Overworld restoration wired; first-pass Mathematics board art. Dependencies: Phase 0 accepted; Activity Slot count/order decided (GAP-SLOTS); support levels decided (GAP-SUPPORT); validated pack items supplied. Acceptance: a child completes the Slice A route end to end on a tablet-sized screen, evidence is recorded per skill with mode/assisted flags, colour restores locally and on the Overworld, progress survives reload. Reviewable: the first genuinely playable slice. **Explicitly not the completion of the useful Mathematics MVP.**

**Phase 2 — Slice B Addition/Subtraction/Problems.** Deliverables: CH-OP-SOLVE with manipulable regrouping; CH-OP-STORY with two-phase relation/compute; packs for ADD/SUB skills including non-keyword problems; additional slots/segment in the same world with no scenery rewrite. Dependencies: Phase 1 accepted; problem content authored/validated. Acceptance: regrouping is performed by the child rather than automated; choosing the relation is recorded separately from calculating; adding these packs required zero changes to board components. Reviewable: the study path the teacher currently prioritizes.

**Phase 3 — Slice C Plane Geometry.** Deliverables: CH-GEO-SORT, CH-GEO-BUILD; geometry packs with declared orientation/scale/colour variation; mosaics where the source supports them; third segment. Dependencies: Phase 2 accepted; figure asset set. Acceptance: no figure is recognizable by orientation alone; sides/vertices assessed explicitly; drag/snap reliable with touch. Reviewable: the useful Mathematics MVP complete across A+B+C.

**Phase 4 — Hardening.** Deliverables: tablet device validation, touch-target audit, reduced-motion pass, transition polish and fallbacks, persistence migration path, instruction replay/audio decision applied, readability/accessibility pass, save-integrity handling. Acceptance: the MVP acceptance boundary in MVP-SCOPE is met on real tablet hardware.

## K — GAP / CONFLICT / ASSUMPTION register

**[GAP] — Technical architecture spec absent**
Specs: docs/technical/ARCHITECTURE.md, STATE.md, CONFIG-SCHEMAS.md (missing).
Description: no approved architecture, state or schema decisions exist.
Consequence: Sections D and E are proposals; building on them unapproved creates unreviewed decisions.
Handling: approve Sections D/E as the seed of those spec files, or author them first.

**[GAP] — Persistence not decided**
Specs: MVP-SCOPE (PROVISIONAL local/client-side), docs/technical/PERSISTENCE.md (missing).
Description: no decision on multi-device, multiple children, or reset.
Consequence: localStorage loses progress on device/browser change; no parent-visible reset.
Handling: build behind PersistenceAdapter; request an explicit decision before Phase 4.

**[GAP] — Activity Slot count and order**
Specs: docs/gameplay/ACTIVITY-SLOTS.md (missing); MATHEMATICS-WORLD (route length unresolved); MVP-SCOPE (PROVISIONAL, not fixed in advance).
Consequence: the Slice A board cannot be laid out without a slot count.
Handling: product decides Slice A slot count and skill order before Phase 1; Phase 0 uses placeholders.

**[GAP] — Support Levels undefined**
Specs: docs/gameplay/SUPPORT-LEVELS.md (missing); LEARNING-MODEL treats it as first-class.
Consequence: hint escalation is unspecified; `SupportLevel` remains a typed placeholder.
Handling: define the level set before Phase 1.

**[GAP] — XP economy undefined**
Specs: docs/gameplay/XP.md (missing); PROGRESSION marks the numeric economy PROVISIONAL.
Consequence: no XP values may be assigned. Plan reserves an evidence field and ships no XP UI.
Handling: defer until after Slice A telemetry.

**[GAP] — Mastery thresholds undefined**
Specs: MATH-G2 §9 ("must not be invented by the UI").
Consequence: `proficient` cannot be displayed; counters are collected and the label function stays conservative.
Handling: decide after Phase 1 evidence exists.

**[GAP] — Color-restoration granularity**
Specs: docs/design/COLOR-RESTORATION.md (missing).
Consequence: unknown whether restoration is per-slot, per-segment, per-landmark or continuous.
Handling: Section I proposes per-segment derived from slot completions; requires approval.

**[GAP] — Navigation affordance**
Specs: docs/ux/NAVIGATION.md (missing); OVERWORLD forbids a conventional header but names no replacement.
Consequence: return-to-overworld and settings entry have no approved form.
Handling: Phase 1 ships a minimal diegetic affordance as a visual PROPOSAL, not a decision.

**[GAP] — Transition timing and easing**
Specs: docs/design/ANIMATION.md, docs/ux/TRANSITIONS.md (missing).
Consequence: Section F durations are engineering defaults, not design decisions.
Handling: tune in Phase 4 against design review.

**[GAP] — Mathematics landmarks and minion**
Specs: MATHEMATICS-WORLD (explicitly PROVISIONAL/GAP).
Consequence: board art needs landmark anchors before layout.
Handling: Phase 1 uses neutral, curriculum-agnostic anchors; minion and named landmarks stay unbuilt pending decision.

**[GAP] — Companion assignment**
Specs: MATHEMATICS-WORLD ("must not hardcode a permanent pedagogical role"); docs/narrative/PET-COMPANIONS.md (missing).
Consequence: guide pet per activity is undecided.
Handling: `guidePetId` stays optional data on Activity; no hardcoded pairing.

**[GAP] — Milestone/tool catalogue**
Specs: PROGRESSION (stolen tools as milestones); no catalogue authored.
Consequence: milestone state has no content.
Handling: schema built, catalogue empty until authored.

**[GAP] — Audio and spoken instruction**
Specs: CHALLENGE-STAGE (spoken instruction is product direction); docs/design/AUDIO.md (missing).
Consequence: literacy-aware UX partly depends on audio, but no source/voice/asset decision exists.
Handling: InstructionPlayer built with replay control and an audio slot; Phase 1 ships text + icon + demonstration; audio source decided before Phase 4. Microphone answers remain out of scope.

**[GAP] — Content authoring authority**
Specs: MATH-G2 §11/§12; CONTENT-PARAMETRIZATION rule 5.
Description: packs need validated items; the workbook reconstruction backlog is unfinished.
Consequence: implementation must not author curriculum items.
Handling: build the pack schema and loader; item content supplied/validated by product before each phase.

**[CONFLICT] — Page-turn scope**
Specs: DESIGN-PRINCIPLES §14 ("preferred major transition metaphor") vs. OVERWORLD/ART-DIRECTION (spatial zoom for world entry, page-turn only "when appropriate") vs. this prompt §10 ("do not apply indiscriminately").
Consequence: without a rule, page-turn could displace spatial zoom.
Handling: plan applies zoom for world entry and reserves page-turn for narrative context changes only; requires confirmation.

**[ASSUMPTION] — Challenge Stage as overlay route**
Specs: CHALLENGE-STAGE ("preserve spatial continuity"); no technical spec.
Consequence: determines routing and animation feasibility.
Handling: stated in Section B; approve or replace.

**[ASSUMPTION] — Restoration values derived, never stored**
Consequence: granularity can change without data migration, at the cost of recomputation on load.
Handling: approve as an architectural principle.

**[ASSUMPTION] — Single local profile**
Consequence: no account model, one child per device/browser, matching MVP-SCOPE.
Handling: confirm; multi-profile would change persistence in Phase 0.

## L — Technical risk register

| Risk | Affected area | Impact | Mitigation / fallback |
|---|---|---|---|
| Masked partial colour restoration performs poorly on tablet | Section I visuals | Core feedback device feels janky | Phase 0 spike; fall back to per-segment opacity cross-fade or discrete swap |
| FLIP continuity board→stage unreliable across breakpoints | Transitions 4/5 | Challenge feels like a web form (spec violation) | Scale-from-centre + board dimming fallback |
| Complex illustrated SVG board weight/perf | World Board | Slow entry on tablet | Split layers, lazy-load, rasterize static scenery |
| Multi-touch drag precision on tablet | CH-NUM-BUILD, CH-GEO-BUILD, CH-OP-SOLVE | Errors caused by the interface, not the maths — corrupts evidence | Pointer Events + generous snap; tap-to-select/tap-to-place alternative for every drag interaction |
| Path-following avatar movement under responsive resize | Transition 3 | Token misaligned with route | Recompute anchors on resize; anchor-to-anchor tween fallback |
| Page-turn 3D transform cost / motion sensitivity | Transition 13 | Discomfort, dropped frames | Reduced-motion cross-fade; limit to rare narrative moments |
| Original art production volume (board, avatar layers, figures, companions) | All phases | Largest non-code dependency; can stall phases | Phase with placeholders; treat asset delivery as an explicit phase dependency |
| Evidence/mastery logic drifting into UI components | Section H | Silent pedagogy violation | Pure functions + unit tests; lint import boundaries; review each phase against §H |
| localStorage quota/corruption | Persistence | Lost progress | schemaVersion + safe parse + graceful reset |
| **May exceed reliable Lovable capability** — precise FLIP/spatial-continuity choreography, path-following animation, multi-layer masked restoration at scale | Sections F and I | Escalation may be required | Per docs/WORKFLOW.md escalation clause, route these specific items to Codex/Claude Code if the Phase 0 spike underperforms; specs remain authoritative |
| Content authoring bottleneck (validated packs) | Phases 1–3 | Templates ready with nothing valid to render | Ship schema + a small product-validated pilot pack per family before scaling content |

## Build authorization

No build begins on this plan. Approval authorizes **Phase 0 only**, and only after the Section K items blocking Phase 0 (technical architecture/state/schema approval, restoration granularity, single-profile persistence) are resolved.