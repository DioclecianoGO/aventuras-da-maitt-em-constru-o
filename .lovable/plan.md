# Phase 1A — Visual Foundation Plan

## Section A — Reading confirmation

### Specifications read
- `AGENTS.md`
- `docs/README.md`
- `docs/WORKFLOW.md`
- `docs/design/VISUAL-IMPLEMENTATION.md` (primary spec)
- `docs/design/ART-DIRECTION.md`
- `docs/product/PRODUCT-VISION.md`, `docs/product/DESIGN-PRINCIPLES.md`, `docs/product/MVP-SCOPE.md`
- `docs/narrative/UNIVERSE.md`, `docs/narrative/MAITTE.md`, `docs/narrative/VILLAIN.md`
- `docs/worlds/OVERWORLD.md`, `docs/worlds/MATHEMATICS-WORLD.md` (exists; authoritative)
- `docs/ux/WORLD-BOARD.md`, `docs/ux/CHALLENGE-STAGE.md`
- `docs/technical/ARCHITECTURE.md`, `STATE.md`, `CONFIG-SCHEMAS.md`, `PERSISTENCE.md`
- `docs/adr/ADR-009-PUZZLE-RESPONSE-EVALUATION-BOUNDARY.md`
- Additionally consulted: `docs/gameplay/PROGRESSION.md`, `docs/gameplay/PUZZLE-SYSTEM.md`, `docs/pedagogy/*`

### Absent specifications (registered as GAP, see Section J)
`docs/ux/NAVIGATION.md`, `docs/ux/TRANSITIONS.md`, `docs/ux/FEEDBACK.md`, `docs/design/COLOR-RESTORATION.md`, `docs/design/RESPONSIVE.md`, `docs/design/ANIMATION.md`, `docs/design/AUDIO.md`, `docs/gameplay/ACTIVITY-SLOTS.md`, `docs/gameplay/SUPPORT-LEVELS.md`, `docs/gameplay/XP.md`, `docs/narrative/STORY.md`, `docs/narrative/PET-COMPANIONS.md`, `docs/narrative/LACKEYS.md`, `docs/product/GAME-LOOP.md`, `docs/worlds/{PORTUGUESE,SCIENCE,HISTORY,GEOGRAPHY,ENGLISH}-WORLD.md`, `docs/pedagogy/CURRICULUM-SOURCES.md`.

`docs/worlds/MATHEMATICS-WORLD.md` is NOT absent. Its unresolved biome/landmark/minion/name details are PROVISIONAL.

### Phase 0 implementation read
- Routes: `src/routes/index.tsx`, `mundo.$worldId.tsx`, `mundo.$worldId.index.tsx`, `mundo.$worldId.desafio.$slotId.tsx`, `__root.tsx`
- State: `GameStateProvider.tsx`, `reducer.ts`, `selectors.ts`, `types.ts`
- Restoration: `src/game/restoration/RestorationLayer.tsx` (mask + opacity techniques already spiked)
- Persistence: `adapter.ts`, `local-storage.ts` (schemaVersion 1)
- Stage/templates/registries: `PuzzleTemplateHost.tsx`, `templates/contract.ts`, `PlaceholderOrderTemplate.tsx`, `registries/index.ts`
- Domain/evaluation: `domain/schemas.ts`, `domain/responses.ts`, `evaluation/*`
- Content: `content/placeholder-fixture.ts` (world "Mundo de Demonstração Técnica", segments "Trecho A/B", 3+ slots with `anchor {x,y}` already present)
- Stack: TanStack Start/Router, React 19, Tailwind v4 (`src/styles.css`), no animation library installed.

Observed stale doc references inside code comments (`docs/ux/BOARDS.md`, `docs/design/RESTORATION-OF-COLOR.md`) point at files that do not exist — registered as GAP.

---

## Section B — Preservation of Phase 0

