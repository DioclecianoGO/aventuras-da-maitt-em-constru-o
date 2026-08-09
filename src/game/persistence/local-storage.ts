/**
 * LocalStoragePersistence — Functional MVP implementation.
 * Spec: docs/technical/PERSISTENCE.md
 *
 * Single local profile. No backend, no accounts, no sync.
 * A corrupted save must never crash the application.
 */
import type { PersistenceAdapter } from "@/game/persistence/adapter";
import { SAVE_SCHEMA_VERSION, emptyFacts, type PersistedSave } from "@/game/state/types";

const STORAGE_KEY = "adm.save.v1";

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function createLocalStoragePersistence(
  storageKey: string = STORAGE_KEY,
): PersistenceAdapter {
  return {
    id: "local-storage",

    load() {
      if (!isBrowser()) return null;
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Partial<PersistedSave>;
        if (!parsed || typeof parsed !== "object" || !parsed.facts) return null;
        if (parsed.schemaVersion !== SAVE_SCHEMA_VERSION) {
          // Deliberate: no migration path is approved yet. Fail safe, not loud.
          return null;
        }
        const base = emptyFacts();
        return {
          schemaVersion: SAVE_SCHEMA_VERSION,
          savedAt: parsed.savedAt ?? new Date().toISOString(),
          facts: {
            slots: parsed.facts.slots ?? base.slots,
            milestones: parsed.facts.milestones ?? base.milestones,
            evidence: Array.isArray(parsed.facts.evidence) ? parsed.facts.evidence : [],
            currentSlotByWorld: parsed.facts.currentSlotByWorld ?? base.currentSlotByWorld,
          },
        };
      } catch {
        // Corrupted save: recover to a clean state rather than crashing.
        return null;
      }
    },

    save(state) {
      if (!isBrowser()) return;
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(state));
      } catch {
        /* quota or private-mode failure must not break gameplay */
      }
    },

    clear() {
      if (!isBrowser()) return;
      try {
        window.localStorage.removeItem(storageKey);
      } catch {
        /* ignore */
      }
    },
  };
}