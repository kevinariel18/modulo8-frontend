import type { Content, Genre } from "@/domain/entities/Content";

export interface CreateContentData {
  titulo: string;
  descripcion?: string;
  clasificacion?: string;
  duracion?: number;
  generoId: number;
}

export interface CatalogRepository {
  findAll(): Promise<Content[]>;
  search(query: string): Promise<Content[]>;
  filterByGenre(genreId: string): Promise<Content[]>;
  create(data: CreateContentData): Promise<Content>;
  update(id: string, data: Partial<CreateContentData>): Promise<Content>;
  remove(id: string): Promise<void>;
  getGeneros(): Promise<Genre[]>;
  createGenero(nombre: string): Promise<Genre>;
}
