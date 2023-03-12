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
  // pull the initial value from local storage if it is already set
  const [state, setState] = useState<T | null>(() => {
    const exValue = localStorage.getItem(key)
    if (exValue) {
      return JSON.parse(exValue) as T
    }
    return null
  })

  // save the new value when it changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  // memoize a storage watcher callback back because everything in hooks should be memoized
  const storageWatcher = useCallback((e: StorageEvent) => {
    if (e.newValue) {
      setState((currState) => {
        const newDat = JSON.parse(e.newValue || "null")
        return newDat === state ? newDat : currState
      })
    }
  }, [state]
  )

  // install the watcher
  useEffect(() => {
    window.addEventListener("storage", storageWatcher)
    // stop listening on remove
    return () => {
      window.removeEventListener("storage", storageWatcher)
    }
  }, [storageWatcher, state])

  return { state, setState }
}
