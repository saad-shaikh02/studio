import type { CaseReport } from "@/lib/types";
import { CaseCard } from "./CaseCard";

type CaseGridProps = {
  cases: CaseReport[];
};

export function CaseGrid({ cases }: CaseGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cases.map((caseReport) => (
        <CaseCard key={caseReport.id} caseReport={caseReport} />
      ))}
    </div>
  );
}
