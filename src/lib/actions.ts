"use server";

import { z } from "zod";
import { addCase, addClaim, approveClaim, resolveCase } from "./data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateCaseSummary } from "@/ai/flows/generate-case-summary";

const reportSchema = z.object({
  photoUrl: z.string().url({ message: "Please enter a valid image URL." }),
  approximateAge: z.string().min(1, "Age is required."),
  gender: z.enum(["male", "female", "other", "unknown"]),
  locationFound: z.string().min(3, "Location is required."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  clothing: z.string().min(3, "Clothing description is required."),
  identifyingFeatures: z.string().optional(),
  finderName: z.string().min(2, "Your name is required."),
  finderContact: z.string().min(5, "A valid contact (phone or email) is required."),
});

export async function submitReport(prevState: any, formData: FormData) {
  const validatedFields = reportSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { finderName, finderContact, ...caseData } = validatedFields.data;

  try {
    await addCase({
      ...caseData,
      photoHint: "person photo", // Default hint
      identifyingFeatures: caseData.identifyingFeatures || "None provided.",
      finder: {
        name: finderName,
        contact: finderContact,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to create report.",
    };
  }

  revalidatePath("/search");
  redirect("/search");
}


const claimSchema = z.object({
  caseId: z.string(),
  claimantName: z.string().min(2, "Your name is required."),
  claimantContact: z.string().min(5, "A valid contact is required."),
  verificationDocs: z.string().min(10, "Please describe your verification documents."),
});


export async function submitClaim(prevState: any, formData: FormData) {
  const validatedFields = claimSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { caseId, claimantName, claimantContact, verificationDocs } = validatedFields.data;

  try {
    await addClaim(caseId, {
      name: claimantName,
      contact: claimantContact,
      verificationDocs,
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to submit claim.'
    }
  }
  
  revalidatePath(`/cases/${caseId}`);
  return { message: "Claim submitted for verification." };
}

export async function approveCaseClaim(caseId: string) {
    await approveClaim(caseId);
    revalidatePath(`/cases/${caseId}`);
}

export async function markCaseAsResolved(caseId: string) {
    await resolveCase(caseId);
    revalidatePath(`/cases/${caseId}`);
    revalidatePath('/search');
}


export async function generateSummary(caseDetails: string) {
  try {
    const result = await generateCaseSummary({ caseDetails });
    return { summary: result.summary };
  } catch (error) {
    console.error("AI summary generation failed:", error);
    return { error: "Failed to generate summary." };
  }
}
