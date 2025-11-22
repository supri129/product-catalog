import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types/product';
import ProductGrid from '@/components/ProductGrid';

const fetchFavoriteProducts = async (userId: string | undefined): Promise<Product[]> => {
  if (!userId) return [];

  const { data: favorites, error: favoritesError } = await supabase
    .from('favorites')
    .select('product_id')
    .eq('user_id', userId);

  if (favoritesError) {
    throw new Error(favoritesError.message);
  }

  if (!favorites || favorites.length === 0) {
    return [];
  }

  const productIds = favorites.map(f => f.product_id);

  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('*')
    .in('id', productIds);

  if (productsError) {
    throw new Error(productsError.message);
  }

  return products as Product[];
};

const Favorites = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  const { data: favoriteProducts, isLoading, error } = useQuery({
    queryKey: ['favoriteProducts', userId],
    queryFn: () => fetchFavoriteProducts(userId),
    enabled: !!userId,
  });

  return (
    <div>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Your Favorites
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Products you've saved for later.
        </p>
      </header>
      
      {isLoading && <p>Loading your favorites...</p>}
      {error && <p className="text-destructive">Error loading favorites: {error.message}</p>}
      
      {favoriteProducts && favoriteProducts.length > 0 && (
        <ProductGrid products={favoriteProducts} />
      )}

      {favoriteProducts && favoriteProducts.length === 0 && (
        <div className="text-center text-muted-foreground mt-8">
          <p>You haven't favorited any items yet.</p>
          <p className="text-sm">Click the heart icon on a product to save it here.</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;