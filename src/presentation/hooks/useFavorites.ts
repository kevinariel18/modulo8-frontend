import { useCallback, useEffect, useState } from "react";
import { AddFavorite } from "@/application/use-cases/AddFavorite";
import { GetFavorites } from "@/application/use-cases/GetFavorites";
import { RemoveFavorite } from "@/application/use-cases/RemoveFavorite";
import type { Favorite } from "@/domain/entities/Favorite";
import { ApiFavoritesRepository } from "@/infrastructure/adapters/ApiFavoritesRepository";
import { HttpClient } from "@/infrastructure/api/httpClient";

function makeRepo() {
  return new ApiFavoritesRepository(new HttpClient());
}

export function useFavorites(isPremium: boolean) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await new GetFavorites(makeRepo()).execute();
      setFavorites(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addFavorite = useCallback(
    async (contentId: string) => {
      setError(null);
      try {
        const fav = await new AddFavorite(makeRepo()).execute(contentId, isPremium);
        setFavorites((prev) => [...prev, fav]);
      } catch (e) {
        setError((e as Error).message);
      }
    },
    [isPremium]
  );

  const removeFavorite = useCallback(async (favoriteId: string) => {
    setError(null);
    try {
      await new RemoveFavorite(makeRepo()).execute(favoriteId);
      setFavorites((prev) => prev.filter((f) => f.id !== favoriteId));
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { favorites, loading, error, addFavorite, removeFavorite };
}
