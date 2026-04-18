import type { Content } from "@/domain/entities/Content";
import type { CatalogRepository } from "@/domain/ports/CatalogRepository";
import { API_ROUTES } from "@/config/constants";
import { HttpClient } from "@/infrastructure/api/httpClient";

// Estructura real del backend
interface BackendContenido {
  id: number;
  titulo: string;
  descripcion?: string;
  clasificacion: string;
  duracion?: number;
  advertencia?: string;
  genero: {
    id: number;
    nombre: string;
  };
}

interface BackendResponse {
  message: string;
  data: BackendContenido[];
}

function mapContenido(c: BackendContenido): Content {
  return {
    id: String(c.id),
    title: c.titulo,
    description: c.descripcion ?? "",
    imageUrl: "",
    genre: {
      id: String(c.genero.id),
      name: c.genero.nombre,
    },
  };
}

export class ApiCatalogRepository implements CatalogRepository {
  constructor(private readonly http: HttpClient) {}

  async findAll(): Promise<Content[]> {
    const response = await this.http.get<BackendResponse>(API_ROUTES.catalog);
    return response.data.map(mapContenido);
  }

  async search(query: string): Promise<Content[]> {
    const all = await this.findAll();
    const q = query.toLowerCase();
    return all.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.genre.name.toLowerCase().includes(q)
    );
  }

  async filterByGenre(genreId: string): Promise<Content[]> {
    const all = await this.findAll();
    return all.filter((c) => c.genre.id === genreId);
  }
}
