import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { showSuccess, showError } from '@/utils/toast';

const fetchFavorites = async (userId: string | undefined) => {
  if (!userId) return [];
  const { data, error } = await supabase
    .from('favorites')
    .select('product_id')
    .eq('user_id', userId);
  if (error) throw new Error(error.message);
  return data.map(fav => fav.product_id);
};

export const useFavorites = () => {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const userId = session?.user.id;

  const { data: favoriteProductIds, isLoading } = useQuery({
    queryKey: ['favorites', userId],
    queryFn: () => fetchFavorites(userId),
    enabled: !!userId,
  });

  const addFavoriteMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (!userId) throw new Error('User not logged in');
      const { error } = await supabase.from('favorites').insert({ user_id: userId, product_id: productId });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', userId] });
      showSuccess('Added to favorites!');
    },
    onError: (err: Error) => {
      showError(err.message);
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (!userId) throw new Error('User not logged in');
      const { error } = await supabase.from('favorites').delete().match({ user_id: userId, product_id: productId });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', userId] });
      showSuccess('Removed from favorites!');
    },
    onError: (err: Error) => {
      showError(err.message);
    },
  });

  const toggleFavorite = (productId: string) => {
    if (favoriteProductIds?.includes(productId)) {
      removeFavoriteMutation.mutate(productId);
    } else {
      addFavoriteMutation.mutate(productId);
    }
  };

  return {
    favoriteProductIds: favoriteProductIds || [],
    isLoading,
    toggleFavorite,
    isMutating: addFavoriteMutation.isPending || removeFavoriteMutation.isPending,
  };
};