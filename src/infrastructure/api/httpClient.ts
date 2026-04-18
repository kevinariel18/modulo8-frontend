import { env } from "@/config/env";

export type HttpMethod = "GET" | "POST" | "DELETE" | "PATCH";

export class HttpClient {
  constructor(private readonly baseUrl: string = env.apiBaseUrl) {}

  async request<T>(path: string, method: HttpMethod, body?: unknown): Promise<T> {
    const token = localStorage.getItem("token");
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error((error as { message?: string }).message ?? "Error en la solicitud");
    }

    // 204 No Content
    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
  }
}
