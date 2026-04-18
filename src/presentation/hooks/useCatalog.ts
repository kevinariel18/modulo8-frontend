import { useCallback, useEffect, useState } from "react";
import type { Content, Genre } from "@/domain/entities/Content";
import type { CreateContentData } from "@/domain/ports/CatalogRepository";
import { catalogRepository } from "@/infrastructure/container";

export function useCatalog() {
  const [contents, setContents] = useState<Content[]>([]);
  const [allContents, setAllContents] = useState<Content[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadGeneros = useCallback(async () => {
    try {
      const data = await catalogRepository.getGeneros();
      setGenres(data);
    } catch {
      // géneros no críticos
    }
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [data, genreData] = await Promise.all([
        catalogRepository.findAll(),
        catalogRepository.getGeneros(),
      ]);
      setContents(data);
      setAllContents(data);
      setGenres(genreData);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback((query: string) => {
    if (!query.trim()) {
      setContents(allContents);
      return;
    }
    const q = query.toLowerCase();
    setContents(
      allContents.filter(
        (c) => c.title.toLowerCase().includes(q) || c.genre.name.toLowerCase().includes(q)
      )
    );
  }, [allContents]);

  const filterByGenre = useCallback((genreId: string) => {
    if (!genreId) {
      setContents(allContents);
      return;
    }
    setContents(allContents.filter((c) => c.genre.id === genreId));
  }, [allContents]);

  const createContent = useCallback(async (data: CreateContentData) => {
    const created = await catalogRepository.create(data);
    setAllContents((prev) => [...prev, created]);
    setContents((prev) => [...prev, created]);
    return created;
  }, []);

  const updateContent = useCallback(async (id: string, data: Partial<CreateContentData>) => {
    const updated = await catalogRepository.update(id, data);
    setAllContents((prev) => prev.map((c) => (c.id === id ? updated : c)));
    setContents((prev) => prev.map((c) => (c.id === id ? updated : c)));
    return updated;
  }, []);

  const deleteContent = useCallback(async (id: string) => {
    await catalogRepository.remove(id);
    setAllContents((prev) => prev.filter((c) => c.id !== id));
    setContents((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const createGenero = useCallback(async (nombre: string) => {
    const genre = await catalogRepository.createGenero(nombre);
    setGenres((prev) => [...prev, genre]);
    return genre;
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    contents,
    genres,
    loading,
    error,
    search,
    filterByGenre,
    createContent,
    updateContent,
    deleteContent,
    createGenero,
    reload: load,
    loadGeneros,
  };
}
