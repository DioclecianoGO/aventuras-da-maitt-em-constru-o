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

## Character scaffold replacement strategy

**DECIDED:** approved Character Masters, not the current programmatic SVG scaffolds, are the identity authority for future production character art.

The current `MaitteFigure`, `BurpeeArt`, `PipocaArt`, `WillArt` and `LyraArt`-style components are technical/concept scaffolds. Their purpose is to prove runtime concerns such as acting-state vocabulary, logical-key resolution, viewport/framing, animation hooks and scene integration. They are replaceable and may ultimately be removed from the production rendering path.

Production replacement must follow this direction:

`approved Character Master -> reviewed pose/state variant -> production export -> stable character.<id>.<state> key -> Actor -> scene`

The following rules are binding:

- do not ask an implementation/code assistant to recreate the approved watercolor/storybook master by manually expanding JSX/SVG paths and treat that result as production art;
- do not use the technical scaffold as the identity source of truth when it differs from the approved Character Master;
- a technical scaffold may be used as a pose/structure/composition reference when useful, but the Character Master remains the identity/style authority;
- when a new acting pose is required, prefer a controlled edit/variant derived from the approved master over full identity regeneration from prose;
- preserve approved face/anatomy, proportions, coat/hair markings, clothing/accessories, palette and texture across pose variants unless the relevant lock explicitly permits change;
- human/product approval remains required before a production variant becomes authoritative;
- replacing a scaffold with final art should normally change only presentation descriptors/assets behind the existing logical keys, not curriculum, evaluator, persistence or gameplay contracts.

**DECIDED:** visual fidelity is evaluated against the approved Character Master and relevant locks, not against the temporary SVG scaffold. A scaffold can therefore be visually crude yet technically compliant, while a final production asset must meet the approved identity/style bar.

## Production character variant workflow

**DECIDED workflow; exact tools remain PROVISIONAL:**

1. select the approved Character Master and the required acting state/context;
2. if useful, supply the current scaffold render or another approved sketch only as pose/structure guidance;
3. generate or edit a candidate while locking identity/style from the Character Master;
4. review for identity drift, anatomy, markings, texture, silhouette, scale and state readability;
5. perform localized corrections instead of regenerating unaffected identity regions where practical;
6. prepare production-ready transparency/layers/exports as required by runtime behavior;
7. approve the physical production asset explicitly;
8. replace the concept scaffold behind the existing logical registry key;
9. run visual and runtime regression checks at the actual target scales.

For an acting state that can be expressed through a small runtime transform without visual degradation, production does not require a unique full-frame illustration merely to satisfy symmetry. Micro-animation such as breathing, blinking, small head/body movement, bounce or independently-layered tail motion may be owned by the application when that preserves the approved illustration quality.

Larger pose/expression changes may use separate authored variants while retaining the same identity model.

## Authoring-tool policy

**DECIDED:** authoring/generation/editing tools are replaceable production tools, not architectural dependencies or sources of truth.

**PROVISIONAL:** exact tool selection should be made through a small visual benchmark against the same approved Character Master and the same requested pose/state. Candidate tools may include image-generation/editing systems, raster editors and vector editors already available to the project.

The benchmark should compare at minimum:

- identity preservation;
- face/anatomy consistency;
- hair/fur/coat marking preservation;
- watercolor/storybook texture consistency;
- ability to change pose without redesigning the subject;
- localized edit quality;
- transparent/layered export workflow;
- repeatability across all five characters;
- practical human correction effort.

Implementation assistants may prepare prompts, asset manifests, registry changes, export validation, file optimization, tests and runtime integration. They are not expected to hand-code final illustrated character quality.

Raster/vector finishing tools may be used to clean masks, transparencies, layers, edge artifacts, localized anatomy/detail issues and exports. A vector editor is not required merely because the current placeholder happens to be SVG; preserving the approved illustrated texture takes precedence over retaining SVG as a physical format.

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
- the approved Character Master identity and applicable locks remain recognizable across required states;
- existing routes/interactions continue working;
- restoration still derives from the same facts;
- touch targets remain reliable;
- character/companion acting states remain available where required;
- no evaluator, evidence or curriculum contract changes merely because the art changed;
- tablet-first performance remains acceptable.

## Scope relationship

This decision removes production-art polish as a blocker for beginning educational Slice A after the current functional hotfix is closed.

It does **not** declare the current placeholder art final. It establishes a separate production pipeline so educational implementation and visual-asset refinement can progress without conflating responsibilities.
