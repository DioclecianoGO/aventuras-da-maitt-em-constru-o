/**
 * Character acting states.
 * Spec: docs/design/CHARACTER-ART.md, docs/design/ANIMATION.md
 *
 * Presentation vocabulary ONLY. Nothing here evaluates a response, reads game
 * state or decides progression. The stage maps already-committed results onto
 * these states; the states never map back.
 */

export type MaitteActingState =
  | "idle-curious"
  | "listen-think"
  | "success"
  | "retry-thinking"
  | "move";

export type CompanionActingState =
  | "idle"
  | "speak"
  | "watch"
  | "success-reaction"
  | "retry-reaction";