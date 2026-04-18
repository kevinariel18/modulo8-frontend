import type { Product } from "@/domain/entities/Product";
import type { ProductRepository } from "@/domain/ports/ProductRepository";

export class GetProducts {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
