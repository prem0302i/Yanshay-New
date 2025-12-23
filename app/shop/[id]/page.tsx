'use client';

import * as React from 'react';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { addToCart } from '@/services/cart.service';
import { toast } from 'sonner';

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = React.useState<any>(null);
  const { user } = useAuth();

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`*,
            variants:product_variants (*)
          `)
          .eq('id', params.id)
          .single();

        if (error || !data) {
          return notFound();
        }

        setProduct(data);
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return notFound();
  }

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast.error('Please select a size.');
      return;
    }

    if (!user) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingProduct = cart.find((item: any) => item.variant_id === selectedVariant.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...product, ...selectedVariant, variant_id: selectedVariant.id, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      toast.success('Item added to cart!');
      return;
    }

    try {
      await addToCart(user.id, selectedVariant.id, 1);
      toast.success('Item added to cart!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.image_url && <img src={product.image_url} alt={product.name} className="w-full object-cover rounded-lg" />}
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-muted-foreground mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">₹{selectedVariant?.price || 'N/A'}</p>
          
          <div className="mb-4">
            <h3 className="font-bold mb-2">Size:</h3>
            <div className="flex gap-2">
              {product.variants.map((variant: any) => (
                <Button 
                  key={variant.id} 
                  variant={selectedVariant?.id === variant.id ? 'default' : 'outline'}
                  onClick={() => setSelectedVariant(variant)}
                >
                  {variant.size}
                </Button>
              ))}
            </div>
          </div>

          <Button size="lg" onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
