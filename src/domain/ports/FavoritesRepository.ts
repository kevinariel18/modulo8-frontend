import type { Favorite } from "@/domain/entities/Favorite";

export interface FavoritesRepository {
  getAll(): Promise<Favorite[]>;
  add(contentId: string): Promise<Favorite>;
  remove(favoriteId: string): Promise<void>;
}
