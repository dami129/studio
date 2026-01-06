"use server";

import {
  generatePersonalizedQuote,
  PersonalizedQuoteInput,
} from "@/ai/flows/personalized-motivational-quotes";
import { z } from "zod";

// This map should ideally be shared or derived from a single source of truth
// For now, we'll define it here to match the frontend.
const activityMap: Record<string, string> = {
    'long-shift': "Had a long and tiring shift",
    'difficult-patient': "Dealt with a difficult patient interaction",
    'unmotivated': "Feeling a bit unmotivated lately",
    'great-teamwork': "Experienced great teamwork with colleagues",
    'patient-recovery': "Witnessed a heartwarming patient recovery"
};


const schema = z.object({
  nurseName: z.string(),
  hospital: z.string(),
  ward: z.string(),
  monthlyGoal: z.string(),
  recentActivity: z.string(),
});

export async function generateQuoteAction(
  prevState: {
    quote: string | null;
    error: string | null;
  },
  formData: FormData
) {
  try {
    const validatedFields = schema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
      return {
        quote: null,
        error: "Invalid input. Please fill out all fields.",
      };
    }
    
    // Map the simple value back to the full descriptive text for the AI
    const recentActivityKey = validatedFields.data.recentActivity;
    const recentActivityText = activityMap[recentActivityKey] || recentActivityKey;

    const input: PersonalizedQuoteInput = {
        ...validatedFields.data,
        recentActivity: recentActivityText,
    };

    const result = await generatePersonalizedQuote(input);

    if (result.quote) {
      return {
        quote: result.quote,
        error: null,
      };
    } else {
      return {
        quote: null,
        error: "Failed to generate a quote. Please try again.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      quote: null,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
