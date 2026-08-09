/**
 * Game state store: React Context + reducer, hydrated through the
 * PersistenceAdapter boundary.
 * Spec: docs/technical/STATE.md, docs/technical/PERSISTENCE.md
 *
 * Hydration happens in an effect so SSR and the first client render match.
 */
import * as React from "react";
import type { PersistenceAdapter } from "@/game/persistence/adapter";
import { createLocalStoragePersistence } from "@/game/persistence/local-storage";
import { gameReducer } from "@/game/state/reducer";
import {
  SAVE_SCHEMA_VERSION,
  emptyFacts,
  type GameAction,
  type GameFacts,
} from "@/game/state/types";

type GameStateContextValue = {
  facts: GameFacts;
  dispatch: React.Dispatch<GameAction>;
  hydrated: boolean;
};

const GameStateContext = React.createContext<GameStateContextValue | null>(null);

export function GameStateProvider({
  children,
  adapter,
}: {
  children: React.ReactNode;
  adapter?: PersistenceAdapter;
}) {
  const persistence = React.useMemo(
    () => adapter ?? createLocalStoragePersistence(),
    [adapter],
  );
  const [facts, dispatch] = React.useReducer(gameReducer, undefined, emptyFacts);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const saved = persistence.load();
    if (saved) dispatch({ type: "HYDRATE", facts: saved.facts });
    setHydrated(true);
  }, [persistence]);

  React.useEffect(() => {
    if (!hydrated) return; // never overwrite a save before reading it
    persistence.save({
      schemaVersion: SAVE_SCHEMA_VERSION,
      savedAt: new Date().toISOString(),
      facts,
    });
  }, [facts, hydrated, persistence]);

  const value = React.useMemo(
    () => ({ facts, dispatch, hydrated }),
    [facts, hydrated],
  );

  return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>;
}

export function useGameState() {
  const context = React.useContext(GameStateContext);
  if (!context) throw new Error("useGameState must be used inside <GameStateProvider>");
  return context;
}