| Area | What exists | Why preserved | Phase 1A may change | Forbidden violation |
|---|---|---|---|---|
| `src/game/domain/` | Zod schemas for Subject/Skill/Pack/Activity/Slot/World; `responses.ts` union | Contract layer for all content | Add optional, purely visual metadata on slot/world (e.g. `anchor`, `visualKind`) via schema extension, reviewed | Adding skill/answer/art coupling; putting asset URLs in domain |
| `src/game/state/` | Facts-only store, reducer, selectors | Single source of progression truth | Add new *derived* selectors (e.g. per-slot restoration, avatar tier) | Persisting restoration %, storing visual state, second progress source |
| `src/game/evaluation/` | Evaluator registry, orchestrator, AttemptResult→Evidence | ADR-009 boundary | Nothing | Any evaluation inside a visual component |
| `stage/PuzzleTemplateHost` | Resolves template, forwards UserResponse | Seam between stage and template | Wrap it in a new illustrated shell; pass presentation props only | Making the shell evaluate or inspect answers |
| `templates/` | `PlaceholderOrderTemplate`, contract, tap+drag | Touch-integrity rule | Restyle within the shell | Template importing state/selectors/assets registry |
| `registries/` | Template + evaluator registration | Pluggability | Add a parallel, separate **visual asset registry** (not merged into this one) | Registering art in the template registry |
| `persistence/` | Adapter + localStorage, schemaVersion 1 | Save compatibility | Nothing (no schema bump expected) | Writing visual prefs into the save without a version bump |
| `restoration/RestorationLayer` | Derived 0..1 prop, mask/opacity techniques | Proven derived-restoration mechanism | Generalize: direction, feather, per-region masks, reduced-motion | Reading state inside it; local decorative CSS disconnected from selectors |
| UserResponse boundary | Template → UserResponse → Evaluator | ADR-009 DECIDED | Nothing | Correctness in UI |
| Activity / ActivitySlot | Activity location-agnostic; slot owns placement | DECIDED | Use existing `slot.anchor` for scenery placement | Adding `slotId` to Activity |
| Route/spatial continuity | Board layout with `<Outlet />` overlay | **Spatial continuity is DECIDED**; the nested-route technique is the current default and PROVISIONAL | Keep as-is for Phase 1A | Replacing the overlay with a full page navigation that unmounts the board |

No alternative to the nested-route technique is proposed for Phase 1A. It already satisfies continuity, state and orchestration.

---

## Section C — Removal / Replacement of Phase 0 scaffolding

| Phase 0 pattern | Current location | Why non-canonical | Removal method | Adventure-language replacement | Risk |
|---|---|---|---|---|---|
| `<header>` + `<h1>Aventuras da Maittê</h1>` page heading | `routes/index.tsx` | Web-app heading, not a world | Delete from player path; title stays in `head()` meta only | Title appears as illustrated map cartouche/banner inside the parchment, or not at all | Loss of SEO H1 → keep one visually-integrated H1 styled as map lettering |
| Subtitle "Fase 0 — esqueleto técnico…" | `routes/index.tsx` | Technical terminology visible to child | Delete | None (or diegetic first-visit hint) | None |
| Section heading "Regiões" | `routes/index.tsx` | Dashboard section language | Delete | Regions readable as places; `aria-label` carries the semantics | Screen-reader nav → nav landmark with hidden label |
| World as big gradient card + "Cor restaurada: N%" | `routes/index.tsx` | Card grid ≠ geography | Replace component | `OverworldMap` region hit areas over illustration; progress shown by restored color | Hit-area accuracy on illustration |
| "Mundo de Demonstração Técnica" | `content/placeholder-fixture.ts` | Placeholder name in player path | Introduce a *presentation-level* display name for the Mathematics region; fixture stays technical or is renamed in a reviewed content module | "Deserto dos Números" (PROVISIONAL) | Must not become a curriculum decision |
| "← Mapa do mundo" text link | `mundo.$worldId.tsx` | Corporate nav | Delete | Diegetic navigation object (Section G6) | Discoverability → must be tested |
| Board `<h1>` + "Cor restaurada: N%" | `mundo.$worldId.tsx` | Dashboard | Delete/replace | Region name as small diegetic sign; progress via color | Accessibility → visually-hidden H1 |
| "Trecho A"/"Trecho B" section labels + gray containers | `mundo.$worldId.tsx` | Dashboard sections | Replace with single continuous scene | Segments become route stretches in one illustration | Segment semantics must survive in state only |
| Rectangular slot buttons "Desafio"/"Concluído" | `mundo.$worldId.tsx` | Level buttons | Replace with `ActivitySlotMarker` | Scenery objects (see G4) | Touch target size must stay ≥ 64px |
| Dashed "Bloqueado" box | `mundo.$worldId.tsx` | Disabled-UI language | Replace | Stolen-color scenery + faded path; label via `aria-disabled` + hidden text | Must not rely on color alone |
| Full-screen neutral scrim + white card + `<h1>Desafio</h1>` + "Voltar ao tabuleiro" button | `mundo.$worldId.desafio.$slotId.tsx` | Generic modal | Replace shell only | `ChallengeStageShell` growing from the slot, biome visible around | Focus trap and return path must be preserved |

---

## Section D — Component plan

