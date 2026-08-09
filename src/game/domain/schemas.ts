/**
 * Configuration schemas for the approved core entities.
 * Spec: docs/technical/CONFIG-SCHEMAS.md
 *
 * Ownership rules encoded here:
 * - Content Pack owns items, feedback and answer/evaluation rules.
 * - Activity is LOCATION-AGNOSTIC: it has no slotId.
 * - Activity Slot owns board placement and the Activity assignment/sequence.
 * - Puzzle Template owns interaction only: no skills, answers or world ids.
 */
import { z } from "zod";

export const learningModeSchema = z.enum(["discover", "practice", "challenge"]);

export const responseKindSchema = z.enum([
  "selection",
  "ordering",
  "placement",
  "composition",
  "numeric",
  "text",
  "relation",
  "audio",
]);

export const subjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  worldId: z.string(),
});

export const curriculumSchema = z.object({
  id: z.string(),
  subjectId: z.string(),
  gradeLabel: z.string(),
  source: z.string().optional(),
});

export const skillSchema = z.object({
  id: z.string(),
  curriculumId: z.string(),
  group: z.string(),
  name: z.string(),
  /** Phase 0 placeholder skills must be flagged so they never read as curriculum. */
  placeholder: z.boolean().default(false),
});

export const learningObjectiveSchema = z.object({
  id: z.string(),
  skillId: z.string(),
  statement: z.string(),
});

/** Answer / evaluation rules live with the Content Pack, never with the template. */
export const answerRulesSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("selection"),
    /** Each entry is one fully valid answer set. */
    acceptedSets: z.array(z.object({ id: z.string(), optionIds: z.array(z.string()) })),
  }),
  z.object({
    kind: z.literal("ordering"),
    acceptedOrders: z.array(z.object({ id: z.string(), orderedIds: z.array(z.string()) })),
    allowPartial: z.boolean().default(true),
  }),
]);

export const packItemSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  representation: z.string(),
  options: z.array(z.object({ id: z.string(), label: z.string() })).default([]),
  answerRules: answerRulesSchema,
});

export const contentPackSchema = z.object({
  id: z.string(),
  skillIds: z.array(z.string()),
  objectiveIds: z.array(z.string()).default([]),
  representation: z.string(),
  eligibleTemplates: z.array(z.string()),
  items: z.array(packItemSchema).min(1),
  feedback: z.object({
    firstError: z.string(),
    repeatedError: z.string(),
    hints: z.array(z.string()).default([]),
  }),
  /** TECHNICAL PLACEHOLDER content is never curriculum. */
  placeholder: z.boolean().default(false),
});

export const activitySchema = z.object({
  id: z.string(),
  contentPackId: z.string(),
  templateId: z.string(),
  /** Multidimensional per MATHEMATICS-GRADE-2 §7; Phase 0 carries the level only. */
  difficultyLevel: z.number().int().min(1).max(4),
  supportLevelId: z.string(),
  mode: learningModeSchema,
  guidePetId: z.string().optional(),
  // DECIDED (docs/technical/ARCHITECTURE.md): no slotId. Activity is location-agnostic.
});

export const activitySlotSchema = z.object({
  id: z.string(),
  worldId: z.string(),
  segmentId: z.string(),
  order: z.number().int().nonnegative(),
  anchor: z.object({ x: z.number(), y: z.number() }),
  restorationWeight: z.number().positive().default(1),
  /** The slot owns the assignment. */
  sequence: z.object({
    discover: z.string().optional(),
    practice: z.array(z.string()).default([]),
    challenge: z.array(z.string()).min(1),
  }),
});

export const worldSegmentSchema = z.object({
  id: z.string(),
  worldId: z.string(),
  label: z.string(),
});

export const worldConfigSchema = z.object({
  id: z.string(),
  subjectId: z.string(),
  name: z.string(),
  segments: z.array(worldSegmentSchema).min(1),
  slots: z.array(activitySlotSchema).min(1),
  placeholder: z.boolean().default(false),
});

/**
 * Support levels are a typed seam only in Phase 0.
 * GAP: docs/gameplay/SUPPORT-LEVELS.md does not exist. Final levels are NOT decided.
 */
export const supportLevelSchema = z.object({
  id: z.string(),
  hintsAllowed: z.boolean(),
  revealAllowed: z.literal(false),
  provisional: z.literal(true),
});

export type Subject = z.infer<typeof subjectSchema>;
export type Curriculum = z.infer<typeof curriculumSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type LearningObjective = z.infer<typeof learningObjectiveSchema>;
export type AnswerRules = z.infer<typeof answerRulesSchema>;
export type PackItem = z.infer<typeof packItemSchema>;
export type ContentPack = z.infer<typeof contentPackSchema>;
export type Activity = z.infer<typeof activitySchema>;
export type ActivitySlot = z.infer<typeof activitySlotSchema>;
export type WorldSegment = z.infer<typeof worldSegmentSchema>;
export type WorldConfig = z.infer<typeof worldConfigSchema>;
export type SupportLevel = z.infer<typeof supportLevelSchema>;