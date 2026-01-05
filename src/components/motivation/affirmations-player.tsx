"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Headphones, Play, Pause, Rewind, FastForward, Loader2, RefreshCw } from "lucide-react";
import { generateAffirmationAudio } from "@/ai/flows/generate-affirmation-audio";

const affirmations = [
  "I am capable and resilient.",
  "I release all tension and embrace tranquility.",
  "I am worthy of peace and inner calm.",
  "My breath is my anchor to the present moment.",
  "I handle challenges with grace and strength.",
  "I am in control of my thoughts and emotions.",
  "Each day, I grow stronger and more confident.",
  "I am doing my best, and my best is enough.",
  "I choose to focus on the positive.",
  "I am surrounded by peace and love."
];

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}


export function AffirmationsPlayer() {
    const [currentAffirmationIndex, setCurrentAffirmationIndex] = React.useState(0);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [audioSrc, setAudioSrc] = React.useState<string | null>(null);
    const [progress, setProgress] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(0);

    const audioRef = React.useRef<HTMLAudioElement>(null);

    const currentAffirmation = affirmations[currentAffirmationIndex];

    const generateAndPlayAudio = React.useCallback(async (text: string) => {
        setIsLoading(true);
        setAudioSrc(null);
        setProgress(0);
        setCurrentTime(0);
        setDuration(0);

        try {
            const { audio } = await generateAffirmationAudio({ text });
            setAudioSrc(audio);
            setIsPlaying(true);
        } catch (error) {
            console.error("Failed to generate audio:", error);
            setIsPlaying(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    React.useEffect(() => {
      if (audioSrc && audioRef.current) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      }
    }, [audioSrc]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
        } else {
            if (audioSrc) {
                audioRef.current?.play().catch(e => console.error("Playback failed:", e));
                setIsPlaying(true);
            } else {
                generateAndPlayAudio(currentAffirmation);
            }
        }
    };
    
    const handleNext = () => {
        const nextIndex = (currentAffirmationIndex + 1) % affirmations.length;
        setCurrentAffirmationIndex(nextIndex);
        generateAndPlayAudio(affirmations[nextIndex]);
    };

    const handlePrevious = () => {
        const prevIndex = (currentAffirmationIndex - 1 + affirmations.length) % affirmations.length;
        setCurrentAffirmationIndex(prevIndex);
        generateAndPlayAudio(affirmations[prevIndex]);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleAudioEnded = () => {
        handleNext();
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Headphones className="w-6 h-6 text-primary" />
                    <span>Calm Audio Affirmations</span>
                </CardTitle>
                <CardDescription>
                    Listen to short, guided affirmations to reset your mind.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <div className="w-full bg-secondary rounded-lg p-4 flex items-center justify-between min-h-[80px]">
                    <div className="flex flex-col">
                        <p className="font-semibold">"{currentAffirmation}"</p>
                        <p className="text-sm text-muted-foreground">Affirmation for Strength</p>
                    </div>
                    <p className="text-sm font-mono text-muted-foreground">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </p>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full">
                    <div className="h-2 bg-primary rounded-full" style={{width: `${progress}%`}}></div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={handlePrevious} disabled={isLoading}>
                        <Rewind className="w-6 h-6" />
                    </Button>
                    <Button variant="default" size="icon" className="w-16 h-16 rounded-full" onClick={handlePlayPause} disabled={isLoading}>
                        {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : (isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />)}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleNext} disabled={isLoading}>
                        <FastForward className="w-6 h-6" />
                    </Button>
                </div>
                {audioSrc && (
                    <audio 
                        ref={audioRef} 
                        src={audioSrc} 
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={handleAudioEnded}
                        hidden
                    />
                )}
            </CardContent>
        </Card>
    )
}
