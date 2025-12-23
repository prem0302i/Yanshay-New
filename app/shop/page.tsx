'use client';

import * as React from 'react';
import { getProducts } from '@/services/product.service';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const ShopPage = () => {
  const [products, setProducts] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [filters, setFilters] = React.useState({ category: '', minPrice: 0, maxPrice: 1000 });

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
                  <Link href={`/shop/${product.id}`} key={product.id}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        {product.image_url && <img src={product.image_url} alt={product.name} className="h-48 w-full object-cover mb-4" />}
                        <h3 className="font-bold">{product.name}</h3>
                        {/* Price display can be updated here later based on variants */}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
