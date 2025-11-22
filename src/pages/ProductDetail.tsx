import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';

const fetchProduct = async (productId: string | undefined) => {
  if (!productId) throw new Error("Product ID is required");
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  return data as Product;
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { session } = useAuth();
  const { favoriteProductIds, toggleFavorite, isMutating } = useFavorites();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading product details...</p>;
  if (error) return <p className="text-destructive">Error loading product: {error.message}</p>;
  if (!product) return <p>Product not found.</p>;

  const isFavorited = favoriteProductIds.includes(product.id);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/placeholder.svg';
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={product.image_url || '/placeholder.svg'}
          alt={product.name}
          className="object-cover w-full h-full"
          onError={handleImageError}
        />
      </div>
      <div className="flex flex-col justify-center">
        <Badge variant="outline" className="w-fit mb-2">{product.category}</Badge>
        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">{product.name}</h1>
        <p className="text-muted-foreground mb-6">{product.description}</p>
        <div className="flex items-center justify-between mb-8">
          <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button size="lg" className="flex-1">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
          {session && (
            <Button
              size="lg"
              variant="outline"
              onClick={() => toggleFavorite(product.id)}
              disabled={isMutating}
            >
              <Heart className={cn("w-5 h-5", isFavorited ? "text-red-500 fill-red-500" : "")} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;