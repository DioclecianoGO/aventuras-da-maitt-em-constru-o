/**
 * Generic multi-world content registry.
 * Spec: docs/technical/CONTENT-ORCHESTRATION.md §1
 *
 * A local/static resolution boundary for authored educational configuration.
 * It resolves Subject / WorldConfig / ActivitySlot / Activity / ContentPack /
 * PackItem by stable id, so routes never import a specific subject fixture.
 *
 * It is NOT the visual asset registry and owns no scenery, art or narration.
 * It is NOT a backend: there is no remote delivery, CMS or database here.
 */
import type {
  Activity,
  ActivitySlot,
  ContentPack,
  Curriculum,
  PackItem,
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

const worlds = new Map<string, WorldConfig>();
const subjects = new Map<string, Subject>();
const curricula = new Map<string, Curriculum>();
const skills = new Map<string, Skill>();
const activities = new Map<string, Activity>();
const packs = new Map<string, ContentPack>();

export function registerContentBundle(bundle: ContentBundle) {
  worlds.set(bundle.world.id, bundle.world);
  subjects.set(bundle.subject.id, bundle.subject);
  if (bundle.curriculum) curricula.set(bundle.curriculum.id, bundle.curriculum);
  for (const skill of bundle.skills) skills.set(skill.id, skill);
  for (const activity of bundle.activities) activities.set(activity.id, activity);
  for (const pack of bundle.packs) packs.set(pack.id, pack);
}

export function resetContentRegistry() {
  worlds.clear();
  subjects.clear();
  curricula.clear();
  skills.clear();
  activities.clear();
  packs.clear();
}

export function listWorlds(): WorldConfig[] {
  return [...worlds.values()];
}

export function getWorld(worldId: string): WorldConfig | null {
  return worlds.get(worldId) ?? null;
}

export function getSlot(worldId: string, slotId: string): ActivitySlot | null {
  return getWorld(worldId)?.slots.find((slot) => slot.id === slotId) ?? null;
}

export function getActivity(activityId: string): Activity | null {
  return activities.get(activityId) ?? null;
}

export function getContentPack(packId: string): ContentPack | null {
  return packs.get(packId) ?? null;
}

export function getSkill(skillId: string): Skill | null {
  return skills.get(skillId) ?? null;
}

export function getSubject(subjectId: string): Subject | null {
  return subjects.get(subjectId) ?? null;
}

export function getSubjectByWorld(worldId: string): Subject | null {
  const world = getWorld(worldId);
  if (!world) return null;
  return getSubject(world.subjectId);
}

/**
 * Resolve the pack + item an Activity should currently run.
 *
 * Item sequencing stays in authored configuration. Science Slice A authors one
 * principal required item per Activity, but `itemId` keeps the resolution
 * generic so `items[0]` never becomes a permanent route assumption.
 */
export function getActivityContent(
  activityId: string,
  itemId?: string,
): { activity: Activity; pack: ContentPack; item: PackItem } | null {
  const activity = getActivity(activityId);
  if (!activity) return null;
  const pack = getContentPack(activity.contentPackId);
  if (!pack) return null;
  const item = itemId ? pack.items.find((entry) => entry.id === itemId) : pack.items[0];
  if (!item) return null;
  return { activity, pack, item };
}

/** Explicit failure in development instead of a silently blank screen. */
export function requireWorld(worldId: string): WorldConfig {
  const world = getWorld(worldId);
  if (!world) throw new Error(`Unknown world id "${worldId}" in the content registry.`);
  return world;
}

export function requireActivity(activityId: string): Activity {
  const activity = getActivity(activityId);
  if (!activity) throw new Error(`Unknown activity id "${activityId}" in the content registry.`);
  return activity;
}