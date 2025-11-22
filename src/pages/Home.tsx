import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const Home = () => {
  return (
    <div className="text-center flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards' }}>
        <ShoppingBag className="h-24 w-24 text-primary mx-auto" />
        <h1 className="mt-8 text-5xl font-extrabold tracking-tight lg:text-7xl">
          ShopSphere
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
          Discover our new collection. High-quality items curated just for you.
        </p>
      </div>
      <div 
        className="mt-10 animate-fade-in-up opacity-0"
        style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
      >
        <Button asChild size="lg" className="text-lg px-8 py-6">
          <Link to="/products">Shop Now</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;