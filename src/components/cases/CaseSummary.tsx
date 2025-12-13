"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb } from "lucide-react";
import { generateSummary } from "@/lib/actions";

type CaseSummaryProps = {
  caseDetails: string;
};

export function CaseSummary({ caseDetails }: CaseSummaryProps) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getSummary() {
      setLoading(true);
      setError("");
      const result = await generateSummary(caseDetails);
      if (result.summary) {
        setSummary(result.summary);
      } else {
        setError(result.error || "An unknown error occurred.");
      }
      setLoading(false);
    }
    getSummary();
  }, [caseDetails]);

  return (
    <Card className="bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="text-primary" />
          AI-Generated Case Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        {error && <p className="text-destructive text-sm">{error}</p>}
        {!loading && !error && <p className="text-sm text-foreground/80">{summary}</p>}
      </CardContent>
    </Card>
  );
}
