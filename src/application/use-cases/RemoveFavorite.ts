import type { FavoritesRepository } from "@/domain/ports/FavoritesRepository";

export class RemoveFavorite {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  async execute(favoriteId: string): Promise<void> {
    return this.favoritesRepository.remove(favoriteId);
  }
}
