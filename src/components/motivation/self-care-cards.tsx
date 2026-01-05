"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Coffee, Wind, Zap, Sun, Moon } from "lucide-react";
import * as React from "react";

const allSelfCareTips = [
    {
        icon: <Wind className="w-6 h-6 text-primary" />,
        title: "Mindful Breathing",
        description: "Take 5 deep breaths. Inhale for 4 seconds, hold for 4, and exhale for 6. Center yourself."
    },
    {
        icon: <Coffee className="w-6 h-6 text-primary" />,
        title: "Hydration Break",
        description: "Pause for a moment to drink a glass of water. A hydrated body supports a clearer mind."
    },
    {
        icon: <Brain className="w-6 h-6 text-primary" />,
        title: "Acknowledge One Win",
        description: "Think of one positive thing, no matter how small, that happened during your shift today."
    },
    {
        icon: <Zap className="w-6 h-6 text-primary" />,
        title: "Quick Stretch",
        description: "Gently stretch your neck and shoulders for 30 seconds. Release the tension from your body."
    },
    {
        icon: <Sun className="w-6 h-6 text-primary" />,
        title: "Positive Affirmation",
        description: "Say to yourself: 'I am doing my best, and my best is enough.' Believe in your capabilities."
    },
    {
        icon: <Moon className="w-6 h-6 text-primary" />,
        title: "Moment of Stillness",
        description: "Close your eyes for a minute. Focus on the quiet and give your mind a short rest from the noise."
    },
];

// Function to shuffle an array
const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


export function SelfCareCards() {
  const [displayedTips, setDisplayedTips] = React.useState<typeof allSelfCareTips>([]);

  React.useEffect(() => {
    setDisplayedTips(shuffleArray([...allSelfCareTips]).slice(0, 3));
  }, []);

  if (displayedTips.length === 0) {
    return null;
  }

  return (
    <div>
        <h2 className="text-xl font-bold mb-4">Quick Self-Care Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {displayedTips.map(tip => (
                <Card key={tip.title}>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        {tip.icon}
                        <CardTitle className="text-lg">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{tip.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  )
}
