import type { User, UserId } from "@/domain/entities/User";
import type { UserRepository } from "@/domain/ports/UserRepository";

export class UpgradeToPremium {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: UserId): Promise<User> {
    const user = await this.userRepository.upgradeToPremium(userId);
    
    if (!user.isPremium) {
      throw new Error("No se pudo actualizar a premium");
    }
    
    return user;
  }
}
