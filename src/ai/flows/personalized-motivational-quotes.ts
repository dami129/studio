'use server';

/**
 * @fileOverview A flow to generate personalized motivational quotes for nurses.
 *
 * - generatePersonalizedQuote - A function that generates a personalized motivational quote.
 * - PersonalizedQuoteInput - The input type for the generatePersonalizedQuote function.
 * - PersonalizedQuoteOutput - The return type for the generatePersonalizedQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedQuoteInputSchema = z.object({
  nurseName: z.string().describe('The name of the nurse.'),
  hospital: z.string().describe('The hospital where the nurse works.'),
  ward: z.string().describe('The ward/unit where the nurse works.'),
  monthlyGoal: z.string().describe('The nurse monthly personal goal.'),
  recentActivity: z
    .string()
    .describe(
      'A brief summary of the nurse recent activity or challenges faced.'
    ),
});
export type PersonalizedQuoteInput = z.infer<
  typeof PersonalizedQuoteInputSchema
>;

const PersonalizedQuoteOutputSchema = z.object({
  quote: z.string().describe('A personalized motivational quote for the nurse.'),
});
export type PersonalizedQuoteOutput = z.infer<
  typeof PersonalizedQuoteOutputSchema
>;

export async function generatePersonalizedQuote(
  input: PersonalizedQuoteInput
): Promise<PersonalizedQuoteOutput> {
  return personalizedMotivationalQuoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedMotivationalQuotePrompt',
  input: {schema: PersonalizedQuoteInputSchema},
  output: {schema: PersonalizedQuoteOutputSchema},
  prompt: `You are a motivational speaker specializing in providing
  encouragement to nurses. Generate a personalized motivational quote
  based on the following information about the nurse:

  Nurse Name: {{nurseName}}
  Hospital: {{hospital}}
  Ward/Unit: {{ward}}
  Monthly Goal: {{monthlyGoal}}
  Recent Activity/Challenges: {{recentActivity}}

  The quote should be uplifting, empathetic, and relevant to the
  nurses daily experiences and goals. Focus on themes of resilience,
  compassion, and self-care.
  `,
});

const personalizedMotivationalQuoteFlow = ai.defineFlow(
  {
    name: 'personalizedMotivationalQuoteFlow',
    inputSchema: PersonalizedQuoteInputSchema,
    outputSchema: PersonalizedQuoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
