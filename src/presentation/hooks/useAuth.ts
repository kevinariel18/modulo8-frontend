import { useCallback, useState } from "react";
import { LoginUser } from "@/application/use-cases/LoginUser";
import type { LoginCredentials, User } from "@/domain/entities/User";
import { ApiAuthRepository } from "@/infrastructure/adapters/ApiAuthRepository";
import { HttpClient } from "@/infrastructure/api/httpClient";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const httpClient = new HttpClient();
    const repository = new ApiAuthRepository(httpClient);
    const loginUser = new LoginUser(repository);
    const result = await loginUser.execute(credentials);
    setUser(result);
    return result;
  }, []);

  return { user, login };
}
