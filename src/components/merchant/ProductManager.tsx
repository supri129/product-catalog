import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types/product';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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

  if (products.length === 0) {
    return <p>You haven't added any products yet.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="w-full h-full flex flex-col overflow-hidden">
            <CardHeader className="p-0">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 pt-0">
              <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
              <Button size="sm" variant="destructive" onClick={() => handleDeleteClick(product.id)} disabled={deleteProductMutation.isPending && selectedProductId === product.id}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
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