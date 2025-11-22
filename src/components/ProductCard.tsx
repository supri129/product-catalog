import { Product } from "@/types/product";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Pencil, Trash2 } from "lucide-react";
import { Role } from "@/types/roles";

interface ProductCardProps {
  product: Product;
  role: Role;
}

const ProductCard = ({ product, role }: ProductCardProps) => {
  return (
    <Card className="w-full h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
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
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
        {role === 'visitor' ? (
          <Button size="sm">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button size="sm" variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;