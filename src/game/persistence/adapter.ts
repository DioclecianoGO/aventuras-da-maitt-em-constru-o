/**
 * PersistenceAdapter boundary.
 * Spec: docs/technical/PERSISTENCE.md
 *
 * Functional MVP infrastructure. The domain layer never touches localStorage
 * directly, so remote persistence (FUTURE, not authorized) can be added later
 * without rewriting gameplay logic.
 */
import type { PersistedSave } from "@/game/state/types";

export interface PersistenceAdapter {
  readonly id: string;
  load(): PersistedSave | null;
  save(state: PersistedSave): void;
  clear(): void;
}