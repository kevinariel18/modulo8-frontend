import { env } from "@/config/env";
import { STORAGE_KEYS } from "@/config/constants";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface HttpError extends Error {
  status: number;
  data?: unknown;
}

export class HttpClient {
  private token: string | null = null;

  constructor(private readonly baseUrl: string = env.apiBaseUrl) {
    this.token = localStorage.getItem(STORAGE_KEYS.token);
  }

  setToken(token: string | null): void {
    this.token = token;
    if (token) {
      localStorage.setItem(STORAGE_KEYS.token, token);
    } else {
      localStorage.removeItem(STORAGE_KEYS.token);
    }
  }

  getToken(): string | null {
    return this.token;
  }

  async request<T>(path: string, method: HttpMethod, body?: unknown): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      method,
      headers,
    };

    if (body && method !== "GET") {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${this.baseUrl}${path}`, config);

      if (!response.ok) {
        const error = new Error(`HTTP Error: ${response.status}`) as HttpError;
        error.status = response.status;
        try {
          error.data = await response.json();
        } catch {
          error.data = await response.text();
        }
        throw error;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error && "status" in error) {
        throw error;
      }
      throw new Error("Error de conexión con el servidor");
    }
  }

  async get<T>(path: string): Promise<T> {
    return this.request<T>(path, "GET");
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>(path, "POST", body);
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>(path, "PUT", body);
  }

  async patch<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>(path, "PATCH", body);
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>(path, "DELETE");
  }
}
