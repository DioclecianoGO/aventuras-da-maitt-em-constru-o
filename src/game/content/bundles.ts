/**
 * Authored content composition list.
 * Spec: docs/technical/CONTENT-ORCHESTRATION.md §1
 *
 * The single deterministic source of registered worlds. Adding a subject means
 * adding its bundle here; no import-order or side-effect registration is
 * involved, so a bundler can never drop a world from the build.
 */
import type { ContentBundle } from "@/game/content/types";
import { mathematicsBundle } from "@/game/content/placeholder-fixture";
import { scienceBundle } from "@/game/content/science/slice-a";

export const contentBundles: readonly ContentBundle[] = [mathematicsBundle, scienceBundle];
