import { artworks } from "../database";
import { ArtworkCard } from "./ArtworkCard";

export function GridLayout() {
  return (
    <div className="grid-layout">
      {artworks.map((artwork) => (
        <div className="grid-layout__item">
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
          />
        </div>
      ))}
    </div>
  )
}