| Component | Purpose | Governing spec | Replaces | State connection | Status |
|---|---|---|---|---|---|
| `world/OverworldScene` | Root of the illustrated map, camera/viewBox owner | OVERWORLD, VISUAL-IMPLEMENTATION §4 | index page body | reads region restoration selectors | Functional |
| `world/MapLayer` | Generic ordered layer wrapper (z, parallax factor) | VISUAL-IMPL §5 | — | none | Functional |
| `world/RegionHitArea` | Accessible SVG path/polygon destination | §4.1, §12 | world card link | slot/world availability | Functional |
| `world/RegionRestoration` | Per-region stolen↔restored visual | §4.4 | percentage text | `selectRegionRestoration` | Functional |
| `world/BaseDaEsperanca` | Origin landmark | UNIVERSE | — | none | Concept asset |
| `world/DiegeticNav` | Map/backpack-style navigation object | §6 | text links | route only | Functional (concept art) |
| `world/SpatialZoomTransition` | Overworld→Mathematics camera move | §4.5 | none | none | Functional |
| `character/Maitte` | Character with scale + restoration tiers | MAITTE | — | `selectAvatarRestoration` | Concept asset |
| `board/MathBoardScene` | Continuous illustrated route scene | WORLD-BOARD, §8 | segment sections | slot states | Functional |
| `board/RoutePath` | Curved illustrated path w/ restored/stolen stretches | WORLD-BOARD | gray containers | segment restoration | Functional |
| `board/ActivitySlotMarker` | Scenery object + 3 states | §8 | slot buttons | `selectSlotState`, `selectCurrentSlot` | Functional |
| `board/Landmark` | Orientation scenery, curriculum-free | §8, MATH-WORLD | — | optional restoration | Concept asset |
| `board/MaitteOnBoard` | Position binding + move animation | WORLD-BOARD | — | `selectCurrentSlot` | Functional |
| `stage/ChallengeStageShell` | Illustrated frame around `PuzzleTemplateHost` | CHALLENGE-STAGE, §9 | white card modal | none (presentation) | Visual shell |
| `stage/CompanionEntrance` | One concept companion appearing at stage | UNIVERSE §Companions | — | none; pet id passed as prop | Concept asset |
| `stage/StageFeedback` | Success/retry visual response | CHALLENGE-STAGE | inline text | receives AttemptResult from route | Visual shell |
| `visual/assetRegistry` | Maps logical ids → asset modules | §10 | — | none | Future-ready |
| `visual/useReducedMotion`, `visual/useMapCamera` | Motion + framing utilities | §12, §11 | — | none | Functional |
| `RestorationLayer` (modified) | Direction/feather/region options | STATE | — | prop only | Functional |

No component introduces new gameplay behavior.

---

## Section E — Asset plan

All assets live under `src/assets/game/**` and are referenced through `src/visual/assetRegistry.ts`. Never inside `domain/`, `state/`, `content/`, `evaluation/`, `persistence/`.

| Asset | Purpose | Format | Tablet scaling | States | State integration | Replaceability | Approval? |
|---|---|---|---|---|---|---|---|
| Overworld base (sky/parchment/atmosphere) | Backdrop | Raster (WebP) or CSS gradient+grain | 2048px wide, `object-fit: cover` in fixed viewBox | single | none | registry key `overworld.base` | Yes |
| Overworld terrain + 6 region shapes | Geography | Hybrid: raster painting + SVG region outlines/hit paths | SVG scales; raster @1x/@2x | line-art / colored pair per region | per-region restoration selector | one file per region | Yes |
| Mathematics region art | Destination identity | Layered raster (line, color, detail) | @2x max 1600px | stolen / partial / restored | `selectRegionRestoration` | swap folder | Yes |
| Maittê | Protagonist | SVG (preferred) or layered PNG | vector; board ~180px, map ~90px | stolen (green heart only), partial, restored; idle + move | `selectAvatarRestoration` | single module | Yes |
| Board scene (Number Desert) | Board backdrop | Layered raster + SVG path overlay | 2400px wide, horizontal camera | per-segment restoration | `selectSegmentRestoration` | folder swap | Yes |
| Route path | Journey line | SVG path | vector | traversed / current / untraveled | slot states | data-driven path string | Yes |
| Activity Slot markers (3-4 object kinds) | Slot presence | SVG sprites | vector | locked / available / completed | `selectSlotState` | registry map by `visualKind` | Yes |
| Landmark (≥1) | Orientation | Layered raster or SVG | @2x | stolen / restored | segment restoration | registry key | Yes |
| Diegetic nav object | Navigation | SVG | vector, ≥72px target | rest / hover / active | none | registry key | Yes |
| Restoration masks | Reveal geometry | SVG mask paths / CSS gradients | vector | derived | progress prop | per-region mask file | Yes |
| Challenge Stage shell frame | Focus frame | SVG 9-slice-like frame + CSS | vector | idle / success / retry | none | registry key | Yes |
| Companion (1 pet, concept) | Guide presence | SVG or PNG | ~200px | idle / entrance | none | registry key, pet id prop | Yes |

