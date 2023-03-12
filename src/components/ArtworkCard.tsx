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
    <a
      href={artwork._links.self.href}
      target="_blank"
      className="artwork-card"
      onClick={onClick}
      rel="noreferrer"
    >
      <div className="artwork-card__details">
        {hasVisit &&
          <div className="artwork-card__viewed-indicator">
            Viewed
          </div>
        }
        <div className="artwork-card__image">
          <img src={artwork.image} alt="" />
        </div>
      </div>
    </a>
  )
}
