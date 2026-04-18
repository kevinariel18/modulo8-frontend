import type { LoginCredentials, User } from "@/domain/entities/User";
import type { AuthRepository } from "@/domain/ports/AuthRepository";
import { API_ROUTES } from "@/config/constants";
import { HttpClient } from "@/infrastructure/api/httpClient";

export class ApiAuthRepository implements AuthRepository {
  constructor(private readonly http: HttpClient) {}

  async login(credentials: LoginCredentials): Promise<User> {
    void this.http;
    void API_ROUTES.login;
    void credentials;
    return Promise.resolve({ id: "", email: "", displayName: "" });
  }
}
