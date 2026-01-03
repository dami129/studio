import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Coffee, Wind } from "lucide-react";

const selfCareTips = [
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
]

export function SelfCareCards() {
  return (
    <div>
        <h2 className="text-xl font-bold mb-4">Quick Self-Care Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selfCareTips.map(tip => (
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
