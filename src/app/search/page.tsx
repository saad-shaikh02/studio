import { getCases } from "@/lib/data";
import { CaseBrowser } from "@/components/cases/CaseBrowser";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function SearchPage() {
  const cases = await getCases();

  return (
    <div className="container py-8">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
          Active Cases
        </h1>
        <p className="text-foreground/80 md:text-xl">
          Browse reports of found individuals. All photos are blurred for privacy.
        </p>
      </div>
      <Suspense fallback={<CaseGridSkeleton />}>
        <CaseBrowser initialCases={cases} />
      </Suspense>
    </div>
  );
}

function CaseGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
