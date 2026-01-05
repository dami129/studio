'use server';

/**
 * @fileOverview A flow to generate audio from text using a TTS model.
 *
 * - generateAffirmationAudio - A function that handles the text-to-speech conversion.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const GenerateAffirmationAudioInputSchema = z.object({
  text: z.string().describe('The text to convert to audio.'),
});
export type GenerateAffirmationAudioInput = z.infer<
  typeof GenerateAffirmationAudioInputSchema
>;

const GenerateAffirmationAudioOutputSchema = z.object({
  audio: z
    .string()
    .describe(
      "The generated audio as a base64-encoded data URI in WAV format. Format: 'data:audio/wav;base64,<encoded_data>'"
    ),
});
export type GenerateAffirmationAudioOutput = z.infer<
  typeof GenerateAffirmationAudioOutputSchema
>;

export async function generateAffirmationAudio(
  input: GenerateAffirmationAudioInput
): Promise<GenerateAffirmationAudioOutput> {
  return generateAffirmationAudioFlow(input);
}

const generateAffirmationAudioFlow = ai.defineFlow(
  {
    name: 'generateAffirmationAudioFlow',
    inputSchema: GenerateAffirmationAudioInputSchema,
    outputSchema: GenerateAffirmationAudioOutputSchema,
  },
  async ({ text }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: text,
    });

    if (!media?.url) {
      throw new Error('Audio generation failed: no media returned.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const wavBase64 = await toWav(audioBuffer);

    return {
      audio: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);
