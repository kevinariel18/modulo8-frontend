import { useEffect, useState } from "react";
import { GetProducts } from "@/application/use-cases/GetProducts";
import type { Product } from "@/domain/entities/Product";
import { ApiProductRepository } from "@/infrastructure/adapters/ApiProductRepository";
import { httpClient } from "@/infrastructure/container";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const repository = new ApiProductRepository(httpClient);
    const getProducts = new GetProducts(repository);
    void getProducts.execute().then(setProducts);
  }, []);

  return { products };
}
