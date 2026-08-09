# Mathematics — Grade 2

Status: **working specification for MVP**

## Purpose

This document defines the pedagogical structure of Mathematics for the first useful MVP of **Aventuras da Maittê**. It is not a transcription of the workbook. The workbook is evidence of curriculum, sequencing and exercise formats; the game must preserve the mathematical objective while using interactions appropriate to a digital environment.

## Source scope currently under analysis

- Book 1 — Chapter 5, beginning on page 94.
- Book 1 — Chapter 6, ending on page 152.
- Book 2 — Geometry, pages 8–28.
- Teacher-highlighted study content and completed exercises are treated as additional evidence.

Teacher priorities determine immediate study emphasis; workbook content supplies sequencing, representations, supporting concepts and exercise evidence. They are related but not identical sources.

The photographic source must still be reconstructed page-by-page before any claim of exhaustive curriculum coverage. Items below are therefore classified as either **MVP decision** or **working hypothesis to validate against the full page sequence**.

---

# 1. Pedagogical principles

1. A game challenge must measure a mathematical skill, not only the ability to recognize a visual pattern.
2. Teaching, guided practice and independent assessment are different states and must not award mastery in the same way.
3. A wrong answer is diagnostic evidence, not merely failure.
4. Difficulty should vary by mathematical complexity, representation and amount of assistance — not only by larger numbers.
5. The same skill should appear in more than one representation before it is considered stable.
6. Workbook exercises may inspire challenge families, but should not be copied mechanically.
7. Narrative must contextualize the mathematics without hiding the mathematical task.

---

# 2. Evidence model

For every curriculum item we distinguish:

- **Didactic source:** what the workbook explicitly teaches or asks.
- **Observed evidence:** what appears in exercises and student responses.
- **Pedagogical inference:** what underlying skill or misconception may be involved.
- **Product decision:** how the game will teach, practice or assess it.

These categories must remain separate in future documentation and telemetry.

---

# 3. Initial skill taxonomy

Skill IDs are stable internal identifiers. Names and grouping may be refined after the complete workbook reconstruction.

## NUM — Number sense and decimal system

- `MAT-NUM-PLACE-01` — identify units, tens and hundreds / place value.
- `MAT-NUM-COMP-01` — compose a number from hundreds, tens and units.
- `MAT-NUM-DECOMP-01` — decompose a number into hundreds, tens and units / expanded form.
- `MAT-NUM-REP-01` — connect numeral, written number, base-ten/material representation and decomposition.
- `MAT-NUM-SEQ-01` — complete numerical sequences and determine missing values.
- `MAT-NUM-COMPARE-01` — compare and order numbers using place value.
- `MAT-NUM-NEIGHBOR-01` — predecessor and successor.

## ADD — Addition

- `MAT-ADD-MEANING-01` — understand addition as joining/adding quantities.
- `MAT-ADD-CALC-01` — calculate addition using an appropriate strategy.
- `MAT-ADD-PLACE-01` — use positional alignment and regrouping/exchanges in the addition algorithm.
- `MAT-ADD-PROBLEM-01` — solve and create additive word problems from meaning, not keywords alone.

## SUB — Subtraction

- `MAT-SUB-MEANING-01` — understand removal, comparison and difference situations.
- `MAT-SUB-CALC-01` — calculate subtraction using an appropriate strategy.
- `MAT-SUB-PLACE-01` — use positional alignment and exchanges/regrouping in the subtraction algorithm.
- `MAT-SUB-PROBLEM-01` — solve and create subtractive word problems from meaning.

## GEO2D — Plane geometry

- `MAT-GEO2D-RECOG-01` — recognize common plane figures independent of color, size and orientation.
- `MAT-GEO2D-PROP-01` — classify by sides, vertices and defining properties.
- `MAT-GEO2D-COMP-01` — compose figures.
- `MAT-GEO2D-DECOMP-01` — decompose composite figures.
- `MAT-GEO2D-MOSAIC-01` — reason with geometric mosaics and composition patterns.

## GEO3D — Spatial geometry (supporting workbook content)

- `MAT-GEO3D-RECOG-01` — recognize studied solids.
- `MAT-GEO3D-REAL-01` — relate mathematical solids to everyday objects.
- `MAT-GEO3D-SURFACE-01` — distinguish plane and curved surfaces.
- `MAT-GEO3D-PARTS-01` — identify faces, edges and vertices where applicable.
- `MAT-GEO3D-CLASS-01` — classify solids by properties.

---

# 4. Exercise families evidenced in the material

- base-ten/material representations converted to numerals and decompositions;
- number sequences and missing-number tasks;
- addition and subtraction algorithms and contextual problems;
- recognition and classification of plane figures;
- composing/decomposing figures and mosaics;
- recognition of geometric solids;
- classification by plane/curved surfaces;
- faces, edges and vertices;
- matching solids to everyday objects.

These are **exercise families**, not UI specifications.

---

# 5. MVP learning loop

Every implemented skill must support three modes.

## A. Discover

Purpose: introduce or reactivate the concept.

- visual/manipulable representation;
- short instruction;
- worked or partially worked example;
- no mastery inference from success with full assistance.

## B. Practice

Purpose: strengthen the skill with immediate feedback.

- controlled variation;
- optional hint;
- explanation after an error;
- repeated errors should change representation or reduce complexity rather than simply repeat the identical item.

## C. Challenge

Purpose: collect evidence of independent performance.

- no answer-revealing hint before first attempt;
- variation in representation;
- mastery evidence recorded separately from guided practice.

---

# 6. Reusable challenge families

## CH-NUM-BUILD — Build the number

**Skills:** PLACE, COMP, DECOMP, REP.

