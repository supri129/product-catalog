import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';
import ProductGrid from '@/components/ProductGrid';

const searchProducts = async (query: string | null) => {
  if (!query) return [];
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`);
  
  if (error) {
    throw new Error(error.message);
  }
  return data as Product[];
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['productSearch', query],
    queryFn: () => searchProducts(query),
    enabled: !!query,
  });

  return (
    <div>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Search Results
        </h1>
        {query && <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Showing results for: <span className="font-semibold text-primary">"{query}"</span>
        </p>}
      </header>
      
      {isLoading && <p>Searching for products...</p>}
      {error && <p className="text-destructive">Error searching for products: {error.message}</p>}
      
      {!isLoading && !error && query && products && products.length > 0 && (
        <ProductGrid products={products} />
      )}

      {!isLoading && !error && query && products && products.length === 0 && (
        <div className="text-center text-muted-foreground mt-8">
          <p>No products found matching your search.</p>
          <p className="text-sm">Try searching for something else.</p>
        </div>
      )}

      {!query && (
        <div className="text-center text-muted-foreground mt-8">
            <p>Please enter a search term in the header to find products.</p>
        </div>
      )}
    </div>
  );
};

export default Search;