Asset generation approach for Build: original illustrated concept assets produced for this project; no imitation of any existing artist/studio/character.

---

## Section F — Transition plan

No new animation dependency is proposed. Rationale: every transition below is a transform/opacity/mask animation on a small number of layers, expressible with CSS transitions, CSS keyframes and (where sequencing is needed) the Web Animations API, which is available in all target browsers and already supported by the current stack. Framer Motion/GSAP would add ~30-120KB gzipped and a second animation paradigm without solving anything listed here. If, during Build, the zoom + crossfade sequencing proves unmaintainable in raw WAAPI, adding `motion` will be raised as a **PROPOSAL requiring approval**, not applied unilaterally.

| # | Transition | Intended experience | Implementation | New dep | Normal motion | Reduced motion | Fallback | Risk |
|---|---|---|---|---|---|---|---|---|
| 1 | App opening / Overworld reveal | Book/world waking up | CSS keyframes: slow atmospheric fade + 1.02→1.0 scale, staggered layer opacity | No | 900ms | Instant render, no scale | Static map | Low |
| 2 | Overworld → Mathematics zoom | Traveling into the region | "Fake camera": animate `transform: scale()+translate()` on the map container with focal origin at region centroid; crossfade to board scene at ~70% | No | 700-900ms ease-in-out | 150ms crossfade only | Crossfade only | GPU cost on large rasters → mitigate with `will-change`, downscaled zoom-out texture |
| 3 | Zoom landing → Board | Continuity of place | Board mounts pre-scaled at 1.06 and settles to 1.0 while zoom overlay fades | No | 300ms | Immediate | Immediate | Timing mismatch → single shared transition controller |
| 4 | Board → Challenge Stage | Slot object opens into the challenge | Slot anchor drives transform-origin; frame scales up from marker; board behind gets slight blur+dim (never opaque neutral scrim) | No | 450ms | Fade 120ms, no scale | Fade | Blur perf on tablet → fallback to dim+desaturate only |
| 5 | Challenge Stage → Board | Returning to the world | Reverse of #4, then restoration + move sequence | No | 400ms | Fade | Fade | Focus restoration to slot marker |
| 6 | Color restoration | Color flows back | `RestorationLayer` mask position/opacity transition on the completed stretch | No | 800ms flow | Snap to final derived value | Opacity crossfade | Mask support → opacity technique fallback (already spiked) |
| 7 | Maittê movement | She walks/hops on | CSS transform along precomputed path points, 2-3 keyframe hops | No | 600ms | Instant reposition | Instant reposition | Path/anchor mismatch |
| 8 | Companion entrance | Pet appears from scenery | Translate + slight squash, opacity | No | 400ms | Fade in | Fade | None |
| 9 | Return to Overworld | Camera pulls out | Inverse of #2 | No | 700ms | Crossfade | Crossfade | Same as #2 |

All transitions read `prefers-reduced-motion` through one shared hook; state changes are never gated on animation completion.

---

## Section G — Visual Concept Gate

This section is a proposal for human visual approval. Nothing here is DECIDED by this plan.

### G1. Overworld composition
A single landscape parchment-map illustration in an oblique, slightly elevated storybook perspective, framed at 16:10 for landscape tablet.

- **Base da Esperança** sits at lower-center-left: a small hillside camp with a warm lantern and a green pennant — the only fully colored element at zero progress. It is the compositional anchor and the visual "home" the paths radiate from.
- **Six destinations**, arranged clockwise around the base so no ordering is implied:
  - Portuguese — dense storybook forest, upper-left;
  - Science — coastal/ocean bay with tidepools, left;
  - Mathematics — **desert with dunes and ruins, right-center** (nearest the base, shortest path, since it is the playable world);
  - Geography — layered valley and river canyon, lower-right;
  - History — walled kingdom on a plateau, upper-right;
  - English — small harbor town / city rooftops, upper-center.
- **Terrain transitions** are illustrated, not abutted: forest thins into scrub, scrub into dune, dunes into canyon.
- **Paths** are dotted trails from the base to each region; the Mathematics trail is the most defined.
- **Focal point:** the base, with the Mathematics dune ridge as strong secondary silhouette.
- **Maittê** stands at the base facing the desert trail, ~7% of frame height.
- **Camera framing:** fixed SVG `viewBox` with responsive focal point; never a card list.

