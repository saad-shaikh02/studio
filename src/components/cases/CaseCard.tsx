import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CaseReport } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Calendar, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type CaseCardProps = {
  caseReport: CaseReport;
};

export function CaseCard({ caseReport }: CaseCardProps) {
  const getStatusVariant = (status: CaseReport['status']) => {
    switch (status) {
      case 'resolved':
        return 'default'; // Using default for a muted/gray look
      case 'pending_verification':
        return 'secondary';
      case 'open':
      default:
        return 'destructive'; // Using destructive for a red "open" status
    }
  }

  const getStatusText = (status: CaseReport['status']) => {
    switch (status) {
      case 'resolved':
        return 'Resolved';
      case 'pending_verification':
        return 'Pending';
      case 'claim_approved':
        return 'Approved';
      case 'open':
      default:
        return 'Open';
    }
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 group">
      <CardHeader className="p-0 relative">
        <Image
          src={caseReport.photoUrl}
          alt={`Photo for case ${caseReport.id}`}
          data-ai-hint={caseReport.photoHint}
          width={600}
          height={400}
          className="aspect-video object-cover blur-md"
        />
        <Badge 
          variant={getStatusVariant(caseReport.status)}
          className="absolute top-3 right-3 capitalize"
        >
          {getStatusText(caseReport.status)}
        </Badge>
      </CardHeader>
      <CardContent className="pt-4 flex-grow">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{caseReport.locationFound}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDistanceToNow(new Date(caseReport.timeFound), { addSuffix: true })}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="capitalize">Age: {caseReport.approximateAge}, Gender: {caseReport.gender}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="secondary" className="w-full">
          <Link href={`/cases/${caseReport.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
