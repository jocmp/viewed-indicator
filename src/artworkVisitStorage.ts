import { useState } from "react";
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
  const { state, setState } = useSessionStorage<Visit>(key(artworkId));

  function setVisited() {
    setState({ visited: true });
  }

  function hasVisit() {
    return !!state?.visited;
  }

  return {
    setVisited,
    hasVisit,
  }
}

export function clearAllViews() {
  sessionStorage.clear();
  window.location.reload();
}

function useSessionStorage<T>(key: ID) {
  const [state, setState] = useState<T | null>(() => {
    const initialValue = sessionStorage.getItem(key);
    if (initialValue) {
      return JSON.parse(initialValue) as T;
    }
    return null;
  });

  function setStateWithStorage(value: T) {
    try {
      setState(value);
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Couldn't set item for key ${key}`, e);
    }
  }

  return {
    state,
    setState: setStateWithStorage
  };
}
