interface ArtworkVisitStorage {
  setVisited(): void;
  hasVisit(): boolean;
}

const keyPrefix = 'artwork-visit';

export function useArtworkVisit(artworkId: string): ArtworkVisitStorage {
  function setVisitedWithState() {
    setVisited(artworkId);
  }

  function hasVisitWithState() {
    return hasVisit(artworkId);
  }

  return {
    setVisited: setVisitedWithState,
    hasVisit: hasVisitWithState,
  }
}

export function clearAllViews() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)

    if (key?.startsWith(keyPrefix)) {
      localStorage.removeItem(key);
    }

    window.location.reload();
  }
}

function setVisited(artworkId: string) {
  try {
    localStorage.setItem(`${keyPrefix}:${artworkId}`, `${true}`)
  } catch (e) {
    console.debug(`Couldn't set visit for ${artworkId}`, e);
  }
}

function hasVisit(artworkId: string) {
  return !!localStorage.getItem(`${keyPrefix}:${artworkId}`)
}
