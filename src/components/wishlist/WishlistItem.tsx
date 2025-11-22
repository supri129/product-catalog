import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

interface WishlistItemProps {
  product: Product;
}

export const WishlistItem = ({ product }: WishlistItemProps) => {
  const { toggleFavorite, isMutating } = useFavorites();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/placeholder.svg';
  };

  return (
    <div className="flex items-center space-x-4 py-4">
      <img
        src={product.image_url || '/placeholder.svg'}
        alt={product.name}
        className="h-16 w-16 rounded-md object-cover"
        onError={handleImageError}
      />
      <div className="flex-1">
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => toggleFavorite(product.id)}
        disabled={isMutating}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};