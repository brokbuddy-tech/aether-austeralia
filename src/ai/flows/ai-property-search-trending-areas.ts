'use server';
/**
 * @fileOverview This file implements a Genkit flow for suggesting trending real estate areas in Australia.
 *
 * - suggestTrendingAreas - A function that suggests trending real estate areas.
 * - SuggestTrendingAreasInput - The input type for the suggestTrendingAreas function.
 * - SuggestTrendingAreasOutput - The return type for the suggestTrendingAreas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// 1. Define Input Schema
const SuggestTrendingAreasInputSchema = z.object({
  numberOfAreas:
    z.number()
      .optional()
      .describe('The maximum number of trending areas to suggest.'),
});
export type SuggestTrendingAreasInput = z.infer<
  typeof SuggestTrendingAreasInputSchema
>;

// 2. Define Output Schema
const SuggestTrendingAreasOutputSchema = z.object({
  areas:
    z.array(z.string())
      .describe('A list of trending real estate areas in Australia.'),
});
export type SuggestTrendingAreasOutput = z.infer<
  typeof SuggestTrendingAreasOutputSchema
>;

// 3. Define the Prompt
const suggestTrendingAreasPrompt = ai.definePrompt({
  name: 'suggestTrendingAreasPrompt',
  input: {schema: SuggestTrendingAreasInputSchema},
  output: {schema: SuggestTrendingAreasOutputSchema},
  prompt: `You are an expert Australian real estate market analyst. Your task is to identify and list the top trending real estate areas in Australia based on current market activity, recent growth, and buyer interest.

Consider factors like:
- Significant price growth in the last quarter.
- High demand indicated by low days on market or strong auction clearance rates.
- New infrastructure projects or developments attracting interest.
- Areas popular among first-home buyers, investors, or specific demographics.

Provide a list of up to {{numberOfAreas}} trending areas. If numberOfAreas is not provided, suggest 5 areas.
Format your response as a JSON object with a single key 'areas' which contains an array of strings, where each string is the name of a trending area.
`,
});

// 4. Define the Flow
const suggestTrendingAreasFlow = ai.defineFlow(
  {
    name: 'suggestTrendingAreasFlow',
    inputSchema: SuggestTrendingAreasInputSchema,
    outputSchema: SuggestTrendingAreasOutputSchema,
  },
  async input => {
    const {output} = await suggestTrendingAreasPrompt({
      numberOfAreas: input.numberOfAreas || 5, // Default to 5 if not provided
    });
    // The prompt expects JSON, so output will be the parsed JSON object.
    // We assert it's not null, as the model should always return structured JSON for this prompt.
    return output!;
  }
);

// 5. Export the wrapper function
export async function suggestTrendingAreas(
  input: SuggestTrendingAreasInput = {} // Make input optional for the wrapper
): Promise<SuggestTrendingAreasOutput> {
  return suggestTrendingAreasFlow(input);
}
