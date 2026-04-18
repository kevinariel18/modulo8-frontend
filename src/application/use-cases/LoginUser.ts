import type { LoginCredentials, User } from "@/domain/entities/User";
import type { AuthRepository } from "@/domain/ports/AuthRepository";

export class LoginUser {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<User> {
    return this.authRepository.login(credentials);
  }
}
