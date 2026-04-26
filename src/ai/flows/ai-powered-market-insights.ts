'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating short, AI-powered articles and market updates
 * relevant to the Australian real estate market, suitable for an "Insights Centre".
 *
 * - generateMarketInsight - A function that generates a market insight article.
 * - GenerateMarketInsightInput - The input type for the generateMarketInsight function.
 * - GenerateMarketInsightOutput - The return type for the generateMarketInsight function.
 */

import { ai, hasGoogleAiKey } from '@/ai/genkit';
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

const fallbackInsights: Record<string, GenerateMarketInsightOutput> = {
  'Sydney property market trends for 2026': {
    title: 'Sydney 2026: Tight Supply Keeps Premium Prices Resilient',
    content:
      'Sydney enters 2026 with premium stock still constrained, particularly in blue-chip inner-city and harbour-adjacent pockets. Buyers are becoming more selective, but well-presented homes continue to attract strong competition when location, layout, and long-term livability align.\n\nFor sellers, pricing precision matters more than ever. For buyers, the advantage lies in moving quickly on high-quality listings while keeping finance and due diligence prepared in advance.',
    readingTime: '2 min read',
  },
  'First-home buyer tips for the Melbourne market': {
    title: 'How First-Home Buyers Can Compete More Confidently in Melbourne',
    content:
      'Melbourne remains one of the country’s most dynamic entry markets, but first-home buyers are having the most success when they focus on transport-linked suburbs, flexible property types, and clear budget discipline. Apartments and townhouses in growth corridors continue to offer more accessible entry points than detached homes.\n\nThe practical edge comes from securing pre-approval early, understanding owners corporation costs, and prioritising liveability over headline suburb prestige. In a competitive environment, preparation often matters more than speed alone.',
    readingTime: '2 min read',
  },
  'Impact of interest rates on Australian housing assets': {
    title: 'Interest Rates Are Reshaping Buyer Behaviour More Than Demand',
    content:
      'Higher borrowing costs have not removed demand from the Australian property market, but they have changed how buyers evaluate value. Households are reassessing repayment buffers, investors are looking harder at yield, and prestige buyers are favouring properties that feel defensible over a full cycle.\n\nThe result is a more segmented market. Exceptional homes still transact strongly, while secondary stock takes longer and requires sharper pricing. For agents and vendors, strategy now depends on understanding who the likely buyer is and what affordability pressures they face.',
    readingTime: '2 min read',
  },
  'Why regional NSW is the new luxury frontier': {
    title: 'Regional NSW Continues to Attract Lifestyle-Driven Luxury Demand',
    content:
      'Regional NSW is strengthening its position as a luxury destination thanks to hybrid work, improved infrastructure, and buyer demand for privacy, land, and experience-led living. Lifestyle hubs with hospitality depth, coastal access, or vineyard adjacency are drawing both owner-occupiers and long-hold investors.\n\nWhat distinguishes the strongest markets is not novelty alone, but amenity. Buyers are paying a premium where design quality meets convenience, community, and year-round appeal. The luxury story is becoming less city-versus-regional and more about quality of life.',
    readingTime: '2 min read',
  },
  'Sustainability in Australian architectural design': {
    title: 'Sustainability Is Moving from Feature to Expectation',
    content:
      'Across the Australian residential market, sustainability is becoming part of the core value equation rather than a niche design extra. Passive solar planning, durable low-maintenance materials, water efficiency, and energy performance are increasingly influencing both buyer sentiment and resale positioning.\n\nWell-executed sustainable design is now associated with comfort, lower operating costs, and long-term asset quality. Developers and homeowners who treat environmental performance as a design principle, not an afterthought, are likely to remain ahead of market expectations.',
    readingTime: '2 min read',
  },
};

function buildFallbackMarketInsight(topic: string): GenerateMarketInsightOutput {
  return (
    fallbackInsights[topic] ?? {
      title: topic,
      content:
        'Australian property buyers are balancing affordability, location quality, and long-term resilience more carefully in 2026. Markets with tight supply, strong infrastructure, and lifestyle appeal continue to outperform broader sentiment.\n\nFor both buyers and sellers, the best outcomes are coming from clear pricing expectations, strong local data, and properties that offer practical liveability as well as design appeal.',
      readingTime: '2 min read',
    }
  );
}

export async function generateMarketInsight(
  input: GenerateMarketInsightInput
): Promise<GenerateMarketInsightOutput> {
  if (!hasGoogleAiKey) {
    return buildFallbackMarketInsight(input.topic);
  }

  try {
    return await generateMarketInsightFlow(input);
  } catch (error) {
    console.warn(
      '[generateMarketInsight] Falling back to static insight content.',
      error
    );
    return buildFallbackMarketInsight(input.topic);
  }
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
