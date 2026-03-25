'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Cart page error:', error);
  }, [error]);

  return (
    <div className="container mx-auto py-16 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold">Couldn&apos;t load your cart</h2>
        <p className="text-muted-foreground max-w-md">
          Something went wrong. Please try again.
        </p>
        <div className="flex gap-4 justify-center mt-6">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
