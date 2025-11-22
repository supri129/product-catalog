import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingBag, LayoutDashboard, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { showError, showSuccess } from '@/utils/toast';
import React from 'react';

const Header = () => {
  const { session, supabase, profile } = useAuth();
  const { openSidebar } = useSidebar();
  const navigate = useNavigate();
  const isMerchant = profile?.role === 'merchant';

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError('Error signing out. Please try again.');
    } else {
      showSuccess('You have been signed out.');
      navigate('/');
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
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
              {!isMerchant && (
                <>
                  <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-primary">Products</Link>
                  <Link to="/favorites" className="text-sm font-medium text-muted-foreground hover:text-primary">Favorites</Link>
                </>
              )}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input name="search" placeholder="Search products..." className="pl-10 w-40 lg:w-64" />
            </form>
            {session ? (
              <div className="flex items-center space-x-2">
                {isMerchant ? (
                  <Button variant="ghost" size="icon" asChild>
                    <Link to="/dashboard">
                      <LayoutDashboard className="h-5 w-5" />
                    </Link>
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" className="relative" onClick={openSidebar}>
                    <User className="h-5 w-5" />
                  </Button>
                )}
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