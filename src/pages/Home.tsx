import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
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