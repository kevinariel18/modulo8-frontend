import type { AuthRepository } from "@/domain/ports/AuthRepository";

export class LogoutUser {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<void> {
    await this.authRepository.logout();
  }
}
