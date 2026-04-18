import type { Auth, LoginCredentials, RegisterData } from "@/domain/entities/User";

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<Auth>;
  register(data: RegisterData): Promise<Auth>;
  logout(): Promise<void>;
  refreshToken(): Promise<Auth>;
}
