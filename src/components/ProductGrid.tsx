import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;