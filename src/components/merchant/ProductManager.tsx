import { Product } from '@/types/product';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface ProductManagerProps {
  products: Product[];
}

const ProductManager = ({ products }: ProductManagerProps) => {
  if (products.length === 0) {
    return <p>You haven't added any products yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <Card key={product.id} className="w-full h-full flex flex-col overflow-hidden">
          <CardHeader className="p-0">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
          </CardContent>
          <CardFooter className="flex justify-between items-center p-4 pt-0">
            <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
            <Button size="sm" variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductManager;