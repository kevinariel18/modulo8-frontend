import type { User, UserId } from "@/domain/entities/User";
import type { UserRepository } from "@/domain/ports/UserRepository";
import { API_ROUTES, STORAGE_KEYS } from "@/config/constants";
import { HttpClient } from "@/infrastructure/api/httpClient";

interface UserResponse {
  id: string;
  email: string;
  displayName: string;
  isPremium: boolean;
  createdAt: string;
}

export class ApiUserRepository implements UserRepository {
  constructor(private readonly http: HttpClient) {}

  async getById(id: UserId): Promise<User> {
    const response = await this.http.get<UserResponse>(API_ROUTES.user(id));
    return this.mapUserResponse(response);
  }

  async upgradeToPremium(id: UserId): Promise<User> {
    const response = await this.http.post<UserResponse>(
      API_ROUTES.upgradePremium(id)
    );
    const user = this.mapUserResponse(response);
    
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    
    return user;
  }

  async updateProfile(id: UserId, data: Partial<User>): Promise<User> {
    const response = await this.http.patch<UserResponse>(
      API_ROUTES.user(id),
      data
    );
    const user = this.mapUserResponse(response);
    
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    
    return user;
  }

  private mapUserResponse(response: UserResponse): User {
    return {
      ...response,
      createdAt: new Date(response.createdAt),
    };
  }
}
