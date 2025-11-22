import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingBag, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { showError, showSuccess } from '@/utils/toast';

const Header = () => {
  const { session, supabase } = useAuth();
  const navigate = useNavigate();

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
    <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-7 w-7 text-primary" />
              <span className="font-bold text-xl">ShopSphere</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-md">
              <Link to="/" className="font-medium text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/products" className="font-medium text-muted-foreground hover:text-primary transition-colors">Products</Link>
              <Link to="/favorites" className="font-medium text-muted-foreground hover:text-primary transition-colors">Favorites</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-10 w-48 lg:w-72 h-11 rounded-full" />
            </div>
            {session ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/dashboard">
                    <LayoutDashboard className="h-6 w-6" />
                  </Link>
                </Button>
                <Button onClick={handleSignOut} size="lg">Sign Out</Button>
              </div>
            ) : (
              <Button asChild size="lg">
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