import { artworks } from "../database";
import { ArtworkCard } from "./ArtworkCard";

export function GridLayout() {
  return (
    <div className="grid-layout">
      {artworks.map((artwork) => (
        <div className="grid-layout__item" key={artwork.id}>
          <ArtworkCard
            artwork={artwork}
          />
        </div>
      ))}
    </div>
  )
}
