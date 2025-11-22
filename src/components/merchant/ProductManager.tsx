import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types/product';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { DeleteProductAlert } from './DeleteProductAlert';
import { showSuccess, showError } from '@/utils/toast';

interface ProductManagerProps {
  products: Product[];
}

const ProductManager = ({ products }: ProductManagerProps) => {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const deleteProductMutation = useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      showSuccess("Product deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ['userProducts', session?.user.id] });
      setIsAlertOpen(false);
      setSelectedProductId(null);
    },
    onError: (err) => {
      showError(err.message);
    },
  });

  const handleDeleteClick = (productId: string) => {
    setSelectedProductId(productId);
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProductId) {
      deleteProductMutation.mutate(selectedProductId);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/placeholder.svg';
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold text-muted-foreground">No products yet!</h2>
        <p className="mt-2 text-muted-foreground">Click "Add Product" to get started.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
           <div
            key={product.id}
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
          >
            <Card className="w-full h-full flex flex-col overflow-hidden border-none rounded-lg shadow-md">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image_url || '/placeholder.svg'}
                  alt={product.name}
                  className="object-cover w-full h-full"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
              <CardContent className="p-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4 pt-0">
                <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
                <Button size="lg" variant="destructive" onClick={() => handleDeleteClick(product.id)} disabled={deleteProductMutation.isPending && selectedProductId === product.id}>
                  <Trash2 className="w-5 h-5 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <DeleteProductAlert
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        onConfirm={confirmDelete}
        isDeleting={deleteProductMutation.isPending}
      />
    </>
  );
};

export default ProductManager;