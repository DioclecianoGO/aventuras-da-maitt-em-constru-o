/**
 * Motion utilities for the visual layer.
 * Spec: docs/design/ANIMATION.md, docs/ux/TRANSITIONS.md
 *
 * No animation dependency is used. Durations are PROVISIONAL test values and
 * live as CSS custom properties in src/styles.css; the values below mirror
 * them for the few places JavaScript must schedule a hand-off.
 */
import * as React from "react";

export const MOTION = {
  reveal: 900,
  travel: 820,
  settle: 340,
  stage: 440,
  restore: 900,
  reducedFade: 140,
} as const;

/** Tracks `prefers-reduced-motion` without breaking SSR hydration. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

/** True after hydration; keeps SSR markup and first client render identical. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => setHydrated(true), []);
  return hydrated;
}