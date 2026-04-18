import type { Product } from "@/domain/entities/Product";
import type { ProductRepository } from "@/domain/ports/ProductRepository";
import { API_ROUTES } from "@/config/constants";
import { HttpClient } from "@/infrastructure/api/httpClient";

export class ApiProductRepository implements ProductRepository {
  constructor(private readonly http: HttpClient) {}

  async findAll(): Promise<Product[]> {
    void this.http;
    void API_ROUTES.products;
    return [];
  }
}
