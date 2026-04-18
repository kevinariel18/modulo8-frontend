import type { Content } from "@/domain/entities/Content";
import type { CatalogRepository } from "@/domain/ports/CatalogRepository";

export class SearchCatalog {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async execute(query: string): Promise<Content[]> {
    if (!query.trim()) return this.catalogRepository.findAll();
    return this.catalogRepository.search(query);
  }
}
