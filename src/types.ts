type ID = string;

interface Artist {
  name: string;
}

export interface Artwork {
  id: ID;
  name: string;
  workDate: string,
  image: string;
  artist: Artist;
  _links: {
    self: {
      href: string;
    }
  };
}
