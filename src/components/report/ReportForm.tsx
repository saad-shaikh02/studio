"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitReport } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function ReportForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(submitReport, initialState);
  
  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Submitting..." : "Submit Report"}
      </Button>
    );
  }

  return (
    <form action={dispatch}>
      <Card>
        <CardHeader>
          <CardTitle>Found Person Details</CardTitle>
          <CardDescription>
            This information will be used to create a public, but anonymized, report.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="photoUrl">Photo URL</Label>
            <Input id="photoUrl" name="photoUrl" placeholder="https://example.com/image.jpg" />
            {state.errors?.photoUrl && <p className="text-sm font-medium text-destructive">{state.errors.photoUrl[0]}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="approximateAge">Approximate Age</Label>
               <Select name="approximateAge">
                <SelectTrigger id="approximateAge">
                    <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0-3">0-3 years</SelectItem>
                    <SelectItem value="4-6">4-6 years</SelectItem>
                    <SelectItem value="7-9">7-9 years</SelectItem>
                    <SelectItem value="10-12">10-12 years</SelectItem>
                    <SelectItem value="13-15">13-15 years</SelectItem>
                    <SelectItem value="16-18">16-18 years</SelectItem>
                    <SelectItem value="19-25">19-25 years</SelectItem>
                    <SelectItem value="26-40">26-40 years</SelectItem>
                    <SelectItem value="41-60">41-60 years</SelectItem>
                    <SelectItem value="60+">60+ years</SelectItem>
                </SelectContent>
               </Select>
              {state.errors?.approximateAge && <p className="text-sm font-medium text-destructive">{state.errors.approximateAge[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender">
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
               {state.errors?.gender && <p className="text-sm font-medium text-destructive">{state.errors.gender[0]}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="locationFound">Location Found</Label>
            <Input id="locationFound" name="locationFound" placeholder="e.g., Central Park, near the fountain" />
             {state.errors?.locationFound && <p className="text-sm font-medium text-destructive">{state.errors.locationFound[0]}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clothing">Clothing Description</Label>
            <Textarea id="clothing" name="clothing" placeholder="e.g., Blue jacket, red scarf, denim jeans" />
             {state.errors?.clothing && <p className="text-sm font-medium text-destructive">{state.errors.clothing[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Further Details</Label>
            <Textarea id="description" name="description" placeholder="Any other observations, what the person said, their emotional state, etc." />
             {state.errors?.description && <p className="text-sm font-medium text-destructive">{state.errors.description[0]}</p>}
          </div>

           <div className="space-y-2">
            <Label htmlFor="identifyingFeatures">Visible Identifying Features (Optional)</Label>
            <Input id="identifyingFeatures" name="identifyingFeatures" placeholder="e.g., Birthmark on left cheek, glasses, scar on forehead" />
          </div>

        </CardContent>
      </Card>
      
      <Card className="mt-6">
         <CardHeader>
          <CardTitle>Your Contact Information</CardTitle>
          <CardDescription>
            This will be kept private and only shared with verified authorities or guardians after approval.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="finderName">Your Name</Label>
                    <Input id="finderName" name="finderName" placeholder="John Doe"/>
                     {state.errors?.finderName && <p className="text-sm font-medium text-destructive">{state.errors.finderName[0]}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="finderContact">Your Contact (Email or Phone)</Label>
                    <Input id="finderContact" name="finderContact" placeholder="john.doe@example.com or 555-1234"/>
                     {state.errors?.finderContact && <p className="text-sm font-medium text-destructive">{state.errors.finderContact[0]}</p>}
                </div>
           </div>
        </CardContent>
        <CardFooter>
            <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
