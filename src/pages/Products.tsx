import ProductGrid from "@/components/ProductGrid";

const Products = () => {
  return (
    <div>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Our Products
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Browse our curated collection of high-quality items.
        </p>
      </header>
      <ProductGrid />
    </div>
  );
};

export default Products;