import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingBag, LayoutDashboard, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { showError, showSuccess } from '@/utils/toast';
import { useWishlist } from '@/contexts/WishlistContext';
import { useFavorites } from '@/hooks/useFavorites';

const Header = () => {
  const { session, supabase } = useAuth();
  const navigate = useNavigate();
  const { openWishlist } = useWishlist();
  const { favoriteProductIds } = useFavorites();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError('Error signing out. Please try again.');
    } else {
      showSuccess('You have been signed out.');
      navigate('/');
    }
  };

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">ShopSphere</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary">Home</Link>
              <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-primary">Products</Link>
              <Link to="/favorites" className="text-sm font-medium text-muted-foreground hover:text-primary">Favorites</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-10 w-40 lg:w-64" />
            </div>
            {session ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={openWishlist} className="relative">
                  <Heart className="h-5 w-5" />
                  {favoriteProductIds.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {favoriteProductIds.length}
                    </span>
                  )}
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/dashboard">
                    <LayoutDashboard className="h-5 w-5" />
                  </Link>
                </Button>
                <Button onClick={handleSignOut}>Sign Out</Button>
              </div>
            ) : (
              <Button asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;