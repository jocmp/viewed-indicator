import { useCallback, useEffect, useState } from "react";
import { ID } from "./types";

interface Visit {
  visited: true;
}

interface ArtworkVisitStorage {
  setVisited(): void;
  hasVisit(): boolean;
}

const keyPrefix = 'artwork-visit';

function key(artworkId: ID) {
  return `${keyPrefix}:${artworkId}`;
}

export function useArtworkVisit(artworkId: ID): ArtworkVisitStorage {
  const { state: visit, setState: setVisit } = useLocalStorage<Visit>(key(artworkId));

  function setVisitedWithState() {
    setVisit({ visited: true });
  }

  function hasVisitWithState() {
    return !!visit?.visited;
  }

  return {
    setVisited: setVisitedWithState,
    hasVisit: hasVisitWithState,
  }
}

export function clearAllViews() {
  localStorage.clear();
  window.location.reload();
}

// https://synth.app/blog/uselocalstorage-hooks-are-nice
function useLocalStorage<T>(key: ID) {
  const [state, setState] = useState<T | null>(() => {
    const initialValue = localStorage.getItem(key);
    if (initialValue) {
      return JSON.parse(initialValue) as T;
    }
    return null;
  })

  // save the new value when it changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error(`Couldn't set item for key ${key}`, e);
    }
  }, [key, state]);

  // memoize a storage watcher callback back because everything in hooks should be memoized
  const storageWatcher = useCallback((e: StorageEvent) => {
    if (e.newValue) {
      setState((currState) => {
        const newData = JSON.parse(e.newValue || "null");
        return newData === state ? newData : currState;
      })
    }
  }, [state]);

  useEffect(() => {
    window.addEventListener("storage", storageWatcher)

    return () => {
      window.removeEventListener("storage", storageWatcher)
    }
  }, [storageWatcher, state])

  return { state, setState }
}
