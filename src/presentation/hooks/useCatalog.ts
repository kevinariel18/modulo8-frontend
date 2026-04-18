import { useCallback, useEffect, useState } from "react";
import { FilterByGenre } from "@/application/use-cases/FilterByGenre";
import { GetCatalog } from "@/application/use-cases/GetCatalog";
import { SearchCatalog } from "@/application/use-cases/SearchCatalog";
import type { Content, Genre } from "@/domain/entities/Content";
import { catalogRepository } from "@/infrastructure/container";

export function useCatalog() {
  const [contents, setContents] = useState<Content[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await new GetCatalog(catalogRepository).execute();
      setContents(data);
      const unique = Array.from(
        new Map(data.map((c) => [c.genre.id, c.genre])).values()
      );
      setGenres(unique);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await new SearchCatalog(catalogRepository).execute(query);
      setContents(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterByGenre = useCallback(async (genreId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await new FilterByGenre(catalogRepository).execute(genreId);
      setContents(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { contents, genres, loading, error, search, filterByGenre, reload: load };
}