### G2. Mathematics region (PROVISIONAL — "Deserto dos Números")
- **Silhouette:** three overlapping dune curves with a rock arch and half-buried ruin fragments; readable at map scale as a distinct shape.
- **Terrain:** wind-rippled sand, scattered stones, dry brush, one oasis pocket.
- **Line-art treatment:** confident varying-weight ink outline, cross-hatch on dune shadow sides so depth survives desaturation.
- **Stolen color:** warm-neutral paper tone, ink lines, hatch texture; NOT flat gray.
- **Restored palette (PROVISIONAL):** sand amber, terracotta rock, teal oasis, dusk violet sky.
- **Neighbors:** dunes fade into Geography's canyon rim to the south and dry scrub toward the base.
- No landmark encodes a math skill.

### G3. Maittê concept (per MAITTE.md)
- **Proportions:** ~5.5 heads, eight-year-old; not chibi, not adult.
- **Line:** clean tapered ink outline, minimal interior lines, light anime influence in eye and expression shapes; original design.
- **Hair:** dark brown, slightly below shoulders, marked fringe, soft wave at the ends, one subtle light/bleached lock framing the face.
- **Glasses:** pink frames (current canonical direction).
- **Clothing:** skirt, simple tee with a **green heart**, colorful striped socks, high-top canvas sneakers with no protected branding.
- **Stolen state:** everything desaturated to ink + paper except the green heart, which stays saturated and gently pulses.
- **Partial restoration:** color returns in reviewable stages — heart → shirt → socks → skirt/hair → sneakers/glasses — driven by `selectAvatarRestoration` tiers.
- **Asset states needed:** idle, move (2-3 frames or transform-based), map scale, board scale, plus the restoration tiers as separately toggleable color layers.

### G4. Mathematics Board concept
- **Perspective:** oblique elevated storybook view, wider than the viewport, horizontal camera pan; not top-down, not side-scroller.
- **Route:** one curving trail from an oasis at the left, over a dune saddle, past the rock arch, toward a distant ruin at the right edge (visible but unreachable — anticipation).
- **Scenery:** overlapping dunes, brush clumps, stone piles, distant haze for depth.
- **Slots as objects (proposal):** carved standing stone, oasis lantern, footprint pair in the sand, small bridge over a dry wash, arch doorway. Assigned per slot via a visual metadata field, not hardcoded to any skill.
- **Completed:** object upright, colored, small life around it (a bird, water shimmer), path behind it fully colored.
- **Current/available:** Maittê stands beside it; the green heart pulse echoes on the object; a soft light and slight environmental motion (blowing sand); no button chrome.
- **Locked/future:** stolen-color, half-buried, path ahead drawn as faint dotted ink; a small "stolen-color" mark (drained crayon glyph) so the state is not color-only.
- **Landmark:** the rock arch, mid-route — orientation only, no curriculum meaning.
- **Local restoration:** each completed slot restores its surrounding stretch of the route.

### G5. Color restoration concept
- **Stolen:** ink lines + warm paper + hatch texture + full value range. Depth comes from line weight, hatching and atmospheric value, so the scene is attractive with zero color. Only Maittê's green heart is colored.
- **Partially restored:** color returns as a *flow along the route* from the base outward — completed stretches fully colored, a feathered boundary, the rest still ink. Restored areas also gain small living details (a flower, water shimmer) so the difference is not hue-only.
- **Restored:** full palette, all detail layers on, ambient motion.
- **What remains constant:** composition, line work, silhouettes, hit areas — restoration only toggles color/detail layers and mask geometry.
- **Progress without percentages:** the reviewer reads "how far the color has travelled along the trail". A numeric value remains available to assistive tech only.

