import type { Auth, LoginCredentials, RegisterData } from "@/domain/entities/User";
import type { AuthRepository } from "@/domain/ports/AuthRepository";
import { API_ROUTES, STORAGE_KEYS } from "@/config/constants";
import { HttpClient } from "@/infrastructure/api/httpClient";

// Estructura real que devuelve el backend en login
interface BackendLoginResponse {
  message: string;
  data: {
    usuario: {
      id: number;
      email: string;
      rol: string;
    };
    token: string;
  };
}

// Estructura real que devuelve el backend en register
interface BackendRegisterResponse {
  message: string;
  data: {
    id: number;
    email: string;
    rol: string;
  };
}

export class ApiAuthRepository implements AuthRepository {
  constructor(private readonly http: HttpClient) {}

  async login(credentials: LoginCredentials): Promise<Auth> {
    const response = await this.http.post<BackendLoginResponse>(
      API_ROUTES.login,
      credentials
    );

    const auth = this.mapLoginResponse(response);
    this.saveAuth(auth);
    return auth;
  }

  async register(data: RegisterData): Promise<Auth> {
    // El backend solo registra, no devuelve token — hacemos login automático
    await this.http.post<BackendRegisterResponse>(API_ROUTES.register, {
      email: data.email,
      password: data.password,
      rol: "CLIENTE",
    });

    return this.login({ email: data.email, password: data.password });
  }

  async logout(): Promise<void> {
    try {
      await this.http.post(API_ROUTES.logout);
    } finally {
      this.clearAuth();
    }
  }

  async refreshToken(): Promise<Auth> {
    // El backend no tiene refresh token — devolvemos el auth guardado
    const stored = localStorage.getItem(STORAGE_KEYS.user);
    const token = this.http.getToken();
    if (!stored || !token) throw new Error("No hay sesión activa");
    return { user: JSON.parse(stored), token };
  }

  private mapLoginResponse(response: BackendLoginResponse): Auth {
    const { usuario, token } = response.data;
    return {
      user: {
        id: String(usuario.id),
        email: usuario.email,
        displayName: usuario.email.split("@")[0],
        isPremium: usuario.rol === "PREMIUM",
        createdAt: new Date(),
      },
      token,
    };
  }

  private saveAuth(auth: Auth): void {
    this.http.setToken(auth.token);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(auth.user));
  }

  private clearAuth(): void {
    this.http.setToken(null);
    localStorage.removeItem(STORAGE_KEYS.user);
  }
}
