import { createContext, useCallback, useContext, useState } from "react";
import { ID } from "./types";

const ARTWORK_VISITS_KEY = 'artwork-visits';

type Visits = Set<ID>;

interface VisitsState {
  visits: Visits;
  setVisits(visits: Visits): void;
  clearAll(): void;
}

const VisitsStateContext = createContext<VisitsState>({
  visits: new Set(),
  setVisits: (_) => { },
  clearAll: () => { },
})

export function ArtworkVisitsProvider({ children }: { children: React.ReactNode }) {
  const visitState = useArtworkVisits();

  return (
    <VisitsStateContext.Provider value={visitState}>
      {children}
    </VisitsStateContext.Provider>
  )
}

export function useArtworkVisitContext() {
  return useContext(VisitsStateContext);
}

function useArtworkVisits(): VisitsState {
  const [state, setState] = useState<Visits>(() => {
    const initialValue = sessionStorage.getItem(ARTWORK_VISITS_KEY);
    if (initialValue) {
      return new Set(JSON.parse(initialValue));
    }
    return new Set();
  });

  const setVisits = useCallback((visits: Visits) => {
    try {
      setState(visits);
      sessionStorage.setItem(ARTWORK_VISITS_KEY, JSON.stringify(Array.from(visits)));
    } catch (e) {
      console.error(`Couldn't set item for key ${ARTWORK_VISITS_KEY}`, e);
    }
  }, [setState]);

  const clearAll = useCallback(() => {
    sessionStorage.removeItem(ARTWORK_VISITS_KEY);
    window.location.reload();
  }, []);

  console.log('returned visits', state);

  return {
    visits: state,
    setVisits,
    clearAll,
  };
}
