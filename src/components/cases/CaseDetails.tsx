"use client";

import { useState } from "react";
import Image from "next/image";
import type { CaseReport } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Calendar, MapPin, Shirt, Info, KeyRound, ShieldCheck, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { ClaimModal } from "./ClaimModal";
import { CaseSummary } from "./CaseSummary";
import { approveCaseClaim, markCaseAsResolved } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

type CaseDetailsProps = {
  caseReport: CaseReport;
};

export function CaseDetails({ caseReport: initialCase }: CaseDetailsProps) {
  const [caseReport, setCaseReport] = useState(initialCase);
  const [isClaimModalOpen, setClaimModalOpen] = useState(false);
  const { toast } = useToast();

  const isVerified = caseReport.status === 'claim_approved' || caseReport.status === 'resolved';

  const handleApprove = async () => {
    await approveCaseClaim(caseReport.id);
    setCaseReport(prev => ({...prev, status: 'claim_approved'}));
    toast({
        title: "Claim Approved",
        description: "Contact details are now visible.",
        variant: "default",
    });
  }

  const handleResolve = async () => {
    await markCaseAsResolved(caseReport.id);
    setCaseReport(prev => ({...prev, status: 'resolved'}));
     toast({
        title: "Case Resolved",
        description: "This case has been marked as resolved.",
    });
  }

  const caseDetailsString = `Location: ${caseReport.locationFound}, Age: ${caseReport.approximateAge}, Gender: ${caseReport.gender}, Clothing: ${caseReport.clothing}, Description: ${caseReport.description}, Identifying Features: ${caseReport.identifyingFeatures}`;

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <Image
          src={caseReport.photoUrl}
          alt={`Photo for case ${caseReport.id}`}
          data-ai-hint={caseReport.photoHint}
          width={800}
          height={600}
          className={`aspect-video w-full object-cover rounded-lg border transition-all duration-500 ${isVerified ? '' : 'blur-lg'}`}
        />
        {!isVerified && (
             <div className="text-center text-sm text-muted-foreground mt-2">
                Photo is blurred for privacy. Submit a claim to request access.
            </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Case #{caseReport.id.split('-')[1]}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={caseReport.status === 'resolved' ? 'default' : caseReport.status === 'pending_verification' ? 'secondary' : 'destructive'} className="capitalize">{caseReport.status.replace('_', ' ')}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3"><MapPin className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" /><div><p className="font-semibold">Location Found</p><p className="text-muted-foreground">{caseReport.locationFound}</p></div></div>
            <div className="flex items-start gap-3"><Calendar className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" /><div><p className="font-semibold">Time Found</p><p className="text-muted-foreground">{format(new Date(caseReport.timeFound), "PPP, p")}</p></div></div>
            <div className="flex items-start gap-3"><User className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" /><div><p className="font-semibold">Profile</p><p className="text-muted-foreground capitalize">Age: {caseReport.approximateAge}, {caseReport.gender}</p></div></div>
            <div className="flex items-start gap-3"><Shirt className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" /><div><p className="font-semibold">Clothing</p><p className="text-muted-foreground">{caseReport.clothing}</p></div></div>
        </div>

        <Separator />
        
        <div className="space-y-4">
            <div className="flex items-start gap-3"><Info className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" /><div><p className="font-semibold">Additional Details</p><p className="text-muted-foreground">{caseReport.description}</p></div></div>
            <div className="flex items-start gap-3"><Info className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" /><div><p className="font-semibold">Identifying Features</p><p className="text-muted-foreground">{caseReport.identifyingFeatures}</p></div></div>
        </div>

        <Separator />
        
        {isVerified ? (
            <Card className="bg-green-50 border-green-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-accent-foreground"><ShieldCheck className="text-accent"/>Verified Access</CardTitle>
                    <CardDescription>You have been verified. Contact information is now available.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p><strong>Finder's Name:</strong> {caseReport.finder.name}</p>
                    <p><strong>Finder's Contact:</strong> {caseReport.finder.contact}</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleResolve} disabled={caseReport.status === 'resolved'} className="bg-accent hover:bg-accent/90">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Mark as Reunited & Resolved
                    </Button>
                </CardFooter>
            </Card>
        ) : caseReport.status === 'pending_verification' ? (
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><KeyRound/>Claim Submitted</CardTitle>
                    <CardDescription>Your claim is pending verification. Our team will review your submission and you will be notified upon approval.</CardDescription>
                    <CardContent className="pt-4 text-sm text-muted-foreground">
                        <p><strong>Your Name:</strong> {caseReport.claimant?.name}</p>
                        <p><strong>Your Contact:</strong> {caseReport.claimant?.contact}</p>
                    </CardContent>
                </CardHeader>
                 {/* This is a mock admin action for demo purposes */}
                 <CardFooter>
                    <Button onClick={handleApprove} variant="secondary">Simulate Admin Approval</Button>
                </CardFooter>
            </Card>
        ) : caseReport.status === 'resolved' ? (
             <Card className="bg-muted">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CheckCircle2/>Case Resolved</CardTitle>
                    <CardDescription>This case has been successfully resolved and is now closed.</CardDescription>
                </CardHeader>
            </Card>
        ) : (
            <>
                <Button onClick={() => setClaimModalOpen(true)} className="w-full" size="lg">Claim This Case</Button>
                <ClaimModal isOpen={isClaimModalOpen} setIsOpen={setClaimModalOpen} caseId={caseReport.id} />
            </>
        )}
        
        {isVerified && (
            <CaseSummary caseDetails={caseDetailsString} />
        )}
      </div>
    </div>
  );
}
