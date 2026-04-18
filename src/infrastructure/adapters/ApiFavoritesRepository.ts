import type { Favorite } from "@/domain/entities/Favorite";
import type { FavoritesRepository } from "@/domain/ports/FavoritesRepository";
import { API_ROUTES } from "@/config/constants";
import { HttpClient } from "@/infrastructure/api/httpClient";

// Estructura real del backend
interface BackendFavorito {
  id: number;
  contenido: {
    id: number;
    titulo: string;
    descripcion?: string;
    clasificacion: string;
    duracion?: number;
    genero: {
      id: number;
      nombre: string;
    };
  };
  agregadoEn: string;
}

interface BackendResponse {
  message: string;
  data: BackendFavorito[];
}

interface BackendAddResponse {
  message: string;
  data: BackendFavorito;
}

function mapFavorito(f: BackendFavorito): Favorite {
  return {
    id: String(f.id),
    contentId: String(f.contenido.id),
    content: {
      id: String(f.contenido.id),
      title: f.contenido.titulo,
      description: f.contenido.descripcion ?? "",
      imageUrl: "",
      genre: {
        id: String(f.contenido.genero.id),
        name: f.contenido.genero.nombre,
      },
    },
  };
}

export class ApiFavoritesRepository implements FavoritesRepository {
  constructor(private readonly http: HttpClient) {}

  async getAll(): Promise<Favorite[]> {
    const response = await this.http.get<BackendResponse>(API_ROUTES.favorites);
    return response.data.map(mapFavorito);
  }

  async add(contentId: string): Promise<Favorite> {
    const response = await this.http.post<BackendAddResponse>(
      API_ROUTES.favorites,
      { contenidoId: Number(contentId) } // el backend espera contenidoId numérico
    );
    return mapFavorito(response.data);
  }

  async remove(favoriteId: string): Promise<void> {
    await this.http.delete<void>(`${API_ROUTES.favorites}/${favoriteId}`);
  }
}