### G6. Diegetic navigation concept — PROPOSAL
**Preferred object: Maittê's canvas backpack with a folded map tucked in the side pocket.**
- **Why it fits:** she is a traveler on a journey; a backpack is the natural carrier of the map and, later, the recovered coloring tools (a direct hook for the villain's stolen-tools narrative).
- **What it does:** tapping the folded map returns to the Overworld from any world; tapping the backpack body opens a small diegetic pouch with secondary/parent access (out of scope to implement fully in Phase 1A).
- **Where:** bottom-left corner, resting on the scene, ~96px, always visible during play, never a bar.
- **Interaction:** touch/hover → the map corner lifts and the strap sways; press → map unfolds briefly into the zoom-out transition.
- **Accessibility:** `<button aria-label="Voltar ao mapa do mundo">`, visible focus ring drawn as a warm glow, ≥72px touch target, reduced motion removes the sway.
- Alternatives considered and rejected for Phase 1A: standalone compass (weaker narrative tie), book (reserved for the page-turn narrative metaphor).

### G7. Challenge Stage concept
- The selected slot object **grows** into the stage: its transform-origin is the slot anchor, so the frame appears to unfold from that place in the sand.
- The board stays visible around the frame — dimmed and slightly blurred, never covered by a neutral scrim; the dune horizon remains recognizable.
- **Frame:** an illustrated stretched-canvas/parchment panel with rope corners, occupying the center ~72% of the viewport, leaving biome visible on all sides.
- **Interaction area:** large central zone with tablet-scale targets, instruction line at the top, support/audio affordance reserved at the top-right of the frame.
- **Companion:** one pet sits at the lower-left edge, partly outside the frame, watching; it never overlaps interactive targets.
- **Return:** success → frame flash + companion reaction → frame recedes into the slot object → the object restores color → color flows along its route stretch → Maittê reacts and hops to the next slot.

### G8. Concept approval register

| Concept | DECIDED constraints | Proposed solution | Still PROVISIONAL | Approve before Build? |
|---|---|---|---|---|
| Overworld composition | One coherent geography; six regions; origin; no cards | G1 layout | region placement, terrain art | Yes |
| Base da Esperança | Shared origin exists | Lower-center-left camp, only colored element at 0% | visual design, name display | Yes |
| Mathematics region | Physical destination; no curriculum in scenery | G2 desert | biome, palette, name "Deserto dos Números" | Yes |
| Maittê | MAITTE.md traits | G3 concept | exact face/style, restoration tier order | Yes |
| Route & slot language | Slots in scenery; 3 states | G4 objects | object set, route length, slot count | Yes |
| Restoration treatment | Derived from facts; not color-only | G5 flow-along-route | feather size, granularity | Yes |
| Diegetic navigation | No corporate header | G6 backpack + map | final object | Yes |
| Challenge Stage | Spatial continuity | G7 frame from slot | frame art, dim/blur amount | Yes |
| Companion shell | No skill binding | One pet, concept | which pet, behavior | Yes |
| Landmark | Scenery only | Rock arch | final landmark | Yes |

---

## Section H — Visual Acceptance Matrix

Against the 12 criteria in `docs/design/VISUAL-IMPLEMENTATION.md` §13.

| # | Criterion | Intended experience | Components | Assets | State | Transition | Tablet | Reduced motion | Risk | Fallback | Human acceptance test |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Opening shows illustrated world, not dashboard | Map fills the screen | OverworldScene, MapLayer | Overworld base+terrain | region restoration | #1 | Fixed viewBox, landscape-first | No scale-in | Asset weight | CSS/SVG-only map | Open `/`: reviewer sees one continuous illustrated geography; no card, no "Regiões", no page title bar |
| 2 | Mathematics identifiable as a place | Desert reads as a region | RegionHitArea, Math region art | Math region | availability | — | Region ≥120px | n/a | Silhouette legibility | Diegetic carved sign | Reviewer points at the desert without reading a label |
| 3 | Stolen color visible in the illustration | Ink world with green heart | RegionRestoration, RestorationLayer | line/color pairs | `selectRegionRestoration` | #6 | same | static | Gray-UI look | Paper texture + hatching | With empty save, map is ink-on-paper yet attractive; heart is the only color |
| 4 | Entering Mathematics feels spatial | Camera flies in | SpatialZoomTransition | zoom textures | none | #2, #3 | GPU transform | crossfade | Jank | crossfade | Tap the desert: camera zooms into it; no white page flash |
| 5 | Board reads as a route | One scene with a trail | MathBoardScene, RoutePath | board scene | segment restoration | #3 | horizontal pan | static | Pan discoverability | Fit-to-width framing | Board shows a continuous desert route; no "Trecho A/B", no gray containers |
| 6 | Maittê visibly present | Real character | Maitte, MaitteOnBoard | Maittê asset | `selectCurrentSlot` | #7 | ~180px board | instant move | Art quality | concept SVG | Reviewer recognizes an 8-year-old with glasses, skirt, sneakers, green heart |
| 7 | Progress derives from Phase 0 state and changes the world | Color travels | RestorationLayer, RoutePath | masks | selectors | #6 | same | snap | Mask support | opacity crossfade | Complete a challenge, reload: restored stretch persists with no percentage read |
| 8 | No conventional header in play | World-only chrome | DiegeticNav | backpack | none | — | corner ≥72px | no sway | Discoverability | subtle first-visit nudge | No header/nav bar anywhere in play; return happens via the backpack map |
| 9 | No Phase 0 technical language | Child-safe copy | all | — | — | — | — | — | Leaks in fixtures | copy audit | Search the rendered page: no "Fase 0", "Trecho", "Bloqueado", "Demonstração Técnica" |
| 10 | Phase 0 boundaries intact | Same pipeline | unchanged domain/eval | — | — | — | — | — | Refactor drift | revert visuals | Evaluator unit tests still pass; lint boundary rules unchanged and passing |
| 11 | No invented curriculum | Placeholder puzzle only | PuzzleTemplateHost | — | — | — | — | — | Content creep | keep fixture | Only the placeholder ordering activity exists; no addition/subtraction/geometry items |
| 12 | Assets isolated & replaceable | Registry indirection | assetRegistry | all | none | — | — | — | Import leakage | lint rule | Swapping one registry entry changes the art with no change under `src/game/**` |

---

## Section I — Phase 1A / Concept / Out-of-scope boundary

| Feature | Phase 1A Functional | Concept / Visual prototype | Out of scope |
|---|---|---|---|
| Overworld visual foundation | ✔ | art is concept-quality | — |
| Mathematics entry (zoom) | ✔ | — | — |
| Mathematics Board shell | ✔ (states, positions, restoration) | scenery art | final route length |
| Maittê | ✔ (position, restoration tiers) | character art | customization |
| Restoration | ✔ (derived, persisted-fact driven) | mask granularity | weighting rules |
| Challenge Stage shell | ✔ (transition, focus, return) | frame art | real challenge content |
| Companion shell | — | ✔ one pet entrance | assignment, dialogue system |
| Other five worlds | — | ✔ visible geography only | functional worlds, routes |
| Real Number Sense challenges | — | — | ✖ |
| Addition / subtraction / geometry | — | — | ✖ |
| XP economy | — | — | ✖ |
| Backend / accounts | — | — | ✖ |
| Avatar customization | — | — | ✖ |
| Final production art | — | — | ✖ |
| Final audio / microphone | — | — | ✖ |
| Final animation system | — | — | ✖ |

---

## Section J — GAP / CONFLICT / ASSUMPTION register

[GAP] — Absent UX/design specs (NAVIGATION, TRANSITIONS, FEEDBACK, COLOR-RESTORATION, RESPONSIVE, ANIMATION)
Specs involved: `docs/ux/`, `docs/design/`
Description: Six specs referenced by the reading list and by code comments do not exist.
Phase 1A consequence: navigation object, transition timing, restoration granularity, responsive rules and motion rules have no binding source.
Proposed handling: this plan's Sections F/G are proposals; approved answers should be written into those files before or during Build.
Must resolve before Build? YES (at least NAVIGATION, TRANSITIONS, COLOR-RESTORATION)

[GAP] — Stale spec references in Phase 0 code
Specs involved: `docs/ux/BOARDS.md`, `docs/design/RESTORATION-OF-COLOR.md`
Description: code comments cite files that do not exist (real names: WORLD-BOARD.md, COLOR-RESTORATION.md).
Phase 1A consequence: cosmetic, but misleading for future agents.
Proposed handling: correct the comments during Build.
Must resolve before Build? NO

[GAP] — Other five subject worlds have no specs
Specs involved: `docs/worlds/*`
Description: Portuguese/Science/History/Geography/English worlds have no approved biome.
Phase 1A consequence: their Overworld appearance is concept-level only.
Proposed handling: render as non-interactive geography; mark PROVISIONAL.
Must resolve before Build? NO

[ASSUMPTION] — Mathematics biome, landmark, route length, slot count, minion
Specs involved: `docs/worlds/MATHEMATICS-WORLD.md` (PROVISIONAL items)
Description: desert direction and the specific objects in G2/G4 are proposals.
Phase 1A consequence: board art depends on them.
Proposed handling: approve or amend in the Visual Concept Gate; no minion is implemented in Phase 1A.
Must resolve before Build? YES (visual approval only)

[ASSUMPTION] — Display name "Deserto dos Números" in the child-facing UI
Specs involved: MATHEMATICS-WORLD (PROVISIONAL name)
Description: the current fixture name is a technical placeholder that must not be shown.
Phase 1A consequence: a presentation display name is required.
Proposed handling: use the provisional name behind a replaceable presentation mapping.
Must resolve before Build? YES

[ASSUMPTION] — Companion selection for the concept entrance
Specs involved: `docs/narrative/UNIVERSE.md`; PET-COMPANIONS.md absent
Description: which pet appears in the Challenge Stage concept.
Phase 1A consequence: one asset needed.
Proposed handling: pet passed as a prop/config value; no skill binding.
Must resolve before Build? NO

[ASSUMPTION] — Restoration granularity
Specs involved: STATE.md, COLOR-RESTORATION.md (absent)
Description: whether restoration flows per slot, per segment or per region.
Phase 1A consequence: mask geometry design.
Proposed handling: implement per-slot stretch on the board, per-region on the map, both derived; revisit after review.
Must resolve before Build? NO

[ASSUMPTION] — Maittê restoration tier order
Specs involved: MAITTE.md
Description: the order heart→shirt→socks→skirt/hair→shoes is proposed, not decided.
Phase 1A consequence: avatar layer structure.
Proposed handling: data-driven tier list, easily reordered.
Must resolve before Build? NO

[ASSUMPTION] — Diegetic navigation object
Specs involved: OVERWORLD §Navigation; NAVIGATION.md absent
Description: backpack + folded map proposed.
Phase 1A consequence: primary navigation affordance.
Proposed handling: approve in Concept Gate G6.
Must resolve before Build? YES

[ASSUMPTION] — Animation timing and easing
Specs involved: ANIMATION.md (absent)
Description: durations in Section F are proposals.
Phase 1A consequence: perceived feel.
Proposed handling: centralize as tokens; tune after preview review.
Must resolve before Build? NO

[ASSUMPTION] — No new animation dependency
Specs involved: product-owner correction 1.4
Description: CSS + WAAPI assumed sufficient.
Phase 1A consequence: sequencing code written by hand.
Proposed handling: if insufficient during Build, raise a dependency PROPOSAL and stop.
Must resolve before Build? NO

[CONFLICT] — SEO/head metadata vs. no visible page headings
Specs involved: VISUAL-IMPLEMENTATION §3, platform SEO requirements
Description: routes need titles/descriptions and a semantic H1 while the child-facing surface must not show a web heading.
Phase 1A consequence: heading strategy.
Proposed handling: keep `head()` meta; render one visually-hidden or map-lettering H1 per route.
Must resolve before Build? NO

---

## Section K — Technical risk register

| Risk | Area | Impact | Likelihood | Mitigation | Graceful fallback | Codex/Claude Code needed? |
|---|---|---|---|---|---|---|
| Layered Overworld raster weight / paint cost | Performance | High | Medium | WebP, ≤2048px, few layers, `content-visibility`, composite only transform/opacity | Fewer layers, single flattened base | Possibly, for asset pipeline |
| Restoration mask support / cost | Restoration | High | Medium | Keep both mask and opacity techniques already spiked; feature-detect | Opacity crossfade | No |
| Spatial zoom jank on tablet | Transition | High | Medium | GPU transforms only, pre-scaled low-res zoom texture, no layout animation | Crossfade | Possibly |
| Responsive map framing collapsing the composition | Layout | High | Low | Fixed aspect viewBox + focal-point crop + controlled pan; never card list | Fit-to-width with pan | No |
| Touch hit areas over illustration drift from art | Interaction | High | Medium | SVG paths in the same coordinate space as the art; slot anchors from domain `anchor` | Invisible rounded rect fallback ≥72px | No |
| Asset replacement breaking layout | Assets | Medium | Medium | Registry + fixed logical dimensions per asset slot | Placeholder silhouette | No |
| Challenge Stage continuity lost (blur cost, focus loss) | Stage | High | Medium | Dim+desaturate instead of blur if slow; explicit focus management and restore | Static dim | No |
| Character asset scaling across map/board/icon | Character | Medium | Medium | SVG with layered groups; single source, CSS scale | Two raster sizes | No |
| Reduced motion breaking sequencing | Motion | Medium | Low | State never depends on animation completion | Instant final state | No |
| Tablet GPU/memory limits with many layers | Performance | High | Medium | Layer budget (≤8 composited layers per scene), measure on device | Reduce parallax/detail layers | Possibly |
| New animation dependency creep | Dependencies | Medium | Low | Dependency requires explicit approval | Stay on CSS/WAAPI | No |
| Phase 0 boundary erosion during visual refactor | Architecture | High | Low | Extend existing `no-restricted-imports` lint rules to forbid `@/assets` and visual imports inside `src/game/{domain,state,evaluation,persistence}` | Revert visual layer | No |

---

## Build gate

Build Mode must not begin until: (1) Section G is visually approved; (2) the YES items in Section J are resolved; (3) Section B preservation is accepted; (4) Section H is accepted as the acceptance protocol.
