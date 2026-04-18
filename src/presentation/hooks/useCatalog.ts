import { useCallback, useEffect, useState } from "react";
import { FilterByGenre } from "@/application/use-cases/FilterByGenre";
import { GetCatalog } from "@/application/use-cases/GetCatalog";
import { SearchCatalog } from "@/application/use-cases/SearchCatalog";
import type { Content, Genre } from "@/domain/entities/Content";
import { ApiCatalogRepository } from "@/infrastructure/adapters/ApiCatalogRepository";
import { HttpClient } from "@/infrastructure/api/httpClient";

function makeRepo() {
  return new ApiCatalogRepository(new HttpClient());
}

export function useCatalog() {
  const [contents, setContents] = useState<Content[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await new GetCatalog(makeRepo()).execute();
      setContents(data);
      // Extraer géneros únicos del catálogo
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
      const data = await new SearchCatalog(makeRepo()).execute(query);
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
      const data = await new FilterByGenre(makeRepo()).execute(genreId);
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
