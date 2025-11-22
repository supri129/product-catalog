import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import ProductManager from '@/components/merchant/ProductManager';
import { AddProductDialog, ProductFormData } from '@/components/merchant/AddProductDialog';
import { showSuccess, showError } from '@/utils/toast';

const fetchUserProducts = async (userId: string | undefined) => {
  if (!userId) return [];
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data as Product[];
};

const Dashboard = () => {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['userProducts', session?.user.id],
    queryFn: () => fetchUserProducts(session?.user.id),
    enabled: !!session?.user.id,
  });

  const addProductMutation = useMutation({
    mutationFn: async (newProduct: ProductFormData) => {
      if (!session?.user.id) {
        throw new Error("User not authenticated");
      }
      const { data, error } = await supabase
        .from('products')
        .insert([{ ...newProduct, user_id: session.user.id }])
        .select();
      
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      showSuccess("Product added successfully!");
      queryClient.invalidateQueries({ queryKey: ['userProducts', session?.user.id] });
      setIsAddDialogOpen(false);
    },
    onError: (err) => {
      showError(err.message);
    },
  });

  const handleAddProduct = (data: ProductFormData) => {
    addProductMutation.mutate(data);
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Merchant Dashboard
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Manage your product listings.
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </header>
      
      {isLoading && <p>Loading your products...</p>}
      {error && <p className="text-destructive">Error loading products: {error.message}</p>}
      {products && <ProductManager products={products} />}

      <AddProductDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddProduct}
        isSubmitting={addProductMutation.isPending}
      />
    </div>
  );
};

export default Dashboard;