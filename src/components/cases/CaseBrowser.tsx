"use client";

import { useState, useMemo } from "react";
import type { CaseReport } from "@/lib/types";
import { SearchControls } from "./SearchControls";
import { CaseGrid } from "./CaseGrid";

type CaseBrowserProps = {
  initialCases: CaseReport[];
};

export function CaseBrowser({ initialCases }: CaseBrowserProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState("");

  const filteredCases = useMemo(() => {
    return initialCases.filter((c) => {
      const caseDataString = `${c.locationFound} ${c.description} ${c.clothing} ${c.identifyingFeatures} ${c.gender}`.toLowerCase();
      const termMatch = searchTerm ? caseDataString.includes(searchTerm.toLowerCase()) : true;
      
      const ageMatch = ageFilter ? c.approximateAge === ageFilter : true;
      
      return termMatch && ageMatch && c.status !== 'resolved';
    });
  }, [initialCases, searchTerm, ageFilter]);
  
  const ageRanges = useMemo(() => {
    const ages = new Set(initialCases.map(c => c.approximateAge));
    return Array.from(ages).sort();
  }, [initialCases]);

  return (
    <div className="space-y-8">
      <SearchControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        ageFilter={ageFilter}
        setAgeFilter={setAgeFilter}
        ageRanges={ageRanges}
      />
      {filteredCases.length > 0 ? (
        <CaseGrid cases={filteredCases} />
      ) : (
        <div className="text-center py-16">
            <h3 className="text-xl font-semibold">No Matching Cases Found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search filters.</p>
        </div>
      )}
    </div>
  );
}
