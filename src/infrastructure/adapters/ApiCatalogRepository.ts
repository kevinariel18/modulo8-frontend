import type { Content } from "@/domain/entities/Content";
import type { CatalogRepository } from "@/domain/ports/CatalogRepository";
import { API_ROUTES } from "@/config/constants";
import { HttpClient } from "@/infrastructure/api/httpClient";

export class ApiCatalogRepository implements CatalogRepository {
  constructor(private readonly http: HttpClient) {}

  findAll(): Promise<Content[]> {
    return this.http.request<Content[]>(API_ROUTES.catalog, "GET");
  }

  search(query: string): Promise<Content[]> {
    return this.http.request<Content[]>(
      `${API_ROUTES.catalogSearch}?q=${encodeURIComponent(query)}`,
      "GET"
    );
  }

  filterByGenre(genreId: string): Promise<Content[]> {
    return this.http.request<Content[]>(
      `${API_ROUTES.catalog}?genreId=${encodeURIComponent(genreId)}`,
      "GET"
    );
  }
}