Possible interactions:
- drag hundreds/tens/units into positions;
- select the numeral represented by base-ten blocks;
- construct a requested numeral;
- repair an intentionally incorrect decomposition.

## CH-NUM-PATH — Complete the path

**Skills:** SEQ, COMPARE, NEIGHBOR.

Possible interactions:
- choose the missing stepping stone;
- order stones/cards;
- identify predecessor/successor;
- continue a rule-based sequence.

The visual layout must not reveal the answer through spacing alone.

## CH-OP-SOLVE — Solve the operation

**Skills:** ADD-CALC, ADD-PLACE, SUB-CALC, SUB-PLACE.

Possible interactions:
- vertical algorithm with place-value columns;
- manipulate regrouping/exchange visually;
- choose a strategy/result;
- detect and correct a character's calculation error.

## CH-OP-STORY — Decide and solve

**Skills:** ADD-PROBLEM, SUB-PROBLEM.

The child first determines the mathematical relationship, then calculates. Do not award full conceptual mastery when the operation is explicitly given in advance.

## CH-GEO-SORT — Sort the shapes

**Skills:** GEO2D-RECOG, GEO2D-PROP and, later, compatible GEO3D skills.

## CH-GEO-BUILD — Build/repair the figure

**Skills:** GEO2D-COMP, GEO2D-DECOMP, GEO2D-MOSAIC.

## CH-GEO-OBJECT — Object detective

**Skills:** GEO3D-REAL, GEO3D-SURFACE, GEO3D-PARTS.

This family is supporting/follow-up content and is not required for today's useful MVP unless explicitly promoted.

---

# 7. Difficulty model

Difficulty is multidimensional:

`difficulty = mathematical complexity + representational distance + task complexity + assistance level`

Examples:

- **Level 1:** direct recognition with concrete visual support.
- **Level 2:** same concept with reduced visual support.
- **Level 3:** translation between representations.
- **Level 4:** application in a new context or multi-step decision.

Increasing from 127 to 427 is not, by itself, sufficient evidence of a new difficulty level.

---

# 8. Feedback rules

Correct answer:
- confirm briefly;
- reinforce the mathematical relation when useful;
- continue without unnecessary interruption.

First error:
- indicate that the answer needs revision;
- do not immediately reveal the correct answer.

Repeated error:
- provide a conceptual hint or concrete representation;
- reduce extraneous complexity if needed.

After assistance:
- present a new equivalent item later;
- do not treat the assisted answer as independent mastery.

---

# 9. Minimal mastery model for MVP

Do not use a single correct answer as mastery.

Maintain per-skill evidence with at least:

- independent correct attempts;
- incorrect attempts;
- assisted correct attempts;
- representation used;
- recent performance.

Initial implementation may expose:

- `not_started`
- `learning`
- `practicing`
- `proficient`

Exact promotion thresholds remain **to validate** after telemetry and item-generation behavior are specified. They must not be invented by the UI.

---

# 10. MVP delivery model

The MVP is phased internally, but **all three slices below belong to the useful Mathematics MVP**. Slice A is the first end-to-end technical vertical slice; completing Slice A alone is not sufficient to consider the useful study MVP complete.

## Slice A — Number Sense / first vertical slice

Purpose: prove the complete gameplay + learning architecture end to end.

### Skills
1. MAT-NUM-PLACE-01
2. MAT-NUM-COMP-01
3. MAT-NUM-DECOMP-01
4. MAT-NUM-REP-01
5. MAT-NUM-SEQ-01
6. MAT-NUM-COMPARE-01
7. MAT-NUM-NEIGHBOR-01

### Required challenge families
- CH-NUM-BUILD
- CH-NUM-PATH

## Slice B — Addition, Subtraction and Problems / useful study path

Purpose: cover the teacher's immediate study priorities after the core architecture is proven.

### Required coverage
- addition algorithm;
- addition with regrouping/exchanges;
- subtraction algorithm;
- subtraction with regrouping/exchanges;
- solving additive/subtractive problems;
- creating simple problems when the interaction design is appropriate.

### Required challenge families
- CH-OP-SOLVE
- CH-OP-STORY

The implementation may deliver Slice B after Slice A in the same MVP build sequence, but must include it in the approved plan.

## Slice C — Plane Geometry / useful study path

Purpose: cover the teacher's current geometry priority.

### Required coverage
- circle, triangle, square and rectangle as evidenced by the material;
- recognition independent of color/size/orientation;
- sides and vertices / defining properties;
- composition and decomposition of figures;
- mosaics/pattern composition when supported by the source material.

### Required challenge families
- CH-GEO-SORT
- CH-GEO-BUILD

The implementation may deliver Slice C after A and B in the same MVP build sequence, but must include it in the approved plan.

## Supporting / follow-up content

Spatial solids (sphere, cone, cylinder, cube, rectangular prism/parallelepiped, pyramid; plane/curved surfaces; faces/edges/vertices; object matching) remain documented because they appear in the workbook, but are **not required for today's useful MVP** unless explicitly promoted by product decision.

---

# 11. Validation backlog before curriculum freeze

1. Reconstruct the photographed pages in exact workbook order.
2. Map each page/exercise to one or more skill IDs.
3. Confirm the exact numerical range expected in Chapters 5 and 6.
4. Distinguish content emphasized by the teacher from supporting/review content.
5. Review recurring student errors only as patterns; do not infer a learning deficit from an isolated response.
6. Cross-check the resulting skill map against the applicable official BNCC skills.
7. Decide mastery thresholds only after telemetry and item-generation behavior are specified.

---

# 12. Product constraint

Lovable may implement the approved skill/challenge model, but must not independently add curriculum objectives, redefine mastery, infer student diagnoses, or convert workbook pages directly into game screens.
