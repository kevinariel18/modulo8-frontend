import type { Content, Genre } from "@/domain/entities/Content";
import type { CatalogRepository, CreateContentData } from "@/domain/ports/CatalogRepository";
import { API_ROUTES } from "@/config/constants";
import { HttpClient } from "@/infrastructure/api/httpClient";

interface BackendContenido {
  id: number;
  titulo: string;
  descripcion?: string;
  clasificacion: string;
  duracion?: number;
  advertencia?: string;
  genero: { id: number; nombre: string };
}

interface BackendGenero {
  id: number;
  nombre: string;
}

function mapContenido(c: BackendContenido): Content {
  return {
    id: String(c.id),
    title: c.titulo,
    description: c.descripcion ?? "",
    imageUrl: "",
    genre: { id: String(c.genero.id), name: c.genero.nombre },
  };
}

function mapGenero(g: BackendGenero): Genre {
  return { id: String(g.id), name: g.nombre };
}

export class ApiCatalogRepository implements CatalogRepository {
  constructor(private readonly http: HttpClient) {}

  async findAll(): Promise<Content[]> {
    const res = await this.http.get<{ data: BackendContenido[] }>(API_ROUTES.catalog);
    return res.data.map(mapContenido);
  }

  async search(query: string): Promise<Content[]> {
    const all = await this.findAll();
    const q = query.toLowerCase();
    return all.filter(
      (c) => c.title.toLowerCase().includes(q) || c.genre.name.toLowerCase().includes(q)
    );
  }

  async filterByGenre(genreId: string): Promise<Content[]> {
    if (!genreId) return this.findAll();
    const all = await this.findAll();
    return all.filter((c) => c.genre.id === genreId);
  }

  async create(data: CreateContentData): Promise<Content> {
    const res = await this.http.post<{ data: BackendContenido }>(API_ROUTES.catalog, data);
    return mapContenido(res.data);
  }

  async update(id: string, data: Partial<CreateContentData>): Promise<Content> {
    const res = await this.http.put<{ data: BackendContenido }>(`${API_ROUTES.catalog}/${id}`, data);
    return mapContenido(res.data);
  }

  async remove(id: string): Promise<void> {
    await this.http.delete(`${API_ROUTES.catalog}/${id}`);
  }

  async getGeneros(): Promise<Genre[]> {
    const res = await this.http.get<{ data: BackendGenero[] }>(API_ROUTES.generos);
    return res.data.map(mapGenero);
  }

  async createGenero(nombre: string): Promise<Genre> {
    const res = await this.http.post<{ data: BackendGenero }>(API_ROUTES.generos, { nombre });
    return mapGenero(res.data);
  }
}
