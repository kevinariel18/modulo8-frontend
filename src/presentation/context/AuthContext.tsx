import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { LoginUser } from "@/application/use-cases/LoginUser";
import { RegisterUser } from "@/application/use-cases/RegisterUser";
import { LogoutUser } from "@/application/use-cases/LogoutUser";
import { UpgradeToPremium } from "@/application/use-cases/UpgradeToPremium";
import type { LoginCredentials, RegisterData, User } from "@/domain/entities/User";
import { authRepository, userRepository } from "@/infrastructure/container";
import { STORAGE_KEYS } from "@/config/constants";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => Promise<void>;
  upgradeToPremium: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.user);
    const token = localStorage.getItem(STORAGE_KEYS.token);
    if (storedUser && token) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({ ...parsed, createdAt: new Date(parsed.createdAt) });
      } catch {
        localStorage.removeItem(STORAGE_KEYS.user);
        localStorage.removeItem(STORAGE_KEYS.token);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setError(null);
    setIsLoading(true);
    try {
      const auth = await new LoginUser(authRepository).execute(credentials);
      setUser(auth.user);
      return auth.user;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al iniciar sesión";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setError(null);
    setIsLoading(true);
    try {
      const auth = await new RegisterUser(authRepository).execute(data);
      setUser(auth.user);
      return auth.user;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al registrarse";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setError(null);
    try {
      await new LogoutUser(authRepository).execute();
      setUser(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al cerrar sesión";
      setError(msg);
      throw err;
    }
  }, []);

  const upgradeToPremium = useCallback(async () => {
    if (!user) throw new Error("No hay usuario autenticado");
    setError(null);
    try {
      const updated = await new UpgradeToPremium(userRepository).execute(user.id);
      setUser(updated); // actualiza el estado global — todos los componentes se re-renderizan
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al actualizar a premium";
      setError(msg);
      throw err;
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, error, isAuthenticated: !!user, login, register, logout, upgradeToPremium }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
