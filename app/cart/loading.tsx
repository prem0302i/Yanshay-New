import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto py-16">
      <Skeleton className="h-10 w-64 mx-auto mb-8" />
      <div className="text-center min-h-[50vh] flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
      </div>
    </div>
  );
}
