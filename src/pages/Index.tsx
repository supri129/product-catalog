import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { User, Store } from "lucide-react";
import { Role } from "@/types/roles";

const Index = () => {
  const [role, setRole] = useState<Role>("visitor");

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

        <div className="flex justify-center mb-8">
          <ToggleGroup
            type="single"
            value={role}
            onValueChange={(value: Role) => {
              if (value) setRole(value);
            }}
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            <ToggleGroupItem value="visitor" aria-label="Toggle visitor view">
              <User className="h-4 w-4 mr-2" />
              Visitor View
            </ToggleGroupItem>
            <ToggleGroupItem value="merchant" aria-label="Toggle merchant view">
              <Store className="h-4 w-4 mr-2" />
              Merchant View
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <main>
          <ProductGrid role={role} />
        </main>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;