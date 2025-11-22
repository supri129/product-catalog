import ProductGrid from "@/components/ProductGrid";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            Our Latest Products
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground animate-fade-in-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Discover our new collection. High-quality items curated just for you.
          </p>
        </header>
        <main>
          <ProductGrid />
        </main>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;