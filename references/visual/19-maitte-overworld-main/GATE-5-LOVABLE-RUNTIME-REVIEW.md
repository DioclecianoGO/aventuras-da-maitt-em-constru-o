# Maittê `idle-curious` — Gate 5 Isolated Lovable Runtime Review

**Status:** PASS WITH TUNING REQUIRED — READY FOR PRODUCT DECISION

## Review environment

Isolated Lovable remix only; original project untouched.

- Project: `Aventuras da Maittê — idle-curious Gate 5`
- Lovable project id: `31fef5b8-b281-4d41-a29b-59473f19f6c6`
- Preview: `https://id-preview--31fef5b8-b281-4d41-a29b-59473f19f6c6.lovable.app`
- Audited GitHub source commit: `3d72146a9cfc7b86a79d71cf2b79e02f49bd2db8`
- Source equivalence was confirmed against the exact public GitHub/codeload snapshot; only Lovable-local caches/metadata were excluded.

No source fixes or aesthetic changes were made during the audit.

## Runtime navigation audited

- Overworld: `/`
- World Board: `/mundo/world-placeholder`
- Challenge Stage: `/mundo/world-placeholder/desafio/slot-1`

Primary viewport: `1280 × 1800`, DPR 2.
Secondary sanity check: `1440 × 900`.

## Overworld — `idle-curious`

Runtime evidence:

- real restoration-raster asset rendered from `maitte-idle-curious-full-color.png`;
- no MaitteFigure vector character geometry used for this state;
- natural fresh-progress presentation shows graphite/desaturated body with the green heart restored;
- breathing, heart pulse and deterministic blink are active after hydration.

Observed character rectangle at `1280 × 1800`:

- approximately `82.2 × 123.7 CSS px`.

Visual findings:

- character remains readable at the current size;
- feet visually sit on the trail / hope-base area;
- no clipping observed in this context;
- green heart is clearly readable;
- restoration semantics are correct;
- no runtime mask seam, duplicate character or full-color face leak was reported by the visual audit.

Product question remains whether this scale delivers enough protagonist presence; that is a product/framing decision rather than a renderer defect.

## World Board — `idle-curious`

Runtime evidence:

- same `character.maitte.idle-curious` restoration-raster asset;
- caller scale remains `0.66`;
- graphite body + restored green heart reads correctly;
- breathing, heart pulse and blink are active.

Observed character rectangle varies with the ambient ancestor scene animation:

- approximately `108–122 CSS px` wide;
- approximately `164–184 CSS px` tall.

The character remains planted relative to the animated trail/scene, but the entire scene animation moves her relative to the viewport by roughly `±10 CSS px`.

This is not caused primarily by the character breathing animation and is not a restoration-raster defect.

## Challenge Stage

Real runtime behavior revealed an important specification correction.

The stage actor is **not naturally `idle-curious` when resting before an attempt** under the current DECIDED route wiring.

The route derives:

- `listen-think` when `lastAttempt === null`;
- `success` after success;
- `retry-thinking` after a failed attempt.

Therefore, the requested Gate-5 condition "Challenge Stage resting/default = idle-curious" is not reachable without changing existing product/state semantics.

At the real challenge route the audit found:

- board/background Maittê: `idle-curious` restoration-raster;
- stage actor: `listen-think` production proof, title `Maittê, atenta e pensativa`.

The existing `listen-think` override/regression therefore remains intact.

At `1280 × 1800`, the stage actor's bottom reached approximately `1805.8 px`, producing roughly `6 px` of shoe clipping. The clipping was not reproduced at `1440 × 900`.

This is an existing Challenge Stage/listen-think framing issue and should not be misclassified as an `idle-curious` raster-contract failure.

## Breathing

**PASS WITH TUNING NOTE.**

- `.maitte-breathe` / `char-breathe 4.2s` is active when animation is enabled;
- the presentation transform is separate from restoration state;
- the current keyframe includes `translateY(-1.5px)` in addition to the small `scaleY(1.012)` treatment;
- as a result, the character's feet lift by approximately `1 px` at peak instead of remaining mathematically locked to the same screen coordinate.

This is a small tuning issue, not an architecture failure.

## Heart pulse

**PASS.**

- `heart-pulse 2.6s` is active;
- animation is localized to the heart layer;
- the whole character does not pulse;
- restored-heart semantics remain correct in the partial/stolen presentation.

## Blink

**PASS FOR RUNTIME PRESENTATION.**

- `char-blink 5.2s` is active;
- the audit observed real closed samples (`scaleY ≈ 0.12`);
- blink uses the persisted eye mask / underlay / approved source composition rather than a generated full-face frame;
- no full-color eye/skin leak over the graphite partial-restoration state was observed;
- no runtime face redraw was introduced.

No blocker was identified in the real-scale blink presentation.

## Reduced motion

**PASS.**

With `prefers-reduced-motion: reduce` emulated in the browser:

- breathing resolves to `none`;
- heart pulse resolves to `none`;
- blink resolves to `none`;
- transforms remain static across samples;
- the figure remains correctly composed.

No separate gameplay/accessibility state model was introduced.

## Runtime error discovered outside the character implementation

A reproducible React hydration mismatch occurs on **direct hard-load of the Challenge Stage URL**.

Observed area:

`SpeechBubble.tsx` around the client-only `audioUnavailable` / `Sem som — leia o recado.` span.

Characteristics:

- appears on direct SSR load of the Challenge Stage route;
- not reproduced during normal client-side navigation into the challenge;
- React self-recovers by regenerating the affected tree;
- unrelated to the Maittê restoration-raster implementation.

This should be tracked as a separate child-facing SSR/client-divergence bug rather than fixed opportunistically inside the character-production slice.

## Product / specification decisions now required

1. Decide whether Overworld Maittê at roughly `82 × 124 CSS px` has sufficient protagonist presence or needs scale/framing tuning.
2. Decide whether the World Board's ambient scene-level movement is acceptable; Maittê is stable relative to the trail but moves relative to the viewport with the parent scene.
3. Decide whether strict feet anchoring requires removing/reducing the `translateY(-1.5px)` component of breathing.
4. Correct the acceptance/spec language that assumed Challenge Stage resting state is `idle-curious`; existing DECIDED runtime uses `listen-think` before the first attempt.
5. Track the ~6 px tall-viewport Challenge Stage/listen-think shoe clipping separately.
6. Track the `SpeechBubble` hard-load hydration mismatch separately.

## Known production gaps still open

- glasses-mask final precision;
- `hairStreak` cleanup / small-scale readability;
- independent hair / hairStreak secondary motion.

## Disposition

`GATE 5 PASS WITH TUNING REQUIRED — READY FOR PRODUCT DECISION`

The restoration-raster contract, real `idle-curious` runtime resolution, breathing/heart/blink architecture and reduced-motion behavior are validated. Final production promotion remains pending the product/spec decisions above and the previously documented asset-cleanup gaps.
