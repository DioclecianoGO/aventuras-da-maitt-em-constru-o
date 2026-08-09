# Mathematics — Grade 2

Status: **working specification for MVP**

## Purpose

This document defines the pedagogical structure of Mathematics for the first playable slice of **Aventuras da Maittê**. It is not a transcription of the workbook. The workbook is evidence of curriculum, sequencing and exercise formats; the game must preserve the mathematical objective while using interactions appropriate to a digital environment.

## Source scope currently under analysis

- Book 1 — Chapter 5, beginning on page 94.
- Book 1 — Chapter 6, ending on page 152.
- Book 2 — Geometry, pages 8–28.
- Teacher-highlighted study content and completed exercises are treated as additional evidence.

The photographic source must be reconstructed in page order before any claim of exhaustive curriculum coverage. Items below are therefore classified as either **MVP decision** or **working hypothesis to validate against the full page sequence**.

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

### MAT-NUM-PLACE-01 — Identify units, tens and hundreds
Learner identifies the positional value of digits in numbers up to the studied range.

### MAT-NUM-COMP-01 — Compose a number
Learner builds a number from hundreds, tens and units.

Example concept: `4 hundreds + 2 tens + 7 units → 427`.

### MAT-NUM-DECOMP-01 — Decompose a number
Learner represents a number as hundreds, tens and units and/or expanded form.

### MAT-NUM-REP-01 — Connect representations
Learner recognizes equivalence among numeral, written number, base-ten/material representation and decomposition.

### MAT-NUM-SEQ-01 — Complete numerical sequences
Learner identifies the rule governing a sequence and determines missing values.

### MAT-NUM-COMPARE-01 — Compare and order numbers
Learner determines greater/lesser values and orders numbers using place value rather than visual appearance.

### MAT-NUM-NEIGHBOR-01 — Predecessor and successor
Learner identifies numbers immediately before and after a given number.

## ADD — Addition

### MAT-ADD-MEANING-01 — Understand addition as joining/adding quantities
Learner maps a situation to an additive operation.

### MAT-ADD-CALC-01 — Calculate addition
Learner performs addition using an appropriate strategy.

### MAT-ADD-PLACE-01 — Add using place value
Learner organizes hundreds, tens and units correctly when calculating.

### MAT-ADD-PROBLEM-01 — Solve additive word problems
Learner determines that addition is appropriate from the semantics of a problem rather than from keywords alone.

## SUB — Subtraction

### MAT-SUB-MEANING-01 — Understand subtraction situations
Learner recognizes subtraction in contexts of removing, comparing or finding a difference.

### MAT-SUB-CALC-01 — Calculate subtraction
Learner performs subtraction using an appropriate strategy.

### MAT-SUB-PLACE-01 — Subtract using place value
Learner preserves positional alignment and reasons with hundreds, tens and units.

### MAT-SUB-PROBLEM-01 — Solve subtractive word problems
Learner selects subtraction from the situation represented.

## GEO2D — Plane geometry

### MAT-GEO2D-RECOG-01 — Recognize plane figures
Learner identifies common plane figures independent of color, size and orientation.

### MAT-GEO2D-PROP-01 — Classify by sides and vertices
Learner uses defining properties rather than resemblance alone.

### MAT-GEO2D-COMP-01 — Compose figures
Learner combines plane figures to construct another figure or image.

### MAT-GEO2D-DECOMP-01 — Decompose figures
Learner identifies component figures inside a composite figure.

### MAT-GEO2D-MOSAIC-01 — Reason with geometric mosaics
Learner recognizes repetition/composition and predicts or completes geometric arrangements.

## GEO3D — Spatial geometry

### MAT-GEO3D-RECOG-01 — Recognize geometric solids
Learner identifies cube, rectangular prism/parallelepiped, cylinder, cone, sphere and pyramid as appropriate to the studied material.

