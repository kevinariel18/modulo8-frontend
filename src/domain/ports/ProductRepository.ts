import type { Product } from "@/domain/entities/Product";

export interface ProductRepository {
  findAll(): Promise<Product[]>;
}
