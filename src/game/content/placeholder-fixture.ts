/**
 * TECHNICAL PLACEHOLDER FIXTURE — NOT CURRICULUM, NOT FINAL CONTENT.
 *
 * Every entity here is flagged `placeholder: true`. It exists only to prove
 * that the schemas, registries, evaluation pipeline, state store and routes
 * connect end to end. Phase 1 replaces all of it with real content packs
 * authored against docs/pedagogy/ and docs/worlds/.
 */
import {
  activitySchema,
  activitySlotSchema,
  contentPackSchema,
  skillSchema,
  subjectSchema,
  worldConfigSchema,
  type Activity,
  type ContentPack,
  type Skill,
  type Subject,
  type WorldConfig,
} from "@/game/domain/schemas";
import type { ContentBundle } from "@/game/content/registry";

export const PLACEHOLDER_WORLD_ID = "world-placeholder";

export const placeholderSubject: Subject = subjectSchema.parse({
  id: "subject-placeholder",
  name: "Mundo de Demonstração Técnica",
  worldId: PLACEHOLDER_WORLD_ID,
});

export const placeholderSkills: Skill[] = [
  skillSchema.parse({
    id: "skill-placeholder-1",
    curriculumId: "curriculum-placeholder",
    group: "Placeholder",
    name: "Habilidade de demonstração técnica",
    placeholder: true,
  }),
];

export const placeholderPack: ContentPack = contentPackSchema.parse({
  id: "pack-placeholder",
  skillIds: ["skill-placeholder-1"],
  representation: "symbolic",
  eligibleTemplates: ["placeholder-order"],
  placeholder: true,
  items: [
    {
      id: "item-placeholder-1",
      prompt: "Coloque as peças em ordem crescente.",
      representation: "symbolic",
      options: [
        { id: "opt-3", label: "3" },
        { id: "opt-1", label: "1" },
        { id: "opt-4", label: "4" },
        { id: "opt-2", label: "2" },
      ],
      answerRules: {
        kind: "ordering",
        acceptedOrders: [{ id: "asc", orderedIds: ["opt-1", "opt-2", "opt-3", "opt-4"] }],
        allowPartial: true,
      },
    },
  ],
  feedback: {
    firstError: "Quase! Olhe de novo para a ordem das peças.",
    repeatedError: "Vamos tentar juntos: comece pela menor peça.",
    hints: ["Qual é a menor de todas?"],
  },
});

export const placeholderActivities: Activity[] = [
  activitySchema.parse({
    id: "activity-placeholder-challenge",
    contentPackId: placeholderPack.id,
    templateId: "placeholder-order",
    difficultyLevel: 1,
    supportLevelId: "support-provisional",
    mode: "challenge",
  }),
];

export const placeholderWorld: WorldConfig = worldConfigSchema.parse({
  id: PLACEHOLDER_WORLD_ID,
  subjectId: placeholderSubject.id,
  name: "Mundo de Demonstração Técnica",
  placeholder: true,
  segments: [
    { id: "segment-a", worldId: PLACEHOLDER_WORLD_ID, label: "Trecho A" },
    { id: "segment-b", worldId: PLACEHOLDER_WORLD_ID, label: "Trecho B" },
  ],
  slots: [
    activitySlotSchema.parse({
      id: "slot-1",
      worldId: PLACEHOLDER_WORLD_ID,
      segmentId: "segment-a",
      order: 0,
      anchor: { x: 18, y: 62 },
      restorationWeight: 1,
      sequence: { challenge: ["activity-placeholder-challenge"], practice: [] },
    }),
    activitySlotSchema.parse({
      id: "slot-2",
      worldId: PLACEHOLDER_WORLD_ID,
      segmentId: "segment-a",
      order: 1,
      anchor: { x: 44, y: 40 },
      restorationWeight: 1,
      sequence: { challenge: ["activity-placeholder-challenge"], practice: [] },
    }),
    activitySlotSchema.parse({
      id: "slot-3",
      worldId: PLACEHOLDER_WORLD_ID,
      segmentId: "segment-b",
      order: 2,
      anchor: { x: 72, y: 58 },
      restorationWeight: 1,
      sequence: { challenge: ["activity-placeholder-challenge"], practice: [] },
    }),
  ],
});

export function findSlot(slotId: string) {
  return placeholderWorld.slots.find((slot) => slot.id === slotId) ?? null;
}

export function findActivity(activityId: string) {
  return placeholderActivities.find((activity) => activity.id === activityId) ?? null;
}

/**
 * Mathematics stays registered and functional while Science is added.
 * Its content is still the Phase 0 technical placeholder; only the resolution
 * path changed (docs/technical/CONTENT-ORCHESTRATION.md §1 rule 1).
 */
export const mathematicsBundle: ContentBundle = {
  subject: placeholderSubject,
  skills: placeholderSkills,
  world: placeholderWorld,
  activities: placeholderActivities,
  packs: [placeholderPack],
};