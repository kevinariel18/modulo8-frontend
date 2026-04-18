import type { Product } from "@/domain/entities/Product";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  void products;
  return <ul />;
}
