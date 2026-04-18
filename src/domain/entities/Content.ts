export type ContentId = string;

export interface Genre {
  id: string;
  name: string;
}

export interface Content {
  id: ContentId;
  title: string;
  description: string;
  imageUrl: string;
  genre: Genre;
}
