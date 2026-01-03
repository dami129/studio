import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Headphones, Play, Pause, Rewind, FastForward } from "lucide-react";

export function AffirmationsPlayer() {
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
        <div className="w-full bg-secondary rounded-lg p-4 flex items-center justify-between">
            <div className="flex flex-col">
                <p className="font-semibold">"I am capable and resilient"</p>
                <p className="text-sm text-muted-foreground">Affirmation for Strength</p>
            </div>
            <p className="text-sm font-mono text-muted-foreground">01:23 / 03:00</p>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full">
            <div className="h-2 bg-primary rounded-full" style={{width: "45%"}}></div>
        </div>
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
                <Rewind className="w-6 h-6" />
            </Button>
            <Button variant="default" size="icon" className="w-16 h-16 rounded-full">
                <Play className="w-8 h-8" />
            </Button>
            <Button variant="ghost" size="icon">
                <FastForward className="w-6 h-6" />
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}
