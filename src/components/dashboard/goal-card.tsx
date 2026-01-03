import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

export function GoalCard({ goal }: { goal: string }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Target className="w-5 h-5 text-primary" />
          <span>Monthly Goal</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow justify-center">
        <p className="text-lg font-semibold text-center text-foreground/80">
          "{goal}"
        </p>
      </CardContent>
    </Card>
  );
}
