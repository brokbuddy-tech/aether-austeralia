'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating short, AI-powered articles and market updates
 * relevant to the Australian real estate market, suitable for an "Insights Centre".
 *
 * - generateMarketInsight - A function that generates a market insight article.
 * - GenerateMarketInsightInput - The input type for the generateMarketInsight function.
 * - GenerateMarketInsightOutput - The return type for the generateMarketInsight function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateMarketInsightInputSchema = z.object({
  topic: z
    .string()
    .describe(
      'The topic for the Australian real estate market insight article. For example: "Sydney property market trends", "First-home buyer tips in Melbourne", or "Impact of interest rates on Australian housing".'
    ),
});
export type GenerateMarketInsightInput = z.infer<
  typeof GenerateMarketInsightInputSchema
>;

const GenerateMarketInsightOutputSchema = z.object({
  title: z.string().describe('The title of the market insight article.'),
  content: z
    .string()
    .describe(
      'The full content of the market insight article, formatted as markdown. It should be concise, aiming for a 2-minute read.'
    ),
  readingTime: z
    .string()
    .describe('The estimated reading time for the article, e.g., "2 min read".'),
});
export type GenerateMarketInsightOutput = z.infer<
  typeof GenerateMarketInsightOutputSchema
>;

export async function generateMarketInsight(
  input: GenerateMarketInsightInput
): Promise<GenerateMarketInsightOutput> {
  return generateMarketInsightFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMarketInsightPrompt',
  input: { schema: GenerateMarketInsightInputSchema },
  output: { schema: GenerateMarketInsightOutputSchema },
  prompt: `You are an expert real estate analyst specializing in the Australian market. Your task is to write a concise, informative article for an 'Insights Centre'.

The article should be approximately 200-300 words long, making it a "2 min read". Focus on providing valuable insights and advice related to the Australian real estate market.

Generate an article on the following topic:

Topic: {{{topic}}}

Output Format:
Title: [Title of the article]
Content: [Markdown formatted article content]
ReadingTime: 2 min read`,
});

const generateMarketInsightFlow = ai.defineFlow(
  {
    name: 'generateMarketInsightFlow',
    inputSchema: GenerateMarketInsightInputSchema,
    outputSchema: GenerateMarketInsightOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate market insight.');
    }
    return output;
  }
);
