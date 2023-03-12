import { useArtworkVisit } from "../artworkVisitStorage";
import { Artwork } from "../types";

interface Props {
  artwork: Artwork;
}

export function ArtworkCard({ artwork }: Props) {
  const storage = useArtworkVisit(artwork.id);
  const hasVisit = storage.hasVisit();

  function onClick() {
    storage.setVisited();
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
