'use server';

/**
 * @fileOverview A Genkit flow for generating a detailed and engaging property story
 *               based on property features and location for real estate listings.
 *
 * - generatePropertyStory - A function that handles the generation of the property story.
 * - AiGeneratedPropertyStoryInput - The input type for the generatePropertyStory function.
 * - AiGeneratedPropertyStoryOutput - The return type for the generatePropertyStory function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiGeneratedPropertyStoryInputSchema = z.object({
  address: z.string().describe('The full address of the property.'),
  locationDescription: z.string().optional().describe('A brief description of the neighborhood or local area.'),
  propertyType: z.enum(['House', 'Apartment', 'Acreage', 'Townhouse', 'Unit', 'Villa', 'Land']).describe('The type of property.'),
  bedrooms: z.number().int().min(0).describe('Number of bedrooms.'),
  bathrooms: z.number().int().min(0).describe('Number of bathrooms.'),
  carSpaces: z.number().int().min(0).describe('Number of car parking spaces.'),
  areaM2: z.number().positive().optional().describe('Total internal area of the property in square meters.'),
  landAreaM2: z.number().positive().optional().describe('Total land area of the property in square meters, if applicable.'),
  keyFeatures: z.array(z.string()).optional().describe('A list of key features or amenities (e.g., "ocean views", "gourmet kitchen", "swimming pool", "close to public transport").'),
  currentDescription: z.string().optional().describe('Any existing short description of the property to build upon.'),
});

export type AiGeneratedPropertyStoryInput = z.infer<typeof AiGeneratedPropertyStoryInputSchema>;

const AiGeneratedPropertyStoryOutputSchema = z.object({
  story: z.string().describe('A detailed and engaging property story.'),
});

export type AiGeneratedPropertyStoryOutput = z.infer<typeof AiGeneratedPropertyStoryOutputSchema>;

const propertyStoryPrompt = ai.definePrompt({
  name: 'propertyStoryPrompt',
  input: { schema: AiGeneratedPropertyStoryInputSchema },
  output: { schema: AiGeneratedPropertyStoryOutputSchema },
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
  prompt: `You are an expert real estate copywriter for "Aether Australia", specializing in crafting compelling and detailed property stories that highlight unique appeal and key selling points for the Australian market. Your goal is to make potential buyers/renters quickly understand why this property is special.

Write a detailed property story for the following Australian property listing. Focus on engaging language, highlighting its unique features and neighborhood benefits. The story should be at least 300 words and paint a vivid picture for the reader.

Property Details:
Address: {{{address}}}
Property Type: {{{propertyType}}}
Bedrooms: {{{bedrooms}}}
Bathrooms: {{{bathrooms}}}
Car Spaces: {{{carSpaces}}}
{{#if areaM2}}Internal Area: {{{areaM2}}} m2{{/if}}
{{#if landAreaM2}}Land Area: {{{landAreaM2}}} m2{{/if}}
{{#if locationDescription}}Location Highlights: {{{locationDescription}}}{{/if}}
{{#if keyFeatures}}
Key Features:
{{#each keyFeatures}}- {{{this}}}
{{/each}}
{{/if}}
{{#if currentDescription}}Additional Details: {{{currentDescription}}}{{/if}}

Please craft an engaging narrative that covers:
- An inviting introduction, setting the scene.
- Detailed descriptions of the property's key rooms and features.
- Lifestyle benefits derived from the location and amenities.
- A strong concluding statement encouraging action.

Ensure the language is sophisticated, professional, and tailored for a discerning Australian real estate audience.`,
});

const generatePropertyStoryFlow = ai.defineFlow(
  {
    name: 'generatePropertyStoryFlow',
    inputSchema: AiGeneratedPropertyStoryInputSchema,
    outputSchema: AiGeneratedPropertyStoryOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await propertyStoryPrompt(input);
      if (!output) {
        throw new Error('Failed to generate property story output.');
      }
      return output;
    } catch (error) {
      console.error('AI Property Story Generation Error:', error);
      // Fallback description if AI fails
      return {
        story: `Welcome to this exceptional ${input.propertyType} located at ${input.address}. This residence features ${input.bedrooms} bedrooms, ${input.bathrooms} bathrooms, and ${input.carSpaces} car spaces, offering a sophisticated living experience. ${input.areaM2 ? `Boasting ${input.areaM2}m2 of internal space, the` : 'The'} property is designed with a focus on quality and comfort. ${input.locationDescription ? input.locationDescription : `Situated in a prime Australian enclave, this home represents a significant opportunity for the discerning buyer.`} With its modern amenities and architectural integrity, this property is a testament to the Aether Australia standard of excellence. We invite you to explore this unique residence and experience the lifestyle it offers.`
      };
    }
  }
);

export async function generatePropertyStory(
  input: AiGeneratedPropertyStoryInput
): Promise<AiGeneratedPropertyStoryOutput> {
  return generatePropertyStoryFlow(input);
}
