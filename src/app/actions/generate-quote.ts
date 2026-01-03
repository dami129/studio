"use server";

import {
  generatePersonalizedQuote,
  PersonalizedQuoteInput,
} from "@/ai/flows/personalized-motivational-quotes";
import { z } from "zod";

const schema = z.object({
  nurseName: z.string(),
  hospital: z.string(),
  ward: z.string(),
  shiftPreference: z.string(),
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
    
    const input: PersonalizedQuoteInput = validatedFields.data;

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
