import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import ProductManager from '@/components/merchant/ProductManager';
import { AddProductDialog, ProductFormData as AddProductFormData } from '@/components/merchant/AddProductDialog';
import { EditProductDialog, ProductFormData as EditProductFormData } from '@/components/merchant/EditProductDialog';
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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['userProducts', session?.user.id],
    queryFn: () => fetchUserProducts(session?.user.id),
    enabled: !!session?.user.id,
  });

  const addProductMutation = useMutation({
    mutationFn: async (newProduct: AddProductFormData) => {
      if (!session?.user.id) throw new Error("User not authenticated");
      const { data, error } = await supabase
        .from('products')
        .insert([{ ...newProduct, user_id: session.user.id }])
        .select();
      if (error) throw new Error(error.message);
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

  const editProductMutation = useMutation({
    mutationFn: async (updatedProduct: EditProductFormData) => {
      if (!selectedProduct) throw new Error("No product selected for editing");
      const { data, error } = await supabase
        .from('products')
        .update(updatedProduct)
        .eq('id', selectedProduct.id)
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      showSuccess("Product updated successfully!");
      queryClient.invalidateQueries({ queryKey: ['userProducts', session?.user.id] });
      setIsEditDialogOpen(false);
      setSelectedProduct(null);
    },
    onError: (err) => {
      showError(err.message);
    },
  });

  const handleAddProduct = (data: AddProductFormData) => {
    addProductMutation.mutate(data);
  };

  const handleEditProduct = (data: EditProductFormData) => {
    editProductMutation.mutate(data);
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
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
      {products && <ProductManager products={products} onEdit={handleEditClick} />}

      <AddProductDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddProduct}
        isSubmitting={addProductMutation.isPending}
      />
      <EditProductDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditProduct}
        isSubmitting={editProductMutation.isPending}
        product={selectedProduct}
      />
    </div>
  );
};

export default Dashboard;