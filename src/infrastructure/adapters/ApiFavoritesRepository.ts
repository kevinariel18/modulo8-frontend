import type { Favorite } from "@/domain/entities/Favorite";
import type { FavoritesRepository } from "@/domain/ports/FavoritesRepository";
import { API_ROUTES } from "@/config/constants";
import { HttpClient } from "@/infrastructure/api/httpClient";

export class ApiFavoritesRepository implements FavoritesRepository {
  constructor(private readonly http: HttpClient) {}

  getAll(): Promise<Favorite[]> {
    return this.http.request<Favorite[]>(API_ROUTES.favorites, "GET");
  }

  add(contentId: string): Promise<Favorite> {
    return this.http.request<Favorite>(API_ROUTES.favorites, "POST", { contentId });
  }

  remove(favoriteId: string): Promise<void> {
    return this.http.request<void>(`${API_ROUTES.favorites}/${favoriteId}`, "DELETE");
  }
}
