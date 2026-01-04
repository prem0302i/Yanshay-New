'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchProducts } from '@/services/product.service';
import Link from 'next/link';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (query) {
        setLoading(true);
        const results = await searchProducts(query);
        setProducts(results);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="border rounded-lg p-4 text-center">
              <img src={product.image_url} alt={product.name} className="bg-muted h-48 mb-4 w-full object-cover" />
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-muted-foreground">₹{product.variants[0]?.price}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p>No products found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchPage;
