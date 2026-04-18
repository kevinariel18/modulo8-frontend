import { useCallback, useEffect, useState } from "react";
import { LoginUser } from "@/application/use-cases/LoginUser";
import { RegisterUser } from "@/application/use-cases/RegisterUser";
import { LogoutUser } from "@/application/use-cases/LogoutUser";
import { UpgradeToPremium } from "@/application/use-cases/UpgradeToPremium";
import type { LoginCredentials, RegisterData, User } from "@/domain/entities/User";
import { authRepository, userRepository } from "@/infrastructure/container";
import { STORAGE_KEYS } from "@/config/constants";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.user);
    const token = localStorage.getItem(STORAGE_KEYS.token);
    
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          ...parsedUser,
          createdAt: new Date(parsedUser.createdAt),
        });
      } catch {
        localStorage.removeItem(STORAGE_KEYS.user);
        localStorage.removeItem(STORAGE_KEYS.token);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setError(null);
      setIsLoading(true);
      const loginUser = new LoginUser(authRepository);
      const auth = await loginUser.execute(credentials);
      setUser(auth.user);
      return auth.user;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al iniciar sesión";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      setError(null);
      setIsLoading(true);
      const registerUser = new RegisterUser(authRepository);
      const auth = await registerUser.execute(data);
      setUser(auth.user);
      return auth.user;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al registrarse";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setError(null);
      const logoutUser = new LogoutUser(authRepository);
      await logoutUser.execute();
      setUser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al cerrar sesión";
      setError(message);
      throw err;
    }
  }, []);

  const upgradeToPremium = useCallback(async () => {
    if (!user) {
      throw new Error("No hay usuario autenticado");
    }

    try {
      setError(null);
      setIsLoading(true);
      const upgrade = new UpgradeToPremium(userRepository);
      const updatedUser = await upgrade.execute(user.id);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al actualizar a premium";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    upgradeToPremium,
  };
}
