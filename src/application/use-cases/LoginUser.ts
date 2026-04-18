import type { Auth, LoginCredentials } from "@/domain/entities/User";
import type { AuthRepository } from "@/domain/ports/AuthRepository";

export class LoginUser {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<Auth> {
    if (!credentials.email || !credentials.password) {
      throw new Error("Email y contraseña son requeridos");
    }
    return this.authRepository.login(credentials);
  }
}
