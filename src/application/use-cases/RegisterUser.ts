import type { Auth, RegisterData } from "@/domain/entities/User";
import type { AuthRepository } from "@/domain/ports/AuthRepository";

export class RegisterUser {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(data: RegisterData): Promise<Auth> {
    if (!data.email || !data.password || !data.displayName) {
      throw new Error("Todos los campos son requeridos");
    }
    
    if (data.password.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres");
    }
    
    return this.authRepository.register(data);
  }
}
