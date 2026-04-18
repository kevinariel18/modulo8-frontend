import type { User, UserId } from "@/domain/entities/User";

export interface UserRepository {
  getById(id: UserId): Promise<User>;
  upgradeToPremium(id: UserId): Promise<User>;
  updateProfile(id: UserId, data: Partial<User>): Promise<User>;
}
