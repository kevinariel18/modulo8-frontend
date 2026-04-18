import { env } from "@/config/env";

export type HttpMethod = "GET" | "POST";

export class HttpClient {
  constructor(private readonly baseUrl: string = env.apiBaseUrl) {}

  async request<T>(path: string, method: HttpMethod, body?: unknown): Promise<T> {
    void path;
    void method;
    void body;
    void this.baseUrl;
    return Promise.resolve({} as T);
  }
}
