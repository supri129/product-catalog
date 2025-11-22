import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useSidebar } from '@/contexts/SidebarContext';
import { useFavorites } from '@/hooks/useFavorites';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, ShoppingCart, Heart, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const fetchFavoriteProducts = async (productIds: string[]): Promise<Product[]> => {
  if (productIds.length === 0) return [];
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('id', productIds);
  if (error) throw new Error(error.message);
  return data as Product[];
};

const WishlistTabContent = () => {
    const { favoriteProductIds, toggleFavorite, isMutating } = useFavorites();
    const { data: favoriteProducts, isLoading } = useQuery({
        queryKey: ['favoriteProductsDetails', favoriteProductIds],
        queryFn: () => fetchFavoriteProducts(favoriteProductIds),
        enabled: favoriteProductIds.length > 0,
    });

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto pr-6 -mr-6">
                {isLoading && <p>Loading...</p>}
                {!isLoading && (!favoriteProducts || favoriteProducts.length === 0) && (
                    <div className="text-center text-muted-foreground mt-8">
                    <p>Your wishlist is empty.</p>
                    <p className="text-sm">Add items by clicking the heart icon.</p>
                    </div>
                )}
                {favoriteProducts && favoriteProducts.length > 0 && (
                    <ul className="space-y-4">
                    {favoriteProducts.map((product) => (
                        <li key={product.id} className="flex items-center space-x-4">
                        <img src={product.image_url || '/placeholder.svg'} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                        <div className="flex-grow">
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-primary">${product.price.toFixed(2)}</p>
                        </div>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => toggleFavorite(product.id)}
                            disabled={isMutating}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                        </li>
                    ))}
                    </ul>
                )}
            </div>
            {favoriteProducts && favoriteProducts.length > 0 && (
                <SheetFooter className="mt-4">
                    <Button asChild className="w-full">
                    <Link to="/favorites">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        View Full Wishlist
                    </Link>
                    </Button>
                </SheetFooter>
            )}
        </div>
    )
}

const SettingsTabContent = () => {
    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Theme</p>
                <ThemeToggle />
            </div>
        </div>
    )
}

const VisitorSidebar = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  return (
    <Sheet open={isSidebarOpen} onOpenChange={(isOpen) => !isOpen && closeSidebar()}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>My Account</SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="wishlist" className="w-full flex-grow flex flex-col mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="wishlist"><Heart className="w-4 h-4 mr-2" />Wishlist</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2" />Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="wishlist" className="flex-grow mt-4">
            <WishlistTabContent />
          </TabsContent>
          <TabsContent value="settings" className="mt-4">
            <SettingsTabContent />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default VisitorSidebar;