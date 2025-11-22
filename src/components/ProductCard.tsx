import React from 'react';
import { Product } from "@/types/product";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { session } = useAuth();
  const { favoriteProductIds, toggleFavorite, isMutating } = useFavorites();
  const isFavorited = favoriteProductIds.includes(product.id);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/placeholder.svg';
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <Link to={`/products/${product.id}`} className="group">
      <Card className="w-full h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-2">
        <CardHeader className="p-0 relative">
          {session && (
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 z-10 rounded-full bg-background/60 hover:bg-background/80"
              onClick={handleFavoriteClick}
              disabled={isMutating}
            >
              <Heart className={cn("w-5 h-5", isFavorited ? "text-red-500 fill-red-500" : "text-muted-foreground")} />
            </Button>
          )}
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image_url || '/placeholder.svg'}
              alt={product.name}
              className="object-cover w-full h-full"
              onError={handleImageError}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 pt-0">
          <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
          <Button size="sm" onClick={(e) => e.preventDefault()}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;