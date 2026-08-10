# Illustrated Asset Production Pipeline

**Status:** DECIDED direction for production-quality visual assets; exact authoring tools and final file formats remain PROVISIONAL.

## Decision

Production-quality characters, pets, world scenes, landmarks and decorative scenery for **Aventuras da Maittê** will be treated as authored illustration assets that the application composes, animates and connects to game state.

The implementation layer is not expected to manufacture final illustration quality primarily by accumulating hand-written JSX/SVG primitives and path data.

Programmatic SVG remains useful for technical placeholders, simple diegetic controls, masks, hit areas, lightweight procedural effects and assets whose visual complexity is intentionally small. It is not the default production pipeline for high-detail character or environment art.

## Why

Phase 1B and Phase 1B.1 proved that the current application architecture can support:

- layered world presentation;
- character acting states;
- touch interaction;
- narration and replay;
- derived colour restoration;
- persistent progress reconstructed after reload;
- replaceable visual registries/configuration.

They also exposed a practical quality ceiling: adding more code-generated curves, strokes, primitive shapes and SVG paths does not reliably produce the intended illustrated-storybook richness for Maittê, companions or complete biomes.

The current code-drawn art therefore remains valuable as functional/concept scaffolding, but must not silently become the final visual bar.

## Production responsibility split

The preferred boundary is:

`illustration asset -> asset registry/config -> scene composition -> animation/restoration/hit areas -> game state`

Illustration assets own visual craft such as silhouette, anatomy, facial appeal, line quality, texture, clothing detail, environmental richness and scenic composition.

Application code owns behavior such as positioning, scale, responsive composition, transitions, acting-state swaps, masking, restoration state, interaction hit areas, accessibility metadata and progression-driven visibility.

Educational/domain logic remains unaware of the concrete art file used to represent a world object.

## Layered scene model

Where useful, a world/board scene should be decomposable into replaceable layers such as:

1. background / atmospheric field;
2. terrain or biome base;
3. line-art / stolen-colour layer;
4. restored-colour layer or restorable object groups;
5. landmarks and environmental detail;
6. characters / companions / lackeys;
7. foreground accents;
8. invisible interaction or hit-area layer.

This is a presentation model, not a required literal file count. A single illustration may contain multiple visual concerns when replacement and restoration behavior remain manageable.

## Restoration compatibility

The existing rule remains binding: persisted facts drive derived visual restoration.

A replacement illustration may implement restoration using masks, alternate layers, object swaps, opacity, reveal animation or another presentation technique, provided that:

- no new authoritative visual progress field is persisted;
- the same completion/progress facts reconstruct the same restored result after reload;
- restoration remains perceivable through more than hue alone where practical;
- replacing the art does not change progression/evaluation semantics.

## Character and pet assets

Maittê and companion artwork should be created as original project-specific identities consistent with the approved character specs.

Where acting states are required, production assets may be supplied as separate poses/expressions, layered parts, sprite-like state sets or another replaceable representation. The acting-state API may remain stable even if the rendering implementation changes.

The visual target remains stylized storybook/colouring-book illustration with light anime influence and original identity. References guide qualities, not direct copying of a living artist's protected style or a copyrighted character design.

## File-format policy

**PROVISIONAL:** source and runtime formats may include transparent PNG/WebP, authored SVG, layered raster exports or other web-suitable assets.

The format should be selected per asset based on visual quality, transparency, scaling, animation needs and runtime weight. The architecture must not require every production asset to be a hand-authored React component.

## Asset registry and naming

Production assets should enter the application through stable presentation keys/registry entries rather than being imported ad hoc across domain code.

Changing a visual file behind a stable asset key should not require changes to curriculum, evaluator rules, persistence facts or mastery evidence.

## Current programmatic art

Existing Phase 1B/1B.1 programmatic SVG drawings are **concept/technical assets** unless explicitly promoted later.

They may remain temporarily to keep the game playable while production illustrations are developed.

Further implementation work should not spend disproportionate effort trying to reach final storybook-art quality solely by expanding these placeholder SVG components.

Small corrections required for function, readability or interaction are still allowed.

## Acceptance for future asset replacement

A production-art replacement is successful when:

- the new asset materially raises the intended illustrated visual quality;
- existing routes/interactions continue working;
- restoration still derives from the same facts;
- touch targets remain reliable;
- character/companion acting states remain available where required;
- no evaluator, evidence or curriculum contract changes merely because the art changed;
- tablet-first performance remains acceptable.

## Scope relationship

This decision removes production-art polish as a blocker for beginning educational Slice A after the current functional hotfix is closed.

It does **not** declare the current placeholder art final. It establishes a separate production pipeline so educational implementation and visual-asset refinement can progress without conflating responsibilities.
