# Visual Implementation — Phase 1A

**Status:** DECIDED implementation constraints; final production assets remain PROVISIONAL.

This document translates the approved visual direction into implementation constraints for the first visual delivery. It operationalizes `ART-DIRECTION.md`, `OVERWORLD.md`, `MAITTE.md`, `WORLD-BOARD.md`, `NAVIGATION.md`, `TRANSITIONS.md`, `COLOR-RESTORATION.md`, `RESPONSIVE.md`, `ANIMATION.md` and the product design principles.

## 1. Purpose of Phase 1A
Phase 0 established the technical skeleton. Its current white/gray screens, cards, labels, percentages and rectangular placeholders are **non-canonical technical scaffolding**. They must not become the visual foundation by incremental decoration.

Phase 1A proves that the Phase 0 architecture can support the actual child-facing experience: illustrated adventure world, spatial navigation, diegetic controls and state-driven color restoration.

The working Phase 0 domain, evaluation, persistence and progression foundations remain intact while the child-facing presentation is replaced.

## 2. Visual thesis
The experience reads first as an illustrated adventure and only second as software.

Approved language:
- original 2D storybook / coloring-book world;
- clean expressive line work and warm handcrafted shapes;
- readable silhouettes and child-friendly environmental detail;
- light manga/anime influence in expression/movement/character appeal;
- no photorealism and no imitation of named copyrighted works/artists;
- color restoration is state/progression, not decorative polish.

## 3. Phase 0 presentation to remove
Remove from the primary child-facing path:
- page-title/section-title/dashboard-card hierarchy;
- neutral gray world/board cards;
- percentage text as primary progress expression;
- conventional “back to map” text links;
- rectangular level rows/buttons and large lock treatment;
- technical/demo/Phase 0/placeholder terminology;
- generic neutral modal/card Challenge Stage styling.

## 4. Overworld
### 4.1 Composition
One coherent illustrated magical geography, not a subject list/card grid. It contains:
1. Base da Esperança approximately central;
2. six visually distinguishable subject regions integrated into one geography;
3. organic terrain transitions, paths and landmarks;
4. Maittê at/near the Base when compositionally appropriate;
5. world-integrated controls.

Only Mathematics is functionally enterable in Phase 1A. Other worlds are visible geography, not fake playable screens.

The preferred provisional geography is governed by `OVERWORLD.md` (Forest NW/W, History N, Geography NE/E, English E/SE, Mathematics SW, Science S/coast, Base central). Visual adjustment remains reviewable but must not imply a global subject order.

### 4.2 Opening color rule
The world begins in attractive stolen-color line art/value/texture.

**DECIDED:** Maittê's green heart is the primary saturated color anchor at opening. Do not add a fully colored Base flag/lantern/prop that competes with that symbol unless separately approved.

### 4.3 Mathematics entry
Selecting Mathematics uses spatial zoom/camera travel into the region. Graceful fallback may use simpler transform/crossfade but must preserve spatial relation.

## 5. Visual layering and domain isolation
Use composable visual layers (atmosphere, terrain/regions, restoration, paths/landmarks, hit areas, character/companions, diegetic controls, transitions) rather than treating the world as UI cards.

Visual assets and presentation metadata must remain outside educational/domain ownership.

**DECIDED:** do not add asset URLs or presentation-specific `visualKind` values to the core educational/domain schemas for Phase 1A. Use a separate world/scenery visual configuration or asset registry keyed by stable world/zone/slot identifiers. Existing neutral spatial anchors may be consumed by that layer.

## 6. Diegetic navigation
Governed by `docs/ux/NAVIGATION.md`.

**DECIDED:** folded world map = primary return-to-Overworld affordance inside subject worlds.

**DECIDED distinction:** Maittê's backpack is a separate secondary/future concept. Do not merge the folded map into the backpack as a permanent combined control. Phase 1A may reserve/show the backpack conceptually, but secondary systems are out of scope.

No corporate persistent header or competing row of generic text links.

