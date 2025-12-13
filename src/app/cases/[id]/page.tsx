import { getCaseById } from "@/lib/data";
import { notFound } from "next/navigation";
import { CaseDetails } from "@/components/cases/CaseDetails";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";


export default async function CasePage({ params }: { params: { id: string } }) {
  const caseReport = await getCaseById(params.id);

  if (!caseReport) {
    notFound();
  }

  return (
    <div className="container max-w-4xl py-8 md:py-12">
        <div className="mb-6">
            <Button asChild variant="ghost">
                <Link href="/search">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to All Cases
                </Link>
            </Button>
        </div>
      <Suspense fallback={<CaseDetailsSkeleton />}>
        <CaseDetails caseReport={caseReport} />
      </Suspense>
    </div>
  );
}


function CaseDetailsSkeleton() {
    return (
        <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <div className="space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                </div>
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                </div>
                <Skeleton className="h-10 w-full rounded-md" />
            </div>
        </div>
    )
}
