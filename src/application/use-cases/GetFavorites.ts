import type { Favorite } from "@/domain/entities/Favorite";
import type { FavoritesRepository } from "@/domain/ports/FavoritesRepository";

export class GetFavorites {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  async execute(): Promise<Favorite[]> {
    return this.favoritesRepository.getAll();
  }
}
