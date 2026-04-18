import type { Favorite } from "@/domain/entities/Favorite";
import type { FavoritesRepository } from "@/domain/ports/FavoritesRepository";

const MAX_FAVORITES_FREE = 5;

export class AddFavorite {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  async execute(contentId: string, isPremium: boolean): Promise<Favorite> {
    if (!isPremium) {
      const current = await this.favoritesRepository.getAll();
      if (current.length >= MAX_FAVORITES_FREE) {
        throw new Error(
          "Los usuarios no premium solo pueden tener hasta 5 favoritos. ¡Hazte Premium para agregar más!"
        );
      }
    }
    return this.favoritesRepository.add(contentId);
  }
}
