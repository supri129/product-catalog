import ProductGrid from "@/components/ProductGrid";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";

const fetchProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data as Product[];
};

const Products = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return (
    <div>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Our Products
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Browse our curated collection of high-quality items.
        </p>
      </header>
      {isLoading && <p>Loading products...</p>}
      {error && <p className="text-destructive">Error loading products: {error.message}</p>}
      {products && <ProductGrid products={products} />}
    </div>
  );
};

export default Products;