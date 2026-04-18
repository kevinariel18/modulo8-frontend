import type { LoginCredentials, User } from "@/domain/entities/User";

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<User>;
}
