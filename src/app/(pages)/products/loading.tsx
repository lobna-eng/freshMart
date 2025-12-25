import { SkeletonCard } from "@/components/skeletonCard/SkeletonCard";

export default function Loading() {
  return (
<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
</div>
  );
}




