# Delivery Workflow — Aventuras da Maittê

**Status:** DECIDED

## Source of truth
GitHub specifications govern the project. Conversation is the design workspace; approved decisions must be captured in versioned specs before implementation.

## Required delivery pipeline
1. Product/pedagogical/design reasoning is consolidated into Specs.
2. Specs are committed to GitHub.
3. **Claude — Prompt Refinement:** reads the relevant repository specs and turns the approved concept/specifications into a robust Lovable prompt. Claude may flag ambiguity, contradiction or implementability concerns, but is not product authority.
4. Human/product review resolves any material findings and corrects Specs when required.
5. **Lovable — Plan Mode:** reads the approved prompt/specs and proposes an implementation plan **without coding**.
6. The Lovable plan returns to this orchestration/review session and is audited against the specs using `COMPLIANT`, `GAP`, `CONFLICT`, `ASSUMPTION`.
7. Any material gap returns to Specs and, when useful, Claude prompt refinement / Lovable Plan again.
8. Human approval authorizes construction.
9. **Lovable — Build:** implements only the approved scope and plan.
10. Implementation is reviewed against Specs and acceptance criteria before acceptance.

## Escalation
Codex or Claude Code may be used for concrete implementation limitations (complex animation, architecture, debugging, specialized logic). They remain subordinate to the same Specs.

## Prohibitions
- Claude cannot silently redefine product decisions.
- Lovable cannot invent missing requirements or curriculum.
- A partially approved plan does not authorize broader implementation.
- Code/current UI does not override approved Specs.
