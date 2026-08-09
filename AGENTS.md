<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Spec-driven development governance

This repository is governed by versioned specifications. Before changing product behavior, UX, narrative, pedagogy, gameplay, art direction, state, persistence, or architecture, read the relevant files under `docs/`.

## Decision states

Use these labels explicitly inside specifications when a decision is not self-evident:

- `DECIDED`: approved and binding.
- `PROVISIONAL`: accepted direction that may still be refined.
- `FUTURE`: planned, but not part of the current delivery.
- `OUT_OF_SCOPE`: explicitly excluded from the current delivery.

## Precedence

When sources disagree, use this order of authority:

1. Approved specification under `docs/`
2. Approved ADR under `docs/adr/`
3. Acceptance criteria
4. Approved implementation plan
5. Code
6. Current application behavior

Existing code is not a product decision by itself.

## Agent rules

1. Do not invent missing product decisions to make an implementation look complete.
2. If a required decision is absent, surface it as `GAP`, `CONFLICT`, or `ASSUMPTION` before implementation.
3. Do not contradict a `DECIDED` item without explicitly proposing a spec or ADR change first.
4. Keep curriculum/source material separate from world/game-design specifications.
5. Prefer reusable and parametrized systems over hardcoded exercise content when the specifications call for reuse.
6. Do not implement `FUTURE` or `OUT_OF_SCOPE` work unless its status is intentionally changed first.
7. Keep changes reviewable and preserve Lovable/GitHub history.

## Documentation map

- `docs/product/`: product vision, design principles, game loop, MVP scope.
- `docs/narrative/`: universe, story, characters and companions.
- `docs/worlds/`: overworld and subject-world design.
- `docs/ux/`: navigation, boards, challenge stage, feedback and transitions.
- `docs/gameplay/`: puzzles, activity slots, support, progression and XP.
- `docs/design/`: visual direction, restoration of color, animation, audio and responsive behavior.
- `docs/pedagogy/`: learning model, content parametrization and curriculum sources.
- `docs/technical/`: architecture, schemas, state and persistence.
- `docs/adr/`: architectural/product decisions with durable rationale.

If a proposed change spans multiple domains, read every relevant specification before editing code.