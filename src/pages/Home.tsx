import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { PlusCircle, ListOrdered } from 'lucide-react';

const Home = () => {
  const { profile } = useAuth();
  const isMerchant = profile?.role === 'merchant';

  if (isMerchant) {
    return (
      <div className="text-center">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            Merchant Home
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground animate-fade-in-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Welcome back! Manage your store and products from here.
          </p>
        </header>
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up opacity-0"
          style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
        >
          <Button asChild size="lg" className="flex items-center justify-center space-x-2">
            <Link to="/dashboard">
              <PlusCircle className="h-5 w-5" />
              <span>Add New Product</span>
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="flex items-center justify-center space-x-2">
            <Link to="/dashboard">
              <ListOrdered className="h-5 w-5" />
              <span>Manage My Products</span>
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards' }}>
          Welcome to ShopSphere
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground animate-fade-in-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          Discover our new collection. High-quality items curated just for you.
        </p>
      </header>
      <div 
        className="animate-fade-in-up opacity-0"
        style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
      >
        <Button asChild size="lg">
          <Link to="/products">Shop Now</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;