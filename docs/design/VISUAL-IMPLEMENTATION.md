# Visual Implementation — Phase 1A

**Status:** DECIDED implementation constraints; final production assets remain PROVISIONAL.

This document translates the approved visual direction into implementation constraints for the first visual delivery. It does not replace `ART-DIRECTION.md`, `OVERWORLD.md`, `MAITTE.md`, `WORLD-BOARD.md`, or the product design principles. It operationalizes them.

## 1. Purpose of Phase 1A

Phase 0 established the technical skeleton. Its current white/gray screens, cards, labels, percentages and rectangular placeholders are **non-canonical technical scaffolding**. They must not become the visual foundation of the product by incremental decoration.

Phase 1A exists to prove that the Phase 0 architecture can support the actual child-facing experience: an illustrated adventure world, spatial navigation, diegetic controls and state-driven color restoration.

The implementation must preserve the working Phase 0 domain, evaluation, persistence and progression foundations while replacing the child-facing presentation layer.

## 2. Visual thesis

The experience should read first as an illustrated adventure and only second as software.

Approved visual language:
- 2D illustrated storybook / coloring-book world;
- strong clean line work and warm handcrafted shapes;
- large readable silhouettes and child-friendly environmental detail;
- light manga/anime influence in expressions, movement and character appeal;
- no photorealism;
- no direct imitation of any named copyrighted work or artist;
- color restoration is part of the game state, not decorative polish.

Mood references discussed during ideation are directional only. The visual system and assets must be original.

## 3. What Phase 1A must change

The following Phase 0 presentation patterns must be removed from the primary child-facing experience:
- page title + section title + dashboard card hierarchy;
- large neutral gray cards as representations of worlds or board areas;
- percentage text as the primary expression of progress;
- conventional “back to map” text links as the main navigation affordance;
- rectangular level-selection rows that visually resemble a business web application;
- visible language such as “technical demo”, “Phase 0”, “placeholder”, or implementation terminology in the child-facing surface.

Technical labels may remain in development-only diagnostics but must not appear in the normal player path.

## 4. Overworld — canonical composition

The Overworld is the first visual target and establishes the spatial language for the product.

### 4.1 Composition

The default viewport shows one coherent illustrated magical geography. It is **not** a list of subjects and **not** six cards.

The composition contains:
1. a shared origin/base area;
2. six visually distinguishable subject-world destinations integrated into the same geography;
3. illustrated paths, terrain, atmospheric elements and landmarks that make the map feel continuous;
4. a visible representation of Maittê at or near the origin when appropriate to the composition;
5. subtle diegetic navigation affordances integrated into the illustration.

Only Mathematics needs to be functionally enterable in the current MVP slice. Other subject destinations may be visible as part of the geography but must not be implemented as functional worlds or fake playable screens.

### 4.2 Subject-world identity

Each destination must read visually as a region/biome before the player reads a label. Final biome decisions for worlds that do not yet have approved world specs remain PROVISIONAL.

Do not hardwire curriculum concepts into scenery. A region may communicate identity and atmosphere, but a landmark must not permanently become an “addition mountain”, “subtraction cave”, or equivalent curricular binding.

### 4.3 Initial stolen-color state

The affected world begins substantially desaturated / line-art, as if a coloring-book illustration has had its colors stolen.

The initial state must preserve:
- readable outlines;
- environmental depth through line weight, texture and value;
- the green hope anchor associated with Maittê;
- enough contrast for touch targets and accessibility.

The map must still feel attractive while desaturated. “No color” must not mean “blank gray UI”.

### 4.4 Restoration state

World restoration is derived from persisted progress. It must be reproducible after reload without relying on the history of an animation.

The visual system must support at least three conditions per region:
- stolen / not restored;
- partially restored;
- restored to the current available progress state.

A numeric percentage may exist for accessibility or secondary information, but progress should be understandable from the illustration without reading the number.

### 4.5 Entering Mathematics

Selecting the Mathematics destination triggers the approved **spatial zoom** into the region.

The interaction should create the sensation that the camera/player is moving into that part of the map, rather than navigating to an unrelated page.

Graceful degradation is required. If full zoom choreography is unreliable, use a simpler scale/translate/fade sequence that preserves spatial continuity. Do not fall back to a generic page navigation flash.

## 5. Layering model for the Overworld

The implementation should be structured as composable visual layers rather than one opaque background image.

Recommended conceptual layers:
1. base parchment / atmospheric background;
2. terrain and region illustration;
3. stolen-color/restoration masks;
4. paths and landmarks;
5. interactive destination hit areas;
6. character / companion layer when present;
7. diegetic controls;
8. transition overlay.

Exact implementation technology is not prescribed here. SVG, layered raster assets, CSS masks or a hybrid approach are acceptable if they preserve state-driven restoration, responsive scaling and maintainable hit areas.

## 6. Diegetic navigation

The primary player navigation must feel like part of the adventure.

Acceptable classes of affordance include map, book, compass, backpack, trail marker or equivalent world-integrated objects. The exact object is still PROVISIONAL until visual review.

