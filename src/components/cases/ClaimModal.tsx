"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitClaim } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

type ClaimModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  caseId: string;
};

export function ClaimModal({ isOpen, setIsOpen, caseId }: ClaimModalProps) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(submitClaim, initialState);
  const { toast } = useToast();
  
  useEffect(() => {
    if (state.message) {
      toast({
        title: "Claim Submitted",
        description: state.message,
      });
      setIsOpen(false);
    }
  }, [state, toast, setIsOpen]);

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending}>
        {pending ? "Submitting Claim..." : "Submit Claim"}
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form action={dispatch}>
          <input type="hidden" name="caseId" value={caseId} />
          <DialogHeader>
            <DialogTitle>Submit a Claim</DialogTitle>
            <DialogDescription>
              Please provide your details for verification. This information will be kept confidential.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="claimantName">Your Full Name</Label>
              <Input id="claimantName" name="claimantName" placeholder="e.g., Jane Smith" />
               {state.errors?.claimantName && <p className="text-sm font-medium text-destructive">{state.errors.claimantName[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="claimantContact">Your Contact (Email or Phone)</Label>
              <Input id="claimantContact" name="claimantContact" placeholder="jane.smith@example.com" />
               {state.errors?.claimantContact && <p className="text-sm font-medium text-destructive">{state.errors.claimantContact[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="verificationDocs">Proof of Relationship / Verification Documents</Label>
              <Textarea id="verificationDocs" name="verificationDocs" placeholder="Describe the documents you can provide (e.g., Birth Certificate, Family Photos, Government ID). Our team will contact you for the next steps." />
               {state.errors?.verificationDocs && <p className="text-sm font-medium text-destructive">{state.errors.verificationDocs[0]}</p>}
            </div>
          </div>
          <DialogFooter>
             <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