### MAT-GEO3D-REAL-01 — Relate solids to real objects
Learner connects an abstract solid with everyday objects while distinguishing the mathematical model from the object itself.

### MAT-GEO3D-SURFACE-01 — Distinguish plane and curved surfaces
Learner identifies whether a solid has plane surfaces, curved surfaces or both.

### MAT-GEO3D-PARTS-01 — Identify faces, edges and vertices
Learner identifies and counts structural parts when applicable.

### MAT-GEO3D-CLASS-01 — Classify solids by properties
Learner classifies solids based on surfaces/faces/edges/vertices rather than color or orientation.

---

# 4. What the photographed exercises reveal

The available material shows several exercise families that are pedagogically useful for the MVP:

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

Every skill implemented in the MVP should support three modes.

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
- repeated errors should change the representation or reduce complexity rather than simply repeat the identical item.

## C. Challenge

Purpose: collect evidence of independent performance.

- no answer-revealing hint before first attempt;
- variation in representation;
- mastery evidence recorded separately from guided practice.

---

# 6. Challenge families for the first playable slice

The MVP should implement a small reusable challenge engine rather than one component per workbook exercise.

## CH-NUM-BUILD — Build the number

**Skills:** PLACE, COMP, DECOMP, REP.

Possible interactions:
- drag hundreds/tens/units into positions;
- select the numeral represented by base-ten blocks;
- construct a requested numeral;
- repair an intentionally incorrect decomposition.

Diagnostic errors:
- digit/place inversion;
- confusing quantity of pieces with positional value;
- omitting zero as placeholder.

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
- choose a strategy/result;
- detect and correct a character's calculation error.

## CH-OP-STORY — Decide and solve

**Skills:** ADD-PROBLEM, SUB-PROBLEM.

The child first determines the mathematical relationship, then calculates. Do not award full conceptual mastery when the operation is explicitly given in advance.

## CH-GEO-SORT — Sort the shapes

**Skills:** GEO2D-RECOG, GEO2D-PROP, GEO3D-RECOG, GEO3D-CLASS.

Possible interactions:
- drag into property-based groups;
- select every item satisfying a rule;
- identify the intruder and explain the property through a constrained choice.

## CH-GEO-BUILD — Build/repair the figure

**Skills:** GEO2D-COMP, GEO2D-DECOMP, GEO2D-MOSAIC.

Possible interactions:
- complete a mosaic;
- build a target silhouette from shapes;
- choose the missing piece;
- reproduce a composition with a limited set of pieces.

## CH-GEO-OBJECT — Object detective

**Skills:** GEO3D-REAL, GEO3D-SURFACE, GEO3D-PARTS.

Possible interactions:
- match solid ↔ real-world object;
- classify by plane/curved surfaces;
- identify a face/edge/vertex on an interactive diagram.

---

# 7. Difficulty model

Difficulty must be multidimensional.

`difficulty = numerical complexity + representational distance + task complexity + assistance level`

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

For the MVP, maintain per-skill evidence with at least:

- independent correct attempts;
- incorrect attempts;
- assisted correct attempts;
- representation used;
- recent performance.

Initial implementation may expose a simple state:

- `not_started`
- `learning`
- `practicing`
- `proficient`

The exact promotion thresholds remain **to validate** after the challenge generator and telemetry model are defined. They must not be invented by the UI.

---

# 10. First playable pedagogical slice

## Recommended MVP slice: Number Desert / Deserto dos Números

The first playable slice should prove the complete learning loop with a narrow mathematical scope rather than implement every photographed topic at once.

### Skills in the first slice

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

### Required pedagogical behavior

- Discover → Practice → Challenge;
- at least two representations for core place-value skills;
- immediate formative feedback;
- hints that do not count as independent mastery;
- item variation;
- per-skill result recording.

### Explicitly outside this first technical slice

Addition, subtraction and geometry remain in the curriculum specification and should be the next content modules, but they are not required to prove the first end-to-end gameplay loop.

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
