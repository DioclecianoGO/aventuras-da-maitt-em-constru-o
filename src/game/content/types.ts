/**
 * Content bundle shape.
 * Spec: docs/technical/CONTENT-ORCHESTRATION.md §1
 *
 * Kept in its own module so authored bundles and the registry can reference
 * the type without a circular import.
 */
import type {
  Activity,
  ContentPack,
  Curriculum,
  Skill,
  Subject,
  WorldConfig,
} from "@/game/domain/schemas";

export type ContentBundle = {
  subject: Subject;
  curriculum?: Curriculum;
  skills: Skill[];
  world: WorldConfig;
  activities: Activity[];
  packs: ContentPack[];
};
