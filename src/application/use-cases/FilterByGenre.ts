import type { Content } from "@/domain/entities/Content";
import type { CatalogRepository } from "@/domain/ports/CatalogRepository";

export class FilterByGenre {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async execute(genreId: string): Promise<Content[]> {
    if (!genreId) return this.catalogRepository.findAll();
    return this.catalogRepository.filterByGenre(genreId);
  }
}
