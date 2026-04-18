import type { Content } from "@/domain/entities/Content";
import type { CatalogRepository } from "@/domain/ports/CatalogRepository";

export class GetCatalog {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async execute(): Promise<Content[]> {
    return this.catalogRepository.findAll();
  }
}
