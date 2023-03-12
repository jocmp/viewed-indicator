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
      className="artwork-card"
      onClick={onClick}
    >
      <div className="artwork-card__image">
        {hasVisit &&
          <span className="artwork-card__viewed-indicator">viewed</span>
        }
        <img src={artwork.image} alt="" />
      </div>
    </a>
  )
}
