# Emergent Reader Support

**Status:** DECIDED cross-cutting UX behavior for the child-facing experience.

## Purpose

The initial learner is still consolidating literacy. The game must therefore not assume that a child can independently decode every instruction, answer label, category name, clue or action label before being able to play.

The default product hierarchy is:

**visual meaning → spoken support → short written reinforcement**.

Text remains useful for literacy reinforcement and accessibility, but essential comprehension must not depend on reading text alone.

## Visual-first rule

When a concept can be represented reliably through an object, scene, illustration, pose, icon or spatial relation, that visual representation should be the primary interaction surface.

Prefer:

- touching the illustrated water in a scene;
- moving an illustrated animal/object;
- comparing visible characteristics;
- choosing between pictorial evidence;
- using a scene as the evidence being discussed.

Avoid making a child-facing activity primarily a collection of generic rectangular text boxes when the same concept can be represented visually.

This rule does not mean text must disappear. A short label may accompany an image and remains valuable for literacy reinforcement.

## Read-aloud rule

**DECIDED:** any child-facing text that is materially required to understand an instruction, option, category, clue/evidence choice or important action must have a practical spoken/read-aloud path.

This includes, where applicable:

- challenge instructions;
- answer/choice labels;
- classification target/category labels;
- conclusion/evidence options;
- relevant hint/support text;
- short feedback that changes what the child should do next.

Decorative headings and non-essential flavor copy do not require independent playback if they carry no gameplay meaning.

## Interaction behavior

Read-aloud must work on the primary tablet experience. Therefore **hover must never be the only mechanism**.

Allowed patterns include:

- tapping/selecting an interactive object also speaks its short label;
- tapping a dedicated speaker affordance attached to an option/category;
- keyboard focus plus explicit activation;
- desktop hover as optional enrichment only.

The exact pattern may vary by template, but it must not create accidental submissions or false educational evidence.

For example:

- tapping an answer card may select it and speak its label, while a separate deliberate confirmation still submits the answer;
- if speaking and selecting must be separate to protect evidence integrity, use a clearly attached speaker control.

## Spoken labels are accessibility, not hints

Hearing the literal text/label that is already visible on screen does **not** by itself count as pedagogical assistance.

Examples:

- hearing `caranguejo` when touching the crab card;
- hearing `seres vivos` when activating that category label;
- hearing a conclusion option exactly as written.

This is equivalent access to the presented content, not an answer hint.

A spoken explanation that narrows the answer or directs attention to the correct evidence remains a support/hint event and must continue to be tracked separately when the evidence model supports it.

## Audio ownership

Read-aloud content belongs to presentation/content configuration or to a generic label-speaking seam. It must not be hardcoded into pet artwork, evaluator logic or subject-specific templates.

Reuse the existing narration/audio service behavior where practical:

- one primary spoken stream at a time;
- repeated playback cancels/restarts rather than overlaps;
- audio asset preferred when approved;
- browser/system speech synthesis remains an MVP fallback;
- caption/text remains visible;
- audio never determines correctness.

A future production voice asset may replace synthesis without changing educational logic.

## Option and category design

Interactive choices should prioritize:

1. meaningful illustration/object;
2. short visible label;
3. read-aloud access.

For categories/targets such as `Seres vivos` / `Não vivos`, the visual language should reinforce the distinction but must not encode correctness through color alone.

Text-only cards are acceptable when an abstract idea genuinely cannot be represented pictorially, but each required text choice must still be readable aloud.

## Multi-observation Discover interactions

A Discover activity may intentionally ask the child to notice more than one thing before moving on.

For scene investigation, the generic selection system must be capable of collecting **multiple distinct valid observations** when authored content requires it.

The exact schema field names are implementation details, but the rules must be able to express a reusable constraint such as:

- allowed option ids;
- minimum number of distinct selections;
- optional maximum number of selections.

This remains generic interaction behavior, not Science-specific logic.

Discover-mode multi-selection is not a mastery threshold. It is a way to establish that a scene/environment contains multiple observable elements.

## Confirmation and evidence integrity

Spoken feedback and read-aloud must not automatically submit an answer.

Where an activity already uses deliberate confirmation (`Mostrar para Burpee` or equivalent), keep that confirmation boundary unless the mechanic has an unambiguous completion state and a separately approved rule allows automatic evaluation.

## Acceptance criteria

A child-facing activity that contains essential written choices passes this spec only when:

1. the main concept is visually understandable where a visual representation is feasible;
2. required written option/category/evidence text has a spoken/read-aloud path;
3. tablet interaction does not depend on hover;
4. speaking a label does not itself count as a hint or submit an attempt;
5. essential audio can be replayed or re-triggered;
6. muted/audio-unavailable use still has visible support;
7. no correctness logic moves into the audio or visual presentation layer;
8. any multi-observation requirement is generic and content-authored rather than hardcoded to one subject.

## Asset-production boundary

The current code-drawn SVG illustrations remain acceptable as concept/technical assets while pedagogy and interaction are validated.

They are **not** the final visual quality target.

Richer production illustration should enter through the approved Asset Production Pipeline so that art can be replaced without changing content, evaluator, state or interaction contracts.
