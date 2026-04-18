import type { Auth, LoginCredentials, RegisterData } from "@/domain/entities/User";
import type { AuthRepository } from "@/domain/ports/AuthRepository";
import { API_ROUTES, STORAGE_KEYS } from "@/config/constants";
import { HttpClient } from "@/infrastructure/api/httpClient";

interface AuthResponse {
  user: {
    id: string;
    email: string;
    displayName: string;
    isPremium: boolean;
    createdAt: string;
  };
  token: string;
}

export class ApiAuthRepository implements AuthRepository {
  constructor(private readonly http: HttpClient) {}

  async login(credentials: LoginCredentials): Promise<Auth> {
    const response = await this.http.post<AuthResponse>(
      API_ROUTES.login,
      credentials
    );

    const auth = this.mapAuthResponse(response);
    this.saveAuth(auth);
    return auth;
  }

  async register(data: RegisterData): Promise<Auth> {
    const response = await this.http.post<AuthResponse>(
      API_ROUTES.register,
      data
    );

    const auth = this.mapAuthResponse(response);
    this.saveAuth(auth);
    return auth;
  }

  async logout(): Promise<void> {
    try {
      await this.http.post(API_ROUTES.logout);
    } finally {
      this.clearAuth();
    }
  }

  async refreshToken(): Promise<Auth> {
    const response = await this.http.post<AuthResponse>(API_ROUTES.refreshToken);
    const auth = this.mapAuthResponse(response);
    this.saveAuth(auth);
    return auth;
  }

  private mapAuthResponse(response: AuthResponse): Auth {
    return {
      user: {
        ...response.user,
        createdAt: new Date(response.user.createdAt),
      },
      token: response.token,
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
