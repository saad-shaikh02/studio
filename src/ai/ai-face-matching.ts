'use server';

/**
 * @fileOverview Implements AI-powered face matching to suggest potential matches between missing and found reports.
 *
 * - aiFaceMatch - A function that handles the face matching process.
 * - AIFaceMatchInput - The input type for the aiFaceMatch function.
 * - AIFaceMatchOutput - The return type for the aiFaceMatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIFaceMatchInputSchema = z.object({
  missingPhotoDataUri: z
    .string()
    .describe(
      "A photo of the missing person, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  foundPhotoDataUri: z
    .string()
    .describe(
      "A photo of the found person, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AIFaceMatchInput = z.infer<typeof AIFaceMatchInputSchema>;

const AIFaceMatchOutputSchema = z.object({
  matchProbability: z
    .number()
    .describe('The probability that the two faces match, between 0 and 1.'),
  matchExplanation: z
    .string()
    .describe('An explanation of why the faces match or do not match.'),
});
export type AIFaceMatchOutput = z.infer<typeof AIFaceMatchOutputSchema>;

export async function aiFaceMatch(input: AIFaceMatchInput): Promise<AIFaceMatchOutput> {
  return aiFaceMatchFlow(input);
}

const aiFaceMatchPrompt = ai.definePrompt({
  name: 'aiFaceMatchPrompt',
  input: {schema: AIFaceMatchInputSchema},
  output: {schema: AIFaceMatchOutputSchema},
  prompt: `You are an AI face matching service. Given two images, determine if they are the same person.

Missing Person Photo: {{media url=missingPhotoDataUri}}
Found Person Photo: {{media url=foundPhotoDataUri}}

Respond with a probability that the two faces match, and an explanation of why they match or do not match.
Ensure the matchProbability is a value between 0 and 1.
`,
});

const aiFaceMatchFlow = ai.defineFlow(
  {
    name: 'aiFaceMatchFlow',
    inputSchema: AIFaceMatchInputSchema,
    outputSchema: AIFaceMatchOutputSchema,
  },
  async input => {
    const {output} = await aiFaceMatchPrompt(input);
    return output!;
  }
);
