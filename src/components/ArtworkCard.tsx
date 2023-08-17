import React, { useCallback, useMemo } from "react";
import { useArtworkVisitContext } from "../ArtworkVisitsProvider";
import { Artwork, ID } from "../types";

interface Props {
  artwork: Artwork;
}

export function ArtworkCard({ artwork }: Props) {
  const viewModel = useArtworkViewModel(artwork.id);
  const hasVisit = viewModel.hasVisit;

  function onClick() {
    viewModel.setVisited();
  }

  return (
    <div className="artwork-card">
      <a
        href={artwork._links.self.href}
        target="_blank"
        onClick={onClick}
        rel="noreferrer"
      >
        <div className="artwork-card__main">
          {hasVisit &&
            <div className="artwork-card__viewed-indicator">
              Viewed
            </div>
          }
          <div className="artwork-card__image">
            <img src={artwork.image} alt="" />
          </div>
          <div className="artwork-card__details">
            <div>
              {`${artwork.name}, ${artwork.workDate}`}
            </div>
            <div className="artwork-card__artist">
              {artwork.artist.name}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

function useArtworkViewModel(artworkId: ID) {
  const { visits, setVisits } = useArtworkVisitContext();

  const setVisited = useCallback(() => {
    const nextVisits = new Set(visits);
    nextVisits.add(artworkId);
    setVisits(nextVisits);
  }, [visits,setVisits, artworkId]);


  const hasVisit = useMemo(() => {
    return visits.has(artworkId);
  }, [visits, artworkId]);

  return {
    setVisited,
    hasVisit,
  }
}
