/**
 * Content composition root.
 * Spec: docs/technical/CONTENT-ORCHESTRATION.md §1
 *
 * Importing this module registers every authored world/content set. Routes
 * import the registry, never a specific subject fixture: Mathematics and
 * Science coexist behind one generic resolution boundary.
 */
import { registerContentBundle } from "@/game/content/registry";
import { mathematicsBundle } from "@/game/content/placeholder-fixture";
import { scienceBundle } from "@/game/content/science/slice-a";

registerContentBundle(mathematicsBundle);
registerContentBundle(scienceBundle);

export * from "@/game/content/registry";
export * from "@/game/content/sequence";