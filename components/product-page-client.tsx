'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductPageClient = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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
              <h1 className="text-4xl font-bold mb-4">Product Name</h1>
              <p className="text-2xl text-primary mb-4">$29.99</p>
              <p className="text-muted-foreground mb-8">This is a description of the product. It is a very good product. You should buy it.</p>
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
              <Button size="lg" className="mt-8">Add to Cart</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
