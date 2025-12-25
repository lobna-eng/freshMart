import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col space-y-3 w-full max-w-sm mx-auto">
        {/* Image Skeleton */}
        <Skeleton className="h-[150px] w-full rounded-xl" />

        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-5 w-full" />

          <div className="flex gap-4">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-1/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
