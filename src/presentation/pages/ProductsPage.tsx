import { ProductList } from "@/presentation/components/ProductList";
import { useProducts } from "@/presentation/hooks/useProducts";

export function ProductsPage() {
  const { products } = useProducts();
  return (
    <section>
      <h1>Productos</h1>
      <ProductList products={products} />
    </section>
  );
}
