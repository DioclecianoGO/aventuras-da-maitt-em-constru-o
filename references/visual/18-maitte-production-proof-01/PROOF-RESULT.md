# Maittê Production Proof 01 — Result Record

**Status:** ADOBE PRODUCTION-PREPARATION PASS / RUNTIME INTEGRATION PENDING

Binding spec:

`docs/design/MAITTE-PRODUCTION-PROOF-01.md`

## Source

Identity authority:

`references/visual/12-maitte-character-master/MAITTE_MASTER_APPROVED.png`

Production-proof source:

`references/visual/17-character-production-benchmark/maitte-listen-think/maitte-listen-think-chatgpt-candidate-01.png`

## Production-preparation execution

The preparation proof was executed directly through the Adobe/Photoshop connector rather than by manual Photoshop operation.

- editable PSD/source filename: NOT CREATED IN THIS CONNECTOR PROOF
- source dimensions: 1024 × 1536 px
- production-preparation environment: Adobe/Photoshop connector
- repository-stored PSD: NOT APPLICABLE TO THIS CONNECTOR PROOF

This does not change the binding rule that a layered PSD or equivalent editable source may still be required for final production authoring if the connector outputs alone are insufficient for precise cleanup/versioning.

## Transparency result

- full-body cutout: PASS
- hair edge quality: PASS FOR PROOF
- glasses edge quality: PASS FOR PROOF
- hands/fingers: PASS FOR PROOF
- skirt/socks/shoes: PASS FOR PROOF
- watercolor edge preservation: PASS FOR PROOF
- obvious background haloing: NO BLOCKING ISSUE OBSERVED IN PROOF

Final target-scale visual audit remains pending.

## Colorless-base result

- identity preserved: PASS FOR PROOF
- watercolor texture preserved: PASS FOR PROOF
- stolen-color read: PASS FOR PROOF
- green heart remains saturated: PASS

The strongest runtime candidate is to derive the stolen/base state from the same full-color raster at runtime and reveal original full-color pixels through masks, rather than maintaining independently redrawn partial-state artwork.

## Restoration masks

| Region | Created | Independent | No visible halo/gap | Target-scale readable | Notes |
|---|---|---|---|---|---|
| glasses | YES | YES | PASS FOR PROOF | PENDING RUNTIME | Adobe body-part selection |
| hairStreak | YES, workaround | YES ENOUGH FOR ARCHITECTURE PROOF | CLEANUP REQUIRED | PENDING RUNTIME | Direct prompt selection failed twice; Accessories-based workaround leaves minor lower-leg/sock-edge residuals |
| hair | YES | YES | PASS FOR PROOF | PENDING RUNTIME | Adobe body-part selection |
| shirt | YES | YES | PASS FOR PROOF | PENDING RUNTIME | Upper Clothes selection |
| skirt | YES | YES | PASS FOR PROOF | PENDING RUNTIME | Lower Clothes selection |
| socks | YES | YES | PASS FOR PROOF | PENDING RUNTIME | prompt-based selection |
| shoes | YES | YES | PASS FOR PROOF | PENDING RUNTIME | combined Left Shoe + Right Shoe selection |

### `hairStreak` classification

**MINOR MASK-CLEANUP GAP — NON-BLOCKING FOR RUNTIME PROOF / BLOCKING FOR FINAL PRODUCTION PROMOTION.**

Direct prompt-based selection failed twice. The proof therefore used Adobe Accessories detection plus subtraction of lower-leg/sock regions. This is sufficient to prove the region is technically separable, but the mask must be cleaned before final production approval.

## Mixed-state validation

- all ordinary regions colorless + heart on: PASS FOR PROOF
- heart + glasses: PASS FOR PROOF
- heart + glasses + hair/hairStreak: PASS FOR PROOF
- all regions restored: logically supported by same aligned full-color painting; RUNTIME VALIDATION PENDING
- visual registration across tested combinations: PASS FOR PROOF

## Candidate physical contract

Strongest candidate after the Adobe proof:

```text
maitte-listen-think-full-color.png
maitte-listen-think-mask-heart.png
maitte-listen-think-mask-glasses.png
maitte-listen-think-mask-hair-streak.png
maitte-listen-think-mask-hair.png
maitte-listen-think-mask-shirt.png
maitte-listen-think-mask-skirt.png
maitte-listen-think-mask-socks.png
maitte-listen-think-mask-shoes.png
```

Presentation concept:

1. use the same transparent full-color raster as the authoritative pixel source;
2. derive stolen/base presentation by grayscale/desaturation of that raster;
3. keep the heart saturated through its always-on mask;
4. reveal the exact original full-color pixels through whichever restoration masks are active;
5. do not bake separate redraws for partial restoration states.

Classification:

**PROVISIONAL — STRONGLY SUPPORTED BY ADOBE PREPARATION PROOF / NOT YET PROMOTED.**

## Adobe review evidence

The proof outputs and region checks were consolidated in Adobe Firefly Boards:

`https://firefly.adobe.com/boards/id/urn:aaid:sc:US:75b80a5d-56b5-4baf-a281-083e547783a8`

The board contains the full-color cutout, stolen-state proof, mixed restoration proofs and region-specific evidence generated during this execution.

## Runtime-scale validation

- exact Challenge Stage target scale resolved from code: PENDING
- full review scale: ADOBE PREPARATION REVIEW COMPLETE
- Challenge Stage scale: PENDING
- smaller reuse scale if applicable: PENDING
- acting-state readability: PENDING RUNTIME
- green-heart readability: PENDING RUNTIME
- mask seam visibility: PENDING RUNTIME

## Export/performance

| File/asset | Dimensions | Format | Size | Runtime role |
|---|---:|---|---:|---|
| full color | 1024 × 1536 source/proof | PNG | PENDING REPOSITORY MEASUREMENT | visual source |
| colorless base | derived proof | PNG proof / runtime strategy TBD | PENDING | stolen presentation |
| heart / always-on solution | 1024 × 1536 mask | PNG mask | PENDING | always-on restoration anchor |
| seven restoration masks | 1024 × 1536 masks | PNG masks | PENDING | independent region reveal |

- final runtime export dimensions: PENDING RUNTIME PLAN
- total runtime payload estimate: PENDING
- first-render behavior: PENDING
- tablet/browser validation: PENDING

## Integration gate

Claude Code must now plan and validate `character.maitte.listen-think` only.

Required runtime proof:

1. stable logical key retained: `character.maitte.listen-think`;
2. `MaitteActor` contract preserved unless a presentation-only extension is justified;
3. real raster asset rendered at correct Challenge Stage scale;
4. transparent background;
5. stolen/base grayscale state;
6. green heart always saturated;
7. independent mask-driven restoration;
8. at least two mixed partial-restoration combinations;
9. fully restored result matching the full-color source;
10. no changes to other Maittê acting states;
11. no regressions to Burpee, Pipoca, Will, Lyra or protected gameplay/domain/evaluation/persistence/content layers;
12. acceptable tablet-first runtime behavior.

## Production issues / localized repairs

Actual issue observed:

- issue 1: `hairStreak` automatic mask includes minor residual lower-leg/sock-edge artifacts;
- repair method used for proof: Accessories selection plus subtraction workaround;
- final production repair: PENDING PRECISE MASK CLEANUP;
- Character Master identity was not regenerated or redrawn;
- unaffected regions remain sourced from the same original painting.

## Proof disposition

Choose exactly one after runtime implementation and external audit:

- `PASS — CONTRACT PROMOTED`
- `FAIL — FALLBACK CONTRACT REQUIRED`

Current disposition:

**ADOBE PREPARATION PASS / RUNTIME INTEGRATION PENDING / PENDING EXTERNAL AUDIT**

## Governance

Storage is not approval.

The Adobe preparation proof validates the feasibility of the one-full-color-plus-masks hypothesis, but no export is promoted to final production runtime use until the runtime proof passes and this record receives an explicit audited disposition.

Step 2C remains **NOT STARTED**.