## 7. Maittê
Phase 1A must include a concept-quality original Maittê asset, not a generic icon. `MAITTE.md` governs hair, bangs/light streak, pink glasses direction, skirt, socks, high-top canvas shoes and green heart.

Her asset must support stolen and partial restoration through independent visual layers. The exact restoration order is not fixed by Phase 1A.

## 8. Mathematics World Board
The Board is an illustrated route within the Mathematics biome, not Trecho A/Trecho B containers.

Required:
- continuous scenery;
- sequential slots embedded in scenery;
- Maittê visibly at current position;
- completed/current/future states expressed by the world;
- state-driven local restoration;
- orientation landmark(s) without curriculum ownership;
- spatial continuity on challenge return.

**Phase 1A preferred first-board concept:** opening Zone `Dunas Douradas` as defined provisionally in `MATHEMATICS-WORLD.md`. Do not begin the Board at the Oásis; the Oásis may serve as next-zone preview/direction. Exact art remains subject to review.

## 9. Activity Slots
Governed by `docs/gameplay/ACTIVITY-SLOTS.md`.

Slots are scenery objects, not generic buttons. Their art/type belongs to world/scenery visual config keyed by slot id, not to the educational Activity/domain contract.

## 10. Challenge Stage
The Challenge Stage remains perceptually connected to the selected slot and Board. The technical PuzzleTemplateHost may remain underneath.

The shell must be **world-skinnable** rather than freezing a universal parchment/rope frame as product truth. A desert-specific concept frame may be used for Phase 1A, but shell theming/asset mapping must be replaceable for future worlds.

Entry may visually emerge from the slot/world object; success returns to the same Board, then restoration and Maittê movement become visible.

## 11. Concept asset package
Before visual validation, Phase 1A uses original replaceable concept assets for at least:
- Overworld composition/layers;
- Mathematics region;
- Maittê;
- Mathematics route and slot language;
- one landmark;
- folded-map navigation affordance;
- restoration mask/layer mechanism;
- Challenge Stage shell;
- optional one-pet concept for companion-shell validation.

These are not final production assets.

## 12. Responsive / accessibility
Tablet landscape is primary; desktop is supported. The Overworld remains a spatial map and never collapses into cards. Use crop/framing/pan as needed.

Interactive regions/slots require programmatic labels, child-sized touch targets, visible keyboard focus, readable essential text, non-color restoration cues and reduced-motion fallbacks.

## 13. Phase 1A acceptance criteria
Phase 1A passes only if:
1. opening presents an illustrated world rather than dashboard/cards;
2. Mathematics is identifiable as a physical place;
3. stolen-color state exists in the illustration itself, with the green heart as the primary opening color anchor;
4. entering Mathematics feels spatially connected;
5. Mathematics Board reads as route/scenery, with the opening Zone aligned to the approved/provisional first-zone concept rather than starting at a later region;
6. Maittê is visibly represented with approved concept traits;
7. progress/restoration derives from Phase 0 facts/selectors and visibly changes world/board/avatar;
8. folded map provides diegetic world-return navigation without a conventional application header;
9. Phase 0 technical language and dashboard patterns are absent from normal play;
10. Phase 0 domain/evaluation/persistence boundaries remain intact, and visual metadata does not leak into educational/domain ownership;
11. no curriculum is invented to justify art/scenery;
12. concept assets and world-specific shell styling are isolated/replaceable.

## 14. Non-goals
No final production art, full animation production, all six functional worlds, real new challenge families/content, XP economy, backend/accounts, parent/admin system, avatar customization or Phase 0 architecture replacement.

## 15. Review workflow
1. version Specs;
2. Plan Mode proposal;
3. human concept/architecture review;
4. resolve blocking visual GAPs in Specs;
5. explicit Build authorization;
6. review screenshots/interactive preview against acceptance criteria;
7. only after visual foundation approval proceed to first playable pedagogical challenge families.

A technically functional but dashboard-like result is rejected rather than accepted as temporary design direction.
