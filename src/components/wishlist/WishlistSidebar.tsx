import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useWishlist } from "@/contexts/WishlistContext";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types/product';
import { WishlistItem } from './WishlistItem';
import { Link } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";

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


export const WishlistSidebar = () => {
  const { isWishlistOpen, closeWishlist } = useWishlist();
  const { session } = useAuth();
  const userId = session?.user.id;

  const { data: favoriteProducts, isLoading, error } = useQuery({
    queryKey: ['favoriteProducts', userId],
    queryFn: () => fetchFavoriteProducts(userId),
    enabled: !!userId && isWishlistOpen,
  });

  return (
    <Sheet open={isWishlistOpen} onOpenChange={closeWishlist}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Wishlist</SheetTitle>
          <SheetDescription>
            Your favorite items, all in one place.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <p>Loading your wishlist...</p>
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-destructive">Error: {error.message}</p>
          </div>
        ) : favoriteProducts && favoriteProducts.length > 0 ? (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="flex flex-col divide-y">
                {favoriteProducts.map(product => (
                  <WishlistItem key={product.id} product={product} />
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="px-6 pt-6">
              <Button asChild className="w-full" onClick={closeWishlist}>
                <Link to="/favorites">View All Favorites</Link>
              </Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-lg font-semibold">Your wishlist is empty</p>
            <p className="text-sm text-muted-foreground">
              Click the heart on any product to save it here.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};