'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const ProductPageClient = ({ product }: { product: any }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('You must be logged in to add items to your cart.');
      return;
    }

    const variantId = product.variants[0].id;

    // Check if the item is already in the cart
    const { data: existingItem, error: fetchError } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', user.id)
      .eq('variant_id', variantId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows found
      toast.error(fetchError.message);
      return;
    }

    if (existingItem) {
      // Update quantity
      const { error: updateError } = await supabase
        .from('carts')
        .update({ quantity: existingItem.quantity + 1 })
        .eq('id', existingItem.id);

      if (updateError) {
        toast.error(updateError.message);
      } else {
        toast.success('Cart updated!');
      }
    } else {
      // Insert new item
      const { error: insertError } = await supabase.from('carts').insert([
        {
          user_id: user.id,
          variant_id: variantId,
          quantity: 1,
        },
      ]);

      if (insertError) {
        toast.error(insertError.message);
      } else {
        toast.success('Added to cart!');
      }
    }
  };

  return (
    <div className="container mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {isLoading ? (
          <>
            <div>
              <Skeleton className="h-96 w-full mb-4" />
              <div className="grid grid-cols-4 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-1/2" />
              <Skeleton className="h-10 w-1/2" />
              <Skeleton className="h-12 w-full" />
            </div>
          </>
        ) : (
          <>
            <div>
              <div className="bg-muted h-96 mb-4"></div>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-muted h-24"></div>
                <div className="bg-muted h-24"></div>
                <div className="bg-muted h-24"></div>
                <div className="bg-muted h-24"></div>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-2xl text-primary mb-4">${product.price}</p>
              <p className="text-muted-foreground mb-8">{product.description}</p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">Color</h3>
                  <div className="flex gap-2">
                    <Button variant="outline">Black</Button>
                    <Button variant="outline">White</Button>
                    <Button variant="outline">Blue</Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Size</h3>
                  <div className="flex gap-2">
                    <Button variant="outline">S</Button>
                    <Button variant="outline">M</Button>
                    <Button variant="outline">L</Button>
                    <Button variant="outline">XL</Button>
                  </div>
                </div>
              </div>
              <Button size="lg" className="mt-8" onClick={handleAddToCart}>Add to Cart</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
