'use client';

import * as React from 'react';
import { getProducts } from '@/services/product.service';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { addToCart } from '@/services/cart.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const ShopPage = () => {
  const [products, setProducts] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [filters, setFilters] = React.useState({ category: '', minPrice: 0, maxPrice: 1000 });
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = async (product: any) => {
    // First, fetch the default variant for the product
    const { data: variant, error: variantError } = await supabase
      .from('product_variants')
      .select('id')
      .eq('product_id', product.id)
      .limit(1)
      .single();

    if (variantError || !variant) {
      toast.error('This product is out of stock.');
      return;
    }

    if (!user) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingProduct = cart.find((item: any) => item.variant_id === variant.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...product, variant_id: variant.id, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      toast.success('Item added to cart!');
      return;
    }


    if (variantError || !variant) {
      toast.error('This product is out of stock.');
      return;
    }

    try {
      await addToCart(user.id, variant.id, 1);
      toast.success('Item added to cart!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(filters);
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1">
          <h2 className="text-2xl font-bold mb-4">Filters</h2>
          {/* ... filter controls ... */}
        </div>
        <div className="col-span-3">
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading
              ? [...Array(9)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                ))
              : products.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-4">
                      {product.image_url && <img src={product.image_url} alt={product.name} className="h-48 w-full object-cover mb-4" />}
                      <h3 className="font-bold">{product.name}</h3>
                      <p className="text-muted-foreground">${product.price || 'N/A'}</p>
                      <Button
                        className="mt-4 w-full"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
