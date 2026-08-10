/**
 * Content composition root.
 * Spec: docs/technical/CONTENT-ORCHESTRATION.md §1
 *
 * Routes import this module, never a specific subject fixture: Mathematics and
 * Science coexist behind one generic resolution boundary. Registration is
 * deterministic composition (see bundles.ts + registry.ts), not an import-time
 * side effect.
 */
export type { ContentBundle } from "@/game/content/types";
export { contentBundles } from "@/game/content/bundles";
export * from "@/game/content/registry";
export * from "@/game/content/sequence";
