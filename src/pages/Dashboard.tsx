import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import ProductManager from '@/components/merchant/ProductManager';

const fetchUserProducts = async (userId: string | undefined) => {
  if (!userId) return [];
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }
  return data as Product[];
};

const Dashboard = () => {
  const { session } = useAuth();
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['userProducts', session?.user.id],
    queryFn: () => fetchUserProducts(session?.user.id),
    enabled: !!session?.user.id,
  });

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
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </header>
      
      {isLoading && <p>Loading your products...</p>}
      {error && <p className="text-destructive">Error loading products: {error.message}</p>}
      {products && <ProductManager products={products} />}
    </div>
  );
};

export default Dashboard;