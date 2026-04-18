import type { Content } from "@/domain/entities/Content";

export interface CatalogRepository {
  findAll(): Promise<Content[]>;
  search(query: string): Promise<Content[]>;
  filterByGenre(genreId: string): Promise<Content[]>;
}
