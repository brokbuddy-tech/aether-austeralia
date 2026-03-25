'use server';
/**
 * @fileOverview This file implements a Genkit flow for an AI Search Agent
 * that can answer natural language questions about the Australian real estate market.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiSearchAgentInputSchema = z.object({
  query: z.string().describe('The user\'s natural language query about the Australian property market.'),
});
export type AiSearchAgentInput = z.infer<typeof AiSearchAgentInputSchema>;

const AiSearchAgentOutputSchema = z.object({
  answer: z.string().describe('A helpful, professional response to the user\'s query, focusing on Australian market insights.'),
  suggestedAreas: z.array(z.string()).optional().describe('A list of relevant Australian suburbs or areas related to the query.'),
});
export type AiSearchAgentOutput = z.infer<typeof AiSearchAgentOutputSchema>;

export async function searchWithAi(input: AiSearchAgentInput): Promise<AiSearchAgentOutput> {
  return aiSearchAgentFlow(input);
}

const aiSearchAgentPrompt = ai.definePrompt({
  name: 'aiSearchAgentPrompt',
  input: { schema: AiSearchAgentInputSchema },
  output: { schema: AiSearchAgentOutputSchema },
  prompt: `You are the Aether Australia AI Property Specialist. Your goal is to provide sophisticated, helpful, and localized insights into the Australian real estate market.

A user has asked: "{{{query}}}"

Provide a detailed and professional response. Consider current trends, lifestyle factors (like school catchments, coastal proximity, or urban development), and investment potential where relevant.

If the user is asking about specific locations, explain why those areas might be of interest. If they are asking broad questions, provide expert-level context.

Format your response with a clear answer and, if appropriate, a list of suggested Australian suburbs.`,
});

const aiSearchAgentFlow = ai.defineFlow(
  {
    name: 'aiSearchAgentFlow',
    inputSchema: AiSearchAgentInputSchema,
    outputSchema: AiSearchAgentOutputSchema,
  },
  async (input) => {
    const { output } = await aiSearchAgentPrompt(input);
    if (!output) {
      throw new Error('Failed to generate AI search response.');
    }
    return output;
  }
);