Constraints:
- no persistent corporate-style top navigation bar as the main child-facing navigation;
- no row of generic text links competing with the illustration;
- controls must remain discoverable and accessible;
- parent/settings functionality may remain on a secondary interface outside active play.

## 7. Maittê in the visual foundation

Phase 1A must reserve the protagonist as a real visual actor, not merely a future data concept.

Approved character traits remain governed by `docs/narrative/MAITTE.md`:
- approximately eight-year-old child presentation;
- hair slightly below shoulders;
- subtle bleached lock;
- skirt as a recurring clothing preference;
- high-top canvas sneakers without protected branding;
- colorful socks;
- green heart on shirt as the hope anchor;
- stylized storybook line-art with light anime/manga influence.

For Phase 1A, a concept-quality original asset is acceptable. It does not need to be final production art, but it must already communicate the intended character language. A generic avatar icon or abstract circle is not sufficient for visual validation.

## 8. Mathematics World Board — required visual relation

Phase 1A does not need to complete the full content slice, but the Mathematics Board must no longer look like “Trecho A / Trecho B” dashboard sections.

The board must be represented as an illustrated route inside the Mathematics biome.

Required visual properties:
- continuous scenery, not independent gray containers;
- sequential Activity Slots embedded into the route;
- Maittê visibly occupies a current position;
- locked/available/completed states are understandable through the world itself;
- restored areas visibly regain color;
- landmarks create anticipation without encoding permanent curriculum meaning;
- returning from a challenge should visually return to this same spatial context.

Exact Mathematics biome and landmark choices remain subject to `MATHEMATICS-WORLD.md` once consolidated. If that spec is absent, implementation must use reviewable concept placeholders rather than silently declaring a final biome.

## 9. Challenge Stage relation

The Challenge Stage must not visually feel like an unrelated form opened from the board.

For Phase 1A it is sufficient to establish the visual shell and transition behavior:
- entry preserves continuity with the selected Activity Slot;
- the illustrated world remains perceptually connected through backdrop, framing or transition;
- puzzle content receives a focused interaction area with large tablet-scale targets;
- success returns the player to the board, where restoration and movement become visible.

The current technical template placeholder may continue underneath until the first content family is implemented, but the player-facing framing must conform to the adventure language.

## 10. Asset package for concept validation

Before Phase 1A is considered visually validated, the build must use an original concept asset package containing at minimum:
- Overworld base illustration or layered equivalent;
- Mathematics region visual identity at concept level;
- Maittê concept character asset with stolen-color and partially restored capability;
- route/slot visual language for the Mathematics Board;
- at least one landmark treatment;
- diegetic navigation control concept;
- restoration mask or equivalent mechanism demonstrable in the UI.

These are concept/MVP assets, not final production assets. They must be replaceable without changing curriculum, progression or puzzle-domain code.

## 11. Responsive target

The experience is tablet-first.

The composition should prioritize landscape tablet use while remaining usable on common desktop widths for development and review.

Responsive behavior must preserve the map as a spatial composition. It must not collapse the Overworld into a vertical card list on smaller widths. Cropping, camera framing, controlled panning or alternate map framing are preferable to turning the experience into a dashboard.

## 12. Accessibility constraints

Diegetic presentation must not reduce usability.

Minimum requirements:
- interactive destinations have programmatic labels;
- touch targets are large enough for a child on tablet;
- focus states remain visible for keyboard testing;
- restored vs. stolen state must not rely on color alone;
- essential labels maintain readable contrast;
- reduced-motion mode must have a graceful transition fallback.

## 13. Phase 1A acceptance criteria

Phase 1A is not approved by the presence of prettier colors or icons. It is approved only if all of the following are true:

1. Opening the application presents an illustrated world rather than a dashboard/card screen.
2. The player can identify Mathematics as a place in that world.
3. The stolen-color state is visible in the illustration itself.
4. Entering Mathematics feels spatially connected to the Overworld.
5. The Mathematics Board reads as a route through scenery, not as rows of level cards.
6. Maittê is visibly represented in the experience with the approved concept direction.
7. Progress/restoration is derived from Phase 0 state and visibly changes the world.
8. No conventional application header dominates active child play.
9. No Phase 0 technical language is visible to the player.
10. Existing Phase 0 domain/evaluation/persistence boundaries remain intact.
11. No curriculum content is invented to justify the visual build.
12. Concept assets are isolated from domain logic and can later be replaced.

## 14. Non-goals

Phase 1A does not authorize:
- final production art;
- full animation production;
- implementation of all six subject worlds;
- addition/subtraction/geometry challenge implementation;
- new curriculum decisions;
- XP economy decisions;
- parent/admin systems;
- backend accounts;
- avatar customization;
- replacement of the Phase 0 domain architecture merely for visual convenience.

## 15. Review workflow

The delivery sequence for Phase 1A is:
1. version this specification;
2. generate a Lovable Plan Mode prompt from the versioned specs;
3. review the Lovable plan before build;
4. authorize Build Mode explicitly;
5. review screenshots/interactive preview against the acceptance criteria above;
6. only after visual foundation approval proceed to first playable pedagogical challenge families.

A visual implementation that technically works but returns to dashboard/card conventions must be rejected and revised rather than accepted as a temporary design direction.
