import React from 'react';
import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { showSuccess } from '@/utils/toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/placeholder.svg';
  };

  const handleAddToCart = () => {
    // Placeholder for actual cart logic
    showSuccess(`${product.name} added to cart!`);
  };

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden border-none rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 group">
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image_url || '/placeholder.svg'}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={handleImageError}
            loading="lazy"
          />
        </div>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/70 backdrop-blur-sm rounded-full hover:bg-white">
          <Heart className="w-5 h-5 text-gray-600" />
        </Button>
      </div>
      <CardContent className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 flex-grow">{product.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
        <Button size="lg" onClick={handleAddToCart}>
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;